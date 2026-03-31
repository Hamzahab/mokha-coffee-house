'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import type { CatalogMenuItem, CartModifier } from '@/lib/square/types';
import { useCart } from './CartProvider';
import { useSlidePanel } from './useSlidePanel';
import { useFormatCurrency } from './useFormatCurrency';
import { CloseIcon, ChevronDownIcon, CheckSmallIcon } from './Icons';

interface ItemModalProps {
  item: CatalogMenuItem;
  onClose: () => void;
  onAdded?: () => void;
}

export function ItemModal({ item, onClose, onAdded }: ItemModalProps) {
  const { addItem } = useCart();
  const backdropRef = useRef<HTMLDivElement>(null);
  const { visible, close: handleClose } = useSlidePanel(onClose);
  const fmt = useFormatCurrency();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariationId, setSelectedVariationId] = useState<string>(
    item.variations.length === 1 ? item.variations[0].id : '',
  );
  const [selectedModifierIds, setSelectedModifierIds] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(item.modifierLists.filter((ml) => ml.minSelected > 0).map((ml) => ml.id)),
  );
  const [addAnim, setAddAnim] = useState(false);

  const selectedVariation = item.variations.find((v) => v.id === selectedVariationId);
  const currency = item.variations[0]?.currency ?? 'CAD';

  const selectedModifiers = useMemo(() => {
    const mods: CartModifier[] = [];
    for (const ml of item.modifierLists) {
      for (const m of ml.modifiers) {
        if (selectedModifierIds.has(m.id)) {
          mods.push({ id: m.id, name: m.name, priceCents: m.priceCents });
        }
      }
    }
    return mods;
  }, [item.modifierLists, selectedModifierIds]);

  const modifierTotal = selectedModifiers.reduce((sum, m) => sum + m.priceCents, 0);
  const unitPrice = (selectedVariation?.priceCents ?? 0) + modifierTotal;
  const totalPrice = unitPrice * quantity;

  const requiredGroupsSatisfied = item.modifierLists
    .filter((ml) => ml.minSelected > 0)
    .every((ml) => {
      const count = ml.modifiers.filter((m) => selectedModifierIds.has(m.id)).length;
      return count >= ml.minSelected;
    });

  const isOutOfStock = item.stockStatus === 'out_of_stock';
  const canAdd = !!selectedVariationId && requiredGroupsSatisfied && !isOutOfStock;

  function toggleModifier(modId: string, listId: string) {
    setSelectedModifierIds((prev) => {
      const next = new Set(prev);
      const ml = item.modifierLists.find((l) => l.id === listId);
      if (!ml) return prev;

      if (next.has(modId)) {
        next.delete(modId);
      } else {
        if (ml.selectionType === 'SINGLE') {
          for (const m of ml.modifiers) next.delete(m.id);
        }
        const currentCount = ml.modifiers.filter((m) => next.has(m.id)).length;
        if (currentCount < ml.maxSelected) {
          next.add(modId);
        }
      }
      return next;
    });
  }

  function toggleGroup(groupId: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  }

  function handleAddToCart() {
    if (!canAdd || !selectedVariation) return;

    setAddAnim(true);

    addItem({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      itemId: item.id,
      itemName: item.name,
      variationId: selectedVariation.id,
      variationName: selectedVariation.name,
      modifiers: selectedModifiers,
      quantity,
      unitPriceCents: unitPrice,
      currency,
      imageUrl: item.imageUrl,
    });

    setTimeout(() => {
      onAdded?.();
      handleClose();
    }, 250);
  }

  return (
    <div
      ref={backdropRef}
      className={`order-modal-backdrop${visible ? ' visible' : ''}`}
      onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
    >
      <div className={`order-modal-sheet${visible ? ' visible' : ''}`}>
        {item.imageUrl ? (
          <div className="order-modal-img-wrap">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={520}
              height={440}
              sizes="(max-width: 768px) 100vw, 520px"
              priority
              className="order-modal-img"
            />
          </div>
        ) : (
          <div className="order-modal-img-placeholder" />
        )}

        <div className="order-modal-content">
          <h2 className="order-modal-name">{item.name}</h2>
          <p className="order-modal-price">
            {item.variations.length === 1
              ? fmt(item.variations[0].priceCents)
              : `${fmt(Math.min(...item.variations.map((v) => v.priceCents)))} - ${fmt(Math.max(...item.variations.map((v) => v.priceCents)))}`}
          </p>

          {item.description && (
            <p className="order-modal-desc">{item.description}</p>
          )}

          {isOutOfStock && (
            <p className="order-item-stock out-of-stock order-stock-badge-mb">
              Out of stock
            </p>
          )}
          {item.stockStatus === 'low_stock' && (
            <p className="order-item-stock low-stock order-stock-badge-mb">
              Low stock
            </p>
          )}

          {/* Quantity */}
          <div className="order-qty-row">
            <button
              className="order-qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="order-qty-value">{quantity}</span>
            <button
              className="order-qty-btn"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Variation selector — pill buttons */}
          {item.variations.length > 1 && (
            <div className="order-variation-section">
              <p className="order-section-label">
                Select an option
                <span className="order-section-tag">Required</span>
              </p>
              <div className="order-variation-pills">
                {item.variations.map((v) => (
                  <button
                    key={v.id}
                    className={`order-variation-pill${selectedVariationId === v.id ? ' selected' : ''}`}
                    onClick={() => setSelectedVariationId(v.id)}
                  >
                    <span className="order-variation-pill-name">{v.name}</span>
                    <span className="order-variation-pill-price">{fmt(v.priceCents)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modifier groups */}
          {item.modifierLists.map((ml) => {
            const isExpanded = expandedGroups.has(ml.id);
            const isRequired = ml.minSelected > 0;

            return (
              <div key={ml.id} className="order-mod-group">
                <button className="order-mod-header" onClick={() => toggleGroup(ml.id)}>
                  <span className="order-mod-title">{ml.name}</span>
                  <span className="order-mod-meta">
                    <span>{isRequired ? 'Required' : 'Optional'}</span>
                    <ChevronDownIcon className={`order-mod-chevron${isExpanded ? ' open' : ''}`} />
                  </span>
                </button>
                {isExpanded && (
                  <>
                    <p className="order-mod-subtitle">
                      {ml.selectionType === 'SINGLE' ? 'Select one' : 'Select all that apply'}
                    </p>
                    <div className="order-mod-options">
                      {(() => {
                        const selectedCount = ml.modifiers.filter((m) => selectedModifierIds.has(m.id)).length;
                        const atMax = selectedCount >= ml.maxSelected;

                        return ml.modifiers.map((m) => {
                          const isSelected = selectedModifierIds.has(m.id);
                          const isDisabled = !isSelected && atMax;

                          return (
                            <button
                              key={m.id}
                              className={`order-mod-option${isSelected ? ' selected' : ''}${isDisabled ? ' disabled' : ''}`}
                              onClick={() => !isDisabled && toggleModifier(m.id, ml.id)}
                              disabled={isDisabled}
                            >
                              <span className="order-mod-checkbox">
                                {isSelected && <CheckSmallIcon />}
                              </span>
                              <span className="order-mod-option-info">
                                <span className="order-mod-option-name">{m.name}</span>
                                {m.priceCents > 0 && (
                                  <span className="order-mod-option-price">{fmt(m.priceCents)}</span>
                                )}
                              </span>
                            </button>
                          );
                        });
                      })()}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="order-modal-bottom">
          <button className="order-modal-close-btn" onClick={handleClose} aria-label="Close">
            <CloseIcon size={20} />
          </button>
          <button
            className={`order-modal-add-btn${canAdd ? ' enabled' : ''}${addAnim ? ' adding' : ''}`}
            disabled={!canAdd}
            onClick={handleAddToCart}
          >
            {isOutOfStock ? 'Unavailable' : <>Add to order&ensp;{canAdd ? fmt(totalPrice) : ''}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
