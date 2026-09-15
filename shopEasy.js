// --- Global App State ---
let allProducts = [];
let cart = [];

// --- DOM Elements ---
const productsContainer = document.getElementById("products-container");
const categoryButtons = document.querySelectorAll(".cat-btn");
const cartToggleBtn = document.getElementById("cart-toggle-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountBadge = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// --- 1. Fetch Products from Online API using async/await ---
async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=30");
    const data = await response.json();
    
    // Store in our global list
    allProducts = data.products;
    
    // Render all initial products
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
    productsContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

// --- 2. Render Products inside Grid/Flex using Loops ---
function renderProducts(productList) {
  productsContainer.innerHTML = "";

  if (productList.length === 0) {
    productsContainer.innerHTML = "<p>No products found in this category.</p>";
    return;
  }

  // Loop through products array and build cards
  for (let i = 0; i < productList.length; i++) {
    const item = productList[i];

    // Create card wrapper
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Inner card template
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${item.thumbnail}" alt="${item.title}" loading="lazy"/>
      </div>
      <h4>${item.title}</h4>
      <p class="card-category">${item.category}</p>
      <p class="card-price">$${item.price.toFixed(2)}</p>
      <p class="card-rating"><span>★</span> ${item.rating}</p>
      <button class="add-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
    `;

    // Append to container
    productsContainer.appendChild(card);
  }
}

// --- 3. Filter Products by Category using a Loop ---
for (let i = 0; i < categoryButtons.length; i++) {
  categoryButtons[i].addEventListener("click", function () {
    // Remove active class from all buttons
    for (let j = 0; j < categoryButtons.length; j++) {
      categoryButtons[j].classList.remove("active");
    }
    // Set active class on clicked button
    this.classList.add("active");

    const category = this.getAttribute("data-category").toLowerCase();

    if (category === "all") {
      renderProducts(allProducts);
    } else {
      // Filter products using a loop
      const filtered = [];
      for (let k = 0; k < allProducts.length; k++) {
        if (allProducts[k].category.toLowerCase() === category) {
          filtered.push(allProducts[k]);
        }
      }
      renderProducts(filtered);
    }
  });
}

// --- 4. Cart Functionality: Add to Cart ---
window.addToCart = function (productId) {
  // Find product by id using a loop
  let chosenProduct = null;
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id === productId) {
      chosenProduct = allProducts[i];
      break;
    }
  }

  if (!chosenProduct) return;

  // Check if already in cart
  let itemFound = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity += 1;
      itemFound = true;
      break;
    }
  }

  // If not found, add new item
  if (!itemFound) {
    cart.push({
      id: chosenProduct.id,
      title: chosenProduct.title,
      price: chosenProduct.price,
      thumbnail: chosenProduct.thumbnail,
      quantity: 1
    });
  }

  updateCartUI();
};

// --- 5. Cart Functionality: Remove from Cart ---
window.removeFromCart = function (productId) {
  const updatedCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== productId) {
      updatedCart.push(cart[i]);
    }
  }
  cart = updatedCart;
  updateCartUI();
};

// --- 6. Update Cart UI using Loops ---
function updateCartUI() {
  // Calculate total items and total price using loop
  let totalCount = 0;
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalCount += cart[i].quantity;
    totalPrice += cart[i].price * cart[i].quantity;
  }

  // Update badge and total
  cartCountBadge.textContent = totalCount;
  cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

  // Populate cart items drawer
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your cart is currently empty.</p>`;
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const row = document.createElement("div");
    row.classList.add("cart-item-row");
    row.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-img" />
      <div class="cart-item-info">
        <h5>${item.title}</h5>
        <p>$${item.price.toFixed(2)} &times; ${item.quantity}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">Delete</button>
    `;
    cartItemsContainer.appendChild(row);
  }
}

// --- 7. Cart Drawer Open / Close Events ---
cartToggleBtn.addEventListener("click", () => {
  cartModal.classList.add("open");
});

closeCartBtn.addEventListener("click", () => {
  cartModal.classList.remove("open");
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove("open");
  }
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add products first.");
    return;
  }
  alert("Order placed successfully!");
  cart = [];
  updateCartUI();
  cartModal.classList.remove("open");
});

// Run initial fetch on page load
fetchProducts();