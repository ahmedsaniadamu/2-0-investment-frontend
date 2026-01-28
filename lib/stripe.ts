import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
    'pk_test_51SrJMsH3hFpzqwCn5n5FXqeeTv5M1nro3SRImo89GR5pFyMqzot8v1kmxNBbmoqTkmla6LhoWf4uQExjIt0BgZ1F00kXc3GGeN' // process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
);
