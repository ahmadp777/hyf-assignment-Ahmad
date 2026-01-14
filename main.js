console.log("Script loaded");
const products = getAvailableProducts();
console.log(products);

// Create the ul and the li's with the individual products details

function renderProducts(products) {
  
  const ul= document.getElementById("product-list"); 
  ul.innerHTML=""; 
  products.forEach(product => {
  const li= document.createElement("li");
  li.innerHTML= `
  <h3>${product.name}</h3>
  <p>Price: ${product.price}</p>
  <p>Rating: ${product.rating}</p>
  `
  ul.appendChild(li);
  });
}

// Sorting function to sort products based on selected factor
function sortProducts(products, sortBy) {

  const sortedProducts = products;
  
  switch (sortBy) {
    case "price-low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating-low":
      sortedProducts.sort((a, b) => a.rating - b.rating);
      break;
    case "rating-high":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:

      break;
  }
  
  return sortedProducts;
}

/// Listen to sorting factor
const sortSelection = document.getElementById("sort-selection");
sortSelection.addEventListener("change", function() {
  const sortBy = this.value;
  const sortedProducts = sortProducts(products, sortBy);
  renderProducts(sortedProducts);
});

renderProducts(products); 
