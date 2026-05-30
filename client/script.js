let cart = [];
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const cartBtn = document.querySelector('.cart-btn');
const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');

// Fetch products
fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image">💎</div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="brand">${product.brand}</p>
          <p>${product.description}</p>
        </div>
        <div class="product-footer">
          <span class="price">${product.price} ${product.currency}</span>
          <button class="add-btn">أضف</button>
        </div>
      `;
      card.querySelector('.add-btn').addEventListener('click', () => {
        cart.push(product);
        cartBtn.textContent = `🛒 السلة (${cart.length})`;
        alert(`تمت إضافة ${product.name} إلى السلة`);
      });
      productsContainer.appendChild(card);
    });
  })
  .catch(err => console.error('خطأ:', err));

cartBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  updateCart();
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>السلة فارغة</p>';
    return;
  }
  
  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement('div');
    cartItem.style.cssText = 'padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;';
    cartItem.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} درهم</span>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  
  const totalDiv = document.createElement('div');
  totalDiv.style.cssText = 'padding: 20px 0; font-weight: bold; font-size: 18px; color: #d4af37; border-top: 2px solid #d4af37;';
  totalDiv.textContent = `الإجمالي: ${total} درهم`;
  cartItemsContainer.appendChild(totalDiv);
}

document.querySelector('.checkout-btn').addEventListener('click', () => {
  alert('سيتم توجيهك لصفحة الدفع الآمنة بـ Stripe');
});