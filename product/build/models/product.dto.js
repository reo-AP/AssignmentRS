"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductDto = /** @class */ (function () {
    function ProductDto(name, price, company, productId) {
        this.name = name;
        this.price = price;
        this.company = company;
        this.productId = productId;
    }
    ProductDto.prototype.toString = function () {
        return "Name: ".concat(this.name, ", Company: ").concat(this.company, ", Price: ").concat(this.price, ", ProductId: ").concat(this.productId);
    };
    return ProductDto;
}());
exports.default = ProductDto;
