'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { BRAND } from '@/data/site';
import { formatPrice } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Overlay } from '@/components/ui/Overlay';

type RazorpayResponse = { razorpay_payment_id: string };
type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; contact: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
};
type RazorpayInstance = { open: () => void; on: (event: string, cb: () => void) => void };
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export function Checkout() {
  const { cart, cartTotal, clearCart, overlay, closeOverlay } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal * 100 }), // paise
      });
      const order = await res.json();

      if (!order.id) {
        if (order.error) throw new Error('Backend Error: ' + order.error);
        throw new Error('Failed to create order. Check backend logs.');
      }

      if (!window.Razorpay) throw new Error('Payment gateway is still loading. Please try again in a moment.');

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
        amount: order.amount,
        currency: order.currency,
        name: BRAND,
        description: `${cart.length} Authentic Panchdhatu Rings`,
        order_id: order.id,
        handler: function (response) {
          alert('Payment Successful! Order ID: ' + response.razorpay_payment_id);
          clearCart();
          closeOverlay();
          setIsSubmitting(false);
        },
        prefill: { name, contact: phone },
        theme: { color: '#4A2017' },
        modal: { ondismiss: () => setIsSubmitting(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', function () {
        setIsSubmitting(false);
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert(error instanceof Error ? error.message : 'Something went wrong initializing the payment.');
    }
  };

  return (
    <Overlay open={overlay?.type === 'checkout'} onClose={closeOverlay} label="Secure checkout" variant="modal">
      <form className="modal__body" onSubmit={handlePayment}>
        <button type="button" className="icon-btn modal__close" aria-label="Close checkout" onClick={closeOverlay}>
          <X size={22} strokeWidth={1.5} />
        </button>
        <h2 className="modal__title">Secure Checkout</h2>

        <div className="field">
          <label htmlFor="c_name">Full Name</label>
          <input id="c_name" type="text" required autoComplete="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} data-autofocus />
        </div>
        <div className="field">
          <label htmlFor="c_phone">Phone Number</label>
          <input id="c_phone" type="tel" required autoComplete="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="c_address">Delivery Address</label>
          <input id="c_address" type="text" required autoComplete="street-address" placeholder="Complete delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="checkout__total">
          <span>Total Amount</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>

        <button type="submit" className="btn btn--dark btn--block" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : `Pay ${formatPrice(cartTotal)} securely`}
        </button>
        <p className="fineprint">
          By paying you confirm you have read the terms, including that orders are not eligible for change-of-mind
          returns or exchanges.
        </p>
      </form>
    </Overlay>
  );
}
