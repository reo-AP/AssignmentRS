"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../util/logger");
var ProductController = /** @class */ (function () {
    function ProductController(productModel) {
        var _this = this;
        this.listProduct = function (req, h) { return __awaiter(_this, void 0, void 0, function () {
            var list, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Product.find()];
                    case 1:
                        list = _a.sent();
                        logger_1.logger.info({
                            "level": "info",
                            "message": "Products get all",
                            "metadata": { status: list ? "Success" : "failure", service: "products" },
                            "timestamp": new Date().toISOString()
                        });
                        h.response(list).header('Content-Type', 'application/json');
                        return [2 /*return*/, list];
                    case 2:
                        err_1 = _a.sent();
                        logger_1.logger.error({
                            "level": "error",
                            "message": "Products get all",
                            "metadata": { status: "failure", service: "products", issue: err_1.message },
                            "timestamp": new Date().toISOString()
                        });
                        return [2 /*return*/, { status: false }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getProduct = function (req, h) { return __awaiter(_this, void 0, void 0, function () {
            var product, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Product.find({ productId: req.params.id })];
                    case 1:
                        product = _a.sent();
                        product = product[0];
                        logger_1.logger.info({
                            "level": "info",
                            "message": "Get Product By Id",
                            "metadata": { status: "Success1", service: "products", id: req.params.id },
                            "timestamp": new Date().toISOString()
                        });
                        return [2 /*return*/, { name: product.name, price: product.price, productId: product.productId, company: product.company }];
                    case 2:
                        err_2 = _a.sent();
                        logger_1.logger.error({
                            "level": "error",
                            "message": "Get Product By Id",
                            "metadata": { status: "failure", service: "products", issue: err_2.message, id: req.params.id },
                            "timestamp": new Date().toISOString()
                        });
                        return [2 /*return*/, { status: "Not Found" }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postProduct = function (req, h) { return __awaiter(_this, void 0, void 0, function () {
            var product, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Product.create(req.payload)];
                    case 1:
                        product = _a.sent();
                        logger_1.logger.info({
                            "level": "info",
                            "message": "Create Product",
                            "metadata": { status: "Success", service: "products" },
                            "timestamp": new Date().toISOString()
                        });
                        return [2 /*return*/, h.response(product)];
                    case 2:
                        err_3 = _a.sent();
                        logger_1.logger.error({
                            "level": "error",
                            "message": "Create Product",
                            "metadata": { status: "failure", service: "products", issue: err_3.message },
                            "timestamp": new Date().toISOString()
                        });
                        return [2 /*return*/, { status: "Not Created" }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteProduct = function (req, h) { return __awaiter(_this, void 0, void 0, function () {
            var result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Product.deleteOne({ productId: req.params.id })];
                    case 1:
                        result = _a.sent();
                        logger_1.logger.info({
                            "level": "info",
                            "message": "Delete Product",
                            "metadata": { status: "Success", service: "products" },
                            "timestamp": new Date().toISOString()
                        });
                        if (result.deletedCount)
                            return [2 /*return*/, { deleted: true }];
                        return [2 /*return*/, { status: "Not Found" }];
                    case 2:
                        err_4 = _a.sent();
                        logger_1.logger.error({
                            "level": "error",
                            "message": "Delete Product",
                            "metadata": { status: "failure", service: "products", issue: err_4.message },
                            "timestamp": new Date().toISOString()
                        });
                        return [2 /*return*/, { status: "Not Found" }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.unownPath = function (req, h) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger_1.logger.error({
                    "level": "error",
                    "message": "Unknown path",
                    "metadata": { status: "failure", service: "products", issue: "unknown path" },
                    "timestamp": new Date().toISOString()
                });
                return [2 /*return*/, ({ status: "Path not found", code: 404 })];
            });
        }); };
        this.Product = productModel;
    }
    __decorate([
        validate
    ], ProductController.prototype, "getProduct", void 0);
    return ProductController;
}());
exports.default = ProductController;
