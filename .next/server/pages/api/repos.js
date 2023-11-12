"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/repos";
exports.ids = ["pages/api/repos"];
exports.modules = {

/***/ "(api)/./k4itrun.config.js":
/*!***************************!*\
  !*** ./k4itrun.config.js ***!
  \***************************/
/***/ ((module) => {

eval("\nmodule.exports = {\n    name: \"k4itrun\",\n    version: \"3.0.0\",\n    githubName: \"k4itrun\",\n    githubKey: process.env.GITHUB_KEY,\n    softwareerKey: process.env.SOFTWAREER_KEY,\n    email: \"root@k4itrun.me\",\n    errors: {\n        404: \"This page could not be found.\",\n        500: \"An error occurred while processing your request.\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9rNGl0cnVuLmNvbmZpZy5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBQUE7QUFBQUEsTUFBTSxDQUFDQyxPQUFPLEdBQUc7SUFDYkMsSUFBSSxFQUFFLFNBQVM7SUFDZkMsT0FBTyxFQUFFLE9BQU87SUFDaEJDLFVBQVUsRUFBRSxTQUFTO0lBQ3JCQyxTQUFTLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVO0lBQ2pDQyxhQUFhLEVBQUVILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxjQUFjO0lBQ3pDQyxLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCQyxNQUFNLEVBQUU7QUFDSixXQUFHLEVBQUUsK0JBQStCO0FBQ3BDLFdBQUcsRUFBRSxrREFBa0Q7S0FDMUQ7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3BlcnNvbmFsLXY2Ly4vazRpdHJ1bi5jb25maWcuanM/ZGE3YyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG5hbWU6ICdrNGl0cnVuJyxcclxuICAgIHZlcnNpb246ICczLjAuMCcsXHJcbiAgICBnaXRodWJOYW1lOiAnazRpdHJ1bicsXHJcbiAgICBnaXRodWJLZXk6IHByb2Nlc3MuZW52LkdJVEhVQl9LRVksXHJcbiAgICBzb2Z0d2FyZWVyS2V5OiBwcm9jZXNzLmVudi5TT0ZUV0FSRUVSX0tFWSxcclxuICAgIGVtYWlsOiAncm9vdEBrNGl0cnVuLm1lJyxcclxuICAgIGVycm9yczoge1xyXG4gICAgICAgIDQwNDogXCJUaGlzIHBhZ2UgY291bGQgbm90IGJlIGZvdW5kLlwiLFxyXG4gICAgICAgIDUwMDogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nIHlvdXIgcmVxdWVzdC5cIlxyXG4gICAgfVxyXG59IFxyXG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm5hbWUiLCJ2ZXJzaW9uIiwiZ2l0aHViTmFtZSIsImdpdGh1YktleSIsInByb2Nlc3MiLCJlbnYiLCJHSVRIVUJfS0VZIiwic29mdHdhcmVlcktleSIsIlNPRlRXQVJFRVJfS0VZIiwiZW1haWwiLCJlcnJvcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./k4itrun.config.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/repos.js":
/*!********************************!*\
  !*** ./src/pages/api/repos.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _k4itrun_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../k4itrun.config */ \"(api)/./k4itrun.config.js\");\n/* harmony import */ var _k4itrun_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_k4itrun_config__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    let _ = await (await fetch(\"https://api.github.com/users/\" + (_k4itrun_config__WEBPACK_IMPORTED_MODULE_0___default().githubName) + \"/repos\", {\n        headers: {\n            Authorization: \"token \" + (_k4itrun_config__WEBPACK_IMPORTED_MODULE_0___default().githubKey)\n        }\n    })).json();\n    try {\n        res.send({\n            success: true,\n            data: [\n                ..._\n            ]\n        });\n    } catch  {\n        res.status(500).send({\n            success: false,\n            data: []\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3JlcG9zLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFvRDtBQUVwRCxpRUFBZSxPQUFPQyxHQUFHLEVBQUVDLEdBQUcsR0FBSztJQUMvQixJQUFJQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU1DLEtBQUssQ0FBQywrQkFBK0IsR0FBR0osbUVBQXdCLEdBQUcsUUFBUSxFQUFFO1FBQzlGTSxPQUFPLEVBQUU7WUFDTEMsYUFBYSxFQUFFLFFBQVEsR0FBRVAsa0VBQXVCO1NBQ25EO0tBQ0osQ0FBQyxDQUFDLENBQUNTLElBQUksRUFBRTtJQUVWLElBQUk7UUFDQVAsR0FBRyxDQUFDUSxJQUFJLENBQUM7WUFDTEMsT0FBTyxFQUFFLElBQUk7WUFDYkMsSUFBSSxFQUFFO21CQUFJVCxDQUFDO2FBQUM7U0FDZixDQUFDO0lBQ04sRUFBRSxPQUFNO1FBQ0pELEdBQUcsQ0FBQ1csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDSCxJQUFJLENBQUM7WUFDakJDLE9BQU8sRUFBRSxLQUFLO1lBQ2RDLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXJzb25hbC12Ni8uL3NyYy9wYWdlcy9hcGkvcmVwb3MuanM/NTE4MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgazRpdHJ1bkNvbmZpZyBmcm9tIFwiLi4vLi4vLi4vazRpdHJ1bi5jb25maWdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgbGV0IF8gPSBhd2FpdCAoYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJyArIGs0aXRydW5Db25maWcuZ2l0aHViTmFtZSArICcvcmVwb3MnLCB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiAndG9rZW4gJysgazRpdHJ1bkNvbmZpZy5naXRodWJLZXlcclxuICAgICAgICB9XHJcbiAgICB9KSkuanNvbigpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmVzLnNlbmQoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBbLi4uX11cclxuICAgICAgICB9KVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZGF0YTogW11cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJrNGl0cnVuQ29uZmlnIiwicmVxIiwicmVzIiwiXyIsImZldGNoIiwiZ2l0aHViTmFtZSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZ2l0aHViS2V5IiwianNvbiIsInNlbmQiLCJzdWNjZXNzIiwiZGF0YSIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/repos.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/repos.js"));
module.exports = __webpack_exports__;

})();