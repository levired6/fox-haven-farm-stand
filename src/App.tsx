import React, { useState } from 'react';
import { INVENTORY } from './data/inventory';
import { Product, Subcategory, CartItem, CompletedOrder } from './types';
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

  const handleCompleteCheckout = () => {
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
              border: '1px solid f3f1e8',
              backgroundColor: '#2b0808',
              color: '#fff',
              width: '280px',
              fontSize: '0.95rem'
            }}
          />

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

      {/* CATEGORY NAV */}
      <nav style={{ backgroundColor: '#2B2B2B', borderBottom: '1px solid #3d0d0d', padding: '1rem 2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',overflowX: 'auto' }}>
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

      {/* PRODUCTS GRID */}
      <main style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
        <h2 style={{ color: '#2B2B2B', borderBottom: '2px solid #2b2b2b', paddingBottom: '0.5rem', marginBottom: '1.8rem' }}>
          {selectedCategory === 'All' ? 'All Farm Stand Offerings' : selectedCategory}
        </h2>

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

  {/* Single Beige Container with Flexbox Distribution */}
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
      </main>

      {/* DETAIL MODAL */}
      {activeProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '1rem' }}>
          <div style={{ backgroundColor: '#2b2b2b', border: '2px solid #f3f1e8', padding: '2rem', borderRadius: '12px', maxWidth: '500px', width: '100%', color: '#fff' }}>
            <h2 style={{ color: '#f3f1e8', marginTop: 0 }}>{activeProduct.name}</h2>
            <img src={activeProduct.image} alt={activeProduct.name} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f3f1e8' }} />
            <p style={{ marginTop: '1rem', lineHeight: '1.6' }}><strong>Description:</strong> {activeProduct.description}</p>
            {activeProduct.tasteProfile && (
              <p style={{ backgroundColor: '#140303', padding: '0.8rem', borderRadius: '6px', borderLeft: '4px solid #f3f1e8' }}>
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
            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Please verify that the customer is 21 years of age or older before proceeding.</p>
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
                    <div style={{ fontSize: '0.85rem', color: 'f3f1e8' }}>${ci.product.price.toFixed(2)} each</div>
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
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', marginBottom: '1rem' }}>
                  <GlassButton
                    onClick={() => setCheckoutMode('pickup')}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '20px', fontWeight: checkoutMode === 'pickup' ? 'bold' : 'normal' }}
                  >
                    Pickup
                  </GlassButton>
                  <GlassButton
                    onClick={() => setCheckoutMode('delivery')}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '20px', fontWeight: checkoutMode === 'delivery' ? 'bold' : 'normal' }}
                  >
                    Delivery
                  </GlassButton>
                </div>

                <label style={{ color: '#f3f1e8', fontSize: '0.9rem' }}>Payment Method:</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', marginBottom: '1rem' }}>
                  <GlassButton
                    onClick={() => setPaymentType('card')}
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
          <div style={{ backgroundColor: '#ffff', color: '#000', padding: '2rem', borderRadius: '8px', width: '340px', fontFamily: 'monospace', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
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
              <div>Paid via: <strong>{completedOrder.paymentType.toUpperCase()}</strong></div>
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