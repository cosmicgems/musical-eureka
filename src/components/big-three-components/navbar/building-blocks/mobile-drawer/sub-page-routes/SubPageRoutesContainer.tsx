import React from 'react'
import { SubPageRoute } from '.'

const SubPageRoutesContainer = ({subPages}) => {
    return (
        
        <>

            {
                subPages?.map((page) => (
                    <SubPageRoute
                    key={`Mobile sub-page key: ${page.name} : ${page.path} `}
                    page={page}
                    />
                ))
            }
        
        </>

    )
}

export default SubPageRoutesContainer