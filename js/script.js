// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
}

// Login Form Validation and Handling
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Clear previous errors
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
    
    // Basic validation
    if (!email || !password) {
        showError(errorDiv, 'Please fill in all fields');
        return false;
    }
    
    if (!validateEmail(email)) {
        showError(errorDiv, 'Please enter a valid email address');
        return false;
    }
    
    if (password.length < 6) {
        showError(errorDiv, 'Password must be at least 6 characters');
        return false;
    }
    
    // Simulate login (in real app, this would be an API call)
    // Demo credentials: email@test.com / password123
    if (email === 'email@test.com' && password === 'password123') {
        // Store user session
        sessionStorage.setItem('userLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        
        // Show success message
        alert('Login successful! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
    } else {
        showError(errorDiv, 'Invalid email or password. Try: email@test.com / password123');
    }
    
    return false;
}

// Registration Form Handling
function handleRegistration(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('registerError');
    
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
    
    // Validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
        showError(errorDiv, 'Please fill in all fields');
        return false;
    }
    
    if (!validateEmail(email)) {
        showError(errorDiv, 'Please enter a valid email address');
        return false;
    }
    
    if (password.length < 6) {
        showError(errorDiv, 'Password must be at least 6 characters');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError(errorDiv, 'Passwords do not match');
        return false;
    }
    
    // Simulate registration
    sessionStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userName', fullName);
    
    alert('Registration successful! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
    
    return false;
}

// Booking Form Handling
function handleBooking(event) {
    event.preventDefault();
    
    const carModel = document.getElementById('carModel').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const rentalPeriod = document.getElementById('rentalPeriod').value;
    const branch = document.getElementById('branch').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const errorDiv = document.getElementById('bookingError');
    
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
    
    // Validation
    if (!carModel || !pickupDate || !returnDate || !rentalPeriod || !branch) {
        showError(errorDiv, 'Please fill in all rental details');
        return false;
    }
    
    // Date validation
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (pickup < today) {
        showError(errorDiv, 'Pickup date cannot be in the past');
        return false;
    }
    
    if (returnD <= pickup) {
        showError(errorDiv, 'Return date must be after pickup date');
        return false;
    }

    // Calculate rental cost
    const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    const carPrices = {
        'tesla-model3': 89,
        'nissan-leaf': 65,
        'hyundai-kona': 75,
        'chevrolet-bolt': 70,
        'volkswagen-id4': 80,
        'bmw-i4': 95
    };
    
    // Store booking details
    const booking = {
        id: 'BK' + Date.now(),
        carModel: carModel,
        pickupDate: pickupDate,
        returnDate: returnDate,
        rentalPeriod: rentalPeriod,
        branch: branch,
        totalCost: totalCost.toFixed(2),
        status: 'Confirmed',
        bookingDate: new Date().toISOString()
    };

    // Redirect to dashboard if logged in, otherwise to login
    if (sessionStorage.getItem('userLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'login.html';
    }
    
    return false;
}

// Contact Form Handling
function handleContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const errorDiv = document.getElementById('contactError');
    const successDiv = document.getElementById('contactSuccess');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    if (!name || !email || !subject || !message) {
        showError(errorDiv, 'Please fill in all fields');
        return false;
    }
    
    if (!validateEmail(email)) {
        showError(errorDiv, 'Please enter a valid email address');
        return false;
    }
    
    // Clear form
    event.target.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
    
    return false;
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Calculate rental price dynamically
function calculateRentalPrice() {
    const pickupDate = document.getElementById('pickupDate')?.value;
    const returnDate = document.getElementById('returnDate')?.value;
    const carModel = document.getElementById('carModel')?.value;
    const rentalPeriod = document.getElementById('rentalPeriod')?.value;
    const priceDisplay = document.getElementById('priceDisplay');
    
    if (!pickupDate || !returnDate || !carModel || !priceDisplay) return;
    
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    
    if (returnD <= pickup) {
        priceDisplay.innerHTML = '<div class="alert alert-warning">Please select valid dates</div>';
        return;
    }
    
    const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    
    const carPrices = {
        'tesla-model3': 89,
        'nissan-leaf': 65,
        'hyundai-kona': 75,
        'chevrolet-bolt': 70,
        'volkswagen-id4': 80,
        'bmw-i4': 95
    };
    
    let dailyRate = carPrices[carModel] || 75;
    let totalCost = days * dailyRate;
    let discount = 0;
    
    if (rentalPeriod === 'weekly' && days >= 7) {
        discount = 10;
        totalCost = totalCost * 0.9;
    } else if (rentalPeriod === 'monthly' && days >= 30) {
        discount = 20;
        totalCost = totalCost * 0.8;
    }
    
    let html = `
        <div class="alert alert-info">
            <strong>Rental Summary:</strong><br>
            Duration: ${days} day(s)<br>
            Daily Rate: $${dailyRate}<br>
            ${discount > 0 ? `Discount: ${discount}%<br>` : ''}
            <strong>Total Cost: $${totalCost.toFixed(2)}</strong>
        </div>
    `;
    
    priceDisplay.innerHTML = html;
}

// Set minimum date for date inputs (today)
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    if (pickupDate) {
        pickupDate.setAttribute('min', today);
        pickupDate.addEventListener('change', () => {
            if (returnDate) {
                returnDate.setAttribute('min', pickupDate.value);
            }
            calculateRentalPrice();
        });
    }
    
    if (returnDate) {
        returnDate.setAttribute('min', today);
        returnDate.addEventListener('change', calculateRentalPrice);
    }
}

// Format credit card number input
function formatCreditCard(input) {
    let value = input.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue.substring(0, 19); // 16 digits + 3 spaces
}

// Format expiry date
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Check authentication status
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    const userEmail = sessionStorage.getItem('userEmail');
    
    // Update navigation if logged in
    const loginLink = document.querySelector('.btn-login');
    if (loginLink && isLoggedIn) {
        loginLink.textContent = 'Dashboard';
        loginLink.href = 'dashboard.html';
    }
    
    return { isLoggedIn, userEmail };
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        alert('You have been logged out successfully.');
        window.location.href = 'index.html';
    }
}

// Load user bookings for dashboard
function loadUserBookings() {
    const bookings = JSON.parse(sessionStorage.getItem('userBookings') || '[]');
    const bookingsContainer = document.getElementById('bookingsContainer');
    
    if (!bookingsContainer) return;
    
    if (bookings.length === 0) {
        bookingsContainer.innerHTML = '<p style="text-align: center; color: #6b7280;">No bookings found. <a href="booking.html">Make your first reservation!</a></p>';
        return;
    }
    
    const carNames = {
        'tesla-model3': 'Tesla Model 3',
        'nissan-leaf': 'Nissan Leaf',
        'hyundai-kona': 'Hyundai Kona Electric',
        'chevrolet-bolt': 'Chevrolet Bolt EV',
        'volkswagen-id4': 'Volkswagen ID.4',
        'bmw-i4': 'BMW i4'
    };
    
    let html = `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Car Model</th>
                        <th>Pickup Date</th>
                        <th>Return Date</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    bookings.forEach(booking => {
        html += `
            <tr>
                <td><strong>${booking.id}</strong></td>
                <td>${carNames[booking.carModel] || booking.carModel}</td>
                <td>${new Date(booking.pickupDate).toLocaleDateString()}</td>
                <td>${new Date(booking.returnDate).toLocaleDateString()}</td>
                <td><strong>$${booking.totalCost}</strong></td>
                <td><span class="badge badge-success">${booking.status}</span></td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    bookingsContainer.innerHTML = html;
}

// Load dashboard stats
function loadDashboardStats() {
    const bookings = JSON.parse(sessionStorage.getItem('userBookings') || '[]');
    
    const totalBookingsEl = document.getElementById('totalBookings');
    const activeRentalsEl = document.getElementById('activeRentals');
    const totalSpentEl = document.getElementById('totalSpent');
    
    if (totalBookingsEl) totalBookingsEl.textContent = bookings.length;
    
    if (activeRentalsEl) {
        const activeCount = bookings.filter(b => b.status === 'Confirmed').length;
        activeRentalsEl.textContent = activeCount;
    }
    
    if (totalSpentEl) {
        const total = bookings.reduce((sum, b) => sum + parseFloat(b.totalCost), 0);
        totalSpentEl.textContent = '$' + total.toFixed(2);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    checkAuth();
    
    // Set minimum dates for date inputs
    setMinDate();
    
    // Add event listeners for price calculation
    const carModel = document.getElementById('carModel');
    const rentalPeriod = document.getElementById('rentalPeriod');
    
    if (carModel) carModel.addEventListener('change', calculateRentalPrice);
    if (rentalPeriod) rentalPeriod.addEventListener('change', calculateRentalPrice);
    
    // Credit card formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => formatCreditCard(e.target));
    }
    
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', (e) => formatExpiryDate(e.target));
    }
    
    // Load dashboard data if on dashboard page
    if (document.getElementById('bookingsContainer')) {
        const { isLoggedIn } = checkAuth();
        if (!isLoggedIn) {
            alert('Please login to view your dashboard.');
            window.location.href = 'login.html';
        } else {
            loadDashboardStats();
            loadUserBookings();
            
            // Display user email
            const userEmail = sessionStorage.getItem('userEmail');
            const userEmailEl = document.getElementById('userEmail');
            if (userEmailEl && userEmail) {
                userEmailEl.textContent = userEmail;
            }
        }
    }
    
    // Pre-fill car selection from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const carParam = urlParams.get('car');
    if (carParam && carModel) {
        carModel.value = carParam;
        calculateRentalPrice();
    }
});

// Car Selection Function (for index page)
function selectCar(carId) {
    // Store selected car in sessionStorage
    sessionStorage.setItem('selectedCar', carId);
    
    // Redirect to reservation page with car parameter
    window.location.href = `reserve.html?car=${carId}`;
}

// Smooth Scroll for Scroll Indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .car-card, .process-step');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});