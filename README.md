# Fisarmonica
> A simple and accessible vanilla js accordion plugin (<1kb minifed and gzipped)

[DEMO](https://fisarmonica.netlify.com/)

## Installation

**NPM**

```shell
npm install fisarmonica --save
```

Include css and js files

```html
<link rel="stylesheet" media="screen" href="<path-to-lib>/fisarmonica.css" />
<script src="<path-to-lib>/fisarmonica.js" ></script>
```

**CDN**

Be sure to use the latest version

```html
<link rel="stylesheet" media="screen" href="https://cdn.jsdelivr.net/npm/fisarmonica@1.3.3/dist/fisarmonica.min.css" />
<script src="https://cdn.jsdelivr.net/npm/fisarmonica@1.3.3/dist/fisarmonica.min.js" ></script>
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
  /* Root element */
  fisarmonicaOuterBorderWidth: '3px',
  fisarmonicaInnerBorderWidth: '1px',
  fisarmonicaBorderRadius: '5px',
  fisarmonicaPadding: '1em',
  fisarmonicaBorderColor: 'Gray',
  fisarmonicaBorderColorFocus: 'SteelBlue',
  fisarmonicaInnerBorderColorFocus: 'Gray',

  /* Arrows */
  fisarmonicaArrowWidth: '0.75em',
  fisarmonicaArrowThickness: '3px',
  fisarmonicaArrowColor: 'Gray',
  fisarmonicaArrowColorFocus: 'SteelBlue',
  fisarmonicaArrowColorDisabled: 'Gray',

  /* Buttons */
  fisarmonicaButtonFontFamily: 'inherit',
  fisarmonicaButtonFontSize: 'inherit',
  fisarmonicaButtonFontWeight: 'inherit',
  fisarmonicaButtonColor: 'black',
  fisarmonicaButtonColorFocus: 'black',
  fisarmonicaButtonColorDisabled: 'Grey',
  fisarmonicaButtonBackground: 'white',
  fisarmonicaButtonBackgroundFocus: 'AliceBlue',
  fisarmonicaButtondBackgroundDisabled: 'WhiteSmoke',

  /* Panels */
  fisarmonicaPanelFontFamily: 'inherit',
  fisarmonicaPanelFontSize: 'inherit',
  fisarmonicaPanelFontWeight: 'inherit',
  fisarmonicaPanelColor: 'black',
  fisarmonicaPanelBackground: 'white',
  fisarmonicaPanelTransitionOrigin: 'top',
  fisarmonicaPanelTransitionDuration: '0.15s',
  fisarmonicaPanelTransitionTimingFunction: 'linear'
}
```

You can **ovveride any prop** you like. Css styles are set with custom-properties so [check browser support](https://caniuse.com/#feat=css-variables)

You can also pass your own custom properties as values, to match your site settings

`fisarmonicaButtonBackgroundFocus: 'var(--myCustomVar)'`


## Methods

### open

```js
// pass a zero-index array of panels to open ([1,2] => opens 2nd and 3rd panel)
// if no argument is passed all the panels will open

var fisarmonica = new Fisarmonica()
fisarmonica.open([1,2])
```

### close

```js
// pass a zero-index array of panels to close ([1,2] => closes 2nd and 3rd panel)
// if no argument is passed all the panels will close

var fisarmonica = new Fisarmonica()
fisarmonica.close([1,2])
```


### disable

```js
// pass a zero-index array of panels to disable ([1,2] => disables 2nd and 3rd panel)
// if no argument is passed all the panels will be disabled

var fisarmonica = new Fisarmonica()
fisarmonica.disable([1,2])
```

### enable

```js
// pass a zero-index array of panels to enable ([1,2] => enables 2nd and 3rd panel)
// if no argument is passed all the panels will be enabled

var fisarmonica = new Fisarmonica()
fisarmonica.enable([1,2])
```

## Keyboard events

* `Enter` or `Space` = Expands/Collapses Panel
* `Tab` = Move to next focusable element
* `Shift + Tab` = Move to previous focusable element
* `↑ ↓` = Cycle elements when focused
* `Home` = Focus first element
* `End` = Focus last element


fisarmonica means accordion in italian 😉

[https://it.wikipedia.org/wiki/Fisarmonica](https://it.wikipedia.org/wiki/Fisarmonica)