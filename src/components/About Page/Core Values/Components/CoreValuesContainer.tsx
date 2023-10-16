import React, { useState } from 'react'
import CoreValue from './CoreValue'
import { coreValuesItems } from '../../../../../public/assets/coreValueItems'
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const CoreValuesContainer = () => {
    const [coreValue, setCoreValue] = useState<any>(null);
    const [tapped, setTapped] = useState<boolean>(false);

    const handleTap = (c) => {
        
        if (coreValue?._id === c._id){
            setCoreValue(null);
            setTapped(null);
            return
        }
        else if(coreValue === null || coreValue !== null ){
            setCoreValue(c);
            setTapped(true);
            return
        } 
    }

  return (
    <div className='flex flex-col gap-3'>

        <div className='flex flex-row md:justify-evenly overflow-x-auto w-full'>
            
            { coreValuesItems.map((c, i) => (
                <div key={c._id} className='p-3'>
                    <CoreValue onTap={handleTap} c={c} />
                </div>
            ))}

        </div>

        {
            tapped &&
            <div className='p-3 flex flex-col gap-3 justify-center items-center'>
                <Typography variant='h3' className='gradient-text text-center' sx={{fontSize: '2rem'}}>
                    {coreValue.name.toUpperCase()}
                </Typography>
                <Typography variant='h2' className=' text-center md:w-2/3' sx={{color: grey[50], fontSize: '1.15rem'}}>
                    {coreValue.description}
                </Typography>
            </div>            
        }


    </div>

  )
}

export default CoreValuesContainer