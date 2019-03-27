# Editor TokenColorCustomizations

Also see [Editor.TokenColorCustomizations ](https://github.com/Microsoft/vscode/pull/29393)

Also see [VSC highlight and comment colors](https://www.reddit.com/r/vscode/comments/7idozq/highlight_and_comment_colors/)

You can set the following:

- `comments`
- `functions`
- `keywords`
- `numbers`
- `strings`
- `types`
- `variables`

If you use any of these, you'll change all comments, functions, etc. to the color you set.

If you want to be more specific, you can set ANY scope you want in the textMateRules section. This, too, is shown in the release notes.

The styling schema is as follows:

- `foreground` (color)
- `background` (color)
- `fontStyle` (One or a combination of: `italic`, `bold`, `underline`)

```js
tokenColorizationSettingSchema = {
  type: "object",
  properties: {
    foreground: {
      type: "string",
      format: "color"
    },
    background: {
      type: "string",
      format: "color"
    },
    fontStyle: {
      type: "string",
      description: nls.localize(
        "schema.fontStyle",
        "Font style of the rule: One or a combination of 'italic', 'bold' and 'underline'"
      )
    }
  }
};
```
