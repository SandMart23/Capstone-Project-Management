// Script untuk menghubungkan halaman login dan signup
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menangani tombol login
    const loginButton = document.querySelector('.navbar-links .btn-primary');
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
    
    // Fungsi untuk menangani link signup
    const signupLink = document.querySelector('.navbar-links a[href="signup.html"]');
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }
    
    // Fungsi untuk menangani link dari login ke signup
    const signupFromLogin = document.querySelector('.signup-link a');
    if (signupFromLogin) {
        signupFromLogin.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }
    
    // Fungsi untuk menangani link dari signup ke login
    const loginFromSignup = document.querySelector('.login-link a');
    if (loginFromSignup) {
        loginFromSignup.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
    
    // Fungsi untuk menangani tombol kembali ke home
    const homeLink = document.querySelector('.navbar-logo a');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    // Fungsi untuk checkbox custom
    const checkboxes = document.querySelectorAll('.checkbox-custom');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
        });
    });
});