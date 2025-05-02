// File: js/auth.js

// Fungsi untuk menyimpan user ke cookie
function saveUserToCookie(user) {
    // Convert user object to string
    const userData = JSON.stringify(user);
    
    // Encrypt data (simple encryption for demonstration)
    const encryptedData = btoa(userData);
    
    // Set cookie with encrypted data (expires in 30 days)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    
    document.cookie = `userData=${encryptedData}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
}

// Fungsi untuk mendapatkan user dari cookie
function getUserFromCookie() {
    const cookies = document.cookie.split(';');
    let userData = null;
    
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'userData' && value) {
            try {
                // Decrypt data
                const decryptedData = atob(value);
                userData = JSON.parse(decryptedData);
            } catch (error) {
                console.error('Error parsing user data from cookie:', error);
                deleteUserCookie(); // Delete invalid cookie
            }
            break;
        }
    }
    
    return userData;
}

// Fungsi untuk menghapus user cookie (logout)
function deleteUserCookie() {
    document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Fungsi untuk menyimpan daftar user di localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Fungsi untuk menyimpan user baru ke localStorage
// PERBAIKAN: Jangan simpan ke cookie saat pendaftaran, hanya ke localStorage
function saveUser(name, email, password) {
    const users = getUsers();
    // Hash password sederhana (Catatan: ini bukan metode aman untuk produksi)
    const hashedPassword = hashPassword(password);
    
    // Simpan user baru
    users.push({ name, email, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));
    
    // PERBAIKAN: Jangan simpan ke cookie saat pendaftaran
    // Pengguna harus login terlebih dahulu
    
    return { name, email };
}

// Fungsi untuk hash password (sederhana, bukan untuk produksi)
function hashPassword(password) {
    // Dalam aplikasi produksi, gunakan metode hashing yang lebih aman
    // Ini hanya ilustrasi sederhana
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16); // Convert to hex string
}

// Fungsi untuk validasi login
function validateLogin(email, password) {
    const users = getUsers();
    const hashedPassword = hashPassword(password);
    
    const user = users.find(user => user.email === email && user.password === hashedPassword);
    
    if (user) {
        // Jika login berhasil, simpan info user ke cookie (tanpa password)
        const userInfo = {
            name: user.name,
            email: user.email
        };
        
        saveUserToCookie(userInfo);
    }
    
    return user;
}

// Fungsi untuk memeriksa apakah email sudah terdaftar
function isEmailRegistered(email) {
    const users = getUsers();
    return users.some(user => user.email === email);
}

// Fungsi untuk memeriksa apakah user sudah login
function isLoggedIn() {
    return getUserFromCookie() !== null;
}

// Fungsi untuk mendapatkan info user yang sedang login
function getCurrentUser() {
    return getUserFromCookie();
}

// Fungsi untuk logout
function logout() {
    deleteUserCookie();
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    window.location.href = 'login.html';
}