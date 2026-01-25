'use client';

import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useConfirmModal } from '@/components/useConfirmationModal';
import Loader from '@/components/loader';
import { SpinnerCustom } from '@/components/ui/spinner';

function CheckoutForm({ amount }: { amount: number }) {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const { confirm, ConfirmModalElement } = useConfirmModal();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/investor/available-plans/payment-intent/success`,
            },
        });

        if (error) {
            await confirm({
                title: "Payment Failed",
                description: error.message,
                confirmText: "OK",
                type: 'reject'
            });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            {ConfirmModalElement}
            <PaymentElement />
            <Button className='mt-5 w-full flex justify-center items-center' disabled={!stripe || loading}>
                {loading ? <>
                    <SpinnerCustom />
                    Processing...
                </> : 'Invest'}
            </Button>
        </form>
    );
}

export default function InvestmentCheckout({ clientSecret, amount }: { clientSecret: string, amount: number }) {
    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm amount={amount} />
        </Elements>
    );
}
