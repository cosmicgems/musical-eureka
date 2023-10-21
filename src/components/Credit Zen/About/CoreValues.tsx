import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { coreValues } from '../../../../public/assets/core_values';
import { CardMedia, Typography } from '@mui/material';
import theme from '../../../styles/theme/lightThemeOptions';

const CoreValues = () => {
  return (
    <div className='h-content flex flex-col justify-center items-center '  style={{paddingBlockStart: theme.spacing(3)}}>
      <div>
        <Typography variant='h3' sx={{}} className=''>
          Core Values
        </Typography>
      </div>
    <Box className='' sx={{ width: '100%', }}>
    <ImageList variant="masonry" cols={3} gap={8}>
  {coreValues.map((v, i) => (
    <ImageListItem
      className={`relative ${i === 1 || i === 4 ? 'flex justify-center items-center' : ''} `}
      key={v.media}
      sx={{ zIndex: -5 }}
    >
      <div
        id={v.name}
        style={{
          zIndex: -4,
          opacity: 0.5,
          backgroundColor: '#000',
          width: '100%',
          height:
            i === 0 || i === 1 || i === 5 || i === 6
              ? '17.5vh'
              : i === 2 || i === 3 || i === 4
              ? '11vh'
              : 'auto',
        }}
        className={`absolute ${
          i === 0 || i === 1 || i === 5 || i === 6
            ? 'h-[17.5vh]'
            : i === 2 || i === 3 || i === 4
            ? 'h-[11vh]'
            : ''
        }`}
      />
      <img
        className='h-[17.5vh] relative'
        src={`${v.media}?w=100%&fit=crop&auto=format`}
        srcSet={`${v.media}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={v.alt}
        loading="lazy"
        style={{
          width: '100%',
          height:
            i === 0 || i === 1 || i === 5 || i === 6 ? '17.5vh' :
            i === 2 || i === 3 || i === 4 ? '11vh' :
            'auto', zIndex: -5 // Default height
        }}
      />
      <div
        style={{
          width: '100%',
          height:
            i === 0 || i === 1 || i === 5 || i === 6 ? '17.5vh' :
            i === 2 || i === 3 || i === 4 ? '11vh' :
            'auto', 
        }}
        className={`absolute top-0 left-0 w-full h-full`}
      >
        <div className='flex justify-center items-center h-full'>
          <Typography variant='h6' sx={{color:
            i === 0 || i === 1 || i === 5 || i === 6 ? theme.palette.primary.light :
            i === 2 || i === 3 || i === 4 ? theme.palette.secondary.light :
            ''}}>
            {v.name}
          </Typography>
        </div>
      </div>
    </ImageListItem>
  ))}
</ImageList>
    </Box>
    </div>
  )
}

export default CoreValues