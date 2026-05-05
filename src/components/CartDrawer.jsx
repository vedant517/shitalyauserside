import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#b0522a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24"
      fill={filled ? '#c9973a' : 'none'}
      stroke="#c9973a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="#555" strokeWidth="2" strokeLinecap="round"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function CartItem({ item, onRemove, onUpdateQuantity, onToggleWishlist }) {
  const [qtyOpen, setQtyOpen] = React.useState(false);
  const discount = Math.round((1 - item.price / item.mrp) * 100);

  return (
    <div style={{
      display: 'flex',
      gap: '14px',
      padding: '16px 0',
      borderBottom: '1px solid #ede6d8',
      position: 'relative',
    }}>
      <div style={{
        width: '90px',
        height: '100px',
        borderRadius: '6px',
        overflow: 'hidden',
        flexShrink: 0,
        background: '#f5ece0',
      }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '0',
          background: 'linear-gradient(135deg,#c9973a,#e8c46a)',
          color: '#fff',
          fontSize: '10px',
          fontFamily: '"Cinzel", serif',
          fontWeight: 700,
          padding: '2px 7px',
          borderRadius: '10px',
          letterSpacing: '0.05em',
        }}>{discount}%</div>

        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '15px',
          fontWeight: 600,
          color: '#1a0800',
          margin: '0 0 5px',
          lineHeight: 1.3,
          paddingRight: '36px',
        }}>{item.name}</p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '8px',
        }}>
          <span style={{
            fontFamily: '"Cinzel", serif',
            fontSize: '10px',
            color: '#888',
            letterSpacing: '0.1em',
          }}>Color :</span>
          <div style={{
            width: '14px', height: '14px',
            borderRadius: '50%',
            background: item.colorHex || '#e8b84b',
            border: '1px solid rgba(0,0,0,0.15)',
          }} />
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '13px',
            color: '#555',
          }}>{item.color}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          marginBottom: '10px',
        }}>
          <span style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '16px',
            fontWeight: 700,
            color: '#1a0800',
          }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
          {item.mrp && (
            <span style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '13px',
              color: '#aaa',
              textDecoration: 'line-through',
            }}>₹{(item.mrp * item.quantity).toLocaleString('en-IN')}</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setQtyOpen(o => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#fff',
                cursor: 'pointer',
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '13px',
                color: '#333',
              }}
            >
              Qty : {item.quantity}
              <ChevronIcon open={qtyOpen} />
            </button>
            {qtyOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                zIndex: 100,
                minWidth: '70px',
              }}>
                {[1, 2, 3, 4, 5].map(q => (
                  <div
                    key={q}
                    onClick={() => {
                      onUpdateQuantity({ id: item.id, color: item.color, quantity: q });
                      setQtyOpen(false);
                    }}
                    style={{
                      padding: '7px 14px',
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '13px',
                      color: item.quantity === q ? '#c9973a' : '#333',
                      cursor: 'pointer',
                      background: item.quantity === q ? '#faf7f2' : 'transparent',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#faf7f2'}
                    onMouseLeave={e => e.currentTarget.style.background = item.quantity === q ? '#faf7f2' : 'transparent'}
                  >
                    {q}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onRemove({ id: item.id, color: item.color })}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', display: 'flex', alignItems: 'center',
            }}
            title="Remove"
          >
            <TrashIcon />
          </button>

          <button
            onClick={() => onToggleWishlist({ id: item.id, color: item.color })}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', display: 'flex', alignItems: 'center',
            }}
            title="Save for later"
          >
            <HeartIcon filled={item.wishlisted} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer({
  open,
  onClose,
  items = [],
  onRemove = () => {},
  onUpdateQuantity = () => {},
  onToggleWishlist = () => {},
}) {
  const navigate = useNavigate();
  const total      = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.35)', zIndex: 998,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '380px', maxWidth: '100vw',
        background: '#fefcf8', zIndex: 999,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Header */}
        <div style={{
          padding: '20px 22px 16px',
          borderBottom: '1px solid #ede6d8',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexShrink: 0,
        }}>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '18px', fontWeight: 600,
            color: '#1a0800', margin: 0,
          }}>
            Your Shopping Bag
            <span style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '15px', fontWeight: 400,
              color: '#888', marginLeft: '6px',
            }}>
              ({totalCount} {totalCount === 1 ? 'Item' : 'Items'})
            </span>
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', display: 'flex', alignItems: 'center', color: '#888',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Item list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px' }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '14px', color: '#aaa',
            }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d4c4a8" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '16px', color: '#bbb', margin: 0,
              }}>Your bag is empty</p>
            </div>
          ) : (
            items.map((item, i) => (
              <CartItem
                key={`${item.id}-${item.color}-${i}`}
                item={item}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
                onToggleWishlist={onToggleWishlist}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            flexShrink: 0,
            borderTop: '1px solid #ede6d8',
            padding: '16px 22px 22px',
            background: '#fefcf8',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', marginBottom: '4px',
            }}>
              <span style={{
                fontFamily: '"Cinzel", serif', fontSize: '12px',
                letterSpacing: '0.12em', color: '#3d1a00', fontWeight: 600,
              }}>Total</span>
              <span style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '18px', fontWeight: 700, color: '#1a0800',
              }}>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '12px', color: '#aaa', margin: '0 0 16px',
            }}>Shipping & taxes calculated at checkout</p>
            <button
              onClick={() => { navigate('/cart'); onClose(); }}
              style={{
                width: '100%', padding: '14px',
                background: '#8b7355', color: '#fff',
                fontFamily: '"Cinzel", serif', fontSize: '11px',
                letterSpacing: '0.18em', fontWeight: 700,
                border: 'none', borderRadius: '3px',
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#7a6244'}
              onMouseLeave={e => e.currentTarget.style.background = '#8b7355'}
            >
              VIEW SHOPPING CART →
            </button>
          </div>
        )}
      </div>
    </>
  );
}