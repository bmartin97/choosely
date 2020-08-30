<h1 align="center">Welcome to choosely 👋</h1>
<p>
	<a href="https://www.npmjs.com/package/choosely" target="_blank">
		<img alt="Version" src="https://img.shields.io/npm/v/choosely.svg">
	</a>
	<a href="https://github.com/bmartin97/choosely#readme" target="_blank">
		<img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
	</a>
	<a href="https://github.com/bmartin97/choosely/graphs/commit-activity" target="_blank">
		<img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
	</a>
	<a href="https://github.com/bmartin97/choosely/blob/master/LICENSE" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/bmartin97/choosely" />
	</a>
</p>

> Simple and minimalist select dropdow

### 🏠 [Homepage](https://github.com/bmartin97/choosely#readme)

### ✨ [Demo](bmartin97.com)

## Install

```sh
npm i choosely
```

## Initialize

```javascript
import Choosely from 'choosely';

const choosely_selector1 = new Choosely('form .form-item.form-type-select select');
```

## Options

| Parameter             | Type                     | Default      |
| --------------------- | ------------------------ | ------------ |
| target                | String or \<HTMLELement> | undefined    |
| searchable            | Boolean                  | False        |
| inheritAttributes     | Boolean or Array         | False        |
| enableArrowNavigation | Boolean                  | True         |
| on                    | Object                   | Empty Object |

---

## target

Parent element, where choosely should be rendered. Value could be String (CSS Selector), or HTML Element. By default, the module will render the selector, before the Selector element.

JS

```javascript
import Choosely from 'choosely';

//Example 1 (Default)
const example1 = new Choosely('select.country-selector');

//Example 2 (With specified target)
const example2 = new Choosely('select.country-selector', {
    target: '.example-target'
});
```

HTML

```html
<div class="country-selector-container">
    <select class="country-selector">
        <option value="AK">Alaska</option>
        <option value="AS">American Samoa</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="AA">Armed Forces (AA)</option>
        <option value="AE">Armed Forces (AE)</option>
        <option value="AP">Armed Forces (AP)</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District of Columbia</option>
        <option value="FL">Florida</option>
    </select>
    <!-- Example 1 will render here-->
</div>
<div class="example-target">
    <h1>Choosely</h1>
    <!-- Example 2 will render here-->
</div>
```

---

## Searchable

## inheritAttributes

## enableArrowNavigation

## on

## Author

👤 **bmartin97**

-   Website: https://bmartin97.com
-   Github: [@bmartin97](https://github.com/bmartin97)
-   LinkedIn: [@barsimartin](https://linkedin.com/in/barsimartin)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bmartin97/choosely/issues). You can also take a look at the [contributing guide](https://github.com/bmartin97/choosely/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [bmartin97](https://github.com/bmartin97).<br />
This project is [MIT](https://github.com/bmartin97/choosely/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
