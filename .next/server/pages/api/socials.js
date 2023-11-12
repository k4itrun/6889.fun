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
exports.id = "pages/api/socials";
exports.ids = ["pages/api/socials"];
exports.modules = {

/***/ "@softwareer/node":
/*!***********************************!*\
  !*** external "@softwareer/node" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@softwareer/node");

/***/ }),

/***/ "(api)/./k4itrun.config.js":
/*!***************************!*\
  !*** ./k4itrun.config.js ***!
  \***************************/
/***/ ((module) => {

eval("\nmodule.exports = {\n    name: \"k4itrun\",\n    version: \"3.0.0\",\n    githubName: \"k4itrun\",\n    githubKey: process.env.GITHUB_KEY,\n    softwareerKey: process.env.SOFTWAREER_KEY,\n    email: \"root@k4itrun.me\",\n    errors: {\n        404: \"This page could not be found.\",\n        500: \"An error occurred while processing your request.\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9rNGl0cnVuLmNvbmZpZy5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBQUE7QUFBQUEsTUFBTSxDQUFDQyxPQUFPLEdBQUc7SUFDYkMsSUFBSSxFQUFFLFNBQVM7SUFDZkMsT0FBTyxFQUFFLE9BQU87SUFDaEJDLFVBQVUsRUFBRSxTQUFTO0lBQ3JCQyxTQUFTLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVO0lBQ2pDQyxhQUFhLEVBQUVILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxjQUFjO0lBQ3pDQyxLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCQyxNQUFNLEVBQUU7QUFDSixXQUFHLEVBQUUsK0JBQStCO0FBQ3BDLFdBQUcsRUFBRSxrREFBa0Q7S0FDMUQ7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3BlcnNvbmFsLXY2Ly4vazRpdHJ1bi5jb25maWcuanM/ZGE3YyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG5hbWU6ICdrNGl0cnVuJyxcclxuICAgIHZlcnNpb246ICczLjAuMCcsXHJcbiAgICBnaXRodWJOYW1lOiAnazRpdHJ1bicsXHJcbiAgICBnaXRodWJLZXk6IHByb2Nlc3MuZW52LkdJVEhVQl9LRVksXHJcbiAgICBzb2Z0d2FyZWVyS2V5OiBwcm9jZXNzLmVudi5TT0ZUV0FSRUVSX0tFWSxcclxuICAgIGVtYWlsOiAncm9vdEBrNGl0cnVuLm1lJyxcclxuICAgIGVycm9yczoge1xyXG4gICAgICAgIDQwNDogXCJUaGlzIHBhZ2UgY291bGQgbm90IGJlIGZvdW5kLlwiLFxyXG4gICAgICAgIDUwMDogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nIHlvdXIgcmVxdWVzdC5cIlxyXG4gICAgfVxyXG59IFxyXG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm5hbWUiLCJ2ZXJzaW9uIiwiZ2l0aHViTmFtZSIsImdpdGh1YktleSIsInByb2Nlc3MiLCJlbnYiLCJHSVRIVUJfS0VZIiwic29mdHdhcmVlcktleSIsIlNPRlRXQVJFRVJfS0VZIiwiZW1haWwiLCJlcnJvcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./k4itrun.config.js\n");

/***/ }),

/***/ "(api)/./src/libraries/softwareer.node.js":
/*!******************************************!*\
  !*** ./src/libraries/softwareer.node.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst k4itrunConfig = __webpack_require__(/*! ../../k4itrun.config */ \"(api)/./k4itrun.config.js\");\nconst { Softwareer  } = __webpack_require__(/*! @softwareer/node */ \"@softwareer/node\");\nconst softwareer = new Softwareer(k4itrunConfig.softwareerKey);\nmodule.exports = softwareer;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbGlicmFyaWVzL3NvZnR3YXJlZXIubm9kZS5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQU1BLGFBQWEsR0FBR0MsbUJBQU8sQ0FBQyx1REFBc0IsQ0FBQztBQUNyRCxNQUFNLEVBQUVDLFVBQVUsR0FBRSxHQUFHRCxtQkFBTyxDQUFDLDBDQUFrQixDQUFDO0FBQ2xELE1BQU1FLFVBQVUsR0FBRyxJQUFJRCxVQUFVLENBQUNGLGFBQWEsQ0FBQ0ksYUFBYSxDQUFDO0FBRTlEQyxNQUFNLENBQUNDLE9BQU8sR0FBR0gsVUFBVSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGVyc29uYWwtdjYvLi9zcmMvbGlicmFyaWVzL3NvZnR3YXJlZXIubm9kZS5qcz8wNGU4Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGs0aXRydW5Db25maWcgPSByZXF1aXJlKCcuLi8uLi9rNGl0cnVuLmNvbmZpZycpO1xyXG5jb25zdCB7IFNvZnR3YXJlZXIgfSA9IHJlcXVpcmUoJ0Bzb2Z0d2FyZWVyL25vZGUnKTtcclxuY29uc3Qgc29mdHdhcmVlciA9IG5ldyBTb2Z0d2FyZWVyKGs0aXRydW5Db25maWcuc29mdHdhcmVlcktleSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNvZnR3YXJlZXI7Il0sIm5hbWVzIjpbIms0aXRydW5Db25maWciLCJyZXF1aXJlIiwiU29mdHdhcmVlciIsInNvZnR3YXJlZXIiLCJzb2Z0d2FyZWVyS2V5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/libraries/softwareer.node.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/socials.js":
/*!**********************************!*\
  !*** ./src/pages/api/socials.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Softwareer = __webpack_require__(/*! libraries/softwareer.node */ \"(api)/./src/libraries/softwareer.node.js\");\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res)=>{\n    Softwareer.getSocials().then((profile)=>{\n        res.status(200).json({\n            success: true,\n            message: null,\n            data: profile\n        });\n    }).catch((error)=>{\n        res.status(500).json({\n            success: false,\n            message: \"Something went wrong\",\n            data: null\n        });\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3NvY2lhbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVUsR0FBR0MsbUJBQU8sQ0FBQywyRUFBMkIsQ0FBQztBQUV2RCxpRUFBZSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsR0FBSztJQUN6QkgsVUFBVSxDQUFDSSxVQUFVLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLENBQUNDLE9BQU8sR0FBSztRQUN0Q0gsR0FBRyxDQUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUNqQkMsT0FBTyxFQUFFLElBQUk7WUFDYkMsT0FBTyxFQUFFLElBQUk7WUFDYkMsSUFBSSxFQUFFTCxPQUFPO1NBQ2hCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDTSxLQUFLLENBQUMsQ0FBQ0MsS0FBSyxHQUFLO1FBQ2hCVixHQUFHLENBQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQ2pCQyxPQUFPLEVBQUUsS0FBSztZQUNkQyxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CQyxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGVyc29uYWwtdjYvLi9zcmMvcGFnZXMvYXBpL3NvY2lhbHMuanM/NWI5MyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTb2Z0d2FyZWVyID0gcmVxdWlyZSgnbGlicmFyaWVzL3NvZnR3YXJlZXIubm9kZScpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBTb2Z0d2FyZWVyLmdldFNvY2lhbHMoKS50aGVuKChwcm9maWxlKSA9PiB7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBudWxsLFxyXG4gICAgICAgICAgICBkYXRhOiBwcm9maWxlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59OyJdLCJuYW1lcyI6WyJTb2Z0d2FyZWVyIiwicmVxdWlyZSIsInJlcSIsInJlcyIsImdldFNvY2lhbHMiLCJ0aGVuIiwicHJvZmlsZSIsInN0YXR1cyIsImpzb24iLCJzdWNjZXNzIiwibWVzc2FnZSIsImRhdGEiLCJjYXRjaCIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/socials.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/socials.js"));
module.exports = __webpack_exports__;

})();