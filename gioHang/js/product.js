class Product {
  constructor(id, name, img, desc, price, screen, backCamera, frontCamera, type) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.desc = desc;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.type = type;
  }
}

class Cart extends Product {
  constructor(Product) {
    super(
      Product.id,
      Product.name,
      Product.img,
      Product.desc,
      Product.price,
      Product.screen,
      Product.backCamera,
      Product.frontCamera,
      Product.type
    );
    // super(...Product);
    this.quantity = 1;
  }
}