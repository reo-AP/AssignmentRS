export default class ProductDto{
    public name: string;
    public price: number;
    public company: string;
    public productId: number
  
    constructor(name: string, price: number, company: string, productId: number) {
      this.name = name;
      this.price = price;
      this.company = company;
      this.productId = productId;
    }
  
    public toString() {
      return `Name: ${this.name}, Company: ${this.company}, Price: ${this.price}, ProductId: ${this.productId}`;
    }
  }
  