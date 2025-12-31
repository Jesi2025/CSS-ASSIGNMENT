<<<<<<< HEAD
const addToCartButtons = document.querySelectorAll(".card .btn:first-child");
const cartList = document.querySelector(".cart-list");
const totalAmountEl = document.querySelector("aside div strong + div");
const clearBtn = document.querySelector(".btn.ghost");

let cart = [];
let total = 0;

function updateCartUI() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML =
      `<div style="color:var(--muted);font-size:14px">
        No items yet. Click "Add to cart".
      </div>`;
    totalAmountEl.textContent = "₹0";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.fontSize = "14px";
    div.style.marginBottom = "6px";

    div.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
    `;
    cartList.appendChild(div);
  });

  totalAmountEl.textContent = `₹${total}`;
}

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const name = card.querySelector("h3").textContent;
    const priceText = card.querySelector(".price").textContent;
    const price = Number(priceText.replace("₹", "").replace(",", ""));

    cart.push({ name, price });
    total += price;

    updateCartUI();
  });
});

clearBtn.addEventListener("click", () => {
  cart = [];
  total = 0;
  updateCartUI();
});
=======
// Select cart elements
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total span');
const clearBtn = document.querySelector('.cart-actions .btn.ghost');

// Keep cart items in an array
let cart = [];

// Function to render cart
function renderCart() {
  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="muted">No items yet. Click "Add to cart".</p>`;
    cartTotal.textContent = '₹0';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong> - ₹${item.price} x ${item.quantity}
      </div>
      <button class="btn ghost" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(div);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `₹${total}`;
}

// Function to add item to cart
function addToCart(id, name, price) {
  // Check if item is already in cart
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  renderCart();
}

// Add event listeners to "Add to cart" buttons
const addButtons = document.querySelectorAll('.products .card .btn:not(.ghost)');
addButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const name = card.querySelector('h3').textContent;
    const priceText = card.querySelector('.price').textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')); // FIXED
    addToCart(index, name, price);
  });
});


// Remove item from cart
cartList.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = Number(e.target.dataset.id);
    cart = cart.filter(item => item.id !== id);
    renderCart();
  }
});

// Clear cart
clearBtn.addEventListener('click', () => {
  cart = [];
  renderCart();
});


// Initial render
renderCart();
>>>>>>> f5171a0ab75ef93c34b32a92332f50b45dcb0e61
