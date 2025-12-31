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
