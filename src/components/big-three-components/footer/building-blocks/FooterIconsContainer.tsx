import React from 'react'
import { footerItems } from 'public/assets/footerItems'
import FooterIcon from './FooterIcon'

const FooterIconsContainer = () => {

    return (

        <div className='icons'>

            {

                footerItems.map((f, i) => (

                    <FooterIcon 
                    key={`i : ${f.path}`} 
                    path={f.path} 
                    icon={f.icon} 
                    />

                ))

            }

        </div>

    )
}

export default FooterIconsContainer