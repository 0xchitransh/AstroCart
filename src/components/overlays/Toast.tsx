'use client';

import { useStore } from '@/components/store/StoreProvider';

export function Toast() {
  const { toast } = useStore();
  return (
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {toast}
    </div>
  );
}
