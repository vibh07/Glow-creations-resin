document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Header Injection
    const headerPlaceholder = document.getElementById("universal-header");

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <!-- FIXED HEADER CONTAINER (Z-Index: 40) -->
            <div class="fixed top-0 left-0 right-0 z-[40] bg-[#fcfdfa]/95 dark:bg-[#1a2111]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all shadow-sm">
                <div class="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
                    
                    <!-- Left: Logo -->
                    <a href="index.html" class="flex items-center gap-2 group text-decoration-none">
                        <div class="w-9 h-9 rounded-full bg-[#74b814] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                            G
                        </div>
                        <h1 class="text-xl font-serif font-bold tracking-tight text-[#151b0e] dark:text-white">
                            Glow<span class="text-[#74b814]">.</span>
                        </h1>
                    </a>
                    
                    <!-- Right: Actions -->
                    <div class="flex items-center gap-3">
                        
                        <!-- 1. Search Button -->
                        <button id="nav-search-btn" class="w-10 h-10 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:scale-105 transition-transform shadow-sm">
                            <span class="material-symbols-outlined text-[22px]">search</span>
                        </button>
                        
                        <!-- 2. Wishlist Button (NEW ADDED) -->
                        <a href="wishlist.html" class="w-10 h-10 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-red-500 hover:scale-105 transition-all shadow-sm group">
                            <span class="material-symbols-outlined text-[22px] group-hover:filled transition-all">favorite</span>
                        </a>

                        <!-- 3. Profile Button -->
                        <a href="orders.html" class="w-10 h-10 rounded-full bg-[#151b0e] dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                             <span class="material-symbols-outlined text-[20px]">person</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- SPACER DIV -->
            <div class="h-[72px] w-full"></div>

            <!-- SEARCH OVERLAY -->
            <div id="search-overlay" class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300">
                <div class="bg-white dark:bg-[#1a2111] w-full p-4 rounded-b-3xl shadow-xl transform -translate-y-full transition-transform duration-300" id="search-container">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-gray-400">search</span>
                        <input type="text" id="global-search-input" placeholder="Search rings, pendants..." class="flex-1 bg-transparent border-none focus:ring-0 text-lg text-black dark:text-white placeholder-gray-400 font-medium h-12 outline-none">
                        <button id="close-search" class="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500 hover:bg-gray-200">
                            <span class="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        initializeSearch();
    }
});

// Search Logic Function
function initializeSearch() {
    const searchBtn = document.getElementById('nav-search-btn');
    const overlay = document.getElementById('search-overlay');
    const container = document.getElementById('search-container');
    const closeBtn = document.getElementById('close-search');
    const input = document.getElementById('global-search-input');

    if (!searchBtn || !overlay) return;

    // Open Search
    searchBtn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            container.classList.remove('-translate-y-full');
            if(input) input.focus();
        }, 10);
    });

    // Close Search Logic
    const closeSearch = () => {
        overlay.classList.add('opacity-0');
        container.classList.add('-translate-y-full');
        setTimeout(() => {
            overlay.classList.add('hidden');
            if(input) input.value = ''; 
        }, 300);
    };

    if(closeBtn) closeBtn.addEventListener('click', closeSearch);
    
    // Close on clicking outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSearch();
    });

    // Enter Key se Search
    if(input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = input.value.trim();
                if (query) {
                    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}
// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('glowCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('glowWishlist')) || [];
let orders = JSON.parse(localStorage.getItem('glowOrders')) || [];

// --- CATEGORY DATA ---
// --- CATEGORY DATA (Updated with Real Photos & New Order) ---
const categoryData = [
    {         name: "Rings", 
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200", 
        link: "shop.html?cat=ring"     },
    {         name: "Pendants", 
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=200", 
        link: "shop.html?cat=pendant"     },
    {         name: "Bracelets", 
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=200", 
        link: "shop.html?cat=bracelet"     },
    {         name: "Bangles", 
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=200", 
        link: "shop.html?cat=bangle"     },
    {         name: "Keychains", 
        image: "https://images.unsplash.com/photo-1588444650733-d0767b753fc8?auto=format&fit=crop&q=80&w=200", 
        link: "shop.html?cat=keychain"     },
    {         name: "Mangalsutra", 
        image: "https://images.unsplash.com/photo-1610663428236-d44a2c51010c?auto=format&fit=crop&q=80&w=200", 
        link: "shop.html?cat=mangalsutra"
    },    {         name: "Keepsakes", 
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=200", 
        link: "shop.html?cat=keepsake"     },
    {         name: "Frames", 
        image: "https://images.unsplash.com/photo-1583095117917-06df9a1415df?auto=format&fit=crop&q=80&w=200", 
        link: "shop.html?cat=frame"     }
];

// --- UTILITY FUNCTIONS ---
const saveCart = () => { 
    localStorage.setItem('glowCart', JSON.stringify(cart)); 
    updateCartCount(); 
    // Render immediately to ensure target exists for animation
    renderFloatingCartUI();
};
const saveWishlist = () => { localStorage.setItem('glowWishlist', JSON.stringify(wishlist)); };
const saveOrders = () => { localStorage.setItem('glowOrders', JSON.stringify(orders)); };

const updateCartCount = () => {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const headerCount = document.getElementById('header-cart-count');
    if(headerCount) headerCount.innerText = `${count}`;
};

// --- ANIMATION ENGINE ---
const animateFlyToCart = (startElement) => {
    // 1. Find the Image source (Product Image)
    const card = startElement.closest('.group') || startElement.closest('.bg-white') || startElement.closest('.relative');
    const sourceImg = card ? card.querySelector('img') : null;
    
    // 2. Find the Target (The Image Box inside Floating Cart)
    const targetImgBox = document.getElementById('floating-cart-img-target');

    if (sourceImg && targetImgBox) {
        // Get positions
        const startRect = sourceImg.getBoundingClientRect();
        const endRect = targetImgBox.getBoundingClientRect();

        // Create the flying image clone
        const flyingImg = sourceImg.cloneNode();
        flyingImg.style.position = 'fixed';
        flyingImg.style.left = `${startRect.left}px`;
        flyingImg.style.top = `${startRect.top}px`;
        flyingImg.style.width = `${startRect.width}px`;
        flyingImg.style.height = `${startRect.height}px`;
        flyingImg.style.borderRadius = '1rem';
        flyingImg.style.zIndex = '9999'; 
        flyingImg.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'; // Snappy smooth
        flyingImg.style.opacity = '1';
        flyingImg.style.pointerEvents = 'none';
        flyingImg.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.3)'; // Shadow for depth
        
        document.body.appendChild(flyingImg);

        // Trigger Animation (Next Frame)
        requestAnimationFrame(() => {
            flyingImg.style.left = `${endRect.left}px`;
            flyingImg.style.top = `${endRect.top}px`;
            flyingImg.style.width = `${endRect.width}px`; // Match target size
            flyingImg.style.height = `${endRect.height}px`;
            flyingImg.style.borderRadius = '0.5rem'; // Match target radius
            flyingImg.style.opacity = '0.8';
        });

        // Cleanup after animation finishes
        setTimeout(() => {
            flyingImg.remove();
            // Scale effect on the target image box
            targetImgBox.classList.add('animate-pop');
            setTimeout(() => targetImgBox.classList.remove('animate-pop'), 200);
        }, 600);
    }
};

// --- ACTION FUNCTIONS ---
window.addToCart = (productId, quantity = 1) => {
    // Capture the click event to find the button
    const clickEvent = window.event;
    const clickedElement = clickEvent ? clickEvent.target : null;

    if (typeof products === 'undefined') return console.error("Data not loaded!");
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === parseInt(productId));
    if (existingItem) { existingItem.quantity += quantity; } else { cart.push({ ...product, quantity: quantity }); }
    
    saveCart(); // This renders the floating UI
    
    // Trigger Animation if element found
    if (clickedElement) {
        animateFlyToCart(clickedElement);
    }

    if(navigator.vibrate) navigator.vibrate(50);
    if (window.location.pathname.includes('cart.html')) renderCart();
};

window.toggleWishlist = (productId) => {
    const index = wishlist.findIndex(id => id === parseInt(productId));
    if (index > -1) { wishlist.splice(index, 1); } else { wishlist.push(parseInt(productId)); }
    saveWishlist();
    if (window.location.pathname.includes('wishlist.html')) renderWishlist();
    if (window.location.pathname.includes('shop.html')) renderShop();
};

window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== parseInt(productId));
    saveCart();
    renderCart();
};

window.updateQuantity = (productId, change) => {
    const item = cart.find(item => item.id === parseInt(productId));
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) { removeFromCart(productId); return; }
        saveCart();
        renderCart();
    }
};

window.processCheckout = () => {
    if(cart.length === 0) return alert("Your cart is empty!");
    const newOrder = {
        id: Math.floor(Math.random() * 90000) + 10000,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: "Processing"
    };
    orders.unshift(newOrder); saveOrders();
    cart = []; saveCart();
    alert("Order placed successfully! Redirecting to orders...");
    window.location.href = 'orders.html';
};


// --- BLINKIT STYLE FLOATING CART UI ---
const renderFloatingCartUI = () => {
    let container = document.getElementById('floating-ui-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'floating-ui-container';
        // Bottom padding increased to 115px for gap
        container.className = 'fixed bottom-[115px] left-0 right-0 z-40 px-4 flex flex-col gap-2 pointer-events-none transition-all duration-300';
        document.body.appendChild(container);
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeDeliveryThreshold = 500;
    const isFreeDelivery = subtotal >= freeDeliveryThreshold;
    const amountNeeded = freeDeliveryThreshold - subtotal;
    const lastItem = cart.length > 0 ? cart[cart.length - 1] : null;

    if (totalItems === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '';

    // 1. Free Delivery Pill
    if (isFreeDelivery) {
        html += `
        <div class="pointer-events-auto mx-auto animate-slide-up-fade">
            <div class="bg-white/95 dark:bg-[#1a2111]/95 backdrop-blur-md border border-green-500/30 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-white text-[14px] font-bold">check</span>
                </div>
                <div>
                    <p class="text-xs font-bold text-[#151b0e] dark:text-white leading-none">Yay! You got FREE Delivery</p>
                    <p class="text-[10px] text-gray-500 leading-none mt-0.5">No coupon needed</p>
                </div>
                <button onclick="document.getElementById('floating-ui-container').firstElementChild.remove()" class="ml-2 text-gray-400 hover:text-gray-600">
                    <span class="material-symbols-outlined text-[16px]">close</span>
                </button>
            </div>
        </div>`;
    } else {
        html += `
        <div class="pointer-events-auto mx-auto animate-slide-up-fade">
            <div class="bg-white/95 dark:bg-[#1a2111]/95 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-gray-200 dark:bg-white/20 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-gray-500 dark:text-white text-[14px]">local_shipping</span>
                </div>
                <p class="text-xs font-bold text-[#151b0e] dark:text-white">Add <span class="text-primary">₹${amountNeeded}</span> for Free Delivery</p>
            </div>
        </div>`;
    }

    // 2. Floating Cart Bar
    html += `
    <div onclick="window.location.href='cart.html'" class="pointer-events-auto mt-1 cursor-pointer animate-bounce-soft">
        <div class="bg-[#151b0e] dark:bg-white text-white dark:text-[#151b0e] rounded-2xl p-3 shadow-xl flex items-center justify-between relative overflow-hidden group">
            
            <!-- Left Side: Image & Info -->
            <div class="flex items-center gap-3 z-10">
                <!-- TARGET FOR ANIMATION (Left Image Box) -->
                <div id="floating-cart-img-target" class="w-10 h-10 rounded-lg bg-white/10 dark:bg-black/10 overflow-hidden border border-white/10 relative transition-transform">
                    <img src="${lastItem ? lastItem.image : ''}" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col">
                    <span class="text-xs font-medium opacity-80">${totalItems} Items</span>
                    <span class="text-sm font-bold">₹${subtotal}</span>
                </div>
            </div>

            <!-- Right Side: View Cart -->
            <div class="flex items-center gap-2 z-10">
                <span class="text-sm font-bold">View Cart</span>
                <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                   <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
                </div>
            </div>

            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
    </div>
    <style>
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounceSoft { 0%, 100% { transform: scale(1); } 50% { transform: scale(0.98); } }
        @keyframes popScale { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .animate-slide-up-fade { animation: slideUpFade 0.3s ease-out forwards; }
        .animate-bounce-soft { animation: bounceSoft 0.2s ease-in-out; }
        .animate-pop { animation: popScale 0.2s ease-out; }
    </style>
    `;

    container.innerHTML = html;
};


// --- BOTTOM NAVIGATION & MODAL RENDERER ---
const toggleCategoryModal = (show) => {
    const modal = document.getElementById('category-modal');
    const overlay = document.getElementById('cat-overlay');
    const sheet = document.getElementById('cat-sheet');
    
    if (show) {
        modal.classList.remove('hidden');
        setTimeout(() => { overlay.classList.remove('opacity-0'); sheet.classList.remove('translate-y-full'); }, 10);
    } else {
        overlay.classList.add('opacity-0'); sheet.classList.add('translate-y-full');
        setTimeout(() => { modal.classList.add('hidden'); }, 300);
    }
};

const renderCategoryModal = () => {
    if(document.getElementById('category-modal')) return;
    
    // Exact colors from your reference image
    const greenBannerBg = "#EDF7E0"; 
    const greenIconBg = "#D4E8B8";
    
    const modalHTML = `
    <div id="category-modal" class="hidden relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div id="cat-overlay" onclick="toggleCategoryModal(false)" class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-0 ease-in-out"></div>
        
        <!-- Bottom Sheet Container -->
        <div id="cat-sheet" class="fixed bottom-0 left-0 right-0 z-[101] w-full bg-white dark:bg-[#1a2111] rounded-t-[2.5rem] shadow-2xl transform translate-y-full transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) max-h-[90vh] overflow-hidden flex flex-col">
            
            <!-- Handle Bar -->
            <div class="w-full flex justify-center pt-3 pb-1" onclick="toggleCategoryModal(false)">
                <div class="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-white/20"></div>
            </div>

            <!-- Content Scrollable Area -->
            <div class="px-6 pb-8 overflow-y-auto no-scrollbar">
                
                <!-- Header -->
                <div class="flex items-start justify-between mb-8 mt-4">
                    <div>
                        <h3 class="text-4xl font-serif font-bold text-[#151b0e] dark:text-white tracking-tight mb-1">Explore</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Select a category to view</p>
                    </div>
                    <!-- Close Button -->
                    <button onclick="toggleCategoryModal(false)" class="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors">
                        <span class="material-symbols-outlined text-[20px] font-bold">close</span>
                    </button>
                </div>

                <!-- Grid Layout (4 Columns) -->
                <div class="grid grid-cols-4 gap-x-4 gap-y-6">
                    ${categoryData.map((cat, index) => `
                    <a href="${cat.link}" class="group flex flex-col items-center gap-2 animate-slide-up" style="animation-delay: ${index * 30}ms">
                        <!-- Image Container (Squircle) -->
                        <div class="relative w-[19vw] h-[19vw] max-w-[80px] max-h-[80px] sm:w-20 sm:h-20 rounded-[1.2rem] overflow-hidden bg-black shadow-sm group-hover:shadow-md transition-all duration-300 group-active:scale-95">
                            <img src="${cat.image}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="${cat.name}">
                        </div>
                        <!-- Label -->
                        <span class="text-[11px] sm:text-xs font-bold text-center text-gray-600 dark:text-gray-300 tracking-wide group-hover:text-[#151b0e] dark:group-hover:text-white transition-colors">${cat.name}</span>
                    </a>`).join('')}
                </div>

                <!-- Green "Custom Orders" Banner -->
                <div class="mt-8 rounded-2xl p-4 flex items-center justify-between cursor-pointer group hover:opacity-90 transition-opacity" style="background-color: ${greenBannerBg};">
                   <div class="flex items-center gap-4">
                      <!-- Diamond Icon Box -->
                      <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background-color: ${greenIconBg};">
                         <span class="material-symbols-outlined filled text-[#5e9610] text-[22px]">diamond</span>
                      </div>
                      <!-- Text -->
                      <div>
                         <h4 class="font-bold text-[#151b0e] text-sm leading-tight">Custom Orders?</h4>
                         <p class="text-[10px] text-gray-600 font-medium mt-0.5 leading-tight">We create personalized resin art just for you.</p>
                      </div>
                   </div>
                   <!-- Arrow -->
                   <span class="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform text-sm">arrow_forward_ios</span>
                </div>
                
                <!-- Extra Space for Bottom Nav -->
                <div class="h-20"></div>
            </div>
        </div>
    </div>
    <style>
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } 
        .animate-slide-up { animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; } 
        .no-scrollbar::-webkit-scrollbar { display: none; } 
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

const renderBottomNav = () => {
    const placeholder = document.getElementById('bottom-nav-placeholder');
    if (!placeholder) return;
    renderCategoryModal();
    renderFloatingCartUI(); // Init Cart UI

    const path = window.location.pathname;
    const page = path.split("/").pop() || "home.html";
    const navItems = [
        { name: "Home", icon: "home", action: () => window.location.href = 'home.html', isActive: ["home.html", "index.html"].some(p => page.includes(p)) },
        { name: "Shop", icon: "storefront", action: () => window.location.href = 'shop.html', isActive: ["shop.html", "product.html", "cart.html", "wishlist.html"].some(p => page.includes(p)) },
        { name: "Category", icon: "category", action: () => toggleCategoryModal(true), isActive: false },
        { name: "My Order", icon: "inventory_2", action: () => window.location.href = 'orders.html', isActive: ["orders.html"].some(p => page.includes(p)) }
    ];

    let navHTML = `<div class="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pb-safe"><div class="w-full max-w-md bg-white/95 dark:bg-[#1a2111]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl shadow-black/10 p-2 flex items-center justify-between gap-1">`;
    navItems.forEach((item, index) => {
        if (item.isActive) {
            navHTML += `<button id="nav-btn-${index}" class="flex flex-col items-center justify-center w-20 py-2 rounded-[1.5rem] bg-primary/10 text-primary transition-all shadow-sm"><span class="material-symbols-outlined filled text-[24px]">${item.icon}</span><span class="text-[10px] font-extrabold tracking-wide mt-0.5">${item.name}</span></button>`;
        } else {
            navHTML += `<button id="nav-btn-${index}" class="flex flex-col items-center justify-center w-16 gap-1 text-gray-400 dark:text-gray-500 hover:text-primary transition-colors group"><span class="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">${item.icon}</span><span class="text-[10px] font-bold tracking-wide">${item.name}</span></button>`;
        }
    });
    navHTML += `</div></div>`;
    placeholder.innerHTML = navHTML;
    navItems.forEach((item, index) => { const btn = document.getElementById(`nav-btn-${index}`); if(btn) btn.onclick = item.action; });
};


// --- RENDER FUNCTIONS ---
const renderShop = () => {
    const container = document.getElementById('shop-grid');
    if (!container) return;
    const params = new URLSearchParams(window.location.search);
    const catFilter = params.get('cat');
    let displayProducts = products;
    if (catFilter) {
        displayProducts = products.filter(p => p.category.toLowerCase().replace(/\s/g, '').includes(catFilter));
        const title = document.querySelector('h1');
        if(title) title.innerText = catFilter.charAt(0).toUpperCase() + catFilter.slice(1);
    }
    if(displayProducts.length === 0) { container.innerHTML = `<div class="col-span-full text-center py-10">No products found in this category.</div>`; return; }
    container.innerHTML = displayProducts.map(product => {
        const isSaved = wishlist.includes(product.id);
        return `<div class="bg-white dark:bg-white/5 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative group transition-transform hover:-translate-y-1 duration-300"><button onclick="toggleWishlist(${product.id})" class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm ${isSaved ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors shadow-sm"><span class="material-symbols-outlined text-[18px] ${isSaved ? 'filled' : ''}">favorite</span></button><a href="product.html?id=${product.id}" class="block aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 relative"><img src="${product.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"></a><div class="px-1"><h3 class="text-sm font-bold text-[#151b0e] dark:text-white leading-tight mb-1 truncate">${product.name}</h3><div class="flex items-center justify-between mt-2"><div class="flex flex-col"><span class="text-xs text-gray-400 line-through">₹${product.originalPrice}</span><span class="text-base font-extrabold text-primary">₹${product.price}</span></div><button onclick="addToCart(${product.id})" class="w-8 h-8 rounded-lg bg-[#151b0e] dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform shadow-md"><span class="material-symbols-outlined text-[20px]">add</span></button></div></div></div>`;
    }).join('');
};

const renderProductDetail = () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);
    if (!product) return;
    const imgEl = document.getElementById('pd-image-main'); if(imgEl) imgEl.style.backgroundImage = `url('${product.image}')`;
    const titleEl = document.getElementById('pd-title'); if(titleEl) titleEl.innerText = product.name;
    const priceEl = document.getElementById('pd-price'); if(priceEl) priceEl.innerText = `₹${product.price}`;
    const totalEl = document.getElementById('pd-total-price'); if(totalEl) totalEl.innerText = `₹${product.price}`;
    const btn = document.getElementById('pd-add-btn'); if(btn) btn.onclick = () => addToCart(product.id, 1);
};

const renderCart = () => {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    if (cart.length === 0) { container.innerHTML = `<div class="flex flex-col items-center justify-center py-10 opacity-60"><span class="material-symbols-outlined text-6xl mb-2">shopping_bag</span><p>Your bag is empty</p><a href="shop.html" class="mt-4 text-primary font-bold underline">Start Shopping</a></div>`; updateCartTotals(); return; }
    container.innerHTML = cart.map(item => `<div class="flex gap-4 rounded-2xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-gray-100 dark:border-white/5"><div class="aspect-square w-24 rounded-lg bg-gray-100 overflow-hidden shrink-0"><img src="${item.image}" class="h-full w-full object-cover"></div><div class="flex flex-1 flex-col justify-between py-1"><div><div class="flex justify-between items-start"><h3 class="font-bold text-[#151b0e] dark:text-white leading-tight line-clamp-2">${item.name}</h3><button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-500 p-1"><span class="material-symbols-outlined text-[20px]">close</span></button></div><p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${item.category}</p></div><div class="flex items-center justify-between"><div class="flex items-center rounded-lg border border-gray-200 dark:border-white/10 h-8"><button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-full flex items-center justify-center hover:bg-gray-50"><span class="material-symbols-outlined text-[16px]">remove</span></button><input class="w-8 bg-transparent text-center text-sm font-bold border-none p-0 focus:ring-0" readonly type="number" value="${item.quantity}"/><button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-full flex items-center justify-center hover:bg-gray-50"><span class="material-symbols-outlined text-[16px]">add</span></button></div><p class="text-base font-bold text-primary">₹${item.price * item.quantity}</p></div></div></div>`).join('');
    updateCartTotals();
};

const updateCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;
    const setSafe = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
    setSafe('cart-subtotal', `₹${subtotal}`); setSafe('cart-tax', `₹${tax}`); setSafe('cart-total', `₹${total}`); setSafe('cart-footer-total', `₹${total}`);
};

const renderWishlist = () => {
    const container = document.getElementById('wishlist-grid');
    if (!container) return;
    if (wishlist.length === 0) { container.innerHTML = `<div class="col-span-full flex flex-col items-center justify-center py-20 opacity-50"><span class="material-symbols-outlined text-6xl mb-4">favorite_border</span><p class="text-lg font-bold">Your wishlist is empty</p><a href="shop.html" class="mt-2 text-sm text-primary font-bold">Explore products</a></div>`; return; }
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));
    container.innerHTML = wishlistProducts.map(product => `<div class="bg-white dark:bg-white/5 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative group"><button onclick="toggleWishlist(${product.id})" class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-colors"><span class="material-symbols-outlined text-[18px]">close</span></button><a href="product.html?id=${product.id}" class="block aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3"><img src="${product.image}" class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"></a><div class="px-1"><h3 class="text-sm font-bold text-[#151b0e] dark:text-white leading-tight mb-1 truncate">${product.name}</h3><div class="flex items-center justify-between mt-2"><span class="text-base font-extrabold text-primary">₹${product.price}</span><button onclick="addToCart(${product.id})" class="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Add</button></div></div></div>`).join('');
    const headerCount = document.querySelector('h1 span.text-primary'); if(headerCount) headerCount.innerText = `(${wishlist.length})`;
};

const renderOrders = () => {
    const container = document.getElementById('orders-list');
    if (!container) return;
    if (orders.length === 0) { container.innerHTML = `<div class="text-center py-12 text-gray-400"><span class="material-symbols-outlined text-5xl mb-2">inventory_2</span><p>No orders yet</p></div>`; return; }
    container.innerHTML = orders.map(order => `<div class="bg-white dark:bg-white/5 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-4"><div class="flex justify-between items-start mb-3"><div class="flex gap-3"><div class="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0"><img src="${order.items[0].image}" class="w-full h-full object-cover"></div><div><span class="px-2 py-0.5 rounded text-[10px] font-bold ${order.status === 'Processing' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-700'} uppercase tracking-wide">${order.status}</span><h4 class="font-bold text-sm mt-1">${order.items[0].name} ${order.items.length > 1 ? `<span class="text-gray-400 font-normal">+${order.items.length - 1} more</span>` : ''}</h4><p class="text-xs text-gray-500">Order #${order.id} • ${order.date}</p></div></div><span class="font-bold text-primary">₹${order.total}</span></div><div class="pt-3 border-t border-gray-100 dark:border-white/5 flex gap-2"><button class="flex-1 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5">Track Order</button></div></div>`).join('');
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    updateCartCount();
    renderBottomNav(); 
    if (path.includes('shop.html')) renderShop();
    if (path.includes('product.html')) renderProductDetail();
    if (path.includes('cart.html')) renderCart();
    if (path.includes('wishlist.html')) renderWishlist();
    if (path.includes('orders.html')) renderOrders();
    const checkoutBtn = document.getElementById('checkout-btn');
    if(checkoutBtn) checkoutBtn.addEventListener('click', processCheckout);
});