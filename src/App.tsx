import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react';
import { CornerBracket, WireframeGlobe } from './components/CustomIcons';
import { ImageRevealBackground } from './components/ImageRevealBackground';
import { SideDrawer } from './components/SideDrawer';
import {
  type CartItem,
  type CatalogItem,
  type DrawerTab,
} from './data/catalog';

export default function App() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerTab>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleAddToCart = useCallback(
    (item: CatalogItem) => {
      const cartItem: CartItem = {
        ...item,
        cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };
      setCart((prev) => [...prev, cartItem]);
      showToast(`Added "${item.title}" to your shopping bag.`);
    },
    [showToast]
  );

  const handleRemoveFromCart = useCallback((cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const handleCheckout = useCallback(() => {
    setCart([]);
    setActiveDrawer(null);
    showToast('Order submitted successfully!');
  }, [showToast]);

  return (
    <div className="min-h-screen bg-ink text-ivory font-sans flex flex-col relative overflow-hidden">
      <header
        className="relative z-20 flex items-center justify-between bg-ink border-b border-gold/30"
        style={{
          paddingInline: 'var(--pad-x)',
          paddingTop: 'var(--header-pt)',
          paddingBottom: 'var(--section-gap)',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveDrawer(null)}
          className="font-display font-medium tracking-[0.28em] text-ivory hover:text-gold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-gold"
          style={{ fontSize: 'var(--logo)' }}
        >
          CALLISTO
        </button>

        <nav
          className="flex items-center font-sans font-normal uppercase tracking-[0.22em] text-ivory/80"
          style={{ fontSize: 'var(--nav)', gap: 'var(--gap-nav)' }}
          aria-label="Primary Navigation"
        >
          <button
            type="button"
            onClick={() => setActiveDrawer('shop')}
            className="hover:text-gold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-gold"
          >
            SHOP
          </button>
          <button
            type="button"
            onClick={() => setActiveDrawer('collections')}
            className="hover:text-gold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-gold"
          >
            COLLECTIONS
          </button>
          <button
            type="button"
            onClick={() => setActiveDrawer('journal')}
            className="hover:text-gold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-gold"
          >
            JOURNAL
          </button>
          <span className="text-gold/40 select-none" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            onClick={() => setActiveDrawer('cart')}
            aria-label={`Shopping Bag (${cart.length} items)`}
            className="relative inline-flex items-center justify-center text-ivory hover:text-gold transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-gold"
          >
            <ShoppingBag
              strokeWidth={1.25}
              style={{ width: 'var(--icon)', height: 'var(--icon)' }}
            />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-gold text-ink text-[10px] font-semibold flex items-center justify-center leading-none tabular-nums">
                {cart.length}
              </span>
            )}
          </button>
        </nav>
      </header>

      <main
        className="flex-1 w-full flex flex-col overflow-hidden"
        style={{ position: 'relative' }}
      >
        <ImageRevealBackground />

        <div
          className="flex flex-col items-start"
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 'clamp(1.5rem, 11vh, 6.5rem)',
            left: 'var(--pad-x)',
            pointerEvents: 'none',
          }}
        >
          <CornerBracket variant="tl" />

          <h1
            className="font-display font-medium tracking-[-0.02em] leading-[0.9] text-ivory my-5"
            style={{ fontSize: 'var(--headline)' }}
          >
            <span className="block">Beyond</span>
            <span className="block">
              the <span className="italic text-gold-soft">Future</span>
            </span>
            <span
              className="mt-5 block h-px w-16 bg-gold"
              aria-hidden="true"
            />
          </h1>

          <CornerBracket variant="bl" />

          <button
            type="button"
            onClick={() => setActiveDrawer('shop')}
            className="group inline-flex items-center bg-ink/55 backdrop-blur-sm border border-gold/70 uppercase font-medium tracking-[0.22em] text-ivory hover:bg-gold hover:text-ink hover:border-gold transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-gold"
            style={{
              pointerEvents: 'auto',
              marginTop: 'var(--section-gap)',
              fontSize: 'var(--body)',
              paddingInline: 'var(--btn-px)',
              paddingBlock: 'var(--btn-py)',
              gap: 'var(--btn-gap)',
            }}
          >
            <span>SHOP NOW</span>
            <ArrowUpRight
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ width: 'var(--icon)', height: 'var(--icon)' }}
            />
          </button>
        </div>

        <div
          className="bg-charcoal/80 backdrop-blur-md border border-gold/25"
          style={{
            position: 'absolute',
            zIndex: 10,
            bottom: 'var(--pad-y)',
            right: 'var(--pad-x)',
            minWidth: 'var(--feature-min)',
            padding: 'var(--feature-pad)',
            pointerEvents: 'none',
          }}
        >
          <CornerBracket variant="tl" className="absolute top-0 left-0" />
          <CornerBracket variant="tr" className="absolute top-0 right-0" />
          <CornerBracket variant="bl" className="absolute bottom-0 left-0" />
          <CornerBracket variant="br" className="absolute bottom-0 right-0" />

          <WireframeGlobe />

          <div
            className="mt-4 font-sans font-medium uppercase tracking-[0.22em] leading-[1.65] text-ivory"
            style={{ fontSize: 'var(--body)' }}
          >
            <div>BEYOND TRENDS.</div>
            <div>BUILT FOR TOMORROW.</div>
          </div>
        </div>
      </main>

      <SideDrawer
        activeDrawer={activeDrawer}
        onClose={() => setActiveDrawer(null)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 right-5 z-[60] bg-charcoal text-ivory border border-gold/40 px-4 py-3 flex items-center gap-2.5 shadow-lg max-w-sm"
          style={{ fontSize: 'var(--body)' }}
        >
          <Check strokeWidth={2} className="w-4 h-4 text-gold shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
