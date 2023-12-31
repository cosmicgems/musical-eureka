import React from 'react'
import { Layout } from '@components/big-three-components';
import FreeCreditReportConsultation from '../../../../components/Credit Zen/Consultation_Forms/FreeCreditReportConsultation'

const CreditAssessment = () => {
  return (
    <div>

        <Layout>
            <div className='mt-20 '>
                <div className='pt-12'>
                    <FreeCreditReportConsultation />
                </div>
            </div>
            

        </Layout>

    </div>
  )
}

export default CreditAssessment