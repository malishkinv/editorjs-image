![](https://badgen.net/badge/Editor.js/v2.0/blue)

# EditorJS Unsplash Inline Image Tool

Image tool for [Editor.js](https://editorjs.io).
Embed images from blob or URLs.

## Notes

Do not require a server-side uploader.
Extends the functionality of [simple-image](https://github.com/editor-js/simple-image).

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
const editor = EditorJS({
  tools: {
      image: {
        class: InlineImage,
        inlineToolbar: true,
        config: {
          embed: {
            display: true,
          }
        }
      }
  }
});
```

## Config Params

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| embed          | `{display: boolean}` | You could display or not the embed tab, If you don't fill the embed config by default the value is set on true

## Tool's tunes

1. Add border
2. Stretch to full-width
3. Add background

## Output data

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| url            | `string`  | Image's url                     |
| caption        | `string`  | Image's caption                 |
| withBorder     | `boolean` | Add border to image             |
| withBackground | `boolean` | Add background          |
| stretched      | `boolean` | Stretch image to screen's width |

**Image**

```json
{
    "type" : "image",
    "data" : {
        "url" : "https://www.example.com/image.jpg",
        "caption" : "An image",
        "withBorder" : false,
        "withBackground" : false,
        "stretched" : true
    }
}
```

## Development

**Development mode**
```shell
$ yarn build:dev
```

**Production release**
1. Create a production bundle
```shell
$ yarn build
```

2. Commit `dist/bundle.js`
