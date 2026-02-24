// AcademyC - Global UI Brain
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
    syncUI();
    setupTheme();
    setupMobile();
    if (typeof particlesJS !== 'undefined') setupHeroParticles();
});

function syncUI() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.getElementById('auth-buttons');
    const dropdown = document.querySelector('.dropdown-content');

    if (user) {
        // Hide elements that should only be visible when NOT logged in
        document.querySelectorAll('.auth-only-hidden').forEach(el => {
            el.style.display = 'none';
        });

        // Update Navbar Greeting
        if (authButtons) {
            authButtons.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; background: var(--bg-light); padding: 5px 15px; border-radius: 50px; border: 1px solid var(--border);">
                    <span style="font-weight: 700; font-size: 14px; color: var(--text-dark);">Hola, ${user.name.split(' ')[0]} 👋</span>
                    <button onclick="logout()" class="btn btn-primary" style="padding: 6px 12px; font-size: 11px;">Salir</button>
                </div>
            `;
        }
        // Show ONLY Profile Link when logged in
        if (dropdown) {
            dropdown.innerHTML = `
                <a href="perfil.html" style="font-weight: 800; color: var(--primary);"><i class="fas fa-user-circle"></i> Mi Perfil</a>
            `;
        }
    } else {
        // Show default links when logged out
        if (dropdown) {
            dropdown.innerHTML = `
                <a href="registrarse.html">Registrarse</a>
                <a href="iniciarsesion.html">Iniciar Sesión</a>
            `;
        }
    }
}

function setupTheme() {
    const btn = document.getElementById('theme-toggle');
    const icon = btn?.querySelector('i');
    const updateIcon = (theme) => { if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'; };
    
    updateIcon(document.documentElement.getAttribute('data-theme'));

    if (btn) {
        btn.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon(next);
        });
    }
}

function setupMobile() {
    const btn = document.getElementById('mobile-btn');
    const nav = document.getElementById('main-nav');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('show');
            btn.querySelector('i').classList.toggle('fa-bars');
            btn.querySelector('i').classList.toggle('fa-times');
        });
    }
}

function setupHeroParticles() {
    if (!document.getElementById('particles-js')) return;
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80 },
            "color": { "value": "#ffffff" },
            "opacity": { "value": 0.2 },
            "size": { "value": 3 },
            "line_linked": { "enable": true, "distance": 150, "opacity": 0.1 },
            "move": { "enable": true, "speed": 2 }
        },
        "interactivity": {
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
        }
    });
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
