import BuildCredit from '../../../../components/Credit Zen/credit_improvement/BuildCredit'
import CreditBasics from '../../../../components/Credit Zen/credit_improvement/CreditBasics'
import CreditRightForYou from '../../../../components/Credit Zen/credit_improvement/CreditRightForYou'
import FixCredit from '../../../../components/Credit Zen/credit_improvement/FixCredit'
import Hero from '../../../../components/Credit Zen/credit_improvement/Hero'
import ImproveCredit from '../../../../components/Credit Zen/credit_improvement/ImproveCredit'
import MeasureUpCTA from '../../../../components/Credit Zen/credit_improvement/MeasureUpCTA'
import ScoreNeeded from '../../../../components/Credit Zen/credit_improvement/ScoreNeeded'
import React from 'react'
import Layout from '../../../../components/Layout'

const CreditImprovementPage = () => {
  return (
    <div style={{}}>
      <Layout>
        <Hero />
        <MeasureUpCTA />
        <FixCredit />
        <BuildCredit />
        <ScoreNeeded />
        <CreditBasics />
        <CreditRightForYou />        
      </Layout>

    </div>
  )
}

export default CreditImprovementPage