# fisarmonica
> A simple vanilla js accordion plugin

[DEMO](https://fisarmonica.netlify.com/)


## Installation

Install via npm

```shell
npm install fisarmonica --save
```

Include css and js files

```html
<link rel="stylesheet" href="<path-to-lib>/fisarmonica.css" />
<script src="./src/fisarmonica.js" ></script>
```

Prepare the base markup

```html
<dl data-fisarmonica>
  <dt>
    <button>Accordion Title 1</button>
  </dt>
  <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
  <dt>
    <button>Accordion Title 2</button>
  </dt>
  <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
  <dt>
    <button>Accordion Title 3</button>
  </dt>
  <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
</dl>
```

Initialize the plugin

```js
var fisarmonica = new Fisarmonica()
```

## Options

### selector
Type: `String`
Default value: `[data-fisarmonica]`

The root element selector

### keepPanelsOpen
Type: `Boolean`
Default value: `false`

If set to true all the panels will remain open

### theme
Type: `Object`
Default value:

```js
{
  /* spacing */
  fisarmonicaOuterBorderWidth: '3px',
  fisarmonicaInnerBorderWidth: '1px',
  fisarmonicaBorderRadius: '5px',
  fisarmonicaArrowWidth: '3px',
  fisarmonicaPadding: '1em',

  /* Colors */
  fisarmonicaBorderColor: 'Gray',
  fisarmonicaBorderColorFocus: 'SteelBlue',
  fisarmonicaInnerBorderColorFocus: 'Gray',

  /* Arrow Colors */
  fisarmonicaArrowColor: 'Gray',
  fisarmonicaArrowColorFocus: 'SteelBlue',
  fisarmonicaArrowColorDisabled: 'Gray',

  /* Button Colors */
  fisarmonicaButtonColor: 'black',
  fisarmonicaButtonColorFocus: 'black',
  fisarmonicaButtonColorDisabled: 'Grey',
  fisarmonicaButtonBackground: 'white',
  fisarmonicaButtonBackgroundFocus: 'AliceBlue',
  fisarmonicaButtondBackgroundDisabled: 'WhiteSmoke',

  /* Seection Colors */
  fisarmonicaSectionColor: 'black',
  fisarmonicaSectionBackground: 'white'
}
```

You can ovveride any prop you like. Css style are set with custom-properties so check the browsers support


