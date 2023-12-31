import { Divider, List } from '@mui/material'
import React from 'react'
import { PageRouteContainer } from './page-routes'
import { SubPageRouteContainer } from './sub-page-routes'
import { grey } from '@mui/material/colors'

const PageRoutes = ({
    pages,
    subPages,
}) => {
    return (

        <List>

            <PageRouteContainer 
            pages={pages}
            />

            {
                subPages &&
                    <>
                    
                        <div className='px-2 my-2'>
                            <Divider 
                            className='' 
                            sx={
                                {
                                    color: grey[50], 
                                    borderWidth: '2px', 
                                    borderRadius: '20%'
                                }
                            } 
                            />
                        </div>

                        <SubPageRouteContainer 
                        subPages={subPages} 
                        />

                    </>
            }
        
        </List>

    )
}

export default PageRoutes