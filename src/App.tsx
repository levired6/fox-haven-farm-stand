import React, { useState, useEffect } from 'react';
import { INVENTORY } from './data/inventory';
import { Product, Subcategory, CartItem, CompletedOrder, UserProfile, SavedCard } from './types';
import { GlassButton } from './GlassButton';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Subcategory | 'All'>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [ageCheckProduct, setAgeCheckProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutMode, setCheckoutMode] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentType, setPaymentType] = useState<'card' | 'cash'>('card');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // DELIVERY & TIME SLOT STATES
  const [deliverySlot, setDeliverySlot] = useState<string>('Today 2:00 PM - 4:00 PM');
  const [zipCheckInput, setZipCheckInput] = useState<string>('');
  const [deliveryStatus, setDeliveryStatus] = useState<{ valid: boolean; message: string } | null>(null);

  // USER & AUTHENTICATION STATE (WITH LOCALSTORAGE INITIALIZATION)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fh_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'profile'>('login');
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // FORM STATES
  const [loginEmail, setLoginEmail] = useState('');
  const [signupForm, setSignupForm] = useState<UserProfile>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
    birthdate: '',
    subscribePromotions: true,
    savedCards: [],
    rewardPoints: 50 // Welcome bonus points
  });

  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExp, setNewCardExp] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');

  // SAVE USER PROFILE TO LOCALSTORAGE WHEN CHANGED
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fh_user_profile', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fh_user_profile');
    }
  }, [currentUser]);

  const categories: (Subcategory | 'All')[] = [
    'All',
    'Vegetables',
    'Salads & Greens',
    'Pantry & Artisanal',
    'Meats & Eggs',
    'Baked Goods',
    'Apparel & Goods',
    'Adult Beverages'
  ];

  const filteredProducts = INVENTORY.filter((item: Product) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // AGE CALCULATION HELPER
  const calculateAge = (birthdateStr: string): number => {
    if (!birthdateStr) return 0;
    const birthDate = new Date(birthdateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // ZIP CODE VERIFIER (DELIVERY RADIUS DEMO)
  const handleVerifyZip = (zip: string) => {
    setZipCheckInput(zip);
    if (!zip || zip.trim().length !== 5) {
      setDeliveryStatus({ valid: false, message: 'Please enter a valid 5-digit US zip code.' });
      return;
    }
    // Mock condition: Zip codes ending in '0' simulate out-of-range areas for testing
    if (zip.endsWith('0')) {
      setDeliveryStatus({
        valid: false,
        message: `Zip code ${zip} is outside our local farm delivery zone (Max 25 mile radius). Pickup is available!`
      });
    } else {
      setDeliveryStatus({
        valid: true,
        message: `Great news! Express farm stand delivery is available for ${zip}.`
      });
    }
  };

  const confirmAddToCart = (product: Product) => {
    setCart((prevCart: CartItem[]) => {
      const existing = prevCart.find((ci: CartItem) => ci.product.id === product.id);
      if (existing) {
        return prevCart.map((ci: CartItem) =>
          ci.product.id === product.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const addToCart = (product: Product) => {
    if (product.isAgeRestricted) {
      if (currentUser && currentUser.birthdate) {
        const age = calculateAge(currentUser.birthdate);
        if (age >= 21) {
          confirmAddToCart(product);
          return;
        } else {
          alert('You must be at least 21 years old to add alcohol products.');
          return;
        }
      }

      const existingInCart = cart.find((ci) => ci.product.id === product.id);
      if (!existingInCart) {
        setAgeCheckProduct(product);
        return;
      }
    }
    confirmAddToCart(product);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart: CartItem[]) =>
      prevCart
        .map((ci: CartItem) => {
          if (ci.product.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const getItemQuantity = (id: string): number => {
    const found = cart.find((ci) => ci.product.id === id);
    return found ? found.quantity : 0;
  };

  const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const cartTotal = subtotal + tax;
  const totalItemsCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  // AUTHENTICATION HANDLERS
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.birthdate) {
      alert('Please fill out all required fields.');
      return;
    }
    setCurrentUser(signupForm);
    setIsAuthModalOpen(false);
    setAuthNotice(null);
    if (signupForm.zipCode) {
      handleVerifyZip(signupForm.zipCode);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;
    const demoUser: UserProfile = {
      name: 'Levi Redinger',
      email: loginEmail,
      address: '123 Harvest Way',
      city: 'Rural Valley',
      state: 'PA',
      zipCode: '16249',
      phone: '(555) 019-2834',
      birthdate: '1995-05-15',
      subscribePromotions: true,
      savedCards: [{ id: 'c1', cardNumber: '•••• 4242', expDate: '12/28', cardHolder: 'Levi Redinger' }],
      rewardPoints: 120
    };
    setCurrentUser(demoUser);
    setIsAuthModalOpen(false);
    setAuthNotice(null);
    handleVerifyZip(demoUser.zipCode);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newCardNumber) return;
    const card: SavedCard = {
      id: Date.now().toString(),
      cardNumber: `•••• ${newCardNumber.slice(-4) || '1111'}`,
      expDate: newCardExp || '12/28',
      cardHolder: newCardHolder || currentUser.name
    };
    setCurrentUser({
      ...currentUser,
      savedCards: [...currentUser.savedCards, card]
    });
    setNewCardNumber('');
    setNewCardExp('');
    setNewCardHolder('');
  };

  const handleDeleteCard = (cardId: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      savedCards: currentUser.savedCards.filter((c) => c.id !== cardId)
    });
  };

  const handleCompleteCheckout = () => {
    const pointsEarned = Math.floor(cartTotal * 10);
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        rewardPoints: currentUser.rewardPoints + pointsEarned
      });
    }

    const order: CompletedOrder = {
      orderId: `FH-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleString(),
      items: [...cart],
      subtotal,
      tax,
      total: cartTotal,
      fulfillmentMode: checkoutMode,
      paymentType
    };

    setCompletedOrder(order);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#f3f1e8', color: '#fff', minHeight: '100vh' }}>
      
      {/* BRAND HERO HEADER */}
      <header style={{ backgroundColor: '#f3f1e8', textAlign: 'center' }}>
        <img
          src="/images/fox-haven-sage-logo.svg"
          alt="Fox Haven Farm Stand"
          style={{ maxWidth: '220px', width: '90%', height: 'auto', display: 'block', margin: '0 auto' }}
        />
        <p style={{ color: '#54625c', fontFamily: 'Gelasio', fontStyle: 'mediumWeight', letterSpacing: '1px', marginTop: '1rem', fontSize: '4rem' }}>
          Fox Haven
        </p>
      </header>

      {/* ABOUT SECTION */}
      <section style={{ backgroundColor: '#f3f1e8', borderBottom: '1px solid #3d0d0d', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#54625c', fontSize: '2.5rem', marginTop: 0, letterSpacing: '1px' }}>Welcome</h2>
          <h2 style={{ color: '#54625c', fontSize: '1.7rem', marginTop: 0, letterSpacing: '1px' }}>Fresh Local Produce • Artisanal Provisions • Craft Brewery & Winery</h2>
          <p style={{ lineHeight: '1.7', fontSize: '1.05rem', color: '#54625c' }}>
            Rooted in tradition and sustainably cultivated, Fox Haven Farm Stand brings you the freshest hand-picked produce, small-batch bakery delights, farm-raised meats, and artisanal craft beverages brewed right on our grounds. Thank you for supporting your local agricultural community!
          </p>
        </div>
      </section>

      {/* STICKY NAV BAR */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#2B2B2B', padding: '0.8rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <input
            type="text"
            placeholder="🔍 Search farm stand items..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '20px',
              border: '1px solid #f3f1e8',
              backgroundColor: '#2b0808',
              color: '#fff',
              width: '280px',
              fontSize: '0.95rem'
            }}
          />

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <GlassButton
              onClick={() => {
                if (currentUser) {
                  setAuthMode('profile');
                } else {
                  setAuthMode('login');
                }
                setIsAuthModalOpen(true);
              }}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              👤 {currentUser ? `Hello, ${currentUser.name.split(' ')[0]} (${currentUser.rewardPoints} pts)` : 'Log In / Sign Up'}
            </GlassButton>

            <GlassButton
              onClick={() => setIsCartOpen(true)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              🛒 Basket ({totalItemsCount}) • ${cartTotal.toFixed(2)}
            </GlassButton>
          </div>
        </div>
      </div>

      {/* CATEGORY NAV */}
      <nav style={{ backgroundColor: '#2B2B2B', borderBottom: '1px solid #3d0d0d', padding: '1rem 2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', overflowX: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map((cat: Subcategory | 'All') => (
            <GlassButton
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '20px',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                whiteSpace: 'nowrap'
              }}
            >
              {cat === 'Adult Beverages' ? '🍺🍷 Adult Beverages (21+)' : cat}
            </GlassButton>
          ))}
        </div>
      </nav>

      {/* PRODUCTS GRID / SEARCH EMPTY STATE */}
      <main style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
        <h2 style={{ color: '#2B2B2B', borderBottom: '2px solid #2b2b2b', paddingBottom: '0.5rem', marginBottom: '1.8rem' }}>
          {selectedCategory === 'All' ? 'All Farm Stand Offerings' : selectedCategory}
        </h2>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              backgroundColor: '#2b2b2b',
              border: '2px dashed #899e95',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              color: '#f3f1e8',
              margin: '2rem 0',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧑‍🌾🌾</div>
            <h3 style={{ fontSize: '1.5rem', color: '#899e95', marginTop: 0 }}>
              Sorry, we don't have "{searchQuery}" in season right now!
            </h3>
            <p style={{ maxWidth: '500px', margin: '0.8rem auto 1.5rem', color: '#ccc', lineHeight: '1.6', fontSize: '1rem' }}>
              Our crops and artisanal batches change fresh with the harvest. Try searching for another item or clear your search to explore what's in store today!
            </p>
            <GlassButton
              onClick={() => setSearchQuery('')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.95rem'
              }}
            >
              🔄 Clear Search & View All Offerings
            </GlassButton>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.8rem' }}>
            {filteredProducts.map((product: Product) => {
              const qty = getItemQuantity(product.id);
              const isHovered = hoveredProduct === product.id;

              return (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: '#2b0808',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: isHovered ? '1px solid #899e95' : '1px solid #4a1212',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  {/* Image Section */}
                  <div
                    style={{ overflow: 'hidden', height: '190px', cursor: 'pointer', position: 'relative', backgroundColor: '#140303' }}
                    onClick={() => setActiveProduct(product)}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isHovered ? 0.85 : 1,
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Single Container with Flexbox Distribution */}
                  <div style={{ padding: '1.2rem', backgroundColor: '#56635C', color: '#210505', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                        <h3
                          style={{ margin: 0, fontSize: '1.15rem', color: '#210505', cursor: 'pointer' }}
                          onClick={() => setActiveProduct(product)}
                        >
                          {product.name}
                        </h3>
                        {product.abv && (
                          <span style={{ fontSize: '0.75rem', backgroundColor: '#e07a5f', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                            {product.abv}
                          </span>
                        )}
                      </div>
                      <strong style={{ color: '#f3f1e8', fontSize: '1.1rem', display: 'block', marginBottom: '1rem' }}>
                        ${product.price.toFixed(2)} / {product.unit}
                      </strong>
                    </div>

                    {/* Button Area */}
                    <div>
                      {qty === 0 ? (
                        <GlassButton
                          onClick={() => addToCart(product)}
                          style={{
                            width: '100%',
                            padding: '0.6rem 1rem',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            fontSize: '0.95rem'
                          }}
                        >
                          + Add to Cart
                        </GlassButton>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2b2b2b', borderRadius: '20px', border: '1px solid #f3f1e8', padding: '0.2rem 0.5rem' }}>
                          <GlassButton
                            onClick={() => updateQuantity(product.id, -1)}
                            style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%', fontWeight: 'bold', fontSize: '1.1rem' }}
                          >
                            -
                          </GlassButton>
                          <span style={{ fontWeight: 'bold', color: '#f3f1e8', fontSize: '0.95rem' }}>
                            {qty} in cart
                          </span>
                          <GlassButton
                            onClick={() => addToCart(product)}
                            style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%', fontWeight: 'bold', fontSize: '1.1rem' }}
                          >
                            +
                          </GlassButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* LOG IN / SIGN UP / PROFILE MODAL */}
      {isAuthModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 450, padding: '1rem' }}>
          <div style={{ backgroundColor: '#2b2b2b', border: '2px solid #f3f1e8', padding: '2rem', borderRadius: '12px', maxWidth: '520px', width: '100%', color: '#fff', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #56635C', paddingBottom: '0.5rem' }}>
              <h2 style={{ color: '#f3f1e8', margin: 0 }}>
                {authMode === 'login' && 'Log In to Fox Haven'}
                {authMode === 'signup' && 'Create Your Farm Stand Account'}
                {authMode === 'profile' && 'Your Profile & Saved Cards'}
              </h2>
              <button onClick={() => setIsAuthModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>✖</button>
            </div>

            {authNotice && (
              <div style={{ backgroundColor: '#e07a5f', color: '#fff', padding: '0.8rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                ⚠️ {authNotice}
              </div>
            )}

            {/* LOG IN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Email Address:</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                  />
                </div>
                <GlassButton type="submit" style={{ padding: '0.7rem', borderRadius: '20px', fontWeight: 'bold' }}>
                  Log In
                </GlassButton>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Don't have an account?{' '}
                  <span onClick={() => setAuthMode('signup')} style={{ color: '#899e95', cursor: 'pointer', textDecoration: 'underline' }}>
                    Sign Up
                  </span>
                </p>
              </form>
            )}

            {/* SIGN UP FORM */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem' }}>Street Address</label>
                  <input
                    type="text"
                    value={signupForm.address}
                    onChange={(e) => setSignupForm({ ...signupForm, address: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ flex: 2 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem' }}>City</label>
                    <input
                      type="text"
                      value={signupForm.city}
                      onChange={(e) => setSignupForm({ ...signupForm, city: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem' }}>State</label>
                    <input
                      type="text"
                      value={signupForm.state}
                      onChange={(e) => setSignupForm({ ...signupForm, state: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem' }}>Zip Code</label>
                    <input
                      type="text"
                      value={signupForm.zipCode}
                      onChange={(e) => setSignupForm({ ...signupForm, zipCode: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem' }}>Phone Number</label>
                    <input
                      type="tel"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem' }}>Birthdate * (Alcohol Age Verification 21+)</label>
                  <input
                    type="date"
                    required
                    value={signupForm.birthdate}
                    onChange={(e) => setSignupForm({ ...signupForm, birthdate: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#1a0404', color: '#fff' }}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginTop: '0.3rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={signupForm.subscribePromotions}
                    onChange={(e) => setSignupForm({ ...signupForm, subscribePromotions: e.target.checked })}
                  />
                  Sign up for seasonal farm stand promotions, harvest updates & craft release emails
                </label>

                <p style={{ fontSize: '0.8rem', color: '#e07a5f', fontStyle: 'italic', margin: '0.4rem 0' }}>
                  ℹ️ Note: Physical valid ID must be presented upon delivery for any order containing alcoholic beverages.
                </p>

                <GlassButton type="submit" style={{ padding: '0.7rem', borderRadius: '20px', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  Create Account
                </GlassButton>
                <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                  Already have an account?{' '}
                  <span onClick={() => setAuthMode('login')} style={{ color: '#899e95', cursor: 'pointer', textDecoration: 'underline' }}>
                    Log In
                  </span>
                </p>
              </form>
            )}

            {/* PROFILE & SAVED CARDS VIEW */}
            {authMode === 'profile' && currentUser && (
              <div>
                <div style={{ backgroundColor: '#140303', padding: '1rem', borderRadius: '8px', marginBottom: '1.2rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#f3f1e8', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Personal Details</span>
                    <span style={{ fontSize: '0.9rem', color: '#899e95' }}>🎁 {currentUser.rewardPoints} Loyalty Points</span>
                  </h3>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Name:</strong> {currentUser.name}</p>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Email:</strong> {currentUser.email}</p>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Phone:</strong> {currentUser.phone || 'Not provided'}</p>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Address:</strong> {currentUser.address ? `${currentUser.address}, ${currentUser.city}, ${currentUser.state} ${currentUser.zipCode}` : 'Not provided'}</p>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Birthdate:</strong> {currentUser.birthdate} (Age: {calculateAge(currentUser.birthdate)})</p>
                </div>

                <div style={{ borderTop: '1px solid #56635C', paddingTop: '1rem', marginBottom: '1.2rem' }}>
                  <h3 style={{ margin: '0 0 0.8rem', color: '#f3f1e8' }}>Saved Credit / Debit Cards</h3>
                  {currentUser.savedCards.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: '#aaa', fontStyle: 'italic' }}>No saved cards on file.</p>
                  ) : (
                    currentUser.savedCards.map((card) => (
                      <div key={card.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#140303', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                        <div>
                          <strong>{card.cardNumber}</strong> <small style={{ color: '#ccc' }}>({card.expDate})</small>
                          <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{card.cardHolder}</div>
                        </div>
                        <button onClick={() => handleDeleteCard(card.id)} style={{ backgroundColor: '#e07a5f', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Delete
                        </button>
                      </div>
                    ))
                  )}

                  <form onSubmit={handleAddCard} style={{ marginTop: '1rem', backgroundColor: '#140303', padding: '0.8rem', borderRadius: '6px' }}>
                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#f3f1e8' }}>Add New Payment Card</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="Card Number"
                        required
                        value={newCardNumber}
                        onChange={(e) => setNewCardNumber(e.target.value)}
                        style={{ flex: 2, padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#2b2b2b', color: '#fff' }}
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        value={newCardExp}
                        onChange={(e) => setNewCardExp(e.target.value)}
                        style={{ flex: 1, padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#2b2b2b', color: '#fff' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        required
                        value={newCardHolder}
                        onChange={(e) => setNewCardHolder(e.target.value)}
                        style={{ flex: 2, padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#2b2b2b', color: '#fff' }}
                      />
                      <GlassButton type="submit" style={{ flex: 1, padding: '0.4rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                        + Add Card
                      </GlassButton>
                    </div>
                  </form>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <GlassButton onClick={() => setCurrentUser(null)} style={{ flex: 1, padding: '0.6rem', borderRadius: '20px' }}>
                    Log Out
                  </GlassButton>
                  <GlassButton onClick={() => setIsAuthModalOpen(false)} style={{ flex: 1, padding: '0.6rem', borderRadius: '20px', fontWeight: 'bold' }}>
                    Done
                  </GlassButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {activeProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '1rem' }}>
          <div style={{ backgroundColor: '#2b2b2b', border: '2px solid #f3f1e8', padding: '2rem', borderRadius: '12px', maxWidth: '500px', width: '100%', color: '#fff' }}>
            <h2 style={{ color: '#f3f1e8', marginTop: 0 }}>{activeProduct.name}</h2>
            <img src={activeProduct.image} alt={activeProduct.name} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f3f1e8' }} />
            <p style={{ marginTop: '1rem', lineHeight: '1.6' }}><strong>Description:</strong> {activeProduct.description}</p>
            {activeProduct.tasteProfile && (
              <p style={{ backgroundColor: '#000000', padding: '0.8rem', borderRadius: '6px', borderLeft: '4px solid #f3f1e8' }}>
                👅 <strong>Taste Profile:</strong> {activeProduct.tasteProfile}
              </p>
            )}
            {activeProduct.abv && <p><strong>Alcohol Content:</strong> {activeProduct.abv}</p>}
            <h3 style={{ color: '#f3f1e8' }}>${activeProduct.price.toFixed(2)} per {activeProduct.unit}</h3>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <GlassButton
                onClick={() => setActiveProduct(null)}
                style={{ flex: 1, padding: '0.7rem', borderRadius: '20px' }}
              >
                Close
              </GlassButton>
              <GlassButton
                onClick={() => {
                  addToCart(activeProduct);
                  setActiveProduct(null);
                }}
                style={{ flex: 1, padding: '0.7rem', borderRadius: '20px', fontWeight: 'bold' }}
              >
                Add to Basket
              </GlassButton>
            </div>
          </div>
        </div>
      )}

      {/* 21+ AGE CHECK MODAL */}
      {ageCheckProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 400, padding: '1rem' }}>
          <div style={{ backgroundColor: '#2b0808', border: '2px solid #e07a5f', padding: '2rem', borderRadius: '12px', maxWidth: '420px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ color: '#e07a5f', marginTop: 0 }}>🔞 Age Verification Required</h2>
            <p><strong>{ageCheckProduct.name}</strong> contains alcohol ({ageCheckProduct.abv}).</p>
            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>
              Please verify that the customer is 21 years of age or older before proceeding.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <GlassButton
                onClick={() => setAgeCheckProduct(null)}
                style={{ flex: 1, padding: '0.7rem', borderRadius: '20px' }}
              >
                Cancel
              </GlassButton>
              <GlassButton
                onClick={() => {
                  confirmAddToCart(ageCheckProduct);
                  setAgeCheckProduct(null);
                }}
                style={{ flex: 1, padding: '0.7rem', borderRadius: '20px', fontWeight: 'bold' }}
              >
                Verify & Add
              </GlassButton>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '380px', maxWidth: '100%', backgroundColor: '#2b2b2b', borderLeft: '2px solid #f3f1e8', boxShadow: '-4px 0 20px rgba(0,0,0,0.8)', padding: '1.5rem', display: 'flex', flexDirection: 'column', zIndex: 350 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f1e8', paddingBottom: '1rem' }}>
            <h2 style={{ margin: 0, color: '#f3f1e8' }}>Your Basket</h2>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '1.4rem', color: '#fff', cursor: 'pointer' }}>✖</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', margin: '1rem 0' }}>
            {cart.length === 0 ? (
              <p style={{ color: '#aaa', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>Your basket is currently empty.</p>
            ) : (
              cart.map((ci: CartItem) => (
                <div key={ci.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px dashed #f3f1e8', paddingBottom: '0.8rem' }}>
                  <div>
                    <strong style={{ color: '#fff' }}>{ci.product.name}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#f3f1e8' }}>${ci.product.price.toFixed(2)} each</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GlassButton
                      onClick={() => updateQuantity(ci.product.id, -1)}
                      style={{ width: '28px', height: '28px', padding: 0, borderRadius: '50%', fontWeight: 'bold' }}
                    >
                      -
                    </GlassButton>
                    <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center', color: '#fff' }}>{ci.quantity}</span>
                    <GlassButton
                      onClick={() => updateQuantity(ci.product.id, 1)}
                      style={{ width: '28px', height: '28px', padding: 0, borderRadius: '50%', fontWeight: 'bold' }}
                    >
                      +
                    </GlassButton>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div>
              <div style={{ borderTop: '2px solid #f3f1e8', paddingTop: '1rem', marginBottom: '1rem' }}>
                <label style={{ color: '#f3f1e8', fontSize: '0.9rem' }}>Fulfillment Method:</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', marginBottom: '0.8rem' }}>
                  <GlassButton
                    onClick={() => setCheckoutMode('pickup')}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '20px', fontWeight: checkoutMode === 'pickup' ? 'bold' : 'normal' }}
                  >
                    Pickup
                  </GlassButton>
                  <GlassButton
                    onClick={() => {
                      setCheckoutMode('delivery');
                      if (!currentUser) {
                        setAuthNotice('Please log in or sign up to use delivery & populate your delivery address.');
                        setAuthMode('login');
                        setIsAuthModalOpen(true);
                      } else if (currentUser.zipCode) {
                        handleVerifyZip(currentUser.zipCode);
                      }
                    }}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '20px', fontWeight: checkoutMode === 'delivery' ? 'bold' : 'normal' }}
                  >
                    Delivery
                  </GlassButton>
                </div>

                {/* DELIVERY ZIP CHECK & TIME SLOT SELECTOR */}
                {checkoutMode === 'delivery' && (
                  <div style={{ backgroundColor: '#140303', padding: '0.8rem', borderRadius: '6px', marginBottom: '0.8rem', fontSize: '0.85rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <label style={{ color: '#ccc' }}>Check Delivery Zip Code:</label>
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                        <input
                          type="text"
                          placeholder="e.g. 16249"
                          maxLength={5}
                          value={zipCheckInput}
                          onChange={(e) => handleVerifyZip(e.target.value)}
                          style={{ flex: 1, padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#2b2b2b', color: '#fff' }}
                        />
                      </div>
                      {deliveryStatus && (
                        <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: deliveryStatus.valid ? '#899e95' : '#e07a5f' }}>
                          {deliveryStatus.message}
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ color: '#ccc' }}>Select Delivery Time Window:</label>
                      <select
                        value={deliverySlot}
                        onChange={(e) => setDeliverySlot(e.target.value)}
                        style={{ width: '100%', padding: '0.3rem', marginTop: '0.2rem', borderRadius: '4px', backgroundColor: '#2b2b2b', color: '#fff', border: '1px solid #ccc' }}
                      >
                        <option value="Today 2:00 PM - 4:00 PM">Today 2:00 PM - 4:00 PM</option>
                        <option value="Today 5:00 PM - 7:00 PM">Today 5:00 PM - 7:00 PM</option>
                        <option value="Tomorrow 10:00 AM - 12:00 PM">Tomorrow 10:00 AM - 12:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}

                <label style={{ color: '#f3f1e8', fontSize: '0.9rem' }}>Payment Method:</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', marginBottom: '1rem' }}>
                  <GlassButton
                    onClick={() => {
                      setPaymentType('card');
                      if (!currentUser) {
                        setAuthNotice('Please log in or sign up to pay with a saved credit/debit card.');
                        setAuthMode('login');
                        setIsAuthModalOpen(true);
                      } else if (currentUser.savedCards.length === 0) {
                        setAuthNotice('Please add a credit or debit card to your profile.');
                        setAuthMode('profile');
                        setIsAuthModalOpen(true);
                      }
                    }}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '20px', fontWeight: paymentType === 'card' ? 'bold' : 'normal' }}
                  >
                    Card / POS
                  </GlassButton>
                  <GlassButton
                    onClick={() => setPaymentType('cash')}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '20px', fontWeight: paymentType === 'cash' ? 'bold' : 'normal' }}
                  >
                    Cash
                  </GlassButton>
                </div>

                {/* AGE & ID NOTICES BASED ON FULFILLMENT / PAYMENT */}
                {cart.some((ci) => ci.product.isAgeRestricted) && (
                  <div style={{ backgroundColor: '#140303', padding: '0.6rem', borderRadius: '6px', fontSize: '0.8rem', color: '#e07a5f', marginBottom: '0.8rem' }}>
                    {paymentType === 'cash' ? (
                      <div>💵 Cash Payment: Please verify ID and age upon pickup or delivery checkout.</div>
                    ) : (
                      <div>🪪 Alcohol Delivery Notice: Valid physical ID must be presented upon delivery.</div>
                    )}
                  </div>
                )}

                <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tax (7%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <h3 style={{ margin: 0, display: 'flex', justifyContent: 'space-between', color: '#f3f1e8' }}>
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </h3>
              </div>

              <GlassButton
                onClick={handleCompleteCheckout}
                style={{ width: '100%', padding: '0.9rem', borderRadius: '20px', fontSize: '1.05rem', fontWeight: 'bold' }}
              >
                Complete Checkout & Print Receipt
              </GlassButton>
            </div>
          )}
        </div>
      )}

      {/* PRINTABLE RECEIPT MODAL */}
      {completedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500, padding: '1rem' }}>
          <div style={{ backgroundColor: '#899e95', color: '#000000', padding: '2rem', borderRadius: '8px', width: '340px', fontFamily: 'monospace', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem', borderBottom: '1px dashed #000', paddingBottom: '0.8rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'sans-serif' }}>🦊 FOX HAVEN FARM STAND</h2>
              <small>123 Harvest Way, Rural Valley</small><br />
              <small>Order #: {completedOrder.orderId}</small><br />
              <small>{completedOrder.timestamp}</small>
            </div>

            <div style={{ marginBottom: '1rem', borderBottom: '1px dashed #000', paddingBottom: '0.8rem' }}>
              {completedOrder.items.map((ci: CartItem) => (
                <div key={ci.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span>{ci.quantity}x {ci.product.name}</span>
                  <span>${(ci.product.price * ci.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderBottom: '1px dashed #000', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span>
                <span>${completedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tax (7%):</span>
                <span>${completedOrder.tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '0.3rem' }}>
                <span>TOTAL:</span>
                <span>${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div>Fulfillment: <strong>{completedOrder.fulfillmentMode.toUpperCase()}</strong></div>
              {checkoutMode === 'delivery' && <div style={{ fontSize: '0.75rem' }}>Slot: {deliverySlot}</div>}
              <div>Paid via: <strong>{completedOrder.paymentType.toUpperCase()}</strong></div>
              {currentUser && <div>Customer: <strong>{currentUser.name}</strong></div>}
              <p style={{ marginTop: '0.8rem', fontStyle: 'italic', margin: 0 }}>Thank you for supporting local farm agriculture!</p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <GlassButton
                onClick={() => window.print()}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '20px', fontWeight: 'bold' }}
              >
                🖨️ Print
              </GlassButton>
              <GlassButton
                onClick={() => setCompletedOrder(null)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '20px' }}
              >
                Done
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}