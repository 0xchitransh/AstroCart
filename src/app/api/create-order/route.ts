import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount } = body;

        if (!amount) {
            return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
        }
        
        // Initialize Razorpay
        // Note: In production, these should be securely stored in .env.local
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret123',
        });

        const options = {
            amount: amount, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        const order = await instance.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json(
            { error: 'Failed to create Razorpay order. Are your API keys valid?' }, 
            { status: 500 }
        );
    }
}
