document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Header Injection
    const headerPlaceholder = document.getElementById("universal-header");

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <!-- FIXED HEADER CONTAINER (Z-Index: 40) -->
            <div class="fixed top-0 left-0 right-0 z-[40] bg-[#fcfdfa]/95 dark:bg-[#1a2111]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all shadow-sm">
                <div class="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
                    
                    <!-- Left: Logo -->
                    <a href="home.html" class="flex items-center gap-2 group text-decoration-none">
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
                        
                        <!-- 2. Wishlist Button -->
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

    searchBtn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            container.classList.remove('-translate-y-full');
            if(input) input.focus();
        }, 10);
    });

    const closeSearch = () => {
        overlay.classList.add('opacity-0');
        container.classList.add('-translate-y-full');
        setTimeout(() => {
            overlay.classList.add('hidden');
            if(input) input.value = ''; 
        }, 300);
    };

    if(closeBtn) closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    
    if(input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = input.value.trim();
                if (query) window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
}

// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('glowCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('glowWishlist')) || [];
let orders = JSON.parse(localStorage.getItem('glowOrders')) || [];

// --- CATEGORY DATA ---
const categoryData = [
    { name: "Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200", link: "shop.html?cat=ring" },
    { name: "Pendants", image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=200", link: "shop.html?cat=pendant" },
    { name: "Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=200", link: "shop.html?cat=bracelet" },
    { name: "Bangles", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=200", link: "shop.html?cat=bangle" },
    { name: "Keychains", image: "https://images.unsplash.com/photo-1588444650733-d0767b753fc8?auto=format&fit=crop&q=80&w=200", link: "shop.html?cat=keychain" },
    { name: "Mangalsutra", image: "https://images.unsplash.com/photo-1610663428236-d44a2c51010c?auto=format&fit=crop&q=80&w=200", link: "shop.html?cat=mangalsutra" },
    { name: "Keepsakes", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=200", link: "shop.html?cat=keepsake" },
    { name: "Frames", image: "https://images.unsplash.com/photo-1583095117917-06df9a1415df?auto=format&fit=crop&q=80&w=200", link: "shop.html?cat=frame" }
];

// --- UTILITY FUNCTIONS ---
const saveCart = () => { localStorage.setItem('glowCart', JSON.stringify(cart)); updateCartCount(); renderFloatingCartUI(); };
const saveWishlist = () => { localStorage.setItem('glowWishlist', JSON.stringify(wishlist)); };
const saveOrders = () => { localStorage.setItem('glowOrders', JSON.stringify(orders)); };

const updateCartCount = () => {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const headerCount = document.getElementById('header-cart-count');
    if(headerCount) headerCount.innerText = `${count}`;
};

// --- ANIMATION ENGINE ---
const animateFlyToCart = (startElement) => {
    const card = startElement.closest('.group') || startElement.closest('.bg-white') || startElement.closest('.relative');
    const sourceImg = card ? card.querySelector('img') : null;
    const targetImgBox = document.getElementById('floating-cart-img-target');

    if (sourceImg && targetImgBox) {
        const startRect = sourceImg.getBoundingClientRect();
        const endRect = targetImgBox.getBoundingClientRect();
        const flyingImg = sourceImg.cloneNode();
        
        flyingImg.style.position = 'fixed';
        flyingImg.style.left = `${startRect.left}px`;
        flyingImg.style.top = `${startRect.top}px`;
        flyingImg.style.width = `${startRect.width}px`;
        flyingImg.style.height = `${startRect.height}px`;
        flyingImg.style.borderRadius = '1rem';
        flyingImg.style.zIndex = '9999'; 
        flyingImg.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        flyingImg.style.opacity = '1';
        flyingImg.style.pointerEvents = 'none';
        flyingImg.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.3)';
        
        document.body.appendChild(flyingImg);
        requestAnimationFrame(() => {
            flyingImg.style.left = `${endRect.left}px`;
            flyingImg.style.top = `${endRect.top}px`;
            flyingImg.style.width = `${endRect.width}px`;
            flyingImg.style.height = `${endRect.height}px`;
            flyingImg.style.borderRadius = '0.5rem';
            flyingImg.style.opacity = '0.8';
        });

        setTimeout(() => {
            flyingImg.remove();
            targetImgBox.classList.add('animate-pop');
            setTimeout(() => targetImgBox.classList.remove('animate-pop'), 200);
        }, 600);
    }
};

// --- ACTION FUNCTIONS ---
window.addToCart = (productId, quantity = 1) => {
    const clickEvent = window.event;
    const clickedElement = clickEvent ? clickEvent.target : null;

    if (typeof products === 'undefined') return console.error("Data not loaded!");
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === parseInt(productId));
    if (existingItem) { existingItem.quantity += quantity; } else { cart.push({ ...product, quantity: quantity }); }
    
    saveCart();
    if (clickedElement) animateFlyToCart(clickedElement);
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


// --- FLOATING CART UI ---
const renderFloatingCartUI = () => {
    let container = document.getElementById('floating-ui-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'floating-ui-container';
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
    if (isFreeDelivery) {
        html += `
        <div class="pointer-events-auto mx-auto animate-slide-up-fade">
            <div class="bg-white/95 dark:bg-[#1a2111]/95 backdrop-blur-md border border-green-500/30 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-white text-[14px] font-bold">check</span></div>
                <div><p class="text-xs font-bold text-[#151b0e] dark:text-white leading-none">Yay! You got FREE Delivery</p><p class="text-[10px] text-gray-500 leading-none mt-0.5">No coupon needed</p></div>
                <button onclick="document.getElementById('floating-ui-container').firstElementChild.remove()" class="ml-2 text-gray-400 hover:text-gray-600"><span class="material-symbols-outlined text-[16px]">close</span></button>
            </div>
        </div>`;
    } else {
        html += `
        <div class="pointer-events-auto mx-auto animate-slide-up-fade">
            <div class="bg-white/95 dark:bg-[#1a2111]/95 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-gray-200 dark:bg-white/20 flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-gray-500 dark:text-white text-[14px]">local_shipping</span></div>
                <p class="text-xs font-bold text-[#151b0e] dark:text-white">Add <span class="text-primary">₹${amountNeeded}</span> for Free Delivery</p>
            </div>
        </div>`;
    }

    html += `
    <div onclick="window.location.href='cart.html'" class="pointer-events-auto mt-1 cursor-pointer animate-bounce-soft">
        <div class="bg-[#151b0e] dark:bg-white text-white dark:text-[#151b0e] rounded-2xl p-3 shadow-xl flex items-center justify-between relative overflow-hidden group">
            <div class="flex items-center gap-3 z-10">
                <div id="floating-cart-img-target" class="w-10 h-10 rounded-lg bg-white/10 dark:bg-black/10 overflow-hidden border border-white/10 relative transition-transform"><img src="${lastItem ? lastItem.image : ''}" class="w-full h-full object-cover"></div>
                <div class="flex flex-col"><span class="text-xs font-medium opacity-80">${totalItems} Items</span><span class="text-sm font-bold">₹${subtotal}</span></div>
            </div>
            <div class="flex items-center gap-2 z-10"><span class="text-sm font-bold">View Cart</span><div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><span class="material-symbols-outlined text-[18px]">shopping_bag</span></div></div>
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
    </style>`;
    container.innerHTML = html;
};


// --- BOTTOM NAVIGATION & MODAL ---
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
    const greenBannerBg = "#EDF7E0"; 
    const greenIconBg = "#D4E8B8";
    
    const modalHTML = `
    <div id="category-modal" class="hidden relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div id="cat-overlay" onclick="toggleCategoryModal(false)" class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-0 ease-in-out"></div>
        <div id="cat-sheet" class="fixed bottom-0 left-0 right-0 z-[101] w-full bg-white dark:bg-[#1a2111] rounded-t-[2.5rem] shadow-2xl transform translate-y-full transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) max-h-[90vh] overflow-hidden flex flex-col">
            <div class="w-full flex justify-center pt-3 pb-1" onclick="toggleCategoryModal(false)"><div class="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-white/20"></div></div>
            <div class="px-6 pb-8 overflow-y-auto no-scrollbar">
                <div class="flex items-start justify-between mb-8 mt-4">
                    <div><h3 class="text-4xl font-serif font-bold text-[#151b0e] dark:text-white tracking-tight mb-1">Explore</h3><p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Select a category to view</p></div>
                    <button onclick="toggleCategoryModal(false)" class="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"><span class="material-symbols-outlined text-[20px] font-bold">close</span></button>
                </div>
                <div class="grid grid-cols-4 gap-x-4 gap-y-6">
                    ${categoryData.map((cat, index) => `
                    <a href="${cat.link}" class="group flex flex-col items-center gap-2 animate-slide-up" style="animation-delay: ${index * 30}ms">
                        <div class="relative w-[19vw] h-[19vw] max-w-[80px] max-h-[80px] sm:w-20 sm:h-20 rounded-[1.2rem] overflow-hidden bg-black shadow-sm group-hover:shadow-md transition-all duration-300 group-active:scale-95"><img src="${cat.image}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="${cat.name}"></div>
                        <span class="text-[11px] sm:text-xs font-bold text-center text-gray-600 dark:text-gray-300 tracking-wide group-hover:text-[#151b0e] dark:group-hover:text-white transition-colors">${cat.name}</span>
                    </a>`).join('')}
                </div>
                <div class="mt-8 rounded-2xl p-4 flex items-center justify-between cursor-pointer group hover:opacity-90 transition-opacity" style="background-color: ${greenBannerBg};">
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background-color: ${greenIconBg};"><span class="material-symbols-outlined filled text-[#5e9610] text-[22px]">diamond</span></div>
                      <div><h4 class="font-bold text-[#151b0e] text-sm leading-tight">Custom Orders?</h4><p class="text-[10px] text-gray-600 font-medium mt-0.5 leading-tight">We create personalized resin art just for you.</p></div>
                   </div>
                   <span class="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform text-sm">arrow_forward_ios</span>
                </div>
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
    renderFloatingCartUI();

    const path = window.location.pathname;
    const page = path.split("/").pop() || "home.html";
    const navItems = [
        { name: "Home", icon: "home", action: () => window.location.href = 'home.html', isActive: ["home.html", "home.html"].some(p => page.includes(p)) },
        { name: "Shop", icon: "storefront", action: () => window.location.href = 'shop.html', isActive: ["shop.html", "product.html", "cart.html", "wishlist.html"].some(p => page.includes(p)) },
        { name: "Category", icon: "category", action: () => toggleCategoryModal(true), isActive: false },
        { name: "My Order", icon: "inventory_2", action: () => window.location.href = 'orders.html', isActive: ["orders.html"].some(p => page.includes(p)) }
    ];

    let navHTML = `<div class="fixed bottom-4 left-0 right-0 z-[50] flex justify-center px-4 pb-safe pointer-events-none"><div class="pointer-events-auto w-full max-w-md bg-white/95 dark:bg-[#1a2111]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl shadow-black/10 p-2 flex items-center justify-between gap-1">`;
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


// --- RENDER FUNCTIONS FOR PAGES ---
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


// --- FOOTER RENDERER (NEW ADDED) ---
// --- FOOTER RENDERER (Mobile Optimized & Fixed Icons) ---
const renderFooter = () => {
    if (document.getElementById('universal-footer')) return;
    
    // Fixed Social Icons (SVG Paths defined properly)
    const generateSocialIcon = (platform) => {
        let path = '';
        // Solid fill icons for better visibility
        if(platform === 'facebook') path = `<path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>`;
        if(platform === 'instagram') path = `<path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>`;
        if(platform === 'twitter') path = `<path fill="currentColor" d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658 4.196 4.196 0 0 0 1.839-2.315 8.386 8.386 0 0 1-2.655 1.015 4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.89-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>`;
        if(platform === 'pinterest') path = `<path fill="currentColor" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>`;
        
        return `<a href="#" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#74b814] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                ${path}
            </svg>
        </a>`;
    };

    const footerHTML = `
    <!-- PB-36 ensures content is not hidden behind floating bottom nav -->
    <footer id="universal-footer" class="bg-[#f9fafb] dark:bg-[#0d1108] border-t border-gray-200 dark:border-white/5 pt-12 pb-36 md:pb-10 text-[#151b0e] dark:text-gray-300 font-display transition-colors mt-auto">
        <div class="max-w-7xl mx-auto px-5">
            
            <!-- Mobile Optimized Grid: 
                 - Brand Info full width
                 - Shop & Help side-by-side (2 cols) on mobile
                 - Company full width or part of grid
            -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 mb-10">
                
                <!-- 1. Brand Section (Spans 2 cols on mobile for better focus) -->
                <div class="col-span-2 md:col-span-1 space-y-4">
                    <a href="home.html" class="flex items-center gap-2 group text-decoration-none">
                        <div class="w-9 h-9 rounded-full bg-[#74b814] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">G</div>
                        <h2 class="text-2xl font-serif font-bold tracking-tight text-[#151b0e] dark:text-white">
                            Glow<span class="text-[#74b814]">.</span>
                        </h2>
                    </a>
                    <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                        Handcrafted resin art made with love. Preserving memories in crystal clear beauty.
                    </p>
                    <!-- Icons Row -->
                    <div class="flex gap-3 mt-4">
                        ${generateSocialIcon('instagram')}
                        ${generateSocialIcon('facebook')}
                        ${generateSocialIcon('twitter')}
                    </div>
                </div>

                <!-- 2. Shop Links -->
                <div class="col-span-1">
                    <h3 class="font-bold text-[#151b0e] dark:text-white mb-4 text-base">Shop</h3>
                    <ul class="space-y-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="shop.html?cat=ring" class="hover:text-[#74b814] transition-colors block py-1">Rings</a></li>
                        <li><a href="shop.html?cat=pendant" class="hover:text-[#74b814] transition-colors block py-1">Pendants</a></li>
                        <li><a href="shop.html?cat=keychain" class="hover:text-[#74b814] transition-colors block py-1">Keychains</a></li>
                        <li><a href="shop.html?cat=frame" class="hover:text-[#74b814] transition-colors block py-1">Frames</a></li>
                    </ul>
                </div>

                <!-- 3. Help Links -->
                <div class="col-span-1">
                    <h3 class="font-bold text-[#151b0e] dark:text-white mb-4 text-base">Support</h3>
                    <ul class="space-y-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="#" class="hover:text-[#74b814] transition-colors block py-1">Shipping</a></li>
                        <li><a href="#" class="hover:text-[#74b814] transition-colors block py-1">Returns</a></li>
                        <li><a href="#" class="hover:text-[#74b814] transition-colors block py-1">Track Order</a></li>
                        <li><a href="#" class="hover:text-[#74b814] transition-colors block py-1">FAQs</a></li>
                    </ul>
                </div>

                <!-- 4. Company/Contact (Spans 2 cols on mobile to fill gap) -->
                <div class="col-span-2 md:col-span-1">
                    <h3 class="font-bold text-[#151b0e] dark:text-white mb-4 text-base">Contact</h3>
                    <ul class="space-y-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <li class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-sm">mail</span>
                            <a href="mailto:hello@glow.com" class="hover:text-[#74b814] transition-colors">hello@glow.com</a>
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-sm">call</span>
                            <span>+91 98765 43210</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-sm">location_on</span>
                            <span>Mumbai, India</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200 dark:border-white/10 my-8"></div>

            <!-- Bottom Copyright -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 pb-4 text-center md:text-left">
                <p>&copy; 2025 Glow Creations.</p>
                <div class="flex gap-6 justify-center">
                    <a href="#" class="hover:text-[#74b814] transition-colors">Privacy</a>
                    <a href="#" class="hover:text-[#74b814] transition-colors">Terms</a>
                </div>
            </div>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
};

// --- INIT (INITIALIZATION) ---
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    // Header & Search Init runs at top of file automatically due to event listener
    updateCartCount();
    renderBottomNav(); 
    renderFooter(); // Footer Injection Call

    if (path.includes('shop.html')) renderShop();
    if (path.includes('product.html')) renderProductDetail();
    if (path.includes('cart.html')) renderCart();
    if (path.includes('wishlist.html')) renderWishlist();
    if (path.includes('orders.html')) renderOrders();

    const checkoutBtn = document.getElementById('checkout-btn');
    if(checkoutBtn) checkoutBtn.addEventListener('click', processCheckout);
});
