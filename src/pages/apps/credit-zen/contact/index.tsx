import ContactForm from '../../../../components/Credit Zen/Contact/ContactForm'
import Hero from '../../../../components/Credit Zen/Contact/Hero'
import React from 'react'
import { Layout } from '@components/big-three-components';

const ContactPage = () => {
  return (
    <div>
      <Layout>
        <Hero/>
        <ContactForm />        
      </Layout>

    </div>
  )
}

export default ContactPage