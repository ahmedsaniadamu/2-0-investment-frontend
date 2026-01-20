'use client'
import InvestorPageLayout from '../../_components/investor-page-layout';
import InvestmentCheckout from '../_components/payment-checkout';
import { useQuery } from '@tanstack/react-query';
import { investorInvestments } from '@/services/investment';
import Loader from '@/components/loader';
import EmptyData from '@/components/empty-data';

const page = () => {

    const { data: paymentIntent, isPending } = useQuery({
        queryKey: ["get-plans"],
        queryFn: () => investorInvestments.createPaymentIntent({
            amount: 4000,
            currency: "usd",
            investorId: "9450c37a-4eee-4101-8d51-9e7cf5f0adf8",
            planId: "0c5fda53-d6c3-4852-a2e4-c3ab693e4974"
        }),
    });

    if (isPending) return <Loader />

    return (
        <InvestorPageLayout>
            <section className='p-6'>
                <h1 className='text-2xl text-gray-800 font-semibold'>Complete Your Investment Payment</h1>
                <p className='text-sm mb-5'>complete your payment to initiate investment. Once payment is successful you will recieve an email.
                    Please note that your investment status will be pending till upon admin approval.
                </p>
                {
                    paymentIntent?.clientSecret ?
                        <div className='w-full md:border-2 md:border-dotted md:border-primary md:w-1/2 xl:w-1/3 bg-white p-6 rounded-lg mx-auto'>
                            <InvestmentCheckout clientSecret={paymentIntent.clientSecret} amount={paymentIntent.amount} />
                        </div>
                        : <EmptyData text='An error occurred while creating payment intent request. reload the page and try again' />
                }
            </section>
        </InvestorPageLayout>
    )
}

export default page