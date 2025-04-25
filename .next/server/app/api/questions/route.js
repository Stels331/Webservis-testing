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
exports.id = "app/api/questions/route";
exports.ids = ["app/api/questions/route"];
exports.modules = {

/***/ "(rsc)/./app/api/questions/route.ts":
/*!************************************!*\
  !*** ./app/api/questions/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_google_sheets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/google-sheets */ \"(rsc)/./lib/google-sheets.ts\");\n/* harmony import */ var _lib_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/settings */ \"(rsc)/./lib/settings.ts\");\n\n\n\nasync function GET(request) {\n    try {\n        // Получаем токен из запроса\n        const url = new URL(request.url);\n        const token = url.searchParams.get(\"token\");\n        // Проверяем токен\n        if (!token || !(0,_lib_settings__WEBPACK_IMPORTED_MODULE_2__.validateAccessToken)(token)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid access token\"\n            }, {\n                status: 401\n            });\n        }\n        // Получаем настройки\n        const settings = (0,_lib_settings__WEBPACK_IMPORTED_MODULE_2__.getSettings)();\n        // Проверяем наличие ID таблицы с вопросами\n        if (!settings.questionsSheetId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Questions sheet ID not configured\"\n            }, {\n                status: 400\n            });\n        }\n        // Получаем вопросы из таблицы\n        const questions = await (0,_lib_google_sheets__WEBPACK_IMPORTED_MODULE_1__.getQuestionsFromSheet)(settings.questionsSheetId);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            questions\n        });\n    } catch (error) {\n        console.error(\"Error getting questions:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to get questions\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3F1ZXN0aW9ucy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTBDO0FBQ2lCO0FBQ007QUFFMUQsZUFBZUksSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLDRCQUE0QjtRQUM1QixNQUFNQyxNQUFNLElBQUlDLElBQUlGLFFBQVFDLEdBQUc7UUFDL0IsTUFBTUUsUUFBUUYsSUFBSUcsWUFBWSxDQUFDQyxHQUFHLENBQUM7UUFFbkMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQ0YsU0FBUyxDQUFDTCxrRUFBbUJBLENBQUNLLFFBQVE7WUFDekMsT0FBT1IscURBQVlBLENBQUNXLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUF1QixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDNUU7UUFFQSxxQkFBcUI7UUFDckIsTUFBTUMsV0FBV1osMERBQVdBO1FBRTVCLDJDQUEyQztRQUMzQyxJQUFJLENBQUNZLFNBQVNDLGdCQUFnQixFQUFFO1lBQzlCLE9BQU9mLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBb0MsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3pGO1FBRUEsOEJBQThCO1FBQzlCLE1BQU1HLFlBQVksTUFBTWYseUVBQXFCQSxDQUFDYSxTQUFTQyxnQkFBZ0I7UUFFdkUsT0FBT2YscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFSztRQUFVO0lBQ3ZDLEVBQUUsT0FBT0osT0FBTztRQUNkSyxRQUFRTCxLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPWixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMEIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDL0U7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3N0YXMvRG9jdW1lbnRzL3dlYi10ZXN0aW5nLXNlcnZpY2UvYXBwL2FwaS9xdWVzdGlvbnMvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCB7IGdldFF1ZXN0aW9uc0Zyb21TaGVldCB9IGZyb20gXCJAL2xpYi9nb29nbGUtc2hlZXRzXCJcbmltcG9ydCB7IGdldFNldHRpbmdzLCB2YWxpZGF0ZUFjY2Vzc1Rva2VuIH0gZnJvbSBcIkAvbGliL3NldHRpbmdzXCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8g0J/QvtC70YPRh9Cw0LXQvCDRgtC+0LrQtdC9INC40Lcg0LfQsNC/0YDQvtGB0LBcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsKVxuICAgIGNvbnN0IHRva2VuID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0b2tlblwiKVxuXG4gICAgLy8g0J/RgNC+0LLQtdGA0Y/QtdC8INGC0L7QutC10L1cbiAgICBpZiAoIXRva2VuIHx8ICF2YWxpZGF0ZUFjY2Vzc1Rva2VuKHRva2VuKSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW52YWxpZCBhY2Nlc3MgdG9rZW5cIiB9LCB7IHN0YXR1czogNDAxIH0pXG4gICAgfVxuXG4gICAgLy8g0J/QvtC70YPRh9Cw0LXQvCDQvdCw0YHRgtGA0L7QudC60LhcbiAgICBjb25zdCBzZXR0aW5ncyA9IGdldFNldHRpbmdzKClcblxuICAgIC8vINCf0YDQvtCy0LXRgNGP0LXQvCDQvdCw0LvQuNGH0LjQtSBJRCDRgtCw0LHQu9C40YbRiyDRgSDQstC+0L/RgNC+0YHQsNC80LhcbiAgICBpZiAoIXNldHRpbmdzLnF1ZXN0aW9uc1NoZWV0SWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlF1ZXN0aW9ucyBzaGVldCBJRCBub3QgY29uZmlndXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICAvLyDQn9C+0LvRg9GH0LDQtdC8INCy0L7Qv9GA0L7RgdGLINC40Lcg0YLQsNCx0LvQuNGG0YtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCBnZXRRdWVzdGlvbnNGcm9tU2hlZXQoc2V0dGluZ3MucXVlc3Rpb25zU2hlZXRJZClcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHF1ZXN0aW9ucyB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZXR0aW5nIHF1ZXN0aW9uczpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGdldCBxdWVzdGlvbnNcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRRdWVzdGlvbnNGcm9tU2hlZXQiLCJnZXRTZXR0aW5ncyIsInZhbGlkYXRlQWNjZXNzVG9rZW4iLCJHRVQiLCJyZXF1ZXN0IiwidXJsIiwiVVJMIiwidG9rZW4iLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJzZXR0aW5ncyIsInF1ZXN0aW9uc1NoZWV0SWQiLCJxdWVzdGlvbnMiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/questions/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/google-sheets.ts":
/*!******************************!*\
  !*** ./lib/google-sheets.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAuthenticatedClient: () => (/* binding */ getAuthenticatedClient),\n/* harmony export */   getQuestionsFromSheet: () => (/* binding */ getQuestionsFromSheet),\n/* harmony export */   saveUserAnswersToSheet: () => (/* binding */ saveUserAnswersToSheet)\n/* harmony export */ });\n/* harmony import */ var google_spreadsheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! google-spreadsheet */ \"(rsc)/./node_modules/google-spreadsheet/dist/index.mjs\");\n/* harmony import */ var google_auth_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! google-auth-library */ \"(rsc)/./node_modules/google-auth-library/build/src/index.js\");\n\n\n// 🔐 Авторизация в Google Sheets через сервисный аккаунт\nasync function getAuthenticatedClient(sheetId) {\n    try {\n        const serviceAccountAuth = new google_auth_library__WEBPACK_IMPORTED_MODULE_1__.JWT({\n            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,\n            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, \"\\n\"),\n            scopes: [\n                \"https://www.googleapis.com/auth/spreadsheets\"\n            ]\n        });\n        const doc = new google_spreadsheet__WEBPACK_IMPORTED_MODULE_0__.GoogleSpreadsheet(sheetId, serviceAccountAuth);\n        await doc.loadInfo();\n        return doc;\n    } catch (error) {\n        console.error(\"Error authenticating with Google Sheets:\", error);\n        throw new Error(\"Не удалось подключиться к Google Sheets\");\n    }\n}\n// 📥 Получение вопросов из таблицы\nasync function getQuestionsFromSheet(sheetId) {\n    try {\n        const doc = await getAuthenticatedClient(sheetId);\n        const sheet = doc.sheetsByIndex[0];\n        const rows = await sheet.getRows();\n        const questions = [];\n        for (const row of rows){\n            const rowData = row.toObject();\n            const text = rowData[\"Question\"] || \"\";\n            const options = [\n                rowData[\"Option A\"],\n                rowData[\"Option B\"],\n                rowData[\"Option C\"],\n                rowData[\"Option D\"]\n            ].filter((option)=>!!option);\n            if (text && options.length > 0) {\n                questions.push({\n                    number: questions.length + 1,\n                    text,\n                    options\n                });\n            }\n        }\n        return questions.sort((a, b)=>a.number - b.number);\n    } catch (error) {\n        console.error(\"Error fetching questions from Google Sheets:\", error);\n        throw new Error(\"Не удалось получить вопросы из Google Sheets\");\n    }\n}\n// 📤 Сохранение ответов пользователя в таблицу\nasync function saveUserAnswersToSheet(sheetId, userName, answers) {\n    try {\n        const doc = await getAuthenticatedClient(sheetId);\n        const sheet = doc.sheetsByTitle[\"Лист2\"] // <- укажи свой лист здесь\n        ;\n        await sheet.loadCells();\n        const headerRow = await sheet.getRows({\n            limit: 1\n        });\n        const nextColumnIndex = headerRow.length > 0 ? Object.keys(headerRow[0].toObject()).length : 1;\n        sheet.getCell(0, nextColumnIndex).value = userName;\n        for (const answer of answers){\n            const cell = sheet.getCell(answer.questionNumber, nextColumnIndex);\n            cell.value = answer.selectedOption;\n        }\n        await sheet.saveUpdatedCells();\n    } catch (error) {\n        console.error(\"Error saving answers to Google Sheets:\", error);\n        throw new Error(\"Не удалось сохранить ответы в Google Sheets\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cy9zdGFzL0RvY3VtZW50cy93ZWItdGVzdGluZy1zZXJ2aWNlL2xpYi9nb29nbGUtc2hlZXRzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdvb2dsZVNwcmVhZHNoZWV0IH0gZnJvbSBcImdvb2dsZS1zcHJlYWRzaGVldFwiXG5pbXBvcnQgeyBKV1QgfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiXG5cbi8vINCi0LjQv9GLINC00LDQvdC90YvRhVxuZXhwb3J0IHR5cGUgUXVlc3Rpb24gPSB7XG4gIG51bWJlcjogbnVtYmVyXG4gIHRleHQ6IHN0cmluZ1xuICBvcHRpb25zOiBzdHJpbmdbXVxufVxuXG5leHBvcnQgdHlwZSBVc2VyQW5zd2VyID0ge1xuICBxdWVzdGlvbk51bWJlcjogbnVtYmVyXG4gIHNlbGVjdGVkT3B0aW9uOiBzdHJpbmdcbn1cblxuLy8g8J+UkCDQkNCy0YLQvtGA0LjQt9Cw0YbQuNGPINCyIEdvb2dsZSBTaGVldHMg0YfQtdGA0LXQtyDRgdC10YDQstC40YHQvdGL0Lkg0LDQutC60LDRg9C90YJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBdXRoZW50aWNhdGVkQ2xpZW50KHNoZWV0SWQ6IHN0cmluZykge1xuICB0cnkge1xuICAgIGNvbnN0IHNlcnZpY2VBY2NvdW50QXV0aCA9IG5ldyBKV1Qoe1xuICAgICAgZW1haWw6IHByb2Nlc3MuZW52LkdPT0dMRV9TRVJWSUNFX0FDQ09VTlRfRU1BSUwsXG4gICAgICBrZXk6IHByb2Nlc3MuZW52LkdPT0dMRV9QUklWQVRFX0tFWT8ucmVwbGFjZSgvXFxuL2csIFwiXFxuXCIpLFxuICAgICAgc2NvcGVzOiBbXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiXSxcbiAgICB9KVxuXG4gICAgY29uc3QgZG9jID0gbmV3IEdvb2dsZVNwcmVhZHNoZWV0KHNoZWV0SWQsIHNlcnZpY2VBY2NvdW50QXV0aClcbiAgICBhd2FpdCBkb2MubG9hZEluZm8oKVxuXG4gICAgcmV0dXJuIGRvY1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhdXRoZW50aWNhdGluZyB3aXRoIEdvb2dsZSBTaGVldHM6XCIsIGVycm9yKVxuICAgIHRocm93IG5ldyBFcnJvcihcItCd0LUg0YPQtNCw0LvQvtGB0Ywg0L/QvtC00LrQu9GO0YfQuNGC0YzRgdGPINC6IEdvb2dsZSBTaGVldHNcIilcbiAgfVxufVxuXG4vLyDwn5OlINCf0L7Qu9GD0YfQtdC90LjQtSDQstC+0L/RgNC+0YHQvtCyINC40Lcg0YLQsNCx0LvQuNGG0YtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRRdWVzdGlvbnNGcm9tU2hlZXQoc2hlZXRJZDogc3RyaW5nKTogUHJvbWlzZTxRdWVzdGlvbltdPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZG9jID0gYXdhaXQgZ2V0QXV0aGVudGljYXRlZENsaWVudChzaGVldElkKVxuICAgIGNvbnN0IHNoZWV0ID0gZG9jLnNoZWV0c0J5SW5kZXhbMF1cbiAgICBjb25zdCByb3dzID0gYXdhaXQgc2hlZXQuZ2V0Um93cygpXG5cbiAgICBjb25zdCBxdWVzdGlvbnM6IFF1ZXN0aW9uW10gPSBbXVxuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygcm93cykge1xuICAgICAgY29uc3Qgcm93RGF0YSA9IHJvdy50b09iamVjdCgpXG4gICAgICBjb25zdCB0ZXh0ID0gcm93RGF0YVtcIlF1ZXN0aW9uXCJdIHx8IFwiXCJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXG4gICAgICAgIHJvd0RhdGFbXCJPcHRpb24gQVwiXSxcbiAgICAgICAgcm93RGF0YVtcIk9wdGlvbiBCXCJdLFxuICAgICAgICByb3dEYXRhW1wiT3B0aW9uIENcIl0sXG4gICAgICAgIHJvd0RhdGFbXCJPcHRpb24gRFwiXVxuICAgICAgXS5maWx0ZXIoKG9wdGlvbikgPT4gISFvcHRpb24pXG5cbiAgICAgIGlmICh0ZXh0ICYmIG9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgbnVtYmVyOiBxdWVzdGlvbnMubGVuZ3RoICsgMSxcbiAgICAgICAgICB0ZXh0LFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcXVlc3Rpb25zLnNvcnQoKGEsIGIpID0+IGEubnVtYmVyIC0gYi5udW1iZXIpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHF1ZXN0aW9ucyBmcm9tIEdvb2dsZSBTaGVldHM6XCIsIGVycm9yKVxuICAgIHRocm93IG5ldyBFcnJvcihcItCd0LUg0YPQtNCw0LvQvtGB0Ywg0L/QvtC70YPRh9C40YLRjCDQstC+0L/RgNC+0YHRiyDQuNC3IEdvb2dsZSBTaGVldHNcIilcbiAgfVxufVxuXG4vLyDwn5OkINCh0L7RhdGA0LDQvdC10L3QuNC1INC+0YLQstC10YLQvtCyINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQsiDRgtCw0LHQu9C40YbRg1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVVc2VyQW5zd2Vyc1RvU2hlZXQoXG4gIHNoZWV0SWQ6IHN0cmluZyxcbiAgdXNlck5hbWU6IHN0cmluZyxcbiAgYW5zd2VyczogVXNlckFuc3dlcltdXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2MgPSBhd2FpdCBnZXRBdXRoZW50aWNhdGVkQ2xpZW50KHNoZWV0SWQpXG4gICAgY29uc3Qgc2hlZXQgPSBkb2Muc2hlZXRzQnlUaXRsZVtcItCb0LjRgdGCMlwiXSAvLyA8LSDRg9C60LDQttC4INGB0LLQvtC5INC70LjRgdGCINC30LTQtdGB0YxcblxuICAgIGF3YWl0IHNoZWV0LmxvYWRDZWxscygpXG5cbiAgICBjb25zdCBoZWFkZXJSb3cgPSBhd2FpdCBzaGVldC5nZXRSb3dzKHsgbGltaXQ6IDEgfSlcbiAgICBjb25zdCBuZXh0Q29sdW1uSW5kZXggPSBoZWFkZXJSb3cubGVuZ3RoID4gMFxuICAgICAgPyBPYmplY3Qua2V5cyhoZWFkZXJSb3dbMF0udG9PYmplY3QoKSkubGVuZ3RoXG4gICAgICA6IDFcblxuICAgIHNoZWV0LmdldENlbGwoMCwgbmV4dENvbHVtbkluZGV4KS52YWx1ZSA9IHVzZXJOYW1lXG5cbiAgICBmb3IgKGNvbnN0IGFuc3dlciBvZiBhbnN3ZXJzKSB7XG4gICAgICBjb25zdCBjZWxsID0gc2hlZXQuZ2V0Q2VsbChhbnN3ZXIucXVlc3Rpb25OdW1iZXIsIG5leHRDb2x1bW5JbmRleClcbiAgICAgIGNlbGwudmFsdWUgPSBhbnN3ZXIuc2VsZWN0ZWRPcHRpb25cbiAgICB9XG5cbiAgICBhd2FpdCBzaGVldC5zYXZlVXBkYXRlZENlbGxzKClcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2F2aW5nIGFuc3dlcnMgdG8gR29vZ2xlIFNoZWV0czpcIiwgZXJyb3IpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwi0J3QtSDRg9C00LDQu9C+0YHRjCDRgdC+0YXRgNCw0L3QuNGC0Ywg0L7RgtCy0LXRgtGLINCyIEdvb2dsZSBTaGVldHNcIilcbiAgfVxufSJdLCJuYW1lcyI6WyJHb29nbGVTcHJlYWRzaGVldCIsIkpXVCIsImdldEF1dGhlbnRpY2F0ZWRDbGllbnQiLCJzaGVldElkIiwic2VydmljZUFjY291bnRBdXRoIiwiZW1haWwiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX1NFUlZJQ0VfQUNDT1VOVF9FTUFJTCIsImtleSIsIkdPT0dMRV9QUklWQVRFX0tFWSIsInJlcGxhY2UiLCJzY29wZXMiLCJkb2MiLCJsb2FkSW5mbyIsImVycm9yIiwiY29uc29sZSIsIkVycm9yIiwiZ2V0UXVlc3Rpb25zRnJvbVNoZWV0Iiwic2hlZXQiLCJzaGVldHNCeUluZGV4Iiwicm93cyIsImdldFJvd3MiLCJxdWVzdGlvbnMiLCJyb3ciLCJyb3dEYXRhIiwidG9PYmplY3QiLCJ0ZXh0Iiwib3B0aW9ucyIsImZpbHRlciIsIm9wdGlvbiIsImxlbmd0aCIsInB1c2giLCJudW1iZXIiLCJzb3J0IiwiYSIsImIiLCJzYXZlVXNlckFuc3dlcnNUb1NoZWV0IiwidXNlck5hbWUiLCJhbnN3ZXJzIiwic2hlZXRzQnlUaXRsZSIsImxvYWRDZWxscyIsImhlYWRlclJvdyIsImxpbWl0IiwibmV4dENvbHVtbkluZGV4IiwiT2JqZWN0Iiwia2V5cyIsImdldENlbGwiLCJ2YWx1ZSIsImFuc3dlciIsImNlbGwiLCJxdWVzdGlvbk51bWJlciIsInNlbGVjdGVkT3B0aW9uIiwic2F2ZVVwZGF0ZWRDZWxscyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/google-sheets.ts\n");

/***/ }),

/***/ "(rsc)/./lib/settings.ts":
/*!*************************!*\
  !*** ./lib/settings.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAccessLink: () => (/* binding */ createAccessLink),\n/* harmony export */   deactivateAccessLink: () => (/* binding */ deactivateAccessLink),\n/* harmony export */   generateAccessToken: () => (/* binding */ generateAccessToken),\n/* harmony export */   getSettings: () => (/* binding */ getSettings),\n/* harmony export */   saveSettings: () => (/* binding */ saveSettings),\n/* harmony export */   updateQuestionsSheetUrl: () => (/* binding */ updateQuestionsSheetUrl),\n/* harmony export */   updateResponsesSheetUrl: () => (/* binding */ updateResponsesSheetUrl),\n/* harmony export */   validateAccessLink: () => (/* binding */ validateAccessLink),\n/* harmony export */   validateAccessToken: () => (/* binding */ validateAccessToken)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst SETTINGS_FILE = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"settings.json\");\n// Функция для получения настроек\nfunction getSettings() {\n    try {\n        if (fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(SETTINGS_FILE)) {\n            const data = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(SETTINGS_FILE, \"utf8\");\n            return JSON.parse(data);\n        }\n    } catch (error) {\n        console.error(\"Error reading settings file:\", error);\n    }\n    // Возвращаем настройки по умолчанию, если файл не существует или произошла ошибка\n    return {\n        questionsSheetId: \"\",\n        resultsSheetId: \"\",\n        accessToken: generateAccessToken(),\n        questionsSheetUrl: \"\",\n        responsesSheetUrl: \"\",\n        accessLinks: []\n    };\n}\n// Функция для сохранения настроек\nfunction saveSettings(settings) {\n    try {\n        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));\n    } catch (error) {\n        console.error(\"Error writing settings file:\", error);\n        throw new Error(\"Не удалось сохранить настройки\");\n    }\n}\n// Функция для генерации случайного токена доступа\nfunction generateAccessToken() {\n    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);\n}\n// Функция для проверки токена доступа\nfunction validateAccessToken(token) {\n    const settings = getSettings();\n    return settings.accessToken === token;\n}\n// Добавляем недостающие функции для работы с URL таблиц\nfunction updateQuestionsSheetUrl(url) {\n    const settings = getSettings();\n    settings.questionsSheetUrl = url;\n    // Извлекаем ID из URL, если возможно\n    const sheetId = extractSheetIdFromUrl(url);\n    if (sheetId) {\n        settings.questionsSheetId = sheetId;\n    }\n    saveSettings(settings);\n}\nfunction updateResponsesSheetUrl(url) {\n    const settings = getSettings();\n    settings.responsesSheetUrl = url;\n    // Извлекаем ID из URL, если возможно\n    const sheetId = extractSheetIdFromUrl(url);\n    if (sheetId) {\n        settings.resultsSheetId = sheetId;\n    }\n    saveSettings(settings);\n}\n// Вспомогательная функция для извлечения ID таблицы из URL\nfunction extractSheetIdFromUrl(url) {\n    try {\n        const match = url.match(/\\/d\\/([a-zA-Z0-9-_]+)/);\n        return match ? match[1] : null;\n    } catch (error) {\n        return null;\n    }\n}\n// Добавляем функции для работы с ссылками доступа\nfunction createAccessLink(name) {\n    const settings = getSettings();\n    const id = generateAccessToken();\n    settings.accessLinks.push({\n        id,\n        name,\n        active: true,\n        createdAt: new Date().toISOString()\n    });\n    saveSettings(settings);\n    return id;\n}\nfunction validateAccessLink(id) {\n    const settings = getSettings();\n    const link = settings.accessLinks.find((link)=>link.id === id);\n    return link ? link.active : false;\n}\nfunction deactivateAccessLink(id) {\n    const settings = getSettings();\n    const linkIndex = settings.accessLinks.findIndex((link)=>link.id === id);\n    if (linkIndex !== -1) {\n        settings.accessLinks[linkIndex].active = false;\n        saveSettings(settings);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU00QyxZQUFZNUIsU0FBU0YsV0FBVyxDQUFDK0IsU0FBUyxDQUFDLENBQUNKLE9BQVNBLEtBQUtQLEVBQUUsS0FBS0E7SUFFdkUsSUFBSVUsY0FBYyxDQUFDLEdBQUc7UUFDcEI1QixTQUFTRixXQUFXLENBQUM4QixVQUFVLENBQUNSLE1BQU0sR0FBRztRQUN6Q3JCLGFBQWFDO0lBQ2Y7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3N0YXMvRG9jdW1lbnRzL3dlYi10ZXN0aW5nLXNlcnZpY2UvbGliL3NldHRpbmdzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuXG4vLyDQotC40L8g0LTQu9GPINC90LDRgdGC0YDQvtC10Log0L/RgNC40LvQvtC20LXQvdC40Y9cbmV4cG9ydCB0eXBlIEFwcFNldHRpbmdzID0ge1xuICBxdWVzdGlvbnNTaGVldElkOiBzdHJpbmdcbiAgcmVzdWx0c1NoZWV0SWQ6IHN0cmluZ1xuICBhY2Nlc3NUb2tlbjogc3RyaW5nXG4gIHF1ZXN0aW9uc1NoZWV0VXJsOiBzdHJpbmdcbiAgcmVzcG9uc2VzU2hlZXRVcmw6IHN0cmluZ1xuICBhY2Nlc3NMaW5rczogQXJyYXk8e1xuICAgIGlkOiBzdHJpbmdcbiAgICBuYW1lOiBzdHJpbmdcbiAgICBhY3RpdmU6IGJvb2xlYW5cbiAgICBjcmVhdGVkQXQ6IHN0cmluZ1xuICB9PlxufVxuXG5jb25zdCBTRVRUSU5HU19GSUxFID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwic2V0dGluZ3MuanNvblwiKVxuXG4vLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC90LDRgdGC0YDQvtC10LpcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBBcHBTZXR0aW5ncyB7XG4gIHRyeSB7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoU0VUVElOR1NfRklMRSkpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoU0VUVElOR1NfRklMRSwgXCJ1dGY4XCIpXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmVhZGluZyBzZXR0aW5ncyBmaWxlOlwiLCBlcnJvcilcbiAgfVxuXG4gIC8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdC8INC90LDRgdGC0YDQvtC50LrQuCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiwg0LXRgdC70Lgg0YTQsNC50Lsg0L3QtSDRgdGD0YnQtdGB0YLQstGD0LXRgiDQuNC70Lgg0L/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsFxuICByZXR1cm4ge1xuICAgIHF1ZXN0aW9uc1NoZWV0SWQ6IFwiXCIsXG4gICAgcmVzdWx0c1NoZWV0SWQ6IFwiXCIsXG4gICAgYWNjZXNzVG9rZW46IGdlbmVyYXRlQWNjZXNzVG9rZW4oKSxcbiAgICBxdWVzdGlvbnNTaGVldFVybDogXCJcIixcbiAgICByZXNwb25zZXNTaGVldFVybDogXCJcIixcbiAgICBhY2Nlc3NMaW5rczogW10sXG4gIH1cbn1cblxuLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0L7RhdGA0LDQvdC10L3QuNGPINC90LDRgdGC0YDQvtC10LpcbmV4cG9ydCBmdW5jdGlvbiBzYXZlU2V0dGluZ3Moc2V0dGluZ3M6IEFwcFNldHRpbmdzKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgZnMud3JpdGVGaWxlU3luYyhTRVRUSU5HU19GSUxFLCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncywgbnVsbCwgMikpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHdyaXRpbmcgc2V0dGluZ3MgZmlsZTpcIiwgZXJyb3IpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwi0J3QtSDRg9C00LDQu9C+0YHRjCDRgdC+0YXRgNCw0L3QuNGC0Ywg0L3QsNGB0YLRgNC+0LnQutC4XCIpXG4gIH1cbn1cblxuLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINCz0LXQvdC10YDQsNGG0LjQuCDRgdC70YPRh9Cw0LnQvdC+0LPQviDRgtC+0LrQtdC90LAg0LTQvtGB0YLRg9C/0LBcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUFjY2Vzc1Rva2VuKCk6IHN0cmluZyB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgMTUpICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDE1KVxufVxuXG4vLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDRgtC+0LrQtdC90LAg0LTQvtGB0YLRg9C/0LBcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUFjY2Vzc1Rva2VuKHRva2VuOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBnZXRTZXR0aW5ncygpXG4gIHJldHVybiBzZXR0aW5ncy5hY2Nlc3NUb2tlbiA9PT0gdG9rZW5cbn1cblxuLy8g0JTQvtCx0LDQstC70Y/QtdC8INC90LXQtNC+0YHRgtCw0Y7RidC40LUg0YTRg9C90LrRhtC40Lgg0LTQu9GPINGA0LDQsdC+0YLRiyDRgSBVUkwg0YLQsNCx0LvQuNGGXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUXVlc3Rpb25zU2hlZXRVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBnZXRTZXR0aW5ncygpXG4gIHNldHRpbmdzLnF1ZXN0aW9uc1NoZWV0VXJsID0gdXJsXG5cbiAgLy8g0JjQt9Cy0LvQtdC60LDQtdC8IElEINC40LcgVVJMLCDQtdGB0LvQuCDQstC+0LfQvNC+0LbQvdC+XG4gIGNvbnN0IHNoZWV0SWQgPSBleHRyYWN0U2hlZXRJZEZyb21VcmwodXJsKVxuICBpZiAoc2hlZXRJZCkge1xuICAgIHNldHRpbmdzLnF1ZXN0aW9uc1NoZWV0SWQgPSBzaGVldElkXG4gIH1cblxuICBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVSZXNwb25zZXNTaGVldFVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICBjb25zdCBzZXR0aW5ncyA9IGdldFNldHRpbmdzKClcbiAgc2V0dGluZ3MucmVzcG9uc2VzU2hlZXRVcmwgPSB1cmxcblxuICAvLyDQmNC30LLQu9C10LrQsNC10LwgSUQg0LjQtyBVUkwsINC10YHQu9C4INCy0L7Qt9C80L7QttC90L5cbiAgY29uc3Qgc2hlZXRJZCA9IGV4dHJhY3RTaGVldElkRnJvbVVybCh1cmwpXG4gIGlmIChzaGVldElkKSB7XG4gICAgc2V0dGluZ3MucmVzdWx0c1NoZWV0SWQgPSBzaGVldElkXG4gIH1cblxuICBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpXG59XG5cbi8vINCS0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90LDRjyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LjQt9Cy0LvQtdGH0LXQvdC40Y8gSUQg0YLQsNCx0LvQuNGG0Ysg0LjQtyBVUkxcbmZ1bmN0aW9uIGV4dHJhY3RTaGVldElkRnJvbVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICB0cnkge1xuICAgIGNvbnN0IG1hdGNoID0gdXJsLm1hdGNoKC9cXC9kXFwvKFthLXpBLVowLTktX10rKS8pXG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG4vLyDQlNC+0LHQsNCy0LvRj9C10Lwg0YTRg9C90LrRhtC40Lgg0LTQu9GPINGA0LDQsdC+0YLRiyDRgSDRgdGB0YvQu9C60LDQvNC4INC00L7RgdGC0YPQv9CwXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWNjZXNzTGluayhuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBzZXR0aW5ncyA9IGdldFNldHRpbmdzKClcbiAgY29uc3QgaWQgPSBnZW5lcmF0ZUFjY2Vzc1Rva2VuKClcblxuICBzZXR0aW5ncy5hY2Nlc3NMaW5rcy5wdXNoKHtcbiAgICBpZCxcbiAgICBuYW1lLFxuICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgfSlcblxuICBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpXG4gIHJldHVybiBpZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVBY2Nlc3NMaW5rKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBnZXRTZXR0aW5ncygpXG4gIGNvbnN0IGxpbmsgPSBzZXR0aW5ncy5hY2Nlc3NMaW5rcy5maW5kKChsaW5rKSA9PiBsaW5rLmlkID09PSBpZClcbiAgcmV0dXJuIGxpbmsgPyBsaW5rLmFjdGl2ZSA6IGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlQWNjZXNzTGluayhpZDogc3RyaW5nKTogdm9pZCB7XG4gIGNvbnN0IHNldHRpbmdzID0gZ2V0U2V0dGluZ3MoKVxuICBjb25zdCBsaW5rSW5kZXggPSBzZXR0aW5ncy5hY2Nlc3NMaW5rcy5maW5kSW5kZXgoKGxpbmspID0+IGxpbmsuaWQgPT09IGlkKVxuXG4gIGlmIChsaW5rSW5kZXggIT09IC0xKSB7XG4gICAgc2V0dGluZ3MuYWNjZXNzTGlua3NbbGlua0luZGV4XS5hY3RpdmUgPSBmYWxzZVxuICAgIHNhdmVTZXR0aW5ncyhzZXR0aW5ncylcbiAgfVxufVxuIl0sIm5hbWVzIjpbImZzIiwicGF0aCIsIlNFVFRJTkdTX0ZJTEUiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsImdldFNldHRpbmdzIiwiZXhpc3RzU3luYyIsImRhdGEiLCJyZWFkRmlsZVN5bmMiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImNvbnNvbGUiLCJxdWVzdGlvbnNTaGVldElkIiwicmVzdWx0c1NoZWV0SWQiLCJhY2Nlc3NUb2tlbiIsImdlbmVyYXRlQWNjZXNzVG9rZW4iLCJxdWVzdGlvbnNTaGVldFVybCIsInJlc3BvbnNlc1NoZWV0VXJsIiwiYWNjZXNzTGlua3MiLCJzYXZlU2V0dGluZ3MiLCJzZXR0aW5ncyIsIndyaXRlRmlsZVN5bmMiLCJzdHJpbmdpZnkiLCJFcnJvciIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsInZhbGlkYXRlQWNjZXNzVG9rZW4iLCJ0b2tlbiIsInVwZGF0ZVF1ZXN0aW9uc1NoZWV0VXJsIiwidXJsIiwic2hlZXRJZCIsImV4dHJhY3RTaGVldElkRnJvbVVybCIsInVwZGF0ZVJlc3BvbnNlc1NoZWV0VXJsIiwibWF0Y2giLCJjcmVhdGVBY2Nlc3NMaW5rIiwibmFtZSIsImlkIiwicHVzaCIsImFjdGl2ZSIsImNyZWF0ZWRBdCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInZhbGlkYXRlQWNjZXNzTGluayIsImxpbmsiLCJmaW5kIiwiZGVhY3RpdmF0ZUFjY2Vzc0xpbmsiLCJsaW5rSW5kZXgiLCJmaW5kSW5kZXgiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/settings.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fquestions%2Froute&page=%2Fapi%2Fquestions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquestions%2Froute.ts&appDir=%2FUsers%2Fstas%2FDocuments%2Fweb-testing-service%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fstas%2FDocuments%2Fweb-testing-service&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fquestions%2Froute&page=%2Fapi%2Fquestions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquestions%2Froute.ts&appDir=%2FUsers%2Fstas%2FDocuments%2Fweb-testing-service%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fstas%2FDocuments%2Fweb-testing-service&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_stas_Documents_web_testing_service_app_api_questions_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/questions/route.ts */ \"(rsc)/./app/api/questions/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/questions/route\",\n        pathname: \"/api/questions\",\n        filename: \"route\",\n        bundlePath: \"app/api/questions/route\"\n    },\n    resolvedPagePath: \"/Users/stas/Documents/web-testing-service/app/api/questions/route.ts\",\n    nextConfigOutput,\n    userland: _Users_stas_Documents_web_testing_service_app_api_questions_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZxdWVzdGlvbnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnF1ZXN0aW9ucyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnF1ZXN0aW9ucyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnN0YXMlMkZEb2N1bWVudHMlMkZ3ZWItdGVzdGluZy1zZXJ2aWNlJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRnN0YXMlMkZEb2N1bWVudHMlMkZ3ZWItdGVzdGluZy1zZXJ2aWNlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNvQjtBQUNqRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3N0YXMvRG9jdW1lbnRzL3dlYi10ZXN0aW5nLXNlcnZpY2UvYXBwL2FwaS9xdWVzdGlvbnMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3F1ZXN0aW9ucy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3F1ZXN0aW9uc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcXVlc3Rpb25zL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3N0YXMvRG9jdW1lbnRzL3dlYi10ZXN0aW5nLXNlcnZpY2UvYXBwL2FwaS9xdWVzdGlvbnMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fquestions%2Froute&page=%2Fapi%2Fquestions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquestions%2Froute.ts&appDir=%2FUsers%2Fstas%2FDocuments%2Fweb-testing-service%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fstas%2FDocuments%2Fweb-testing-service&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?d272":
/*!********************************!*\
  !*** supports-color (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/google-auth-library","vendor-chunks/tr46","vendor-chunks/lodash","vendor-chunks/mime-db","vendor-chunks/axios","vendor-chunks/bignumber.js","vendor-chunks/node-fetch","vendor-chunks/whatwg-url","vendor-chunks/gaxios","vendor-chunks/google-spreadsheet","vendor-chunks/json-bigint","vendor-chunks/follow-redirects","vendor-chunks/google-logging-utils","vendor-chunks/gcp-metadata","vendor-chunks/debug","vendor-chunks/get-intrinsic","vendor-chunks/form-data","vendor-chunks/https-proxy-agent","vendor-chunks/gtoken","vendor-chunks/uuid","vendor-chunks/agent-base","vendor-chunks/asynckit","vendor-chunks/jws","vendor-chunks/jwa","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/webidl-conversions","vendor-chunks/combined-stream","vendor-chunks/base64-js","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/extend","vendor-chunks/ms","vendor-chunks/has-symbols","vendor-chunks/delayed-stream","vendor-chunks/function-bind","vendor-chunks/safe-buffer","vendor-chunks/es-set-tostringtag","vendor-chunks/get-proto","vendor-chunks/call-bind-apply-helpers","vendor-chunks/buffer-equal-constant-time","vendor-chunks/dunder-proto","vendor-chunks/math-intrinsics","vendor-chunks/is-stream","vendor-chunks/es-errors","vendor-chunks/gopd","vendor-chunks/es-define-property","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/es-object-atoms"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fquestions%2Froute&page=%2Fapi%2Fquestions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquestions%2Froute.ts&appDir=%2FUsers%2Fstas%2FDocuments%2Fweb-testing-service%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fstas%2FDocuments%2Fweb-testing-service&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();