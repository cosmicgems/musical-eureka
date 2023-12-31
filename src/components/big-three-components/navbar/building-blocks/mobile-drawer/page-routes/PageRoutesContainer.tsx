import React from 'react'
import PageRoute from './PageRoute'

const PageRoutesContainer = ({pages}) => {
    return (
        
        <>

            {
                pages?.map((page) => (
                    <PageRoute 
                    key={`Mobile ${page.name} key: ${page.path}`}
                    page={page}
                    />
                ))
            }

        </>

    )
}

export default PageRoutesContainer