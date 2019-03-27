# Debugger

From [Writing Your Own Debugger](https://www.codemag.com/Article/1809051/Writing-Your-Own-Debugger-and-Language-Extensions-with-Visual-Studio-Code)

```cs
class DebuggerFunction : ParserFunction
{ protected override Variable Evaluate(ParsingScript script)
  {
    List<Variable> args = script.GetFunctionArgs();
    int port = Utils.GetSafeInt(args, 0, 13337);
    DebuggerServer.StartServer(port);

    DebuggerServer.OnRequest += ProcessRequest;
    return Variable.EmptyInstance;
  }
  public void ProcessRequest(Debugger debugger, string request)
  {
#if __ANDROID__
    MainActivity.TheView.RunOnUiThread(() => {
      debugger.ProcessClientCommands(request);
    });
#elif __IOS__
    UIApplication.SharedApplication.InvokeOnMainThread(() => {
      debugger.ProcessClientCommands(request);
    });
E lse
    debugger.ProcessClientCommands(request);
#endif
  }
}
```
