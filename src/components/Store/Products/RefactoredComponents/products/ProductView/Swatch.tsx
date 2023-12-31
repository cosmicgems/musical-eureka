import React, { FC } from 'react'
import { Check } from '@mui/icons-material'

interface Props {
    color?: string
    label?: string
    active?: boolean
    variant?: "size" | "color" | string
    onClick: () => void
}

const Swatch: FC<Props> = ({
    color, 
    label, 
    variant,
    active,
    ...rest
}) => {
    label = label?.toLowerCase()
    variant = variant?.toLocaleLowerCase()

  return (
    <button 
    className={active ? "swatch-button active" : "swatch-button"}
    style={color ? {backgroundColor: color} : {}}
    {...rest}
    >   

        {
            variant === "color" && active && (
            <span>
                <Check />
            </span>
                )        
        }



        { variant === "size" ? label : null }

    </button>
  )
}

export default Swatch