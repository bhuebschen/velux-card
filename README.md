# VELUX Card

[![hacs][hacs-image]][hacs-url]
[![GitHub Sponsors][gh-sponsors-image]][gh-sponsors-url]

![preview]

The VELUX Card is a custom Lovelace card for Home Assistant that allows you to show and control the state of VELUX roof windows.

### Features:

### Installation:

### [HACS](hacs) (Home Assistant Community Store)

1. Go to HACS page on your Home Assistant instance
1. Add this repository (https://github.com/bhuebschen/velux-card) via HACS Custom repositories [How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/)
1. Select `Frontend`
1. Press add icon and search for `VELUX Card`
1. Select VELUX Card repo and install
1. Force refresh the Home Assistant page (<kbd>Ctrl</kbd> + <kbd>F5</kbd> / (<kbd>Shift</kbd> +) <kbd>⌘</kbd> + <kbd>R</kbd>)
1. Add velux-card to your page

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=bhuebschen&repository=velux-card&category=plugin)

### Manual

1. Download the 'velux-card.js' from the latest [release][release-url] (with right click, save link as)
1. Place the downloaded file on your Home Assistant machine in the `config/www` folder (when there is no `www` folder in the folder where your `configuration.yaml` file is, create it and place the file there)
1. In Home Assistant go to `Configuration->Lovelace Dashboards->Resources` (When there is no `resources` tag on the `Lovelace Dashboard` page, enable advanced mode in your account settings, and retry this step)
1. Add a new resource
   1. Url = `/local/velux-card.js.js`
   1. Resource type = `module`
1. Force refresh the Home Assistant page (<kbd>Ctrl</kbd> + <kbd>F5</kbd> / (<kbd>Shift</kbd> +) <kbd>⌘</kbd> + <kbd>R</kbd>)
1. Add VELUX card to your page

### Configuration:
Here's an example configuration for the VELUX Card:

```yaml
type: 'custom:velux-card'
window: window.my-window
cover: cover.my-window
```
### Options:

| Name                   | Description                                                                                           | Default Value                |
|------------------------|-------------------------------------------------------------------------------------------------------|------------------------------|

### Usage:

### Credits:

### Issues & Contributions:
If you encounter any issues or have suggestions for improvements, feel free to [open an issue](https://github.com/bhuebschen/velux-card/issues) or submit a pull request.

## License

MIT © [Benedikt Hübschen][bhuebschen]

<!-- Badges -->

[hacs-url]: https://github.com/hacs/integration
[hacs-image]: https://img.shields.io/badge/hacs-custom-orange.svg?style=flat-square
[gh-sponsors-url]: https://github.com/sponsors/bhuebschen
[gh-sponsors-image]: https://img.shields.io/github/sponsors/bhuebschen?style=flat-square

<!-- References -->

[preview]: https://github.com/bhuebschen/velux-card/assets/1864448/39352877-43fa-49ce-a517-079e3783a95d
[home-assistant]: https://www.home-assistant.io/
[hacs]: https://hacs.xyz
[latest-release]: https://github.com/bhuebschen/velux-card/releases/latest
[ha-scripts]: https://www.home-assistant.io/docs/scripts/
[edit-readme]: https://github.com/bhuebschen/velux-card/edit/master/README.md
