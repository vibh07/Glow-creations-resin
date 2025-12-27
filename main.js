let hasCelebrated = false; // Taaki celebration sirf ek baar ho jab ₹500 reach ho
// // --- 0. SCROLLBAR HIDE CSS ---
const style = document.createElement('style');
style.innerHTML = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;
document.head.appendChild(style);

// --- 1. HEADER INJECTION & SEARCH ---
// --- 1. HEADER INJECTION & SEARCH ---
document.addEventListener("DOMContentLoaded", () => {
    const headerPlaceholder = document.getElementById("universal-header");
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <!-- Modified Height: h-[60px] on mobile, h-[72px] on desktop -->
            <div class="fixed top-0 left-0 right-0 z-[40] bg-[#fcfdfa]/95 dark:bg-[#1a2111]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all shadow-sm h-[60px] md:h-[72px] flex items-center">
                <div class="flex items-center justify-between px-4 w-full max-w-7xl mx-auto">
                    <a href="home.html" class="flex items-center gap-2 group text-decoration-none">
                        <!-- Smaller Logo: w-8 h-8 on mobile -->
                        <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#74b814] flex items-center justify-center text-white font-serif font-bold text-base md:text-lg shadow-sm group-hover:scale-105 transition-transform">G</div>
                        <h1 class="text-lg md:text-xl font-serif font-bold tracking-tight text-[#151b0e] dark:text-white">Glow<span class="text-[#74b814]">.</span></h1>
                    </a>
                    <div class="flex items-center gap-2 md:gap-3">
                        <!-- Smaller Icons: w-8 h-8 on mobile -->
                        <button id="nav-search-btn" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:scale-105 transition-transform shadow-sm">
                            <span class="material-symbols-outlined text-[18px] md:text-[22px]">search</span>
                        </button>
                        <a href="wishlist.html" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-red-500 hover:scale-105 transition-all shadow-sm group">
                            <span class="material-symbols-outlined text-[18px] md:text-[22px] group-hover:filled transition-all">favorite</span>
                        </a>
                        <!-- Profile Button -->
                        <button onclick="toggleProfileModal(true)" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#151b0e] dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                            <span class="material-symbols-outlined text-[18px] md:text-[20px]">person</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="h-[60px] md:h-[72px] w-full"></div>
            <!-- Search Overlay (Same as before) -->
            <div id="search-overlay" class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300">
                <div class="bg-white dark:bg-[#1a2111] w-full p-4 rounded-b-3xl shadow-xl transform -translate-y-full transition-transform duration-300" id="search-container">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-gray-400">search</span>
                        <input type="text" id="global-search-input" placeholder="Search rings, pendants..." class="flex-1 bg-transparent border-none focus:ring-0 text-lg text-black dark:text-white placeholder-gray-400 font-medium h-12 outline-none">
                        <button id="close-search" class="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500 hover:bg-gray-200"><span class="material-symbols-outlined text-sm">close</span></button>
                    </div>
                </div>
            </div>`;
        initializeSearch();
    }
});

function initializeSearch() {
    const searchBtn = document.getElementById('nav-search-btn');
    const overlay = document.getElementById('search-overlay');
    const container = document.getElementById('search-container');
    const closeBtn = document.getElementById('close-search');
    const input = document.getElementById('global-search-input');

    if (!searchBtn || !overlay) return;

    searchBtn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        setTimeout(() => { overlay.classList.remove('opacity-0'); container.classList.remove('-translate-y-full'); if(input) input.focus(); }, 10);
    });
    const closeSearch = () => {
        overlay.classList.add('opacity-0'); container.classList.add('-translate-y-full');
        setTimeout(() => { overlay.classList.add('hidden'); if(input) input.value = ''; }, 300);
    };
    if(closeBtn) closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    if(input) { 
    input.addEventListener('keypress', (e) => { 
        if (e.key === 'Enter') { 
            const query = input.value.trim(); 
            if (query) {
                // Agar hum pehle se shop page par hain, toh direct filter karein bina reload ke
                if(window.location.pathname.includes('shop.html')) {
                    const newUrl = new URL(window.location);
                    newUrl.searchParams.set('search', query);
                    window.history.pushState({}, '', newUrl);
                    closeSearch();
                    renderShop(); // Instant Filter
                } else {
                    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
                }
            }
        } 
    }); 
}
}

// --- 2. STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('glowCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('glowWishlist')) || [];
let orders = JSON.parse(localStorage.getItem('glowOrders')) || [];
let currentSort = 'popular'; // SORTING STATE

// --- 3. CATEGORY DATA ---
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

// --- 4. UTILITY FUNCTIONS ---
const saveCart = () => { localStorage.setItem('glowCart', JSON.stringify(cart)); updateCartCount(); renderFloatingCartUI(); };
const saveWishlist = () => { localStorage.setItem('glowWishlist', JSON.stringify(wishlist)); };
const saveOrders = () => { localStorage.setItem('glowOrders', JSON.stringify(orders)); };

const updateCartCount = () => {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const headerCount = document.getElementById('header-cart-count');
    if(headerCount) headerCount.innerText = `${count}`;
};

// --- 5. ACTION FUNCTIONS (Add to Cart, etc.) ---
// --- 5. ACTION FUNCTIONS (Fixed Logic) ---
window.addToCart = (productId, quantity = 1) => {
    const clickEvent = window.event;
    const clickedElement = clickEvent ? clickEvent.target : null;

    if (typeof products === 'undefined') return console.error("Data not loaded!");
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    // --- LOGIC CHANGE HERE ---
    // Pehle check karo item exist karta hai kya
    const existingIndex = cart.findIndex(item => item.id === parseInt(productId));

    if (existingIndex > -1) { 
        // Agar item pehle se hai:
        // 1. Quantity badhao
        cart[existingIndex].quantity += quantity; 
        
        // 2. Item ko array ke beech se nikal kar END me daalo
        // Taaki Floating Cart me iski hi image dikhe (Latest Interaction)
        const itemToMove = cart.splice(existingIndex, 1)[0];
        cart.push(itemToMove);
    } else { 
        // Agar naya item hai to seedha end me push karo
        cart.push({ ...product, quantity: quantity }); 
    }
    // -------------------------

    saveCart(); // Ab ye last added item (updated wala) ki image dikhayega
    
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
window.removeFromCart = (productId) => { cart = cart.filter(item => item.id !== parseInt(productId)); saveCart(); renderCart(); };
window.updateQuantity = (productId, change) => {
    const item = cart.find(item => item.id === parseInt(productId));
    if (item) { item.quantity += change; if (item.quantity < 1) { removeFromCart(productId); return; } saveCart(); renderCart(); }
};
// Replace your existing processCheckout function

window.processCheckout = async () => {
    if(cart.length === 0) return alert("Your cart is empty!");
    
    const user = auth.currentUser;
    if(!user) return alert("Please Login to Place Order");

    const orderId = Math.floor(Math.random() * 90000) + 10000;
    const orderDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = { 
        id: orderId, 
        date: orderDate, 
        items: [...cart], 
        total: orderTotal, 
        status: "Processing",
        userId: user.uid,
        userEmail: user.email
    };

    // 1. Update Local Orders
    orders.unshift(newOrder); 
    saveOrders(); 
    
    try {
        // 2. SAVE ORDER TO DATABASE (users/UID/orders/ORDER_ID)
        await set(ref(db, 'users/' + user.uid + '/orders/' + orderId), newOrder);
        
        // Clear Cart
        cart = []; 
        saveCart(); 
        
        alert("Order placed successfully! Saved to Database."); 
        window.location.href = 'orders.html';

    } catch (error) {
        console.error("Order DB Error:", error);
        alert("Order placed locally (Sync error).");
        window.location.href = 'orders.html';
    }
};

// --- 6. ANIMATION ENGINE ---
const animateFlyToCart = (startElement) => {
    const card = startElement.closest('.group') || startElement.closest('.bg-white') || startElement.closest('.relative');
    const sourceImg = card ? card.querySelector('img') : null;
    const targetImgBox = document.getElementById('floating-cart-img-target');
    if (sourceImg && targetImgBox) {
        const startRect = sourceImg.getBoundingClientRect(); const endRect = targetImgBox.getBoundingClientRect();
        const flyingImg = sourceImg.cloneNode();
        flyingImg.style.cssText = `position:fixed;left:${startRect.left}px;top:${startRect.top}px;width:${startRect.width}px;height:${startRect.height}px;border-radius:1rem;z-index:9999;transition:all 0.6s cubic-bezier(0.2,0.8,0.2,1);opacity:1;pointer-events:none;`;
        document.body.appendChild(flyingImg);
        requestAnimationFrame(() => { flyingImg.style.cssText += `left:${endRect.left}px;top:${endRect.top}px;width:${endRect.width}px;height:${endRect.height}px;border-radius:0.5rem;opacity:0.8;`; });
        setTimeout(() => { flyingImg.remove(); targetImgBox.classList.add('animate-pop'); setTimeout(() => targetImgBox.classList.remove('animate-pop'), 200); }, 600);
    }
};

// --- 7. SORTING LOGIC (HERE IS THE FIX) ---
window.toggleSortModal = (show) => {
    const modal = document.getElementById('sort-modal');
    const overlay = document.getElementById('sort-overlay');
    const sheet = document.getElementById('sort-sheet');
    if (!modal) return;
    if (show) {
        modal.classList.remove('hidden');
        document.querySelectorAll('.sort-option').forEach(btn => {
            const isSelected = btn.dataset.value === currentSort;
            btn.classList.toggle('border-[#74b814]', isSelected);
            btn.classList.toggle('bg-[#f0fdf4]', isSelected);
            btn.querySelector('.check-icon').style.opacity = isSelected ? '1' : '0';
        });
        setTimeout(() => { overlay.classList.remove('opacity-0'); sheet.classList.remove('translate-y-full'); }, 10);
    } else {
        overlay.classList.add('opacity-0'); sheet.classList.add('translate-y-full');
        setTimeout(() => { modal.classList.add('hidden'); }, 300);
    }
};

window.applySort = (sortValue) => {
    currentSort = sortValue;
    const dot = document.getElementById('active-sort-dot');
    if(dot) dot.style.display = (sortValue === 'popular') ? 'none' : 'block';
    toggleSortModal(false);
    renderShop(); // Triggers re-render with sort
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- 8. SHOP TABS & FILTER (Fixed: No Re-render of Tabs) ---
// --- 1. RENDER TABS (Initial Load Only) ---
const renderShopTabs = () => {
    const container = document.getElementById('category-tabs-container');
    if (!container) return;

    const tabs = ["All", "Rings", "Pendants", "Bracelets", "Bangles", "Keychains", "Mangalsutra", "Keepsakes", "Frames"];
    const params = new URLSearchParams(window.location.search);
    const currentCat = params.get('cat') || "All";

    const activeClass = "bg-[#74b814] text-white border-[#74b814] font-bold shadow-md scale-105";
    const inactiveClass = "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10";

    container.innerHTML = `
        <div id="tabs-scroll-area" class="flex overflow-x-auto hide-scrollbar gap-3 px-4 py-3 select-none scroll-smooth">
            ${tabs.map(tab => {
                const isActive = (currentCat.toLowerCase() === 'all' && tab === 'All') || 
                                 (tab.toLowerCase().includes(currentCat.toLowerCase()) && currentCat !== 'All');

                return `
                <button 
                    onclick="filterShop('${tab}')"
                    style="transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);"
                    class="tab-button px-6 py-2 rounded-full border text-sm whitespace-nowrap snap-center transform-gpu will-change-transform ${isActive ? activeClass : inactiveClass}">
                    ${tab}
                </button>`;
            }).join('')}
        </div>
    `;

    // Page load par active tab ko center karein
    setTimeout(() => {
        const activeBtn = container.querySelector(".bg-\\[\\#74b814\\]");
        if(activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 100);
};

// --- 2. HANDLE CLICK (Super Smooth Update) ---
window.filterShop = (category) => {
    const newUrl = new URL(window.location);
    
    // Category click hote hi search ko delete kar do taaki filter sahi chale
    newUrl.searchParams.delete('search'); 

    if (category === 'All') {
        newUrl.searchParams.delete('cat');
    } else {
        let param = category.toLowerCase();
        // Keychains ke s ko mat hatana, baaki ko singular kar do
        if(param.endsWith('s') && param !== 'keychains') param = param.slice(0, -1); 
        newUrl.searchParams.set('cat', param);
    }
    window.history.pushState({}, '', newUrl);

    // UI update logic (Pehle wala hi hai, jo smooth chalta hai)
    const allBtns = document.querySelectorAll('.tab-button');
    const activeClasses = ["bg-[#74b814]", "text-white", "border-[#74b814]", "font-bold", "shadow-md", "scale-105"];
    const inactiveClasses = ["bg-white", "dark:bg-white/5", "text-gray-600", "dark:text-gray-300", "border-gray-200", "dark:border-white/10"];

    allBtns.forEach(btn => {
        if (btn.innerText.trim().toLowerCase() === category.toLowerCase()) {
            btn.classList.remove(...inactiveClasses);
            btn.classList.add(...activeClasses);
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            btn.classList.remove(...activeClasses);
            btn.classList.add(...inactiveClasses);
            btn.classList.remove("scale-105");
        }
    });

    renderShop(); // Products ko refresh karo
};

// --- 9. RENDER FUNCTIONS ---
const renderShop = () => {
    const container = document.getElementById('shop-grid');
    if (!container) return;
    
    const params = new URLSearchParams(window.location.search);
    const catFilter = params.get('cat');
    const searchQuery = params.get('search')?.toLowerCase().trim();
    const pageTitle = document.getElementById('shop-page-title');
    
    let displayProducts = [...products];

    // --- 1. SMART KEYWORD MAPPING ---
    const synonymMap = {
        "gift": ["keepsake", "frame", "pendant"],
        "jewellery": ["ring", "pendant", "bracelet", "bangle", "mangalsutra"],
        "jewelry": ["ring", "pendant", "bracelet", "bangle", "mangalsutra"],
        "ornament": ["ring", "pendant", "bracelet", "bangle"],
        "photo": ["frame", "keepsake"],
        "love": ["ring", "pendant", "floral"],
        "custom": ["keychain", "alphabet", "reveal"]
    };

    // --- 2. FILTERING LOGIC ---
    if (searchQuery) {
        if (pageTitle) pageTitle.innerText = `Results for "${searchQuery}"`;
        
        displayProducts = displayProducts.filter(p => {
            const name = p.name.toLowerCase();
            const cat = p.category.toLowerCase();
            const desc = (p.description || "").toLowerCase();
            
            // Check direct match in name, category or description
            const isDirectMatch = name.includes(searchQuery) || 
                                 cat.includes(searchQuery) || 
                                 desc.includes(searchQuery);
            
            // Check synonym match
            let isSynonymMatch = false;
            for (const key in synonymMap) {
                if (searchQuery.includes(key) || key.includes(searchQuery)) {
                    const relatedCats = synonymMap[key];
                    if (relatedCats.some(rc => cat.includes(rc) || name.includes(rc))) {
                        isSynonymMatch = true;
                        break;
                    }
                }
            }
            return isDirectMatch || isSynonymMatch;
        });
    } else if (catFilter) {
        displayProducts = displayProducts.filter(p => 
            p.category.toLowerCase().includes(catFilter.toLowerCase())
        );
        if (pageTitle) pageTitle.innerText = catFilter.charAt(0).toUpperCase() + catFilter.slice(1);
    } else {
        if (pageTitle) pageTitle.innerText = "Our Collection";
    }

    // --- 3. SORTING ---
    if (currentSort === 'low-high') displayProducts.sort((a, b) => a.price - b.price);
    else if (currentSort === 'high-low') displayProducts.sort((a, b) => b.price - a.price);
    else if (currentSort === 'newest') displayProducts.sort((a, b) => b.id - a.id);

    // --- 4. RENDER UI ---
    if (displayProducts.length === 0) {
        // Agar kuch na mile toh "You might also like" suggest karein (FallBack)
        const suggestions = products.slice(0, 4);
        container.innerHTML = `
            <div class="col-span-full py-12 text-center">
                <span class="material-symbols-outlined text-5xl text-gray-300 mb-2">search_off</span>
                <p class="text-gray-500 font-medium">indirect match for "${searchQuery}"</p>
                <button onclick="window.location.href='shop.html'" class="mt-3 text-primary font-bold underline">Clear Search</button>
                <div class="mt-12 text-left">
                    <h3 class="font-bold mb-4 px-2">People also searched for:</h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${suggestions.map(p => `<div onclick="window.location.href='product.html?id=${p.id}'" class="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                            <img src="${p.image}" class="aspect-square object-cover rounded-lg mb-2">
                            <p class="text-xs font-bold truncate">${p.name}</p>
                            <p class="text-primary font-bold text-xs">₹${p.price}</p>
                        </div>`).join('')}
                    </div>
                </div>
            </div>`;
        return;
    }

    container.innerHTML = displayProducts.map(product => {
        const isSaved = wishlist.includes(product.id);
        return `
        <div class="bg-white dark:bg-white/5 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative group animate-slide-up-fade">
            <button onclick="toggleWishlist(${product.id})" class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm ${isSaved ? 'text-red-500' : 'text-gray-400'} shadow-sm">
                <span class="material-symbols-outlined text-[18px] ${isSaved ? 'filled' : ''}">favorite</span>
            </button>
            <a href="product.html?id=${product.id}" class="block aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                <img src="${product.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </a>
            <div class="px-1">
                <h3 class="text-sm font-bold truncate">${product.name}</h3>
                <div class="flex items-center justify-between mt-2">
                    <span class="text-base font-extrabold text-[#74b814]">₹${product.price}</span>
                    <button onclick="addToCart(${product.id})" class="w-8 h-8 rounded-lg bg-[#151b0e] text-white flex items-center justify-center shadow-md">
                        <span class="material-symbols-outlined text-[20px]">add</span>
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
};

const renderCart = () => {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    if (cart.length === 0) { container.innerHTML = `<div class="flex flex-col items-center justify-center py-10 opacity-60"><span class="material-symbols-outlined text-6xl mb-2">shopping_bag</span><p>Your bag is empty</p><a href="shop.html" class="mt-4 text-primary font-bold underline">Start Shopping</a></div>`; updateCartTotals(); return; }
    container.innerHTML = cart.map(item => `<div class="flex gap-4 rounded-2xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-gray-100 dark:border-white/5"><div class="aspect-square w-24 rounded-lg bg-gray-100 overflow-hidden shrink-0"><img src="${item.image}" class="h-full w-full object-cover"></div><div class="flex flex-1 flex-col justify-between py-1"><div><div class="flex justify-between items-start"><h3 class="font-bold text-[#151b0e] dark:text-white leading-tight line-clamp-2">${item.name}</h3><button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-500 p-1"><span class="material-symbols-outlined text-[20px]">close</span></button></div><p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
    ${item.details ? 
      `Shape: ${item.details.shape} • Color: ${item.details.color}` : 
      item.category}
</p></div><div class="flex items-center justify-between"><div class="flex items-center rounded-lg border border-gray-200 dark:border-white/10 h-8"><button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-full flex items-center justify-center hover:bg-gray-50"><span class="material-symbols-outlined text-[16px]">remove</span></button><input class="w-8 bg-transparent text-center text-sm font-bold border-none p-0 focus:ring-0" readonly type="number" value="${item.quantity}"/><button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-full flex items-center justify-center hover:bg-gray-50"><span class="material-symbols-outlined text-[16px]">add</span></button></div><p class="text-base font-bold text-primary">₹${item.price * item.quantity}</p></div></div></div>`).join('');
    updateCartTotals();
};
const renderWishlist = () => {
    const container = document.getElementById('wishlist-grid');
    if (!container) return;
    if (wishlist.length === 0) { container.innerHTML = `<div class="col-span-full flex flex-col items-center justify-center py-20 opacity-50"><span class="material-symbols-outlined text-6xl mb-4">favorite_border</span><p class="text-lg font-bold">Your wishlist is empty</p><a href="shop.html" class="mt-2 text-sm text-primary font-bold">Explore products</a></div>`; return; }
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));
    container.innerHTML = wishlistProducts.map(product => `<div class="bg-white dark:bg-white/5 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative group"><button onclick="toggleWishlist(${product.id})" class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-colors"><span class="material-symbols-outlined text-[18px]">close</span></button><a href="product.html?id=${product.id}" class="block aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3"><img src="${product.image}" class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"></a><div class="px-1"><h3 class="text-sm font-bold text-[#151b0e] dark:text-white leading-tight mb-1 truncate">${product.name}</h3><div class="flex items-center justify-between mt-2"><span class="text-base font-extrabold text-primary">₹${product.price}</span><button onclick="addToCart(${product.id})" class="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Add</button></div></div></div>`).join('');
};
const renderOrders = () => {
    const container = document.getElementById('orders-list');
    if (!container) return;
    if (orders.length === 0) { container.innerHTML = `<div class="text-center py-12 text-gray-400"><span class="material-symbols-outlined text-5xl mb-2">inventory_2</span><p>No orders yet</p></div>`; return; }
    container.innerHTML = orders.map(order => `<div class="bg-white dark:bg-white/5 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-4"><div class="flex justify-between items-start mb-3"><div class="flex gap-3"><div class="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0"><img src="${order.items[0].image}" class="w-full h-full object-cover"></div><div><span class="px-2 py-0.5 rounded text-[10px] font-bold ${order.status === 'Processing' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-700'} uppercase tracking-wide">${order.status}</span><h4 class="font-bold text-sm mt-1">${order.items[0].name} ${order.items.length > 1 ? `<span class="text-gray-400 font-normal">+${order.items.length - 1} more</span>` : ''}</h4><p class="text-xs text-gray-500">Order #${order.id} • ${order.date}</p></div></div><span class="font-bold text-primary">₹${order.total}</span></div><div class="pt-3 border-t border-gray-100 dark:border-white/5 flex gap-2"><button class="flex-1 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5">Track Order</button></div></div>`).join('');
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

// --- 10. FLOATING UI & NAV ---
// --- 1. CELEBRATION LOGIC (Safe Version) ---
const triggerCelebration = () => {
    // Pehle check karein ki confetti library load hui hai ya nahi
    if (typeof confetti !== 'function') {
        console.log("Confetti library not loaded yet");
        return;
    }

    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#74b814', '#ffffff', '#ffd700']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#74b814', '#ffffff', '#ffd700']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};

// --- 2. FLOATING CART UI ---
// ==========================================
// FLOATING CART UI (Updated: Compact & Lower Position)
// ==========================================
const renderFloatingCartUI = () => {
    try {
        let container = document.getElementById('floating-ui-container');
        if (!container) { 
            container = document.createElement('div'); 
            container.id = 'floating-ui-container'; 
            
            // UPDATED POSITION:
            // bottom-[70px]: Mobile navigation bar ke just upar (Nav height ~60px + gap)
            // md:bottom-[85px]: Desktop ke liye thoda upar
            container.className = 'fixed bottom-[70px] md:bottom-[85px] left-0 right-0 z-40 px-4 flex flex-col items-center gap-1 pointer-events-none transition-all duration-300';            
            document.body.appendChild(container); 
        }
        
        if (typeof cart === 'undefined') return;

        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (totalItems === 0) { 
            container.innerHTML = ''; 
            localStorage.removeItem('glowHasCelebrated');
            return; 
        }
        
        const lastItem = cart[cart.length - 1];
        const isFree = subtotal >= 500;
        const alreadyCelebrated = localStorage.getItem('glowHasCelebrated') === 'true';

        // Celebration Logic
        if (isFree && !alreadyCelebrated) {
            if(typeof triggerCelebration === 'function') triggerCelebration();
            localStorage.setItem('glowHasCelebrated', 'true');
        } else if (!isFree) {
            localStorage.setItem('glowHasCelebrated', 'false');
        }

        // 1. Delivery Pill (Compact Version)
        let deliveryPill = '';
        if (isFree) {
            deliveryPill = `
            <div class="pointer-events-auto animate-slide-up-fade mb-1">
                <!-- Reduced padding (px-3 py-1) and font size -->
                <div class="bg-white/95 dark:bg-[#1a2111]/95 backdrop-blur-md border border-green-500/30 rounded-full px-3 py-1 shadow-lg flex items-center gap-2">
                    <div class="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-white text-[10px] font-bold">check</span>
                    </div>
                    <p class="text-[10px] font-bold text-[#151b0e] dark:text-white leading-none">FREE Delivery! ✨</p>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-1 text-gray-400"><span class="material-symbols-outlined text-[14px]">close</span></button>
                </div>
            </div>`;
        } else {
            deliveryPill = `
            <div class="pointer-events-auto animate-slide-up-fade mb-1">
                <div class="bg-white/90 dark:bg-[#1a2111]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full px-3 py-1 shadow-md flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[14px]">local_shipping</span>
                    <p class="text-[10px] font-bold text-[#151b0e] dark:text-white">Add <span class="text-primary font-black">₹${500 - subtotal}</span> for Free Delivery</p>
                </div>
            </div>`;
        }

        // 2. Black Cart Bar (Smaller & Compact)
        const cartBar = `
        <div onclick="window.location.href='cart.html'" class="pointer-events-auto cursor-pointer animate-bounce-soft w-full max-w-[300px]"> <!-- Reduced max-width -->
            <!-- Reduced padding (p-1.5 px-3) -->
            <div class="bg-[#151b0e] dark:bg-white text-white dark:text-[#151b0e] rounded-[1rem] p-1.5 px-3 shadow-2xl flex items-center justify-between relative overflow-hidden group border border-white/10">
                <div class="flex items-center gap-2 z-10">
                    <!-- Smaller Image (w-8 h-8) -->
                    <div id="floating-cart-img-target" class="w-8 h-8 rounded-lg overflow-hidden border border-white/10 shadow-sm">
                        <img src="${lastItem.image}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col leading-tight">
                        <span class="text-[9px] font-medium opacity-70 uppercase tracking-wider">${totalItems} Item${totalItems > 1 ? 's' : ''}</span>
                        <span class="text-xs font-bold">₹${subtotal}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 z-10">
                    <span class="text-[10px] font-bold uppercase tracking-tight">View Cart</span>
                    <!-- Smaller Icon Circle (w-6 h-6) -->
                    <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span class="material-symbols-outlined text-white text-[14px]">shopping_bag</span>
                    </div>
                </div>
            </div>
        </div>`;
        
        container.innerHTML = deliveryPill + cartBar;
    } catch (err) {
        console.error("Floating UI Error:", err);
    }
};

// Change 'const' to 'window.toggleCategoryModal'
window.toggleCategoryModal = (show) => {
    const modal = document.getElementById('category-modal'); 
    const overlay = document.getElementById('cat-overlay'); 
    const sheet = document.getElementById('cat-sheet');
    
    if (show) { 
        modal.classList.remove('hidden'); 
        setTimeout(() => { 
            overlay.classList.remove('opacity-0'); 
            sheet.classList.remove('translate-y-full'); 
        }, 10); 
    } else { 
        overlay.classList.add('opacity-0'); 
        sheet.classList.add('translate-y-full'); 
        setTimeout(() => { 
            modal.classList.add('hidden'); 
        }, 300); 
    }
};
const renderCategoryModal = () => {
    if(document.getElementById('category-modal')) return;
    const modalHTML = `<div id="category-modal" class="hidden relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div id="cat-overlay" onclick="toggleCategoryModal(false)" class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-0 ease-in-out"></div><div id="cat-sheet" class="fixed bottom-0 left-0 right-0 z-[101] w-full bg-white dark:bg-[#1a2111] rounded-t-[2.5rem] shadow-2xl transform translate-y-full transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) max-h-[90vh] overflow-hidden flex flex-col"><div class="w-full flex justify-center pt-3 pb-1" onclick="toggleCategoryModal(false)"><div class="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-white/20"></div></div><div class="px-6 pb-8 overflow-y-auto no-scrollbar"><div class="flex items-start justify-between mb-8 mt-4"><div><h3 class="text-4xl font-serif font-bold text-[#151b0e] dark:text-white tracking-tight mb-1">Explore</h3><p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Select a category to view</p></div><button onclick="toggleCategoryModal(false)" class="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"><span class="material-symbols-outlined text-[20px] font-bold">close</span></button></div><div class="grid grid-cols-4 gap-x-4 gap-y-6">${categoryData.map((cat, index) => `<a href="${cat.link}" class="group flex flex-col items-center gap-2 animate-slide-up" style="animation-delay: ${index * 30}ms"><div class="relative w-[19vw] h-[19vw] max-w-[80px] max-h-[80px] sm:w-20 sm:h-20 rounded-[1.2rem] overflow-hidden bg-black shadow-sm group-hover:shadow-md transition-all duration-300 group-active:scale-95"><img src="${cat.image}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="${cat.name}"></div><span class="text-[11px] sm:text-xs font-bold text-center text-gray-600 dark:text-gray-300 tracking-wide group-hover:text-[#151b0e] dark:group-hover:text-white transition-colors">${cat.name}</span></a>`).join('')}</div><div class="mt-8 rounded-2xl p-4 flex items-center justify-between cursor-pointer group hover:opacity-90 transition-opacity" style="background-color: #EDF7E0;"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background-color: #D4E8B8;"><span class="material-symbols-outlined filled text-[#5e9610] text-[22px]">diamond</span></div><div><h4 class="font-bold text-[#151b0e] text-sm leading-tight">Custom Orders?</h4><p class="text-[10px] text-gray-600 font-medium mt-0.5 leading-tight">We create personalized resin art just for you.</p></div></div><span class="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform text-sm">arrow_forward_ios</span></div><div class="h-20"></div></div></div></div><style>@keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-slide-up { animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; } .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }</style>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

const renderBottomNav = () => {
    const placeholder = document.getElementById('bottom-nav-placeholder');
    if (!placeholder) return;
    renderCategoryModal(); renderFloatingCartUI();
    
    const path = window.location.pathname; 
    const page = path.split("/").pop() || "home.html";

    const navItems = [
        { name: "Home", icon: "home", action: () => window.location.href = 'home.html', isActive: ["home.html", "home.html"].some(p => page.includes(p)) },
        { name: "Shop", icon: "storefront", action: () => window.location.href = 'shop.html', isActive: ["shop.html", "product.html", "cart.html", "wishlist.html"].some(p => page.includes(p)) },
        { name: "Category", icon: "category", action: () => toggleCategoryModal(true), isActive: false },
        { name: "Account", icon: "person", action: () => toggleProfileModal(true), isActive: false }
    ];

    // UPDATED HTML: Smaller padding (py-1), smaller text (text-[9px]), smaller icons (text-[20px])
    let navHTML = `
    <div class="fixed bottom-2 md:bottom-4 left-0 right-0 z-[50] flex justify-center px-4 pb-safe pointer-events-none">
        <div class="pointer-events-auto w-full max-w-md bg-white/95 dark:bg-[#1a2111]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-black/10 p-1 md:p-2 flex items-center justify-between gap-1">`;
    
    navItems.forEach((item, index) => {
        const cls = item.isActive ? "bg-primary/10 text-primary" : "text-gray-400 dark:text-gray-500 hover:text-primary";
        // Smaller width/height for mobile
        const sizeClass = item.isActive ? 'w-14 md:w-20' : 'w-12 md:w-16';
        
        navHTML += `
        <button id="nav-btn-${index}" class="flex flex-col items-center justify-center ${sizeClass} py-1.5 md:py-2 rounded-[1.2rem] transition-all shadow-sm ${cls}">
            <span class="material-symbols-outlined ${item.isActive ? 'filled' : ''} text-[20px] md:text-[24px]">${item.icon}</span>
            <span class="text-[9px] md:text-[10px] font-bold tracking-wide mt-0.5">${item.name}</span>
        </button>`;
    });
    
    navHTML += `</div></div>`; 
    placeholder.innerHTML = navHTML;
    
    navItems.forEach((item, index) => { 
        const btn = document.getElementById(`nav-btn-${index}`); 
        if(btn) btn.onclick = item.action; 
    });
};

// --- 11. FOOTER ---
const renderFooter = () => {
    if (document.getElementById('universal-footer')) return;
    
    const generateSocialIcon = (platform) => {
        let path = '';
        if(platform==='facebook') path=`<path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>`;
        if(platform==='instagram') path=`<path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>`;
        return `<a href="#" class="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all">${platform === 'facebook' ? `<svg width="18" height="18" viewBox="0 0 24 24">${path}</svg>` : `<svg width="18" height="18" viewBox="0 0 24 24">${path}</svg>`}</a>`;
    };

    const footerHTML = `
    <footer id="universal-footer" class="bg-white dark:bg-[#0d1108] border-t border-gray-100 dark:border-white/5 pt-16 pb-40 md:pb-12 mt-20 transition-colors">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <!-- Brand Section -->
                <div class="space-y-6">
                    <a href="home.html" class="flex items-center gap-2 group">
                        <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-primary/20">G</div>
                        <h2 class="text-2xl font-serif font-bold tracking-tight text-[#151b0e] dark:text-white">Glow<span class="text-primary">.</span></h2>
                    </a>
                    <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">Handcrafted resin art made with love. Preserving your precious memories in crystal clear beauty.</p>
                    <div class="flex gap-3 pt-2">
                        ${generateSocialIcon('instagram')}
                        ${generateSocialIcon('facebook')}
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="font-bold text-[#151b0e] dark:text-white mb-6 text-base">Collections</h3>
                    <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="shop.html?cat=ring" class="hover:text-primary transition-colors">Resin Rings</a></li>
                        <li><a href="shop.html?cat=pendant" class="hover:text-primary transition-colors">Custom Pendants</a></li>
                        <li><a href="shop.html?cat=keychain" class="hover:text-primary transition-colors">Unique Keychains</a></li>
                    </ul>
                </div>

                <!-- Support -->
                <div>
                    <h3 class="font-bold text-[#151b0e] dark:text-white mb-6 text-base">Support</h3>
                    <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="#" class="hover:text-primary transition-colors">Track Order</a></li>
                        <li><a href="#" class="hover:text-primary transition-colors">Shipping Policy</a></li>
                        <li><a href="#" class="hover:text-primary transition-colors">Terms & Conditions</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h3 class="font-bold text-[#151b0e] dark:text-white mb-6 text-base">Get in Touch</h3>
                    <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                        <li class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-primary text-xl">mail</span>
                            <a href="mailto:hello@glow.com" class="hover:text-primary transition-colors">hello@glow.com</a>
                        </li>
                        <li class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-primary text-xl">location_on</span>
                            <span>Jaipur, Rajasthan, India</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Copyright Area -->
            <div class="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-xs text-gray-400 font-medium">© 2025 Glow Creations. All rights reserved.</p>
                <div class="flex gap-8">
                    <a href="#" class="text-xs text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" class="text-xs text-gray-400 hover:text-primary transition-colors">Refund Policy</a>
                </div>
            </div>
        </div>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); renderBottomNav(); renderFooter();
    const path = window.location.pathname;
    if (path.includes('shop.html')) { renderShopTabs(); renderShop(); }
    if (path.includes('product.html')) renderProductDetail();
    if (path.includes('cart.html')) renderCart();
    if (path.includes('wishlist.html')) renderWishlist();
    if (path.includes('orders.html')) renderOrders();
    const checkoutBtn = document.getElementById('checkout-btn');
    if(checkoutBtn) checkoutBtn.addEventListener('click', processCheckout);
});
// Home Page par Trending Products render karne ke liye
const renderTrendingHome = () => {
    const container = document.getElementById('trending-home-grid');
    if (!container) return;

    // Sirf wahi products filter karein jinme trending: true hai
    const trendingProducts = products.filter(p => p.trending === true);

    if (trendingProducts.length === 0) {
        container.innerHTML = "<p class='text-gray-400'>No trending items yet.</p>";
        return;
    }

    container.innerHTML = trendingProducts.map(product => `
        <div class="snap-center shrink-0 w-[180px] md:w-full flex flex-col gap-3 group cursor-pointer" onclick="window.location.href='product.html?id=${product.id}'">
            <div class="w-full aspect-[4/5] rounded-3xl bg-gray-100 relative overflow-hidden">
                <img src="${product.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <button onclick="event.stopPropagation(); addToCart(${product.id})" class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-90 hover:bg-primary hover:text-white transition-all">
                    <span class="material-symbols-outlined">add</span>
                </button>
            </div>
            <div class="px-2">
                <h4 class="font-bold text-sm md:text-base truncate group-hover:text-primary transition-colors">${product.name}</h4>
                <div class="flex justify-between items-center mt-1">
                    <span class="text-primary font-extrabold text-base">₹${product.price}</span>
                </div>
            </div>
        </div>
    `).join('');
};

// INIT function ko update karein (jo main.js ke end mein hai)
// Isme renderTrendingHome() ko call karein
document.addEventListener('DOMContentLoaded', () => {
    // ... puraane calls (updateCartCount, etc.)
    const path = window.location.pathname;
    if (path.includes('home.html') || path.endsWith('/')) {
        renderTrendingHome(); 
    }
});
// Base Material Selection Animation
window.selectBase = (material, btn) => {
    // Remove active class from all chips
    document.querySelectorAll('.base-chip').forEach(c => {
        c.classList.remove('border-primary', 'bg-primary/5', 'active');
    });
    // Add to current
    btn.classList.add('border-primary', 'bg-primary/5', 'active');
    
    if(navigator.vibrate) navigator.vibrate(20);
};

// Toggle Instruction Box based on source
window.toggleInstruction = (show) => {
    const box = document.getElementById('instruction-box');
    if (show) {
        box.classList.remove('hidden');
        // Smooth scroll to guidelines
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        box.classList.add('hidden');
    }
};
// --- TUTORIAL MODAL LOGIC ---
window.toggleTutorial = (show) => {
    let modal = document.getElementById('tutorial-modal');
    if (!modal) {
        renderTutorialModal();
        modal = document.getElementById('tutorial-modal');
    }

    const overlay = document.getElementById('tut-overlay');
    const sheet = document.getElementById('tut-sheet');

    if (show) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Scroll lock
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            sheet.classList.remove('translate-y-full');
        }, 10);
    } else {
        overlay.classList.add('opacity-0');
        sheet.classList.add('translate-y-full');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    }
};

const renderTutorialModal = () => {
    const tutorialHTML = `
    <div id="tutorial-modal" class="hidden relative z-[1100]">
        <!-- Backdrop -->
        <div id="tut-overlay" onclick="toggleTutorial(false)" class="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 opacity-0"></div>
        
        <!-- Bottom Sheet (PC: max-w-md center) -->
        <div id="tut-sheet" class="fixed bottom-0 left-0 right-0 md:max-w-md md:mx-auto md:bottom-10 md:rounded-[2.5rem] z-[1101] w-full bg-white dark:bg-[#1a2111] rounded-t-[2.5rem] shadow-2xl transform translate-y-full transition-transform duration-700 cubic-bezier(0.32, 0.72, 0, 1) flex flex-col max-h-[90vh] overflow-hidden border border-white/10">
            
            <!-- Handle -->
            <div class="w-full flex justify-center pt-4 pb-2" onclick="toggleTutorial(false)">
                <div class="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-white/10"></div>
            </div>

            <div class="px-8 pb-10 overflow-y-auto no-scrollbar">
                <!-- Header -->
                <div class="text-center space-y-2 mb-10 mt-4">
                    <h3 class="text-3xl font-serif font-bold text-[#151b0e] dark:text-white leading-tight">Alchemy Ritual</h3>
                    <p class="text-xs text-primary font-bold uppercase tracking-[0.2em]">4 Steps to Glow Forever</p>
                </div>

                <!-- Step 1 -->
                <div class="relative flex gap-6 mb-12">
                    <div class="flex flex-col items-center">
                        <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-primary/5">01</div>
                        <div class="w-[2px] h-full bg-gradient-to-b from-primary/20 to-transparent mt-2"></div>
                    </div>
                    <div class="space-y-2">
                        <h4 class="text-lg font-bold">Pick Your Aura</h4>
                        <p class="text-sm text-gray-500 leading-relaxed">Choose between 24K Golden, Sterling Silver, or Vintage Copper bases to match your vibe.</p>
                        <div class="flex gap-2 pt-2">
                            <div class="w-4 h-4 rounded-full bg-[#FFD700]"></div>
                            <div class="w-4 h-4 rounded-full bg-[#C0C0C0]"></div>
                            <div class="w-4 h-4 rounded-full bg-[#B87333]"></div>
                        </div>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="relative flex gap-6 mb-12">
                    <div class="flex flex-col items-center">
                        <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-primary/5">02</div>
                        <div class="w-[2px] h-full bg-gradient-to-b from-primary/20 to-transparent mt-2"></div>
                    </div>
                    <div class="space-y-2">
                        <h4 class="text-lg font-bold">Inject the Soul</h4>
                        <p class="text-sm text-gray-500 leading-relaxed">Use our collection of dried flora or ship us your personal memories (Weddings flowers, DNA, fabric).</p>
                        <div class="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-xl border-l-4 border-amber-400">
                            <p class="text-[10px] text-amber-700 font-bold uppercase tracking-wide">📦 We'll share shipping instructions</p>
                        </div>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="relative flex gap-6 mb-12">
                    <div class="flex flex-col items-center">
                        <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-primary/5">03</div>
                        <div class="w-[2px] h-full bg-gradient-to-b from-primary/20 to-transparent mt-2"></div>
                    </div>
                    <div class="space-y-2">
                        <h4 class="text-lg font-bold">The Magic Pour</h4>
                        <p class="text-sm text-gray-500 leading-relaxed">Our artists hand-pour crystal resin over 48 hours, creating a bubble-free, timeless masterpiece.</p>
                    </div>
                </div>

                <!-- Step 4 -->
                <div class="relative flex gap-6">
                    <div class="flex flex-col items-center">
                        <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-primary/5">04</div>
                    </div>
                    <div class="space-y-2">
                        <h4 class="text-lg font-bold">Glow Arrives</h4>
                        <p class="text-sm text-gray-500 leading-relaxed">Your story arrives at your doorstep in premium sustainable packaging, ready to be worn.</p>
                    </div>
                </div>

                <!-- Final Call to Action -->
                <div class="mt-12">
                    <button onclick="toggleTutorial(false); window.location.href='shop.html'" class="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform active:scale-95">
                        Got it, Let's Create! ✨
                    </button>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', tutorialHTML);
};
// ==========================================
// CUSTOM CREATOR STUDIO LOGIC
// ==========================================

// ==========================================
// MODERN STUDIO LOGIC (UPDATED)
// ==========================================

// ==========================================
// CUSTOM CREATOR STUDIO LOGIC (FIXED GLOBAL SCOPE)
// ==========================================

let customOrder = {
    category: '',
    type: 'standard', 
    shape: '',
    size: '',
    color: '',
    note: ''
};

// 1. SELECT CATEGORY
window.selectCategory = (catName, type, element) => {
    customOrder.category = catName;
    customOrder.type = type;

    // Reset all cards
    document.querySelectorAll('.cat-card').forEach(card => {
        card.classList.remove('selected', 'border-primary', 'bg-primary/5');
        // Check if element exists before removing class to avoid errors
        const icon = card.querySelector('span.material-symbols-outlined');
        if(icon) icon.classList.remove('text-primary');
    });

    // Activate clicked card
    element.classList.add('selected', 'border-primary', 'bg-primary/5');
    
    setTimeout(() => {
        // Logic for next steps
        const shapeSection = document.getElementById('shape-section');
        const stdShapeMsg = document.getElementById('standard-shape-msg');
        const sizeInputs = document.getElementById('custom-size-inputs');
        const stdSizeMsg = document.getElementById('standard-size-msg');
        
        if (type === 'standard') {
            if(shapeSection) shapeSection.classList.add('hidden');
            if(stdShapeMsg) stdShapeMsg.classList.remove('hidden');
            const catNameDisplay = document.getElementById('selected-cat-name');
            if(catNameDisplay) catNameDisplay.innerText = catName;
            customOrder.shape = "Standard Shape";
            
            if(sizeInputs) sizeInputs.classList.add('hidden');
            if(stdSizeMsg) {
                stdSizeMsg.classList.remove('hidden');
                stdSizeMsg.classList.add('flex');
            }
            customOrder.size = "Standard Free Size";
        } else {
            if(shapeSection) shapeSection.classList.remove('hidden');
            if(stdShapeMsg) stdShapeMsg.classList.add('hidden');
            customOrder.shape = ""; 
            
            if(sizeInputs) sizeInputs.classList.remove('hidden');
            if(stdSizeMsg) {
                stdSizeMsg.classList.add('hidden');
                stdSizeMsg.classList.remove('flex');
            }
            window.updateSize('length', 50); 
        }
        
        window.goToStep(2);
    }, 400); 
};

// 2. SHAPE SELECTION
window.selectShape = (shape) => {
    customOrder.shape = shape;
    document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white', 'shadow-lg');
        if(btn.innerText.includes(shape)) {
            btn.classList.add('bg-primary', 'text-white', 'shadow-lg');
        }
    });
};

// 3. SIZE UPDATE
window.updateSize = (dim, val) => {
    const displayVal = document.getElementById(`${dim}-val`);
    if(displayVal) displayVal.innerText = val + " Inch";
    
    const lInput = document.querySelector('input[oninput*="length"]');
    const wInput = document.querySelector('input[oninput*="width"]');
    
    const l = lInput ? lInput.value : 50;
    const w = wInput ? wInput.value : 50;
    customOrder.size = `${l}Inch x ${w}Inch`;
};

// 4. COLOR SELECTION
window.selectColor = (color) => {
    customOrder.color = color;
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('selected', 'ring-4', 'ring-primary/30');
        if(btn.getAttribute('title') === color) {
            btn.classList.add('selected', 'ring-4', 'ring-primary/30');
        }
    });
};

// 5. NAVIGATION & ANIMATION
window.goToStep = (stepNum) => {
    // Validation
    if(stepNum === 3) {
        if(customOrder.type === 'custom' && !customOrder.shape) return alert("Please pick a shape!");
        if(!customOrder.color) return alert("Please select a finish!");
        window.updateSummary();
    }

    // Hide all contents
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.add('hidden', 'opacity-0');
    });

    // Show target content
    const target = document.getElementById(`step-${stepNum}`);
    if(target) {
        target.classList.remove('hidden');
        setTimeout(() => target.classList.remove('opacity-0'), 50);
    }

    // Update Progress Bar UI
    const line = document.getElementById('line-progress');
    const bubble2 = document.getElementById('step-bubble-2');
    const bubble3 = document.getElementById('step-bubble-3');

    if(line && bubble2 && bubble3) {
        if(stepNum === 1) {
            line.style.width = "0%";
            bubble2.classList.remove('bg-primary', 'text-white', 'scale-110');
            bubble3.classList.remove('bg-primary', 'text-white', 'scale-110');
        } else if(stepNum === 2) {
            line.style.width = "50%";
            bubble2.classList.add('bg-primary', 'text-white', 'scale-110', 'shadow-lg', 'shadow-primary/30');
            bubble3.classList.remove('bg-primary', 'text-white', 'scale-110');
        } else if(stepNum === 3) {
            line.style.width = "100%";
            bubble2.classList.add('bg-primary', 'text-white');
            bubble3.classList.add('bg-primary', 'text-white', 'scale-110', 'shadow-lg', 'shadow-primary/30');
        }
    }
};

// 6. SUMMARY & ADD TO CART
window.updateSummary = () => {
    const setProp = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    };
    setProp('sum-cat', customOrder.category);
    setProp('sum-shape', customOrder.shape);
    setProp('sum-size', customOrder.size);
    setProp('sum-color', customOrder.color);
};

window.addToCartCustom = () => {
    const noteEl = document.getElementById('custom-note');
    const note = noteEl ? noteEl.value : '';
    
    if(!note) return alert("Please describe your design idea.");
    
    customOrder.note = note;

    const newCustomItem = {
        id: Date.now(),
        name: `Custom ${customOrder.category}`,
        category: "Customized Piece",
        price: 999,
        image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=200',
        quantity: 1,
        details: { ...customOrder }
    };

    // Global 'cart' variable should be accessible. 
    // If 'cart' is defined with 'let cart = ...' in module scope, 
    // make sure it is accessible or passed properly. 
    // Assuming 'cart' is available in module scope here:
    if (typeof cart !== 'undefined') {
        cart.push(newCustomItem);
        // Assuming saveCart is defined in module scope:
        if (typeof saveCart === 'function') saveCart();
    }
    
    // Confetti & Feedback
    if (typeof triggerCelebration === 'function') triggerCelebration();
    
    const toast = document.getElementById('toast');
    if(toast) {
        const h4 = toast.querySelector('h4'); // Assuming toast structure
        if(h4) h4.innerText = "Magic Created! ✨";
        // Alternatively if using the toast structure from authentication:
        const msg = document.getElementById('toast-msg');
        if(msg) msg.innerText = "Magic Created! ✨";
        
        toast.classList.remove('opacity-0', '-translate-y-10'); // Adjust based on your toast CSS classes
        // Or if using your specific logic:
        toast.classList.remove('translate-y-32');
        setTimeout(() => toast.classList.add('translate-y-32'), 3000);
    }
    
    setTimeout(() => window.location.href = 'cart.html', 1500);
};
// main.js

// --- 1. FIREBASE IMPORTS (Ensure these are at the top) ---
// main.js

// --- 1. FIREBASE IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    updateProfile, 
    signInWithEmailAndPassword,
    updateEmail,
    setPersistence,
    browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// NEW: Import Database functions
import { 
    getDatabase, 
    ref, 
    set, 
    push, 
    get,
    child
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// --- YOUR CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyDUB2MY4FyAai9FgZ-6EZP9K9nmsUk5mb4",
  authDomain: "glow-creation.firebaseapp.com",
  databaseURL: "https://glow-creation-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "glow-creation",
  storageBucket: "glow-creation.firebasestorage.app",
  messagingSenderId: "236856410532",
  appId: "1:236856410532:web:2253fb7f215f7a232f8131",
  measurementId: "G-34FVP1W4E1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Initialize Realtime Database

// ... (Keep the Persistence logic here) ...

// ... [KEEP ALL YOUR EXISTING CODE: cart, wishlist, products, renderShop, etc.] ...
// ... [DO NOT DELETE EXISTING FUNCTIONS] ...


// ==========================================
// NEW: PROFILE MODAL LOGIC
// ==========================================

// 1. Toggle the Profile Sheet
window.toggleProfileModal = (show) => {
    let modal = document.getElementById('profile-modal');
    
    // Create modal if it doesn't exist yet
    if (!modal) {
        renderProfileModalStructure();
        modal = document.getElementById('profile-modal');
    }

    const overlay = document.getElementById('profile-overlay');
    const sheet = document.getElementById('profile-sheet');

    if (show) {
        // Refresh data every time we open
        updateProfileUI(); 
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock Scroll
        setTimeout(() => { 
            overlay.classList.remove('opacity-0'); 
            sheet.classList.remove('translate-y-full'); 
        }, 10);
    } else {
        overlay.classList.add('opacity-0'); 
        sheet.classList.add('translate-y-full'); 
        setTimeout(() => { 
            modal.classList.add('hidden'); 
            document.body.style.overflow = 'auto'; // Unlock Scroll
        }, 300);
    }
};

// 2. Render the Skeleton Structure (One time)
const renderProfileModalStructure = () => {
    const modalHTML = `
    <div id="profile-modal" class="hidden relative z-[150]">
        <div id="profile-overlay" onclick="toggleProfileModal(false)" class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 opacity-0"></div>
        
        <div id="profile-sheet" class="fixed bottom-0 left-0 right-0 z-[151] w-full bg-[#fcfdfa] dark:bg-[#1a2111] rounded-t-[2.5rem] shadow-2xl transform translate-y-full transition-transform duration-500 max-h-[90vh] overflow-y-auto no-scrollbar pb-safe">
            
            <!-- Drag Handle -->
            <div class="w-full flex justify-center pt-3 pb-2" onclick="toggleProfileModal(false)">
                <div class="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-white/20"></div>
            </div>

            <div class="p-6">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-serif font-bold text-[#151b0e] dark:text-white">Account</h2>
                    <button onclick="toggleProfileModal(false)" class="p-2 bg-gray-100 dark:bg-white/10 rounded-full"><span class="material-symbols-outlined text-sm">close</span></button>
                </div>

                <!-- DYNAMIC CONTENT CONTAINER -->
                <div id="profile-content">
                    <!-- Loading State -->
                    <div class="flex justify-center py-10"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// 3. Logic to switch between Guest and User UI
// main.js mein is function ko pura replace karein

const updateProfileUI = () => {
    const container = document.getElementById('profile-content');
    const user = auth.currentUser;

    if (user) {
        // --- LOGGED IN USER VIEW ---
        const savedPhone = localStorage.getItem('glowUserPhone') || '';
        const savedAddress = localStorage.getItem(`address_${user.uid}`) || '';
        const displayName = user.displayName || 'Glow User';
        const email = user.email;
        
        // Photo Logic
        const localPhoto = localStorage.getItem(`photo_${user.uid}`);
        const photoURL = localPhoto || user.photoURL; 
        const initial = displayName.charAt(0).toUpperCase();

        let avatarHTML = '';
        if (photoURL) {
            avatarHTML = `<img src="${photoURL}" class="w-full h-full object-cover">`;
        } else {
            avatarHTML = `<span class="font-serif text-4xl font-bold text-primary">${initial}</span>`;
        }

        container.innerHTML = `
            <div class="flex flex-col items-center mb-8">
                <input type="file" id="profile-upload" accept="image/*" class="hidden" onchange="handleProfileImageUpload(event)">

                <div class="relative group cursor-pointer" onclick="document.getElementById('profile-upload').click()">
                    <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-yellow-200 p-[3px]">
                        <div class="w-full h-full rounded-full bg-white dark:bg-[#1a2111] flex items-center justify-center overflow-hidden">
                             ${avatarHTML}
                        </div>
                    </div>
                    <div class="absolute bottom-0 right-0 bg-[#151b0e] text-white p-2 rounded-full shadow-md hover:bg-primary transition-colors">
                        <span class="material-symbols-outlined text-xs">edit</span>
                    </div>
                </div>
                <!-- Realtime Name Update Here -->
                <h3 class="mt-3 text-xl font-bold" id="display-name-header">${displayName}</h3>
                <p class="text-sm text-gray-500" id="display-email-header">${email}</p>
            </div>

            <form id="profile-edit-form" onsubmit="saveProfileChanges(event)" class="space-y-4">
                
                <!-- Name -->
                <div class="bg-white dark:bg-white/5 p-3 rounded-2xl border border-gray-200 dark:border-white/10 focus-within:border-primary transition-colors">
                    <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
                    <input type="text" id="edit-name" value="${displayName}" class="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 text-[#151b0e] dark:text-white" placeholder="Enter Name">
                </div>

                <!-- Phone -->
                <div class="bg-white dark:bg-white/5 p-3 rounded-2xl border border-gray-200 dark:border-white/10 focus-within:border-primary transition-colors">
                    <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Phone Number</label>
                    <input type="tel" id="edit-phone" value="${savedPhone}" class="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 text-[#151b0e] dark:text-white" placeholder="Add Phone Number">
                </div>

                <!-- Email (UNLOCKED NOW) -->
                <div class="bg-white dark:bg-white/5 p-3 rounded-2xl border border-gray-200 dark:border-white/10 focus-within:border-primary transition-colors">
                    <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Email Address</label>
                    <input type="email" id="edit-email" value="${email}" class="w-full bg-transparent border-none p-0 text-sm font-bold text-[#151b0e] dark:text-white" placeholder="Update Email">
                </div>

                <!-- Address -->
                <div class="bg-white dark:bg-white/5 p-3 rounded-2xl border border-gray-200 dark:border-white/10 focus-within:border-primary transition-colors">
                    <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Delivery Address</label>
                    <textarea id="edit-address" rows="3" class="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 text-[#151b0e] dark:text-white resize-none" placeholder="Enter your full address here...">${savedAddress}</textarea>
                </div>

                <!-- Buttons -->
                <div class="pt-4 flex gap-3">
                    <button type="button" onclick="handleUserLogout()" class="flex-1 py-4 rounded-xl border border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10">Logout</button>
                    <button type="submit" id="save-profile-btn" class="flex-[2] py-4 rounded-xl bg-[#151b0e] dark:bg-white text-white dark:text-black font-bold text-sm shadow-lg active:scale-95 transition-transform">Save Changes</button>
                </div>
            </form>
        `;
    } else {        // ... (Guest User Code Same as before)
         // --- GUEST / ANONYMOUS VIEW ---
         container.innerHTML = `
            <div class="text-center mb-8">
                <div class="w-20 h-20 mx-auto rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-4xl text-gray-400">person_off</span>
                </div>
                <h3 class="text-xl font-bold">Guest User</h3>
                <p class="text-sm text-gray-500 mt-1">Log in to manage your profile, orders & wishlist.</p>
            </div>

            <!-- INLINE LOGIN FORM -->
            <form onsubmit="handleInlineLogin(event)" class="space-y-4">
                <div class="bg-white dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center px-4">
                    <span class="material-symbols-outlined text-gray-400">mail</span>
                    <input type="email" id="inline-email" required placeholder="Email Address" class="w-full bg-transparent border-none focus:ring-0 text-sm py-3">
                </div>
                <div class="bg-white dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center px-4">
                    <span class="material-symbols-outlined text-gray-400">lock</span>
                    <input type="password" id="inline-pass" required placeholder="Password" class="w-full bg-transparent border-none focus:ring-0 text-sm py-3">
                </div>
                
                <button type="submit" id="inline-login-btn" class="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 mt-4 active:scale-95 transition-transform">
                    Login to Profile
                </button>
            </form>

            <div class="mt-6 text-center border-t border-dashed border-gray-200 pt-6">
                <p class="text-xs text-gray-400">Don't have an account?</p>
                <button onclick="window.location.href='index.html'" class="text-primary font-bold text-sm mt-1">Create New Account</button>
            </div>
        `;
    }
};

// 4. Handle Save Changes (Updates Database/Auth)
// Replace your existing saveProfileChanges function

window.saveProfileChanges = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user) return;

    const btn = document.getElementById('save-profile-btn');
    const nameInput = document.getElementById('edit-name').value;
    const phoneInput = document.getElementById('edit-phone').value;
    const addressInput = document.getElementById('edit-address').value;
    const emailInput = document.getElementById('edit-email').value;

    btn.innerHTML = `<span class="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block"></span>`;
    
    try {
        const updates = [];

        if (nameInput !== user.displayName) updates.push(updateProfile(user, { displayName: nameInput }));
        if (emailInput !== user.email) updates.push(updateEmail(user, emailInput));

        if (updates.length > 0) await Promise.all(updates);
        
        // 1. Save to Local Storage (Keep for fast access)
        localStorage.setItem('glowUserPhone', phoneInput);
        localStorage.setItem(`address_${user.uid}`, addressInput);

        // 2. SAVE TO REALTIME DATABASE (Sync Logic)
        await set(ref(db, 'users/' + user.uid), {
            username: nameInput,
            email: emailInput,
            phone: phoneInput,
            address: addressInput,
            lastUpdated: new Date().toISOString()
        });

        // UI Updates (Same as before)
        const nameHeader = document.getElementById('display-name-header');
        const emailHeader = document.getElementById('display-email-header');
        if(nameHeader) nameHeader.innerText = nameInput;
        if(emailHeader) emailHeader.innerText = emailInput;

        updateUserIcons(nameInput); // Update icons

        btn.innerText = "Saved Successfully!";
        btn.classList.add('bg-green-600', 'text-white');
        
        setTimeout(() => {
            btn.innerText = "Save Changes";
            btn.classList.remove('bg-green-600');
        }, 1500);

    } catch (error) {
        console.error(error);
        if (error.code === 'auth/requires-recent-login') {
            alert("Security Alert: To change Email, please Logout & Login again.");
        } else {
            alert("Error: " + error.message);
        }
        btn.innerText = "Save Changes";
    }
};

// 5. Handle Inline Login inside Modal
window.handleInlineLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('inline-email').value;
    const pass = document.getElementById('inline-pass').value;
    const btn = document.getElementById('inline-login-btn');

    btn.innerText = "Verifying...";
    btn.disabled = true;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        // On success, onAuthStateChanged will trigger and update UI, but we force it here for smoothness
        updateProfileUI();
    } catch (error) {
        alert("Login Failed: " + error.message);
        btn.innerText = "Login to Profile";
        btn.disabled = false;
    }
};

// 6. Handle Logout
window.handleUserLogout = async () => {
    if(confirm("Are you sure you want to log out?")) {
        await signOut(auth);
        toggleProfileModal(false);
        window.location.reload(); // Reload to reset all states
    }
};

// --- UPDATE NAV BUTTON ACTIONS ---
// This function overwrites your existing renderBottomNav action for the last button
const originalRenderBottomNav = renderBottomNav; // Backup existing
// We don't need to overwrite the function if we just change the onclick in the data or after render.
// See Step 2 below for how we change the onclick.
// ==========================================
// DYNAMIC USER AVATAR IN NAV BAR (Top & Bottom)
// ==========================================

// 1. Helper Function to Generate Avatar HTML
const getAvatarHTML = (name, sizeClass = "text-sm") => {
    // Get First Letter (e.g. "S" from "Shaaswat")
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    
    // Return the HTML for the Circle Avatar
    return `
    <div class="w-full h-full rounded-full bg-gradient-to-tr from-[#74b814] to-yellow-200 p-[2px] shadow-sm animate-fade-in">
        <div class="w-full h-full rounded-full bg-[#fcfdfa] dark:bg-[#1a2111] flex items-center justify-center">
            <span class="font-serif font-bold text-[#74b814] ${sizeClass} leading-none pt-[1px]">${initial}</span>
        </div>
    </div>`;
};

// 2. Listen for Auth Changes
onAuthStateChanged(auth, (user) => {
    // Target Elements
    const headerProfileBtn = document.querySelector('#universal-header button[onclick="toggleProfileModal(true)"]');
    const bottomNavBtn = document.getElementById('nav-btn-3'); // Index 3 is Account tab

    if (user) {
        const userName = user.displayName || "User";
        
        // --- A. UPDATE TOP HEADER ICON ---
        if (headerProfileBtn) {
            // Replace inner HTML with Avatar (Size 40px automatically adapted by parent)
            headerProfileBtn.innerHTML = getAvatarHTML(userName, "text-lg");
            // Add border styling to parent button for extra finish
            headerProfileBtn.classList.remove('bg-[#151b0e]', 'dark:bg-white', 'text-white', 'dark:text-black');
            headerProfileBtn.classList.add('p-0', 'bg-transparent'); // Reset background
        }

        // --- B. UPDATE BOTTOM NAV ICON ---
        if (bottomNavBtn) {
            const iconSpan = bottomNavBtn.querySelector('.material-symbols-outlined');
            
            // Only replace if we haven't already (check if material symbol exists)
            if (iconSpan) {
                // Create a container for the avatar (24px size)
                const avatarContainer = document.createElement('div');
                avatarContainer.className = "w-6 h-6 mb-0.5"; 
                avatarContainer.innerHTML = getAvatarHTML(userName, "text-xs");

                // Replace the icon span with our avatar
                bottomNavBtn.replaceChild(avatarContainer, iconSpan);
            }
        }
    } else {
        // OPTIONAL: Reset to default if logged out (Usually page reloads, but just in case)
        if (headerProfileBtn) headerProfileBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">person</span>`;
    }
});
// --- NEW: Handle Image Upload ---
window.handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const result = e.target.result;
            const user = auth.currentUser;
            
            // Save to LocalStorage (Simple way without Database)
            if(user) {
                localStorage.setItem(`photo_${user.uid}`, result);
                
                // Update UI Immediately
                updateProfileUI();
                
                // Show Success Toast
                const toast = document.getElementById('toast');
                if(toast) {
                    toast.classList.remove('opacity-0', '-translate-y-10');
                    document.getElementById('toast-msg').innerText = "Photo Updated!";
                    setTimeout(() => toast.classList.add('opacity-0', '-translate-y-10'), 3000);
                }
            }
        };
        reader.readAsDataURL(file);
    }
};
