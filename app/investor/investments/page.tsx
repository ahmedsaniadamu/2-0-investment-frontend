import React from 'react'
import InvestorPageLayout from '../_components/investor-page-layout'
import Plants from './_components/plants'
import RecentInvestments from './_components/recent-investment'

const page = () => {
  return (
    <InvestorPageLayout>
      <Plants />
      <RecentInvestments />
    </InvestorPageLayout>
  )
}

export default page