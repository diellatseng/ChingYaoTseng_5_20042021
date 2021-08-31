/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/variables */ \"./src/utils/variables.js\");\n/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/functions */ \"./src/utils/functions.js\");\n/* harmony import */ var _components_btnRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/btnRemove */ \"./src/components/btnRemove.js\");\n\r\n\r\n\r\n\r\nlet cartElement;\r\n\r\n//If sessionStorage is empty, display an empty cart, else display items into cart.\r\nif (_utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage == null || _utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage == '') {\r\n    displayEmptyCart();\r\n} else {\r\n    cartElement = addToCart();\r\n\r\n    //Use session storage data to generate html\r\n    function addToCart() {\r\n        //Total sum of items added into cart, this will always be displayed at the end of the list.\r\n        let html = `\r\n            <li class=\"list-group-item d-flex justify-content-between order-last\">\r\n                <p class=\"mb-0\">Total (EUR)</p>\r\n                <p id=\"sum\" class=\"mb-0\"></p>\r\n            </li>`;\r\n        \r\n        //Generating list item html from data stored in sessionStorage\r\n        for (let i = 0; i < _utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage.length; i++) {\r\n            html += `\r\n            <li class=\"list-group-item border-top\">\r\n                <div class=\"row py-2\">\r\n                    <div class=\"col-4 col-md-3\">\r\n                        <img class=\"img-fluid\" src=\"${_utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage[i].imageUrl}\" alt=\"\">\r\n                    </div>\r\n                    <div class=\"col-8 col-md-9\">\r\n                        <h3 class=\"name h5 mb-0\">${_utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage[i].name}</h3>\r\n                        <small class=\"text-break text-muted\">Lense chosen: ${_utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage[i].lense}</small>\r\n                        <p class=\"price mt-2\">€ ${(Number(_utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage[i].price/100).toFixed(2))}</p>\r\n                    </div>\r\n                    <div class=\"d-inline text-end\">\r\n                        <button type=\"button\" class=\"btn btn-danger\">supprimer</button>\r\n                    </div>\r\n                </div>\r\n            </li>`;\r\n        }\r\n        console.log('Cart list html ready.')\r\n        return html;\r\n    }\r\n\r\n    //Execute the following codes when the page is fully loaded (cart list html fully generated)\r\n    window.addEventListener('load', () => {\r\n        function displayCart(){\r\n            document.getElementById('myCart').innerHTML = cartElement;\r\n            console.log('Cart list displayed.')\r\n        }\r\n        displayCart();\r\n        listenToRemoveButton();\r\n        (0,_utils_functions__WEBPACK_IMPORTED_MODULE_1__.updateSum)();\r\n        (0,_utils_functions__WEBPACK_IMPORTED_MODULE_1__.updateTotalNumberOfItems)()\r\n    });\r\n}\r\n\r\n//Display an empty cart when sessionStorage is empty\r\nfunction displayEmptyCart() {\r\n    cartElement= ` \r\n    <li class=\"list-group-item text-center\">\r\n    <p class=\"mb-0 py-4 text-muted\">Oups ! Vous n'avez aucun article dans votre panier.</p>\r\n    <p id=\"sum\" class=\"mb-0\"></p>\r\n    </li>`;\r\n    document.getElementById('myCart').innerHTML = cartElement; //Insert html into DOM\r\n    document.getElementById('totalNumberOfItems').textContent = 0; //Inser \"0\" into \"Panier()\"\r\n    console.log('Empty cart displayed.');\r\n\r\n    disableConfirmButton();\r\n}\r\n\r\n//Disable confirm button when cart is empty\r\nfunction disableConfirmButton() {\r\n    document.getElementById('btnConfirmOrder').classList.add('disabled') //disable confirm order button\r\n    console.log('Confirm button disabled');\r\n}\r\n\r\n//Listening to remove button\r\nfunction listenToRemoveButton() {\r\n    const btnRemove = document.getElementsByClassName('btn-danger');\r\n    for(let i = 0; i < btnRemove.length; i++) {\r\n        let btn = btnRemove[i];\r\n        btn.addEventListener('click', (event) => (0,_components_btnRemove__WEBPACK_IMPORTED_MODULE_2__.default)(event));\r\n    }\r\n    console.log('Listening to remove button...');\r\n}\r\n\r\nconst myForm = document.getElementById('myForm');\r\nlet orderId;\r\n\r\n//Listening to confirm order button\r\nmyForm.addEventListener('submit', function(e) {\r\n    e.preventDefault(); //Prevent default action when button is clicked \r\n    getData();\r\n});\r\n\r\n// Send request to API and get response from server\r\nconst getData = async () => {\r\n    //Take user inputs in form and convert them into an array of objects\r\n    const contact = Array.from(document.querySelectorAll('#myForm input')).reduce((acc, input) => ({\r\n        ...acc, [input.id]:input.value})\r\n        , []);\r\n    console.log('Contact data get.');\r\n    \r\n    //Take id of each product and combine them into a string\r\n    const products = _utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage.reduce((products, product)=> {\r\n        products.push(product.id);\r\n        return products;  // is return causing jumping out of codes? \r\n    }, []);\r\n    console.log('Product IDs get.');\r\n    \r\n    //Conbine contact and products into an array of objects\r\n    const request = {contact, products};\r\n    console.log('Sending request...')\r\n    const response = await fetch('http://localhost:3000/api/cameras/order', {\r\n        method : 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify(request)\r\n    });\r\n    const jsonData = await response.json();\r\n    orderId = jsonData.orderId;\r\n    console.log(`Request sent successful. Server response: Order ID ${orderId}`);\r\n    \r\n    // Remove current sessionStorage (products)\r\n    sessionStorage.removeItem('products');\r\n    console.log(`sessionStorage: \"products\" removed.`);\r\n    \r\n    // Save order Id into sessionStorage\r\n    sessionStorage.setItem('orderId', orderId);\r\n    console.log(`sessionStorage: \"orderId\" added.`);\r\n\r\n    // Redirect to Thank You page\r\n    console.log('Redirecting to Thank You page.')\r\n    location.href = \"thankyou.html\"; \r\n}\n\n//# sourceURL=webpack://ChingYaoTseng_5_20042021/./src/cart.js?");

/***/ }),

/***/ "./src/components/btnRemove.js":
/*!*************************************!*\
  !*** ./src/components/btnRemove.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ removeItem)\n/* harmony export */ });\n/* harmony import */ var _utils_variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/variables */ \"./src/utils/variables.js\");\n/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/functions */ \"./src/utils/functions.js\");\n\r\n\r\n\r\nfunction removeItem(event) {\r\n    const btnClicked = event.target;\r\n    const productElement = btnClicked.parentElement.previousElementSibling;\r\n    const name = productElement.getElementsByClassName('name')[0].textContent; //Get name of item\r\n    const positionOfItemClicked = _utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage.map(x => x.name).indexOf(name); //Find position of this item in 'dataInSessionStorage'\r\n    _utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage.splice(positionOfItemClicked, 1); //Remove this item from string 'dataInSessionStorage'\r\n    sessionStorage.setItem('products', JSON.stringify(_utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage)); //Update sessionStorage after removing this item\r\n    productElement.parentElement.parentElement.remove(); //Remove element from DOM\r\n    if(_utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage.length == 0) disableConfirmButton(); //Disable confirm button if the last item in cart is removed\r\n\r\n    (0,_utils_functions__WEBPACK_IMPORTED_MODULE_1__.updateSum)();\r\n    (0,_utils_functions__WEBPACK_IMPORTED_MODULE_1__.updateTotalNumberOfItems)();\r\n}\n\n//# sourceURL=webpack://ChingYaoTseng_5_20042021/./src/components/btnRemove.js?");

/***/ }),

/***/ "./src/utils/functions.js":
/*!********************************!*\
  !*** ./src/utils/functions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updateSum\": () => (/* binding */ updateSum),\n/* harmony export */   \"updateTotalNumberOfItems\": () => (/* binding */ updateTotalNumberOfItems)\n/* harmony export */ });\n/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables */ \"./src/utils/variables.js\");\n\r\n\r\n//Update sum whenever cart item is added/removed\r\nfunction updateSum() {\r\n    const sum = _variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage.reduce((total, item) => {\r\n        return total + item.price;\r\n      }, 0);\r\n    document.getElementById('sum').innerHTML = `<strong>€ ${(Number(sum/100).toFixed(2))}</strong>`;\r\n    console.log('Sum updated.');\r\n}\r\n        \r\n//Display total number of items that are added to cart\r\nfunction updateTotalNumberOfItems() {\r\n    document.getElementById('totalNumberOfItems').textContent = _variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage.length;\r\n    console.log('Total number of items updated.')\r\n}\n\n//# sourceURL=webpack://ChingYaoTseng_5_20042021/./src/utils/functions.js?");

/***/ }),

/***/ "./src/utils/variables.js":
/*!********************************!*\
  !*** ./src/utils/variables.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dataInSessionStorage\": () => (/* binding */ dataInSessionStorage)\n/* harmony export */ });\nconst dataInSessionStorage = JSON.parse(sessionStorage.getItem('products')); // Get data saved in sessionStorage\n\n//# sourceURL=webpack://ChingYaoTseng_5_20042021/./src/utils/variables.js?");

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
/******/ 			// no module.id needed
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/cart.js");
/******/ 	
/******/ })()
;