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

/***/ "./src/product.js":
/*!************************!*\
  !*** ./src/product.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/variables */ \"./src/utils/variables.js\");\n\r\n\r\nconst productId = getProductId();\r\nlet myProducts;\r\n\r\n//Get product id from url//\r\nfunction getProductId() {\r\n    return new URL(window.location.href).searchParams.get('id');\r\n}\r\n\r\n// Fetch product data from server//\r\nconst getData = async () => {\r\n    const response = await fetch(`http://localhost:3000/api/cameras/${productId}`);\r\n    const jsonData = await response.json();\r\n    return jsonData;\r\n}\r\n\r\n// Display product information using data saved in myProducts//\r\nconst displayProducts = async() => {\r\n    try {\r\n        myProducts = await getData();\r\n        //Display title according to product name //\r\n        document.getElementById('title')\r\n                .textContent = `Produit | ${myProducts.name} - Orinoco France`;\r\n    \r\n        //Display product image //\r\n        document.getElementById(\"productImage\")\r\n                .innerHTML = `<img class=\"img-fluid\" src=\"${myProducts.imageUrl}\" alt=\"\">`;\r\n    \r\n        //Display product name //                \r\n        document.getElementById('productName')\r\n                .textContent = myProducts.name;\r\n        \r\n        //Display product price //\r\n        document.getElementById('productPrice')\r\n                .textContent += `€ ${(Number(myProducts.price/100).toFixed(2))}`;\r\n        \r\n        //Display product description //\r\n        document.getElementById('description')\r\n                .textContent = myProducts.description;\r\n    \r\n        //Display product lenses into option values //\r\n        const lenses = myProducts.lenses;\r\n        let lenseHtml = '<option>Choisissez votre lentille</option>'; //Adding default option to lense list\r\n        for (let lense of lenses) {\r\n            lenseHtml += `<option>${lense}</option>`;\r\n        }\r\n        document.getElementById('lenses')\r\n                .innerHTML = lenseHtml;\r\n    } catch(error) {\r\n        window.alert(error);\r\n        console.log(error);\r\n    }\r\n};\r\n\r\n//Execute the following after page fully loaded\r\nlet lenseSeleted = '';\r\nlet products = [];\r\n\r\nwindow.addEventListener('load', () => {\r\n    console.log('[ Page is fully loaded ]');\r\n    \r\n    // Listen to lense change\r\n    const lenseList = document.getElementById('lenses');\r\n    lenseList.addEventListener('change', (e) => {\r\n        lenseSeleted = e.target.options[e.target.selectedIndex].text;\r\n        console.log(`[ Lense changed: ${lenseSeleted} ]`);\r\n    });\r\n    console.log('...Listening to lense change');\r\n\r\n    //Listen to \"Add to cart\" button\r\n    document.getElementById('btnAddToCart').addEventListener('click', addToCart);\r\n    console.log('...Listening to \"Add to cart\"');\r\n    \r\n    //Save lense and product data in sessionStorage\r\n    function addToCart() {\r\n        if(lenseSeleted == '') { //Check if lense is seleted\r\n            window.alert('Veuillez sélectionner une autre lentille.');\r\n            console.log(\"Button clicked, user needs to select a lense to proceed.\");\r\n        } else {\r\n            console.log('...Checking data in sessionStorage');\r\n            const productSaved = JSON.parse(sessionStorage.getItem('products')) || [];  //if productSaved not provided, default to []\r\n\r\n            products = [\r\n                ...productSaved, \r\n                {\r\n                id: myProducts._id,\r\n                name: myProducts.name,\r\n                price: myProducts.price,\r\n                imageUrl: myProducts.imageUrl,\r\n                lense: lenseSeleted\r\n            }];\r\n\r\n            if (productSaved == '') { // If cart is empty, add item\r\n                addItem();\r\n            } else { // Check if item already exist in cart\r\n                checkCart();\r\n            }\r\n        }\r\n    }\r\n  });\r\n\r\n// Add item into cart\r\nfunction addItem() {\r\n    sessionStorage.setItem('products', JSON.stringify(products));\r\n    console.log(`[ Product saved ! ]`);\r\n    //Go to cart.html\r\n    console.log(\"Button clicked!\");\r\n    location.href = \"../pages/cart.html\"; \r\n}\r\n\r\n// Check if item has already been added to cart\r\nfunction checkCart() {\r\n    const result = _utils_variables__WEBPACK_IMPORTED_MODULE_0__.dataInSessionStorage.filter(checkItem = (object) => { // Filter array dataInSessionStorage\r\n        return object.id === myProducts._id && object.lense === lenseSeleted; // Find an object that matches incoming product id and incoming lense at the same time, return object found\r\n    });\r\n    if(result == ''){ \r\n        addItem(); // If retruned object is not defined, add item to cart\r\n    } else { \r\n        window.alert('Ce produit est déjà dans votre panier. Veuillez sélectionner une autre lentille ou rechercher un autre produit.'); // If returned object is found, alert user\r\n    }\r\n}\r\n\r\ndisplayProducts();\n\n//# sourceURL=webpack://ChingYaoTseng_5_20042021/./src/product.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/product.js");
/******/ 	
/******/ })()
;