const products = document.getElementsByClassName("product");

const cartSection = document.getElementById("cart-section");

const totalLabel = document.getElementById("total");

const filter_max= document.getElementById("max");

const filter_min = document.getElementById("min");

const searchBar = document.getElementById("search-bar");

const inCartItems = document.getElementsByClassName("in-cart");

const purchaseButton = document.getElementById("purchase");


function update(){
  if (!cartIsNotEmpty()&&!purchaseButton.hidden){
      purchaseButton.hidden=true;
    }
    else if (cartIsNotEmpty()&&purchaseButton.hidden){
      purchaseButton.hidden=false;
    }
}

function getTotalPrice(){
  return Number(totalLabel.getAttribute("data-value"));
}

function showAll () {
  for (const product of products){
    product.hidden=false;
  }
}

function cartIsNotEmpty() {
  return inCartItems[0]!==undefined;
}

function addToCart(product) {
  const name = document.createElement("h3");
  name.className = "in-cart";
  name.textContent = product.getAttribute("data-name");
  cartSection.appendChild(name);
  const value = Number(totalLabel.getAttribute("data-value"));
  const itemPrice = Number(product.getAttribute("data-price"));
  const total = value + itemPrice;
  totalLabel.setAttribute("data-value", total.toString());
  totalLabel.textContent =
    "Total: $" + totalLabel.getAttribute("data-value") + ".00";
  product.querySelector(".remove-from-cart").hidden = false;
}
function remove(product) {
  for (const inCart of inCartItems) {
    if (inCart.textContent === product.getAttribute("data-name")) {
      const value = Number(totalLabel.getAttribute("data-value"));
      const itemPrice = Number(product.getAttribute("data-price"));
      const total = value - itemPrice;
      totalLabel.setAttribute("data-value", total.toString());
      totalLabel.textContent="Total: $" + totalLabel.getAttribute("data-value") + ".00";
      inCart.remove();
      break;
    }
  }
  let stillThere = false;
  for (const inCart of inCartItems){
    if (inCart.textContent === product.getAttribute("data-name")) {
      stillThere = true;
    }
  }
  if (!stillThere) {
    product.querySelector(".remove-from-cart").hidden=true;
  }
}

function filter(){
    showAll();
    const max = Number(filter_max.value);
    const min = Number(filter_min.value);
    for (const product of products){
      const price = Number(product.getAttribute("data-price"));
      if (!(price>=min && price<=max)){
        product.hidden=true;
      }
    }
}

function search (){
  showAll();
  const search = searchBar.value;
  console.log(search.toLowerCase().replaceAll(" ","-"));
  for (const product of products){
      console.log(product.getAttribute("data-name").toLowerCase().replaceAll(" ","-"));
      const price = Number(product.getAttribute("data-price"));
      if (!(search.toLowerCase().replaceAll(" ","-")==product.getAttribute("data-name").toLowerCase().replaceAll(" ","-"))){
        product.hidden=true;
      }
      else {
        product.hidden=false;
      }
    }
}

function clearFilters() {
  filter_max.value="";
  filter_min.value="";
  searchBar.value="";
  showAll();
}

function clearCart (){
  for (const inCart of document.querySelectorAll(".in-cart")){
    inCart.remove();
  }
  totalLabel.setAttribute("data-value","0");
  totalLabel.textContent="Total: $" + totalLabel.getAttribute("data-value") + ".00";
  for (const product of products){
    product.querySelector(".remove-from-cart").hidden=true;
  }
}


for (const product of products) {
  const h1 = document.createElement("h1");
  h1.textContent = product.getAttribute("data-name");

  const img = document.createElement("img");
  img.src = product.getAttribute("data-img");
  img.alt = "image";

  const h2 = document.createElement("h2");
  h2.className = "price-label";
  h2.textContent = "Price: $" + product.getAttribute("data-price");

  const removeB = document.createElement("button");
  removeB.setAttribute("class", "remove-from-cart");
  removeB.setAttribute("onclick", "remove(this.parentElement)");
  removeB.textContent = "Remove From Cart";
  removeB.hidden = true;

  const button = document.createElement("button");
  button.className = "add-to-cart";
  button.setAttribute("onclick", "addToCart(this.parentElement)");

  const span = document.createElement("span");
  span.className = "material-symbols-outlined";
  span.textContent = "add_shopping_cart";

  button.appendChild(span);
  button.appendChild(document.createTextNode("Add To Cart"));
  product.appendChild(h1);
  product.appendChild(img);
  product.appendChild(h2);
  product.appendChild(removeB);
  product.appendChild(button);
}

setInterval(update,200);