'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { TERMS } from '@/data/site';
import { useStore } from '@/components/store/StoreProvider';
import { Overlay } from '@/components/ui/Overlay';

export function PolicyModal() {
  const { overlay, closeOverlay } = useStore();
  const open = overlay?.type === 'policy';
  const section = open ? overlay.section : undefined;

  useEffect(() => {
    if (!open || !section) return;
    const t = setTimeout(() => document.getElementById(`term-${section}`)?.scrollIntoView({ block: 'start' }), 120);
    return () => clearTimeout(t);
  }, [open, section]);

  return (
    <Overlay open={open} onClose={closeOverlay} label="Terms and disclaimer" variant="modal" className="policy">
      <div className="modal__body policy__body">
        <button type="button" className="icon-btn modal__close" aria-label="Close terms" onClick={closeOverlay} data-autofocus>
          <X size={22} strokeWidth={1.5} />
        </button>
        <h2 className="modal__title">Terms &amp; Disclaimer</h2>
        <ol className="policy__list">
          {TERMS.map((t) => (
            <li key={t.id} id={`term-${t.id}`} className={section === t.id ? 'is-target' : ''}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Overlay>
  );
}
