# netabrex

> The browser extension to replace browser new Tab
> No Third-Party Tracking, No Advertising Services, No Cookies

## Developing

- `npm run chrome-watch`
- `npm run firefox-watch`

### Load the extension in Chrome

1. Navigate to `chrome://extensions`
2. Select `Developer Mode` and then click `Load unpacked`
3. From the file browser, choose `build/chrome`

### Load the extension in Firefox

1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click `Load Temporary Add-on`
3. From the file browser, choose `build/firefox`

## Packaging

Run `npm run dist` to create a zipped, production-ready extension for each browser. You can then upload that to the application store.

## URLs

- [Chrome Getting Started Tutorial](https://developer.chrome.com/extensions/getstarted)
- [Chrome APIs](https://developer.chrome.com/apps/api_index)
- [MDN WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)

## [MIT License](LICENSE.md)
