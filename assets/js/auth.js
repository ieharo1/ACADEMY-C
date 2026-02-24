// AcademyC - Authentication & Session Sync
(function seedUser() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const demoEmail = 'admin@academyc.com';
    if (!users.find(u => u.email === demoEmail)) {
        users.push({ name: 'Usuario Demo', email: demoEmail, password: 'password123' });
        localStorage.setItem('users', JSON.stringify(users));
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // --- LOGIN ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Merge temporary cart to user cart
                const tempCart = JSON.parse(localStorage.getItem('temp_cart') || '{}');
                if (Object.keys(tempCart).length > 0) {
                    const userCartKey = `cart_${user.email}`;
                    const userCart = JSON.parse(localStorage.getItem(userCartKey) || '{}');
                    // Combine quantities
                    for (const price in tempCart) {
                        userCart[price] = (userCart[price] || 0) + tempCart[price];
                    }
                    localStorage.setItem(userCartKey, JSON.stringify(userCart));
                    localStorage.removeItem('temp_cart');
                }

                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert('Credenciales incorrectas.');
            }
        });
    }

    // --- REGISTER ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            if (password.length < 6) { alert('Mínimo 6 caracteres.'); return; }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === email)) { alert('Email ya registrado.'); return; }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('¡Cuenta creada! Inicia sesión ahora.');
            window.location.href = 'iniciarsesion.html';
        });
    }
});
