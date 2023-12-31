import ClientTestimonials from '../../../../components/Credit Zen/About/ClientTestimonials'
import VisionStatement from '../../../../components/Credit Zen/About/VisionStatement'
import DoesItWork from '../../../../components/Credit Zen/About/DoesItWork'
import Hero from '../../../../components/Credit Zen/About/Hero'
import HowToStart from '../../../../components/Credit Zen/About/HowToStart'
import MissionStatement from '../../../../components/Credit Zen/About/MissionStatement'
import Process from '../../../../components/Credit Zen/About/Process'
import React from 'react'
import CoreValues from '../../../../components/Credit Zen/About/CoreValues'
import { Layout } from '@components/big-three-components';

const AboutPage = () => {
  return (
    <div>
      <Layout>
        <Hero/>
        <MissionStatement/>
        <CoreValues />
        <VisionStatement />
        <Process/>
        {/* <DoesItWork/>
        <ClientTestimonials/> */}
        <HowToStart/>        
      </Layout>

    </div>
  )
}

export default AboutPage