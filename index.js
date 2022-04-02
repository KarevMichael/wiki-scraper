"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var wikipedia_1 = require("wikipedia");
var fs = require("fs");
var NEED_TO_EXTRACT = 1e5;
var CLUSTER_SIZE = 1e2;
var titlesStorage = [];
var parseAggregator = {};
var amountOfDuplicates = 0;
var amountOfParseErrors = 0;
var amountOfParsed = 0;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, randomPage, page, _a, _b, e_1, e_2;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, , 14, 15]);
                i = 1;
                _d.label = 1;
            case 1:
                if (!(i <= NEED_TO_EXTRACT)) return [3 /*break*/, 13];
                if (i % CLUSTER_SIZE === 0) {
                    console.log("Writing in cluster ".concat(i / CLUSTER_SIZE));
                    fs.writeFileSync("wiki_parse_results_cluster_".concat(i / CLUSTER_SIZE, ".json"), JSON.stringify(parseAggregator));
                    parseAggregator = {};
                }
                _d.label = 2;
            case 2:
                _d.trys.push([2, 11, , 12]);
                return [4 /*yield*/, wikipedia_1["default"].random()];
            case 3:
                randomPage = _d.sent();
                if (!titlesStorage.includes(randomPage.title)) return [3 /*break*/, 4];
                console.log("Randomly found a duplicate: ".concat(randomPage.title));
                amountOfDuplicates++;
                return [3 /*break*/, 12];
            case 4:
                console.log("".concat(i, "th out of ").concat(NEED_TO_EXTRACT, " article with title \"").concat(randomPage.title, "\" is being parsed"));
                titlesStorage.push(randomPage.title);
                _d.label = 5;
            case 5:
                _d.trys.push([5, 9, , 10]);
                return [4 /*yield*/, wikipedia_1["default"].page(randomPage.title)];
            case 6:
                page = _d.sent();
                _a = parseAggregator;
                _b = randomPage.title;
                _c = {};
                return [4 /*yield*/, page.content()];
            case 7:
                _c.text = _d.sent();
                return [4 /*yield*/, page.categories()];
            case 8:
                _a[_b] = (_c.categories = _d.sent(),
                    _c);
                amountOfParsed++;
                return [3 /*break*/, 10];
            case 9:
                e_1 = _d.sent();
                console.log("Couldn't parse ".concat(randomPage.title, ": ").concat(e_1));
                amountOfParseErrors++;
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                e_2 = _d.sent();
                console.log("Failed to fetch: ".concat(e_2));
                return [3 /*break*/, 12];
            case 12:
                i++;
                return [3 /*break*/, 1];
            case 13: return [3 /*break*/, 15];
            case 14:
                console.info('-------------------------------------');
                console.info("Parsed: ".concat(amountOfParsed));
                console.info("Duplicates: ".concat(amountOfDuplicates));
                console.info("Errors: ".concat(amountOfParseErrors));
                return [7 /*endfinally*/];
            case 15: return [2 /*return*/];
        }
    });
}); })();
