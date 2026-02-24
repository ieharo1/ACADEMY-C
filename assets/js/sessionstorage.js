// AcademyC - Advanced User-Linked Cart
function getCartKey() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? `cart_${user.email}` : 'temp_cart';
}

document.addEventListener('DOMContentLoaded', () => {
    const btnPagar = document.getElementById("pagar");
    const btnTodos = document.getElementById("todos");
    if (btnPagar) btnPagar.addEventListener("click", pagar);
    if (btnTodos) btnTodos.addEventListener("click", borrarTodos);
    
    window.addEventListener("storage", mostrar);
    mostrar();
});

function addCourse(plan, price) {
    const key = getCartKey();
    let cart = JSON.parse(localStorage.getItem(key) || '{}');
    cart[price] = (cart[price] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(cart));
    mostrar();
    
    const cartSection = document.querySelector('.cart-section');
    if (cartSection) cartSection.scrollIntoView({ behavior: 'smooth' });
}

function mostrar() {
    const cajadatos = document.getElementById("cajadatos");
    const valorcarrito = document.getElementById("valorcarrito");
    const totalPriceEl = document.getElementById("total-price");
    
    if (!cajadatos) return;

    const cart = JSON.parse(localStorage.getItem(getCartKey()) || '{}');
    cajadatos.innerHTML = '';
    let total = 0, hasItems = false;

    for (const price in cart) {
        if (cart[price] <= 0) continue;
        hasItems = true;
        total += parseFloat(price) * cart[price];
        const name = price == "9.99" ? "Plan Mensual" : (price == "26.99" ? "Plan Semestral" : "Plan Anual");

        cajadatos.innerHTML += `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid var(--border); background:var(--card-bg); margin-bottom:10px; border-radius:12px;">
                <div style="text-align:left;">
                    <strong style="display:block; color:var(--text-dark);">${name}</strong>
                    <span style="color:var(--text-muted); font-size:14px;">$${price} x ${cart[price]}</span>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                    <button class="btn-icon" onclick="updateQty('${price}', -1)" style="border:1px solid var(--border);"><i class="fas fa-minus"></i></button>
                    <span style="font-weight:800; color:var(--text-dark);">${cart[price]}</span>
                    <button class="btn-icon" onclick="updateQty('${price}', 1)" style="border:1px solid var(--border);"><i class="fas fa-plus"></i></button>
                    <button class="btn-icon" onclick="removeItem('${price}')" style="color:#ef4444;"><i class="fas fa-trash"></i></button>
                </div>
            </div>`;
    }

    if (!hasItems) {
        cajadatos.innerHTML = '<p style="color:var(--text-muted); padding:30px;">Tu carrito está vacío</p>';
        if (valorcarrito) valorcarrito.style.display = 'none';
    } else {
        if (valorcarrito) valorcarrito.style.display = 'block';
        if (totalPriceEl) totalPriceEl.innerText = `$${total.toFixed(2)}`;
    }
}

function updateQty(price, change) {
    const key = getCartKey();
    let cart = JSON.parse(localStorage.getItem(key) || '{}');
    cart[price] = Math.max(0, (cart[price] || 0) + change);
    if (cart[price] === 0) delete cart[price];
    localStorage.setItem(key, JSON.stringify(cart));
    mostrar();
}

function removeItem(price) {
    if (confirm("¿Quitar plan?")) {
        const key = getCartKey();
        let cart = JSON.parse(localStorage.getItem(key) || '{}');
        delete cart[price];
        localStorage.setItem(key, JSON.stringify(cart));
        mostrar();
    }
}

function borrarTodos() {
    if (confirm("¿Vaciar carrito?")) {
        localStorage.removeItem(getCartKey());
        mostrar();
    }
}

function pagar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) { alert("Inicia sesión para pagar."); window.location.href = 'iniciarsesion.html'; return; }

    const cart = JSON.parse(localStorage.getItem(getCartKey()) || '{}');
    let total = 0;
    for (const p in cart) total += parseFloat(p) * cart[p];
    
    const finalTotal = total * 1.12;
    const cajadatos = document.getElementById("cajadatos");
    cajadatos.innerHTML = `
        <div style="padding:30px; text-align:left; background:var(--bg-light); border-radius:12px; color:var(--text-dark);">
            <h3 style="margin-bottom:15px; font-weight:800;">Resumen de Compra</h3>
            <p>Usuario: ${user.name}</p>
            <p style="display:flex; justify-content:space-between; font-size:20px; font-weight:800; margin-top:15px; color:var(--primary);">Total (IVA inc.): <span>$${finalTotal.toFixed(2)}</span></p>
            <button class="btn btn-primary" style="width:100%; margin-top:20px;" onclick="alert('Pedido procesado!'); localStorage.removeItem(getCartKey()); window.location.href='index.html';">Confirmar Pago</button>
        </div>`;
    document.getElementById("valorcarrito").style.display = 'none';
}
