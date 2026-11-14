import React, { useEffect } from 'react';
import { ChevronRight, ShoppingBag, X } from 'lucide-react';
import {
  CATALOG_ITEMS,
  COLLECTIONS_ITEMS,
  JOURNAL_ITEMS,
  type CartItem,
  type CatalogItem,
  type DrawerTab,
} from '../data/catalog';

interface SideDrawerProps {
  activeDrawer: DrawerTab;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: CatalogItem) => void;
  onRemoveFromCart: (cartItemId: string) => void;
  onCheckout: () => void;
}

const DRAWER_TITLES: Record<Exclude<DrawerTab, null>, string> = {
  shop: 'Catalog',
  collections: 'Archive 2026',
  journal: 'Editorial',
  cart: 'Shopping Bag',
};

const DRAWER_SUBTITLES: Partial<Record<Exclude<DrawerTab, null>, string>> = {
  shop: 'Featured Garments',
  collections: 'Season Lineup',
  journal: 'Latest Dispatches',
};

export const SideDrawer: React.FC<SideDrawerProps> = ({
  activeDrawer,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
}) => {
  useEffect(() => {
    if (!activeDrawer) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDrawer, onClose]);

  if (!activeDrawer) return null;

  const title = DRAWER_TITLES[activeDrawer];
  const subtitle = DRAWER_SUBTITLES[activeDrawer];
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="relative z-50 w-full h-full bg-charcoal border-l border-gold/30 flex flex-col justify-between overflow-y-auto"
        style={{
          maxWidth: 'var(--drawer-max)',
          padding: 'var(--drawer-pad)',
        }}
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-gold/25">
            <h2 className="font-display font-medium tracking-[0.08em] text-2xl text-ivory">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 text-ivory hover:text-gold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-gold"
            >
              <X strokeWidth={1.5} className="w-5 h-5" />
            </button>
          </div>

          {subtitle && (
            <p
              className="mt-6 mb-4 uppercase tracking-[0.22em] text-gold font-medium"
              style={{ fontSize: 'var(--micro)' }}
            >
              {subtitle}
            </p>
          )}

          {activeDrawer === 'shop' && (
            <div className="divide-y divide-gold/20">
              {CATALOG_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="py-5 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div
                      className="text-gold uppercase tracking-[0.18em] font-medium mb-1"
                      style={{ fontSize: 'var(--micro)' }}
                    >
                      {item.tag}
                    </div>
                    <div
                      className="font-medium uppercase tracking-[0.08em] text-ivory"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-muted mt-1 tabular-nums"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      {item.priceLabel}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="shrink-0 border border-gold/50 px-3.5 py-2 uppercase tracking-[0.18em] font-medium text-ivory hover:bg-gold hover:text-ink hover:border-gold transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-gold"
                    style={{ fontSize: 'var(--micro)' }}
                  >
                    ADD
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeDrawer === 'collections' && (
            <div className="divide-y divide-gold/20">
              {COLLECTIONS_ITEMS.map((collection) => (
                <div key={collection.series} className="py-5">
                  <div
                    className="text-gold uppercase tracking-[0.18em] font-medium mb-1"
                    style={{ fontSize: 'var(--micro)' }}
                  >
                    {collection.series}
                  </div>
                  <h3 className="font-display font-medium tracking-[0.04em] text-xl text-ivory">
                    {collection.title}
                  </h3>
                  <p
                    className="mt-2 text-muted leading-relaxed"
                    style={{ fontSize: 'var(--body)' }}
                  >
                    {collection.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeDrawer === 'journal' && (
            <div className="divide-y divide-gold/20">
              {JOURNAL_ITEMS.map((entry) => (
                <article key={entry.title} className="py-5">
                  <div
                    className="flex items-center justify-between gap-2 text-gold uppercase tracking-[0.18em] font-medium mb-1.5"
                    style={{ fontSize: 'var(--micro)' }}
                  >
                    <span>{entry.date}</span>
                    <span>{entry.readTime}</span>
                  </div>
                  <h3
                    className="font-medium uppercase tracking-[0.06em] text-ivory leading-snug"
                    style={{ fontSize: 'var(--body)' }}
                  >
                    {entry.title}
                  </h3>
                </article>
              ))}
            </div>
          )}

          {activeDrawer === 'cart' && (
            <div className="mt-6">
              {cart.length === 0 ? (
                <div className="py-16 flex flex-col items-center justify-center text-center gap-3 text-muted">
                  <ShoppingBag strokeWidth={1.3} className="w-8 h-8 text-gold/70" />
                  <p style={{ fontSize: 'var(--body)' }}>
                    Your shopping bag is empty.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gold/20">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="py-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div
                          className="font-medium uppercase tracking-[0.08em] text-ivory"
                          style={{ fontSize: 'var(--body)' }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="text-muted mt-1 tabular-nums"
                          style={{ fontSize: 'var(--body)' }}
                        >
                          {item.priceLabel}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.cartItemId)}
                        className="shrink-0 text-muted hover:text-gold underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
                        style={{ fontSize: 'var(--micro)' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="pt-6 mt-6 border-t border-gold/25">
          {activeDrawer === 'cart' ? (
            cart.length > 0 ? (
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between uppercase tracking-[0.16em] font-semibold"
                  style={{ fontSize: 'var(--body)' }}
                >
                  <span className="text-muted">Total</span>
                  <span className="tabular-nums text-ivory">${cartTotal}</span>
                </div>
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full bg-gold text-ink py-3.5 px-5 flex items-center justify-center gap-2 uppercase tracking-[0.2em] font-medium hover:bg-gold-soft transition-colors cursor-pointer"
                  style={{ fontSize: 'var(--micro)' }}
                >
                  <span>CHECKOUT NOW</span>
                  <ChevronRight strokeWidth={1.75} className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p
                className="text-center uppercase tracking-[0.2em] text-muted"
                style={{ fontSize: 'var(--micro)' }}
              >
                CALLISTO © 2026
              </p>
            )
          ) : (
            <p
                className="text-center uppercase tracking-[0.2em] text-muted"
              style={{ fontSize: 'var(--micro)' }}
            >
              CALLISTO © 2026
            </p>
          )}
        </footer>
      </aside>
    </div>
  );
};
