function signIn() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  
  if (email === "test@example.com" && password === "1234") {
      alert("Sign in successful!");
      window.location.href = "home.html";
  } else {
      alert("Invalid credentials!");
  }
}

function signOut() {
  window.location.href = "index.html";
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, quantity, imageUrl) {
  console.log(`Adding ${name} to cart`);
  const item = {
    name: name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    image: imageUrl 
  };
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));


  alert(`${name} added to cart!`); // ✅ Show success alert
  displayCartItems(); // 🔄 Refresh cart items
  
}

function displayCartItems() {
  const cartItemDetails = document.querySelector('.cart-item-details');
  if (!cartItemDetails) return;

  cartItemDetails.innerHTML = ''; // Clear previous items
  cart= JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemDetails.innerHTML = '<p>Your cart is empty.</p>';
  } 
  else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <p>${item.name}</p>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemDetails.appendChild(itemDiv);
    });
  }

  updateTotal();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  displayCartItems();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('total').innerText = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', displayCartItems);
