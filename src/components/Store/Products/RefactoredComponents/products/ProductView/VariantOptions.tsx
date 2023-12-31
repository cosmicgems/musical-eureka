
import { Typography } from '@mui/material'
import React from 'react'
import Swatch from './Swatch'

const VariantOptions = ({options, choices, setChoices}) => {

    
    // console.log(choices);
    

  return (
    <div className='variants-container'>
        {
            options.map( (option) => 
                <div key={option.id} className='variant-container'>
                    <Typography>
                        {option.displayName}
                    </Typography>
                    <div className='variant-options-container'>
                        {
                            option.values.map(value => {
                                
                                const activeChoice = choices[option.displayName.toLocaleLowerCase()]
                                // console.log(activeChoice);
                                
                                return (
                                    <Swatch
                                    key={`${option.id}-${value.label}`}
                                    label={value.label}
                                    color={value.hexColor}
                                    variant={option.displayName}
                                    active={value.label.toLocaleLowerCase() === activeChoice}
                                    onClick={() => {
                                        setChoices({
                                            ...choices,
                                            [option.displayName.toLocaleLowerCase()]: value.label.toLocaleLowerCase()
                                        })
                                    }}
                                    />                                    
                                )
                            }

                                )
                        }
                    </div>

                </div>
                )
        }
    </div>
  )
}

export default VariantOptions