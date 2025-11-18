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
