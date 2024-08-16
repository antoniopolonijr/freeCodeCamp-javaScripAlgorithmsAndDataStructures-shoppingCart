const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");

let isCartShowing = false;

// Using an array will allow you to store multiple products.
const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

// Now that you have your list of products, you can use JavaScript to insert them into the HTML. With this approach, if you decide to add more products, the HTML will automatically reflect that.
products.forEach(({ name, id, price, category }) => {
  // Remember that you can use destructuring to extract multiple values from an array or object in a single statement.
  dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>`; // to display the available products in your HTML.
});

class ShoppingCart {
  // You are already familiar with an HTML class, but JavaScript also has a class. In JavaScript, a class is like a blueprint for creating objects. It allows you to define a set of properties and methods, and instantiate (or create) new objects with those properties and methods.
  constructor() {
    // Classes have a special constructor method, which is called when a new instance of the class is created. The constructor method is a great place to initialize properties of the class.
    this.items = []; // The this keyword in JavaScript is used to refer to the current object. Depending on where this is used, what it references changes. In the case of a class, it refers to the instance of the object being constructed. You can use the this keyword to set the properties of the object being instantiated.
    this.total = 0;
    this.taxRate = 8.25;
  }
  addItem(id, products) {
    // Your ShoppingCart class needs the ability to add items. The first parameter, id, is the id of the product the user has added to their cart. The second parameter, products, is an array of product objects. By using a parameter instead of directly referencing your existing products array, this method will be more flexible if you wanted to add additional product lists in the future.
    const product = products.find((item) => item.id === id); // You need to find the product that the user is adding to the cart.
    const { name, price } = product; // to extract name and price variables from product.
    this.items.push(product); // to push the product into the cart's items array.
    const totalCountPerProduct = {}; // total count of each product that the user has in the cart
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1;
    }); // to update the totalCountPerProduct object.
    // You now have a small bug. When you try to access a property of an object and the property doesn't exist, you get undefined. This means if the dessert isn't already present in the totalCountPerProduct object, you end up trying to add 1 to undefined, which results in NaN. To fix this, you can use the || operator to set the value to 0 if it doesn't exist.
    const currentProductCount = totalCountPerProduct[product.id]; // to get prepared to update the display with the new product the user added.
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${product.id}`
    ); // You haven't written the code to generate the HTML yet, but if a product has already been added to the user's cart then there will be a matching element which you'll need.
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : (productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"><span>${name}
        </p>
        <p>${price}</p>
      </div>
      `); // to add new HTML to your productsContainer
    // The behaviour of the addItem method needs to change if the product is already in the cart or not. Use undefined for both the truthy and falsy expressions to avoid a syntax error.
  }
}

const cart = new ShoppingCart(); // There is still more functionality that your ShoppingCart class needs, but first you need to be able to test the code you have currently written. You'll need to instantiate a new ShoppingCart object and assign it to a variable.

const addToCartBtns = document.getElementsByClassName("add-to-cart-btn"); // to get all of the Add to cart buttons that you added to the DOM earlier.
[...addToCartBtns].forEach((btn) => {
  // You need to iterate through the buttons in your addToCartBtns variable. However, .getElementsByClassName() returns a Collection, which does not have a forEach method. Use the spread operator on the addToCartBtns variable to convert it into an array. Then, use the forEach method to iterate through the array
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products); // Remember that the id here will be a string, so you need to convert it to a number.
  });
});

// Your cart currently isn't visible on the webpage. To make it visible
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing; // Remember that you can use the logical not operator ! to invert the value of a boolean.
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show"; // chance the buttom text
  cartContainer.style.display = isCartShowing ? "block" : "none"; // show or hide the cart
  // Now you should be able to see your cart and add items to it.
});
