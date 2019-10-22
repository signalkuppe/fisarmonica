var Fisarmonica = function (options) { // eslint-disable-line no-unused-vars, padded-blocks

  /* public methods */

  var fisarmonica = {}

  /* default options */

  var defaults = {
    keepPanelsOpen: false,
    selector: '[data-fisarmonica]'
  }

  /* Options */

  var mergedOptions = Object.assign(defaults, options)

  /* Plugin added selectors */

  var selectors = {
    contentHiddenClass: 'js-is-hidden',
    accordionFocusClass: 'js-focus'
  }

  /* root element */

  var accordionRootElement = document.querySelector(mergedOptions.selector)

  //
  // public API
  //

  /**
   * Opens a list of panels
   * @param {Array} arrayOfPanelsToOpen to 0-index array containing the panels to open
   * If no arrayOfPanelsToOpen is specified, all panels will be opened
   */

  fisarmonica.open = function (arrayOfPanelsToOpen) {
    return _setStatus(arrayOfPanelsToOpen, 'open')
  }

  /**
   * Closes a list of panels
   * @param {Array} arrayOfPanelsToClose to 0-index array containing the panels to close 
   * If no arrayOfPanelsToClose is specified, all panels will be closed
   */

  fisarmonica.close = function (arrayOfPanelsToClose) {
    return _setStatus(arrayOfPanelsToClose, 'close')
  }

  /**
   * Disables a list of panels
   * @param {Array} arrayOfPanelsToDisable to 0-index array containing the panels to disable 
   * If no arrayOfPanelsToDisable is specified, all panels will be disabled
   */

  fisarmonica.disable = function (arrayOfPanelsToDisable) {
    return _setStatus(arrayOfPanelsToDisable, 'disable')
  }

  /**
   * Enables a list of panels
   * @param {Array} arrayOfPanelsToEnable to 0-index array containing the panels to enable 
   * If no arrayOfPanelsToEnable is specified, all panels will be enabled
   */

  fisarmonica.enable = function (arrayOfPanelsToEnable) {
    return _setStatus(arrayOfPanelsToEnable, 'enable')
  }

  //
  // private API
  //

  /**
   * Creates an unique alfanumeric id
   */

  function _makeId () {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    var charactersLength = characters.length
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  /**
   * Performs a specific action on a list of panels
   * @param {Array} arrayOfItems items on which the action will be performed
   * @param {String} action the type of action
   */

  var _setStatus = function (arrayOfItems, action) {
    Array
      .from(accordionRootElement.querySelectorAll('dd'))
      .forEach(function (content, idc) {
        if (action === 'open') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idc)) {
              content.classList.remove(selectors.contentHiddenClass)
            }
          } else { // open all
            content.classList.remove(selectors.contentHiddenClass)
          }
        } else if (action === 'close') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idc)) {
              content.classList.add(selectors.contentHiddenClass)
            }
          } else { // close all
            content.classList.add(selectors.contentHiddenClass)
          }
        }
      })
    Array
      .from(accordionRootElement.querySelectorAll('button'))
      .forEach(function (button, idb) {
        if (action === 'open') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idb)) {
              button.setAttribute('aria-expanded', true)
              button.focus()
            }
          } else { // open all
            button.setAttribute('aria-expanded', true)
          }
        } else if (action === 'close') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idb)) {
              button.setAttribute('aria-expanded', false)
            }
          } else { // close all
            button.setAttribute('aria-expanded', false)
          }
        } else if (action === 'disable') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idb)) {
              button.setAttribute('disabled', true)
            }
          } else { // disable all
            button.setAttribute('disabled', true)
          }
        } else if (action === 'enable') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idb)) {
              button.removeAttribute('disabled')
            }
          } else { // disable all
            button.removeAttribute('disabled')
          }
        }
      })
  }

  /**
   * Ovverrides some style from user options
   */

  var _changeStyles = function () {
    if (mergedOptions.theme) {
      for (var style in mergedOptions.theme) {
        accordionRootElement.style.setProperty('--' + style, mergedOptions.theme[style])
      }
    }
  }

  /**
   * Prepares the markup with all the attributes
   */

  var _prepareMarkup = function () {
    accordionRootElement.classList.add('fisarmonica') // for styling purpose
    var accordionId = _makeId()
    var accordionId2 = _makeId()
    Array
      .from(accordionRootElement.querySelectorAll('button'))
      .forEach(function (button, idb) {
        button.setAttribute('aria-controls', 'fisarmonica-content-' + accordionId + '-' + idb)
        button.setAttribute('id', 'fisarmonica-content-' + accordionId2 + '-' + idb)
      })
    Array
      .from(accordionRootElement.querySelectorAll('dd'))
      .forEach(function (content, idc) {
        content.setAttribute('id', 'fisarmonica-content-' + accordionId + '-' + idc)
        content.setAttribute('aria-labelledby', 'fisarmonica-content-' + accordionId2 + '-' + idc)
      })
  }

  /**
   * Checks focus on button elements
   */

  var _setFocusWatcher = function () {
    Array
      .from(accordionRootElement.querySelectorAll('button'))
      .forEach(function (button) {
        button.addEventListener('focus', function () {
          accordionRootElement.classList.add(selectors.accordionFocusClass)
        })
        button.addEventListener('blur', function () {
          accordionRootElement.classList.remove(selectors.accordionFocusClass)
        })
      })
  }

  /**
   * Root element click handler
   */

  var _clickHandler = function (e) {
    if (e.target.matches('button')) {
      var buttons = accordionRootElement.querySelectorAll('button')
      var clickedIndex = Array.from(buttons).indexOf(e.target)
      if (!mergedOptions.keepPanelsOpen) {
        var others = Array.apply(null, Array(buttons.length)).map(function (_, i) { return i })
          .filter(function (i) {
            return i !== clickedIndex
          })
        fisarmonica.close(others)
      }
      if (e.target.getAttribute('aria-expanded') === 'false') {
        fisarmonica.open([clickedIndex])
      } else {
        fisarmonica.close([clickedIndex])
      }
      accordionRootElement.classList.add(selectors.accordionFocusClass)
      e.preventDefault()
    }
  }

  /**
   * Init function
   */

  var _init = function () {
    if (!accordionRootElement) {
      console.warn('Cannot find an fisarmonica with class' + mergedOptions.selector)
      return
    }
    fisarmonica.close()
    _prepareMarkup()
    _changeStyles()
    _setFocusWatcher()
    accordionRootElement.addEventListener('click', _clickHandler, false)
  }

  _init()

  return fisarmonica
}
