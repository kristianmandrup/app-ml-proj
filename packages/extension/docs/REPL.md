# Creating a REPL

Repo can be found on github [vassilych](https://github.com/vassilych/)

The beauty of the VS Code extensions is that the actual functionality implementation can be in any language. The extension’s TypeScript code communicates with the VS Code Framework and receives user commands from it. Then it sends these commands to the REPL evaluator, which will do the actual work and communicate the results back to the extension.

The communication between the extension and the REPL evaluator can be done via sockets.

## Implementing REPL server in C sharp

To collect all requests from a REPL client, use a queue, implemented as a `BlockingCollection` class from the `System.Collections.Concurrent` namespace. The main advantage of this class is that it provides a thread-safe way of enqueueing items to a specified queue and dequeueing them from there, so that we don’t have to concentrate on these low-level details.

There are different scenarios that the REPL evaluator server must support:

In case the server is running a Xamarin mobile app, the code must be evaluated on the main GUI thread. This is done as follows:

On iOS:

```cs
UIApplication.SharedApplication.
              InvokeOnMainThread(() => {
        // This code is run on the main thread.
});
```

On Android:

```cs
Activity .RunOnUiThread(()
                     => { // This code is run on the main thread.
});
```

Main thread

```cs
CoreApplication.MainView.CoreWindow.Dispatcher .
        Run Async(CoreDispatcherPriority.High, () => {
        // This code is run on the main thread.
});
```

The server is started either asynchronously via calling `StartServer()` or as a blocked call to `StartServerBlocked()`. The server initializes server sockets on the configured port (by default, it’s `13337`) and starts listening for the incoming connections:

```cs
IPAddress localAddr =
          IPAddress.Parse("127.0.0.1");
TcpListener server =
                new TcpListener(localAddr, port);
server.Start();
DebuggerAttached = true;
while (true) {
  m_client = server.AcceptTcpClient();
  m_stream = m_client.GetStream();
        ThreadPool.QueueUserWorkItem(RunClient);
}
```

For each accepted connection, the server runs the RunClient() method, which will be started in a new pool thread.

The `RunClient()` method, on one hand, starts listening for the client requests, adding them all to the `BlockingCollection m_queue`:

```cs
while((i = m_stream.Read(bytes, 0, bytes.Length))
             != 0) {
  data = Encoding.UTF8.GetString(bytes, 0, i);
  m_queue.Add(data);
}
```

On the other hand, it starts another thread that consumes this queue in the `ProcessQueue()` method.

The `ProcessClientCommands()` method is where the actual processing takes place; you’ll see it later on. In other cases, you execute a call to the `queue m_queue.Take()`, which blocks until the queue’s not empty.

```cs
while(true) { // A blocking call.
  data = m_queue.Take();
        if (OnRequest != null) { // iOS/Android case.
    OnRequest?.Invoke(m_debugger, data);
  } else { // Direct call case.
    m_debugger.ProcessClientCommands(data);
  }
}
```

In case of Xamarin (iOS/Android apps), an event handler is triggered. That event handler makes sure that the processing is done on the main thread. In other cases, you start processing the queue on the same thread (you probably don’t care on which thread to do processing in console applications).

You first register a CSCS function with the CSCS Parser:

```cs
ParserFunction.RegisterFunction("StartDebugger", new DebuggerFunction());
```

This means that calling a CSCS function StartDebugger calls the `DebuggerFunction.Evaluate()` method behind the scenes.

This method starts the REPL server and subscribes to the incoming client requests:

```cs
DebuggerServer.StartServer(port);
DebuggerServer.OnRequest += ProcessRequest;.
```

When the `ProcessRequest()` method is triggered, it makes sure that each request is processed on the main thread:

```cs
public void ProcessRequest( Debugger debugger,
                                       string request) {
#if __ANDROID__
 MainActivity.TheView.RunOnUiThread(() => {
    debugger.ProcessClientCommands(request);
  });
#elif __IOS__
  UIApplication .SharedApplication.
          InvokeOnMainThread( () => {
          debugger.ProcessClientCommands(request);
  });
}
```

Now it’s time to take a look at the actual processing. Because the server may receive several requests from the client at once (they can get queued, as you’ll see later when developing the client in TypeScript), you have to process the requests one by one.

```cs
public void ProcessClientCommands(string data)
{
        string [] commands = data.Split(
                             new char [] {'\n'});
        foreach (string dataCmd in commands) {
          if (!string.IsNullOrWhiteSpace(dataCmd)) {
      ProcessClientCommand(dataCmd);
    }
  }
}
```

This is a fragment of how you process each request (a fragment because you’re going to extend this method when developing a debugger):

```cs
void ProcessClientCommand(string data) {
        string [] parts = data.Split(
              new char [] {'|'});
        string cmd = parts[0].ToLower();
        string result = "N/A";
        if (cmd == "repl") {
    result = ProcessRepl(
        data.Substring(cmd.Length+1));
    SendBack(result);
          return;
  }
}
```

As you can see, the server expects a request from the client in the following format: `command|request` data. In particular, for REPL, it expects repl|string to process.

The `SendBack()` method is a lower-level function that sends back the result:

```cs
static void SendBack(string str) {
        byte [] msg = Encoding.UTF8.GetBytes(str);
        try {
    m_stream.Write(msg, 0, msg.Length);
    m_stream.Flush();
  } catch (Exception exc) {
    Console.Write("Client gone: {0}",
            exc.Message);
          return;
  }
}
```

The `ProcessRepl()` method does the actual CSCS processing.

```cs
string ProcessRepl(string repl)
{
  Dictionary<int, int> char2Line;
          string script = Utils.ConvertToScript(repl, out char2Line);
  ParsingScript tempScript = new ParsingScript(script, 0);
  tempScript.Debugger = this;
  Variable result = null;
          try {
            while (tempScript.Pointer < script.Length) {
      result = tempScript.ExecuteTo();
      tempScript.GoToNextStatement();
    }
  } catch (Exception exc) {
            return "Exception thrown: " + exc.Message;
  }

                  string stringRes = Output + "\n";
  stringRes += result == null ? "" : result.AsString();
          return stringRes;
}
```

## Implementation of the REPL Client

You’ll be implementing the REPL client using TypeScript (when you were creating the extension using the yo tool, there were only two options for the extension language, JavaScript and TypeScript).

The entry point of a VS Code extension is the `activate()` method of the `extension.ts` file.

First, it reads the configuration that you defined in the package.json file, namely:

```json
"properties": {
    "cscs.connectType": {
        "type": "string",
        "default": "sockets"
    },
    "cscs.serverPort": {
        "type": "number",
        "default": 13337
    },
    "cscs.serverHost": {
        "type": "string",
        "default": "127.0.0.1"
    }
}
```

The `extension.ts` file `activate(ctx)` function:

```cs
import * as vscode from 'vscode';
import { CscsRepl } from './cscsRepl';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('cscs');
    let connectTypeConfig = config.get('connectType');
    let hostConfig = config.get('serverHost');
    let portConfig = config.get('serverPort');
    let connectType = connectTypeConfig ?
                       connectTypeConfig.toString() : '';
    let host = hostConfig ? hostConfig.toString() : '';
    let port = portConfig ? parseInt(portConfig.toString()) : 0;

    let cscsRepl = new CscsRepl();
    cscsRepl.start(connectType, host, port);

    let outputChannel = vscode.window.createOutputChannel('CSCS');

    cscsRepl.on('onInfoMessage', (msg : string) => {
        vscode.window.showInformationMessage('REPL: ' + msg);
    });
    cscsRepl.on('onReplMessage', (data : string) => {
        outputChannel.append('REPL> ');
        let lines = data.toString().split('\n');
        let counter = 0;
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            outputChannel.appendLine(line);
            counter++;
        }
    });

    const getCode = () => {
        let textEditor = vscode.window.activeTextEditor;
        if (!textEditor) {
            return "";
        }
        let selection = textEditor.selection;
        let text = textEditor.document.getText(selection);
        if (textEditor.selection.start.line ===
                textEditor.selection.end.line &&
            textEditor.selection.start.character ===
                        textEditor.selection.end.character) {
            text =
         textEditor.document.lineAt(textEditor.selection.start.line).text;
        }
        return text;
    };

    let disposable =
         vscode.commands.registerCommand('extension.cscs.repl', () => {
        let code = getCode();
        if (code === '') {
            return;
        }
        cscsRepl.sendToServer('repl', code);
    });
    context.subscriptions.push(disposable);
}
```

After reading the configuration, you connect to the `Debugger` that you implemented in the previous section. The code, implementing connection via sockets, is in the `CscsRepl` class, implemented in `cscsRepl.ts`.

Note that you subscribe to the messages from `CscsRepl` and show them like pop-ups using this code:

```cs
cscsRepl.on('onInfoMessage', (msg : string) => {
  vscode.window.showInformationMessage(
                     'REPL: ' + msg);
});
```

Inside of `CscsRepl`, you pass the messages to the subscribers like this:

```cs
public printInfoMsg(msg : string) {
  this.sendEvent('onInfoMessage', msg);
}
protected processFromDebugger(data : string) {
  this.sendEvent('onReplMessage', msg);
}
```

The actual output from the debugger is shown in the extra output window, titled `CSCS`, that you created in this statement:

```cs
let outputChannel =
  vscode.window.createOutputChannel('CSCS');
```

The main part of the `extension.ts` `activate()` method is the implementation of the `extension.cscs.repl` command, that you previously defined in `package.json`:

```cs
let disposable=vscode.commands.registerCommand(
                       'extension.cscs.repl', () => {
  let code = getCode();
  if (code === '') {
      return;
  }
  cscsRepl.sendToServer('repl', code);
});
```

Each time the user executes the `extension.cscs.repl` command, you get what she has selected in the editor (using `getCode()` method, shown in Listing 8) and then send her selection to the server (see Listing 9). All of the replies from the server are shown in the `cscsRepl.on('onReplMessage')` method, also shown in Listing 8.
