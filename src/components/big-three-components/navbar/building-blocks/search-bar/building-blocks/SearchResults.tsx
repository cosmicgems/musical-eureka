import { Box, Button, CardMedia, Modal, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'

const style = {
    position: 'absolute' as 'absolute',
    // top: '10%',
    // left: '23%',
    // transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:  "5px",
    boxShadow: 24,
    // p: 4,
};

const SearchResults = (props) => {

    const { handleOpen, open, handleClose, titleResults, handleClick } = props;
    console.log(open, handleClose, titleResults, handleClick);
    

    return (
        <div className='absolute w-screen h-screen z-20'>
            
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                
                    <Box sx={style} className="md:w-[33vw] md:max-h-[33vh] overflow-y-auto overflow-x-hidden  top-[6%] md:top-[10%] md:left-[23%]  z-30">
                                {titleResults?.map((r, i) => (
                                    <Box key={r._id}  sx={{bgcolor: i % 2 ? grey[900] : grey[700],borderBottomLeftRadius: i === titleResults.length - 1 ?'5px' : "" ,borderBottomRightRadius: i === titleResults.length - 1 ?'5px' : "" }} className="flex items-center z-40">
                                        
                                        <Button fullWidth onClick={ () => handleClick(r.slug)}>
                                            <CardMedia 
                                                sx={{}}
                                                className='w-[50px] h-[50px]'
                                                component="img"
                                                image={r.photo  ? r.photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
                                                alt=''
                                                />
                                                <div className='flex flex-col gap-2 p-1 ml-12'>
                                                    <Typography variant='h3' sx={{fontSize: '1.25rem'}} className={`${i % 2 ?  "gradient-text" : "gradient-text-category" }`}>
                                                        {r.title}
                                                    </Typography>
                                                </div>                           
                                        </Button>
                                    </Box> 

                                ))}
                    </Box>  
                
            </Modal>
        </div>
    )
}

export default SearchResults