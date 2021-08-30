/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const apiUrl = 'http://localhost:3000/api/cameras/';\r\n\r\n//Get product data from server, store string into myProducts//\r\nconst getData = async () => {\r\n    let response = await fetch(apiUrl);\r\n    let jsonData = await response.json();\r\n    return jsonData;\r\n}\r\n\r\n// For each product in myProducts, create one card//\r\nconst displayProducts = async() => {\r\n    try {\r\n        const myProducts = await getData();\r\n        const divProducts   = document.getElementById('divProducts');\r\n        for (let product of myProducts) {\r\n            const productPrice  = `€ ${(Number(product.price/100).toFixed(2))}`;\r\n            const productHtml   = `\r\n            <li class=\"col-6\">\r\n                <div class=\"card border-light\">\r\n                    <img class=\"card-img-top\" src=\"${product.imageUrl}\" alt=\"\">\r\n                    <div class=\"card-body px-0\">\r\n                        <a class=\"text-decoration-none text-dark stretched-link\" href=\"./pages/product.html?id=${product._id}\">\r\n                            <h3 id=\"productTitle\" class=\"card-title h6 mb-1\">\r\n                                ${product.name}\r\n                            </h3>\r\n                        </a>\r\n                        <p id=\"productPrice\" class=\"card-text\">\r\n                            ${productPrice}\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </li>`\r\n            divProducts.innerHTML += productHtml;\r\n        }\r\n    } catch(error) {\r\n        window.alert(error);\r\n        console.log(error);\r\n    }\r\n}\r\n\r\ndisplayProducts();\n\n//# sourceURL=webpack://ChingYaoTseng_5_20042021/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;