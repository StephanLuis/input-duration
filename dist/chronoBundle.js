/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chronoBundle"] = factory();
	else
		root["chronoBundle"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/chrono.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/chrono.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"*:focus {\\n  outline: none;\\n}\\n\\n\\ndiv.timeCase{\\n  display: inline-flex;\\n  flex-direction: row;\\n  max-width: 300px;\\n  padding: 3px;\\n  border-style: solid;\\n  border-width: 1px;\\n  border-radius: 2px;\\n}\\n\\n\\n/* Each input width set and blinking cursor 'caret' removed */\\ndiv.timeCase input{\\n  caret-color: transparent;\\n  width: 15px;\\n  padding-top:1px;\\n}\\n\\n\\ndiv.timeCase .D3{\\n  width: 25px;\\n}\\n\\n\\n/* Hiding the up and down arrow */\\n/*https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp*/\\n/* Chrome, Safari, Edge, Opera */\\n\\ninput::-webkit-outer-spin-button,\\ninput::-webkit-inner-spin-button {\\n-webkit-appearance: none;\\nmargin: 0;\\n}\\n\\n\\n/* Firefox */\\n\\ninput[type=number] {\\n/* -moz-appearance: textfield; */\\n-moz-appearance: textarea;\\n-webkit-appearance: textarea;\\n}\\n\\n\\ndiv.timeCase:focus-within {\\nborder: 2px solid black;\\npadding: 2px;\\n}\\n\\n\\n.ts_digit {\\n  border: none;\\n} \\n\\n /* between digit span */\\n.bds{\\n  padding-bottom: 1px;\\n}\\n\\n#svgContainer {\\nwidth: 12px;\\nheight: 12px;\\npadding-top: 1px;\\npadding-right: 2px;\\ncolor: black;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://chronoBundle/./src/chrono.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://chronoBundle/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./src/chrono.css":
/*!************************!*\
  !*** ./src/chrono.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_chrono_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./chrono.css */ \"./node_modules/css-loader/dist/cjs.js!./src/chrono.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_chrono_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_chrono_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack://chronoBundle/./src/chrono.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://chronoBundle/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/chrono.js":
/*!***********************!*\
  !*** ./src/chrono.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chrono_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chrono.css */ \"./src/chrono.css\");\n\n// A HH:MM:SS.mmm control that is unaffected by OSX and works on 'all' browsers.\n\nclass Chron {\n  constructor() {\n\n    // fire HTML input replacement\n\n    this.addHTML();\n\n    // set up event listeners\n    this.add0s();\n    this.addNumberLooping();\n    this.addLeftRightToggle();\n    this.addNumericInput();\n    this.addClicksToActivate();\n\n\n  }\n\n  get hour() {\n    return document.querySelector(\"#sH\").value;\n  }\n\n  get minute() {\n    return document.querySelector(\"#sM\").value;\n  }\n\n  get second() {\n    return document.querySelector(\"#sS\").value;\n  }\n\n  get milliSec() {\n    return document.querySelector(\"#sMS\").value;\n  }\n\n  // reports a value of the control\n  get timePoint() {\n    return this.hour + \":\" + this.minute + \":\" + this.second + \".\" + this.milliSec;\n  }\n\n  // array of elements with data-attribute univHMS\n  // get univHMSinp() {\n  //   return document.querySelectorAll(\"input[data-univHMS]\");\n  // }\n\n  // takes an element and innerhtml's the Chron value on each update\n  chronReport(el) {\n    document.querySelector(\"div.timeCase\")\n      .addEventListener('change', function (event) {\n\n        el.innerHTML = this.timePoint;\n\n      });\n  }\n\n  // convert input data-univHMS to'univHMS'\n\n  addHTML() {\n\n    const univHMSinp = document.querySelectorAll(\"input[data-univHMS]\");\n\n    univHMSinp.forEach(el => {\n      // code\n\n      var spanIn = document.createElement(\"div\");\n\n      [...el.attributes].forEach(attr => { spanIn.setAttribute(attr.nodeName, attr.nodeValue) });\n\n      el.replaceWith(spanIn);\n\n      spanIn.classList.add('timeCase');\n\n      var template = document.createElement('template');\n      template.innerHTML = `\n          <input type=\"number\" class=\"D2 ts_digit\" name=\"startHours\" id=\"sH\" data-tp=\"1\" min=\"-1\" max=\"100\" value=\"00\" ><span class=\"bds\">:</span>\n          <input type=\"number\" class=\"D2 ts_digit\" name=\"startMinutes\" id=\"sM\" data-tp=\"2\" min=\"-1\" max=\"60\" value=\"00\"><span class=\"bds\">:</span>\n          <input type=\"number\" class=\"D2 ts_digit\" name=\"startSeconds\" id=\"sS\" data-tp=\"3\" min=\"-1\" max=\"60\" value=\"00\"><span class=\"bds\">.</span>\n          <input type=\"number\" class=\"D3 ts_digit\" name=\"startMilliSecs\" id=\"sMS\" data-tp=\"4\" min=\"-10\" max=\"1010\" step=\"10\" value=\"000\">\n          <div id=\"svgContainer\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\"\n              focusable=\"false\" data-prefix=\"fal\" data-icon=\"stopwatch\" class=\"svg-inline--fa fa-stopwatch fa-w-14\"\n              role=\"img\" viewBox=\"0 0 448 512\">\n              <path xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" d=\"M393.9 184l22.6-22.6c4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0l-20.7 20.7c-31.1-27.5-70.4-45.9-113.8-50.8V48h28c6.6 0 12-5.4 12-12V12c0-6.6-5.4-12-12-12H172c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12h28v49.4C96.4 109.3 16 197.2 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-44.7-14.1-86.1-38.1-120zM224 464c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm12-112h-24c-6.6 0-12-5.4-12-12V204c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v136c0 6.6-5.4 12-12 12z\"/>\n            </svg>\n          </div>\n      `\n\n      spanIn.appendChild(template.content)\n      console.log(el);\n\n    });\n\n  }\n\n  // add preceeding 0s when necessary (on update)\n\n  add0s() {\n\n    // hours, minutes, seconds\n    document.querySelectorAll(\"div.timeCase input\").forEach(i => i.addEventListener('change', function () {\n      if (!isNaN(this.value) && this.value.length === 1) {\n        this.value = '0' + this.value;\n      }\n    }));\n\n\n    // milliseconds\n    document.querySelector(\"#sMS\").addEventListener('change', function () {\n      if (!isNaN(this.value) && this.value.length === 2) {\n        this.value = '0' + this.value;\n      }\n    });\n\n  }\n\n\n  // numeric value looping\n\n  addNumberLooping() {\n    // Numeric Value looping (eventually this can be 'parameterised' refactored)\n    // ex. 99 uparrow to 0 hours, 59 uparrow to 0 minutes and seconds, 990 uparrow to 010, downarrow 000 milliseconds\n\n\n    document.querySelector(\"#sH\")\n      .addEventListener('change', function (event) {\n        if (document.querySelector(\"#sH\").value == 100) {\n          document.querySelector(\"#sH\").value = '00';\n        }\n        if (document.querySelector(\"#sH\").value == -1) {\n          document.querySelector(\"#sH\").value = 99;\n        }\n      });\n\n    document.querySelector(\"#sM\")\n      .addEventListener('change', function (event) {\n        if (document.querySelector(\"#sM\").value == 60) {\n          document.querySelector(\"#sM\").value = '00';\n        }\n        if (document.querySelector(\"#sM\").value == -1) {\n          document.querySelector(\"#sM\").value = 59;\n        }\n      });\n\n    document.querySelector(\"#sS\")\n      .addEventListener('change', function (event) {\n        if (document.querySelector(\"#sS\").value == 60) {\n          document.querySelector(\"#sS\").value = '00';\n        }\n        if (document.querySelector(\"#sS\").value == -1) {\n          document.querySelector(\"#sS\").value = 59;\n        }\n      });\n\n    document.querySelector(\"#sMS\")\n      .addEventListener('change', function (event) {\n        if (document.querySelector(\"#sMS\").value == 1000) {\n          document.querySelector(\"#sMS\").value = \"010\";\n        }\n        if (document.querySelector(\"#sMS\").value == -10) {\n          document.querySelector(\"#sMS\").value = 990;\n        }\n        if (document.querySelector(\"#sMS\").value == 0) {\n        }\n      });\n\n  }\n\n\n\n  // arrow key input of values (up/down) and place toggling (left/right)\n  addLeftRightToggle() {\n\n    // Left and Right arrow key toggle between HMSmS\n    // this depends on data-attributes ex. data-tp=\"1\" in the HTML\n\n    document.querySelector(\"div.timeCase\")\n      .addEventListener('keydown', function (event) {\n\n        var tp_active;\n\n        // these help manual testing by posting to the webapge\n        var el_disp = document.querySelector(\"#keyHolder\");\n        el_disp.innerHTML = \"None\";\n\n        switch (true) {\n          case event.key == \"ArrowLeft\":\n            tp_active = document.activeElement.dataset.tp;\n            if (tp_active >= 2) {\n              tp_active--;\n            }\n            document.querySelector(\"[data-tp='\" + tp_active + \"']\").focus();\n            setTimeout(function () { document.querySelector(\"[data-tp='\" + tp_active + \"']\").select(); }, 10);\n            el_disp.innerHTML = event.key;\n            console.log(\"tp_active: \" + tp_active);\n            break;\n\n          case event.key == \"ArrowRight\":\n            tp_active = document.activeElement.dataset.tp;\n            if (tp_active <= 3) {\n              tp_active++;\n            }\n            document.querySelector(\"[data-tp='\" + tp_active + \"']\").focus();\n            setTimeout(function () { document.querySelector(\"[data-tp='\" + tp_active + \"']\").select(); }, 10);\n            el_disp.innerHTML = event.key;\n            console.log(\"tp_active: \" + tp_active)\n            break;\n\n\n          // these keep the input selected\n          case event.key == \"ArrowUp\":\n            el_disp.innerHTML = event.key;\n            setTimeout(function () { document.activeElement.select(); }, 5);\n            break;\n\n          case event.key == \"ArrowDown\":\n            el_disp.innerHTML = event.key;\n            setTimeout(function () { document.activeElement.select(); }, 5);\n            break;\n\n          // this is good for testing, to determine whether a key press is detected\n          case /^([0-9]?)$/.test(event.key):\n            el_disp.innerHTML = event.key;\n            break;\n        }\n      });\n\n  }\n\n  // numeric input (and auto toggling)\n  addNumericInput() {\n\n    // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input\n    // Digit input 0-9  (typed in by user)\n\n    function setInputFilter(textbox, inputFilter) {\n      // this sets a listener and  immediately updates the value of the input number (note: can update this from input text, like by removing setSelectionRange )\n      textbox.addEventListener('keyup', function () {\n        if (/^([0-9]?)$/.test(event.key)) {\n          if (inputFilter(this.value)) {\n            this.oldValue = this.value;\n            this.oldSelectionStart = this.selectionStart;\n            this.oldSelectionEnd = this.selectionEnd;\n          } else if (this.hasOwnProperty(\"oldValue\")) {\n            this.value = this.oldValue;\n            // this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);\n          } else {\n            this.value = \"\";\n          }\n        }\n      });\n    }\n\n\n    // three types of boxes, hours or minutes and seconds (are the same) or milliseconds\n    // \n    setInputFilter(document.getElementById(\"sH\"), function (value) {\n\n\n      var newV = /^([0-9]?|[0-9][0-9]?)$/.test(value);\n\n      console.log(\"value: \" + value);\n\n      if (value.length === 2) {\n        document.getElementById(\"sM\").focus();\n        document.getElementById(\"sM\").select();\n\n      }\n\n      return newV;\n\n    });\n\n\n    setInputFilter(document.getElementById(\"sM\"), function (value) {\n\n\n      var newV = /^([0-9]?|[0-5][0-9]?)$/.test(value);\n\n      console.log(\"value: \" + value);\n\n      if (value > 5 || value.length === 2) {\n        document.getElementById(\"sS\").focus();\n        document.getElementById(\"sS\").select();\n      }\n\n      return newV;\n\n    });\n\n    setInputFilter(document.getElementById(\"sS\"), function (value) {\n\n\n      var newV = /^([0-9]?|[0-5][0-9]?)$/.test(value);\n\n      console.log(\"value: \" + value);\n\n      if (value > 5 || value.length === 2) {\n        document.getElementById(\"sMS\").focus();\n        document.getElementById(\"sMS\").select();\n      }\n\n      return newV;\n\n    });\n\n\n    setInputFilter(document.getElementById(\"sMS\"), function (value) {\n\n\n      var newV = /^([0-9]?|[0-9][0-9]?|[0-9][0-9][0-9]?)$/.test(value);\n\n      console.log(\"value: \" + value);\n\n      if (value.length === 3) {\n        document.getElementById(\"sMS\").blur();\n      }\n\n      return newV;\n\n    });\n\n  }\n\n  // click to activate input of values\n  addClicksToActivate() {\n    document.querySelector(\"#sH\").addEventListener(\"click\", function () { this.select(); });\n    document.querySelector(\"#sM\").addEventListener(\"click\", function () { this.select(); });\n    document.querySelector(\"#sS\").addEventListener(\"click\", function () { this.select(); });\n    document.querySelector(\"#sMS\").addEventListener(\"click\", function () { this.select(); });\n  }\n\n}\n\nwindow.chron = new Chron();\n\n\n\n\n\n//# sourceURL=webpack://chronoBundle/./src/chrono.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/chrono.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});