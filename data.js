const products = [
    { 
        id: 1, 
        name: "Diamond Solitaire Ring", 
        price: "1,200.00", 
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=60", 
        category: "Ring", 
        isTrending: true,
        // NEW DETAILS
        description: "A timeless classic, this solitaire ring features a brilliant-cut diamond set in 18k white gold. Perfect for engagements or special milestones.",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=60", 
            "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "18k White Gold",
            "Diamond Weight": "1.0 Carat",
            "Clarity": "VVS1",
            "Certification": "GIA Certified"
        }
    },
    { 
        id: 2, 
        name: "Gold Stackable Band", 
        price: "350.00", 
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=60", 
        category: "Ring", 
        isTrending: false,
        description: "Minimalist gold band designed for stacking. Wear it alone for a subtle look or combine with others for a statement.",
        images: [
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "22k Yellow Gold",
            "Weight": "4 grams",
            "Finish": "High Polish",
            "Size": "Adjustable"
        }
    },
    { 
        id: 3, 
        name: "Rose Gold Heart Pendant", 
        price: "450.00", 
        image: "https://images.unsplash.com/photo-1602751584552-8ba43d4c3104?auto=format&fit=crop&w=500&q=60", 
        category: "Pendant", 
        isTrending: true,
        description: "Express your love with this delicate heart pendant crafted in romantic rose gold. A perfect gift for someone special.",
        images: [
            "https://images.unsplash.com/photo-1602751584552-8ba43d4c3104?auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "18k Rose Gold",
            "Chain Length": "18 inches",
            "Pendant Size": "1.5 cm",
            "Stone": "Zirconia"
        }
    },
    { 
        id: 4, 
        name: "Emerald Drop Necklace", 
        price: "580.00", 
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=500&q=60", 
        category: "Pendant", 
        isTrending: false,
        description: "A stunning emerald gemstone suspended from a delicate gold chain. Adds a touch of vintage elegance to any outfit.",
        images: [
            "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1602751584552-8ba43d4c3104?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Gemstone": "Natural Emerald",
            "Carat": "0.5 ct",
            "Chain": "18k Gold Plated",
            "Origin": "Colombia"
        }
    },
    { 
        id: 5, 
        name: "Luxury Diamond Tennis Bracelet", 
        price: "2,500.00", 
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=500&q=60", 
        category: "Bracelet", 
        isTrending: true,
        description: "The ultimate symbol of luxury. This tennis bracelet features a continuous line of brilliant diamonds securely set in platinum.",
        images: [
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Platinum (950)",
            "Diamond Count": "50 stones",
            "Total Weight": "3.0 Carats",
            "Clasp": "Safety Box Clasp"
        }
    },
    { 
        id: 6, 
        name: "Silver Charm Bracelet", 
        price: "85.00", 
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=60", 
        category: "Bracelet", 
        isTrending: false,
        description: "Playful and chic silver bracelet compatible with standard charms. Start your collection today.",
        images: [
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "925 Sterling Silver",
            "Length": "19 cm",
            "Style": "Snake Chain",
            "Warranty": "1 Year"
        }
    },
    { 
        id: 7, 
        name: "Traditional Gold Bangles", 
        price: "950.00", 
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=60", 
        category: "Bangles", 
        isTrending: true,
        description: "Intricately designed traditional bangles that pair perfectly with ethnic wear. Handcrafted by master artisans.",
        images: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "22k Gold",
            "Set Of": "2 Bangles",
            "Weight": "20 grams",
            "Design": "Filigree Work"
        }
    },
    { 
        id: 8, 
        name: "Modern Rose Gold Kada", 
        price: "420.00", 
        image: "https://plus.unsplash.com/premium_photo-1681276170683-706111cf5963?auto=format&fit=crop&w=500&q=60", 
        category: "Bangles", 
        isTrending: false,
        description: "A contemporary twist on the classic kada. Sleek, stylish, and suitable for office or parties.",
        images: [
            "https://plus.unsplash.com/premium_photo-1681276170683-706111cf5963?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "18k Rose Gold",
            "Type": "Openable Kada",
            "Thickness": "4 mm",
            "Finish": "Matte"
        }
    },
    { 
        id: 9, 
        name: "Diamond Mangalsutra", 
        price: "1,100.00", 
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=60", 
        category: "Mangalsutra", 
        isTrending: true,
        description: "A modern mangalsutra for the contemporary bride. Features a diamond-studded pendant on a traditional black bead chain.",
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Gold Purity": "18k Yellow Gold",
            "Diamond Quality": "SI-IJ",
            "Chain Length": "24 inches",
            "Occasion": "Daily Wear"
        }
    },
    { 
        id: 10, 
        name: "Black Bead Gold Chain", 
        price: "600.00", 
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=500&q=60", 
        category: "Mangalsutra", 
        isTrending: false,
        description: "Simple and elegant gold chain with interspersed black beads. Lightweight and comfortable.",
        images: [
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "22k Gold",
            "Weight": "8 grams",
            "Length": "20 inches",
            "Lock": "S-Hook"
        }
    },
    { 
        id: 11, 
        name: "Custom Name Keychain", 
        price: "25.00", 
        image: "https://images.unsplash.com/photo-1582562124811-2867e69f88d7?auto=format&fit=crop&w=500&q=60", 
        category: "Keychain", 
        isTrending: false,
        description: "Personalize your keys with your name or initials. Made from durable resin with gold flakes.",
        images: [
            "https://images.unsplash.com/photo-1582562124811-2867e69f88d7?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Epoxy Resin",
            "Customization": "Text up to 10 chars",
            "Ring Material": "Stainless Steel",
            "Durability": "Shatterproof"
        }
    },
    { 
        id: 12, 
        name: "Luxury Car Key Fob", 
        price: "55.00", 
        image: "https://images.unsplash.com/photo-1622219809260-ce065fc5277f?auto=format&fit=crop&w=500&q=60", 
        category: "Keychain", 
        isTrending: true,
        description: "Premium leather and gold-plated key fob suitable for luxury car keys. Adds a touch of sophistication.",
        images: [
            "https://images.unsplash.com/photo-1622219809260-ce065fc5277f?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Genuine Leather",
            "Metal": "Gold Plated Zinc",
            "Compatibility": "Universal",
            "Color": "Black/Gold"
        }
    },
    { 
        id: 13, 
        name: "Silver Memory Box", 
        price: "120.00", 
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=60", 
        category: "Keepsake", 
        isTrending: true,
        description: "A beautifully engraved silver box to store your most precious memories and trinkets.",
        images: [
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Silver Plated",
            "Lining": "Velvet",
            "Dimensions": "4x4x2 inches",
            "Engraving": "Floral Pattern"
        }
    },
    { 
        id: 14, 
        name: "Crystal Gift Item", 
        price: "80.00", 
        image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=500&q=60", 
        category: "Keepsake", 
        isTrending: false,
        description: "Radiant crystal showpiece that catches the light beautifully. Ideal for home decor gifting.",
        images: [
            "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Lead-Free Crystal",
            "Weight": "500g",
            "Height": "6 inches",
            "Care": "Wipe with soft cloth"
        }
    },
    { 
        id: 15, 
        name: "Minimalist Metal Frame", 
        price: "35.00", 
        image: "https://images.unsplash.com/photo-1534349762913-961129fdebe2?auto=format&fit=crop&w=500&q=60", 
        category: "Frames", 
        isTrending: true,
        description: "Sleek and modern photo frame. The thin metal border ensures your photo remains the center of attention.",
        images: [
            "https://images.unsplash.com/photo-1534349762913-961129fdebe2?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Aluminum Alloy",
            "Photo Size": "5x7 inches",
            "Mounting": "Tabletop/Wall",
            "Glass": "Anti-glare"
        }
    },
    { 
        id: 16, 
        name: "Vintage Gold Photo Frame", 
        price: "45.00", 
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=500&q=60", 
        category: "Frames", 
        isTrending: false,
        description: "Ornate vintage-style frame with an antique gold finish. Brings old-world charm to your memories.",
        images: [
            "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Resin",
            "Finish": "Antique Gold",
            "Photo Size": "8x10 inches",
            "Backing": "Velvet"
        }
    },
    { 
        id: 17, 
        name: "Designer iPhone Case", 
        price: "40.00", 
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=500&q=60", 
        category: "Mobile Case", 
        isTrending: true,
        description: "Stylish and protective case with a unique resin art design. Raised edges protect the screen and camera.",
        images: [
            "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Hard PC + Soft TPU",
            "Model": "iPhone 13/14/15",
            "Feature": "Shock Absorbent",
            "Print": "UV Resistant"
        }
    },
    { 
        id: 18, 
        name: "Leather Phone Cover", 
        price: "65.00", 
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=500&q=60", 
        category: "Mobile Case", 
        isTrending: false,
        description: "Handcrafted genuine leather case that develops a beautiful patina over time. Includes card slots.",
        images: [
            "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=500&q=60"
        ],
        specs: {
            "Material": "Full Grain Leather",
            "Type": "Wallet Case",
            "Slots": "2 Card Slots",
            "Magnet": "Strong Closure"
        }
    }
];
