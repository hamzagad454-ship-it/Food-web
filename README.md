# Sawa Food

Project files are organized into folders:

```text
Food-web/
├── index.html
├── css/     (01-base.css ... 11-social-media.css)
├── js/      (config.js, 01-data.js ... 07-social-media.js)
└── img/     (product photos, factory photo, partnership icon)
```

`index.html` loads every stylesheet and script from `css/` and `js/`
respectively — the load order in `<head>`/before `</body>` still matters
(each file can override the ones loaded before it), only the paths changed.

## Editing images / links

`js/config.js` is still the only file you normally need to edit
(WhatsApp number, social links, hero images, product images). Local
images go in `img/`; reference them from `config.js` as `img/yourfile.jpg`.
