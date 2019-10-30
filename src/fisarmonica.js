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

  /* Plugin added classes */

  var classes = {
    cssMainClass: 'fisarmonica',
    contentHiddenClass: 'js-is-hidden',
    accordionFocusClass: 'js-focus'
  }

  /* root element */

  var accordionRootElement = document.querySelector(mergedOptions.selector)
  var titles
  var buttons
  var panels

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
   * Creates an unique id
   */

  function _makeId () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0
      var v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  /**
   * Performs a specific action on a list of panels
   * @param {Array} arrayOfItems items on which the action will be performed
   * @param {String} action the type of action
   */

  var _setStatus = function (arrayOfItems, action) {
    panels
      .forEach(function (panel, idc) {
        if (action === 'open') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idc)) {
              panel.classList.remove(classes.contentHiddenClass)
            }
          } else { // open all
            panel.classList.remove(classes.contentHiddenClass)
          }
        } else if (action === 'close') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idc)) {
              panel.classList.add(classes.contentHiddenClass)
            }
          } else { // close all
            panel.classList.add(classes.contentHiddenClass)
          }
        }
      })
    buttons
      .forEach(function (button, idb) {
        if (action === 'open') {
          if (arrayOfItems) {
            if (arrayOfItems.includes(idb)) {
              button.setAttribute('aria-expanded', true)
              if (arrayOfItems.length === 1) { // focus only if we have to open 1 panel
                button.focus()
              }
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
    accordionRootElement.classList.add(classes.cssMainClass) // for styling purpose
    var accordionId = _makeId()
    var accordionId2 = _makeId()
    titles = Array.from(accordionRootElement.querySelectorAll('dt'))
    buttons = Array.from(accordionRootElement.querySelectorAll('dt > button'))
    panels = Array.from(accordionRootElement.querySelectorAll('dd'))
    titles
      .forEach(function (title) {
        title.classList.add(classes.cssMainClass + '-title')
      })
    buttons
      .forEach(function (button, idb) {
        button.classList.add(classes.cssMainClass + '-button')
        button.innerHTML = '<span class="' + classes.cssMainClass + '-button-text">' + button.innerHTML + '</span><span aria-hidden="true" class="' + classes.cssMainClass + '-button-icon"></span>'
        button.setAttribute('aria-controls', classes.cssMainClass + '-' + accordionId + '-' + idb)
        button.setAttribute('id', classes.cssMainClass + '-' + accordionId2 + '-' + idb)
      })
    panels
      .forEach(function (panel, idc) {
        panel.classList.add(classes.cssMainClass + '-panel')
        panel.setAttribute('id', classes.cssMainClass + '-' + accordionId + '-' + idc)
        panel.setAttribute('aria-labelledby', classes.cssMainClass + '-' + accordionId2 + '-' + idc)
      })
  }

  /**
   * Checks focus on button elements
   */

  var _setFocusWatcher = function () {
    buttons
      .forEach(function (button) {
        button.addEventListener('focus', function () {
          accordionRootElement.classList.add(classes.accordionFocusClass)
        })
        button.addEventListener('blur', function () {
          accordionRootElement.classList.remove(classes.accordionFocusClass)
        })
      })
  }

  /**
   * Root element click handler
   */

  var _rootClickHandler = function (e) {
    if (e.target.matches('button')) {
      _buttonClickHandler(e.target)
      accordionRootElement.classList.add(classes.accordionFocusClass)
      e.preventDefault()
    }
  }

  var _buttonClickHandler = function (buttonClicked) {
    var clickedIndex = Array.from(buttons).indexOf(buttonClicked)
    if (!mergedOptions.keepPanelsOpen) {
      var others = Array.apply(null, Array(buttons.length))
        .map(function (_, i) { return i })
        .filter(function (i) {
          return i !== clickedIndex
        })
      fisarmonica.close(others)
    }
    if (buttonClicked.getAttribute('aria-expanded') === 'false') {
      fisarmonica.open([clickedIndex])
    } else {
      fisarmonica.close([clickedIndex])
    }
  }

  var _keyboardEvents = function () {
    accordionRootElement.addEventListener('keydown', function (e) {
      var key = event.which.toString()
      var target = event.target
      var index = buttons.indexOf(target)
      if (index !== -1) { // do all the logic only if we are acting on a trigger element
        if (key === '40' || key === '38' || key === '36' || key === '35') { // moving up and down
          if (key === '40' || key === '38') { // down and up
            index = key === '40' ? (index + 1 === buttons.length ? 0 : index + 1) : (index - 1 === -1 ? buttons.length - 1 : index - 1) // check if we are at the end or at the beginning
          } else if (key === '36') { // home
            index = 0
          } else if (key === '35') { // end
            index = buttons.length - 1
          }
          buttons[index].focus()
          e.preventDefault()
        } else if (key === '13') { // enter
          _buttonClickHandler(buttons[index])
          e.preventDefault()
        }
      }
    })
  }

  /**
   * Init function
   */

  var _init = function () {
    if (!accordionRootElement) {
      console.warn('Cannot find an fisarmonica with class' + mergedOptions.selector)
      return
    }
    _prepareMarkup()
    _changeStyles()
    _setFocusWatcher()
    _keyboardEvents()
    fisarmonica.close()
    accordionRootElement.addEventListener('click', _rootClickHandler, false)
  }

  _init()

  return fisarmonica
}
