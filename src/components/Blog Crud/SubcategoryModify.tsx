import { Avatar, Box, Button, Checkbox, FormGroup, Grid, Modal, Typography, TextField, FormControlLabel } from '@mui/material'
import { green, grey, red } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';




const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
  color: green[200],
  },
  '& .MuiInput-underline:after': {
  borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
  '& fieldset': {
      borderColor: grey[50],
  },
  '&:hover fieldset': {
      borderColor: grey[50],
  },
  '&.Mui-focused fieldset': {
      borderColor: grey[50],
  },
  '& .MuiInputBase-input': { 
      color: grey[50], 
  },
  },
  '& label': { // Add this selector for unfocused label
      color: grey[50], // Change this to the desired label color
  },
});

const CustomFormControlLabel = styled(FormControlLabel)({
  '& .MuiCheckbox-root': {
    color: grey[50],
  },
  '& .Mui-checked': {
    color: green[500],
  },
  '& .MuiTypography-root': {
    color: grey[50],
  },
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const SubcategoryModify = () => {
  const [id, setId] = useState<any>("");
  const handleClose = () => setOpen(false);
  const [subcategories, setSubcategories] = useState<any>([]);
  const [subcategory, setSubcategory] = useState<any>({
    name: '',
    description: '',
    photo_landscape: '',
    photo_portrait: '',
    slug: '',
    id: '',
  });
  const [checkedSubcategory, setCheckedSubcategory] = useState<any>([]);
  const [clicked, setClicked] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);
  const [readyForSubmit, setReadyForSubmit] = useState<boolean>(false);
      
  
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (e,id:any) =>{ setId(id);setOpen(true)};

  const initSubcategories = async () => {
    try {
    const responsesubcategories = await axios.get('/api/blog/subcategory/get-all');
    setSubcategories(responsesubcategories.data.subcategories);
    } catch (error) {
    console.error(error);
    }
};

useEffect(() => {
    initSubcategories();
}, []);

const handleClick = (c:any) => {
    if(clicked === ""){
        setClicked(c._id);
        setSubcategory({
            name:c.name,
            description: c.description,
            photo_landscape: c.photo_landscape,
            photo_portrait: c.photo_portrait,
            slug: c.slug,
            id: c._id,
        })
        setUpdate(true)             
    } else {
        setClicked("");
        setUpdate(!update);         
    }
 

}

const handleUpdate = async (e, id) => {
    e.preventDefault()
    try {
        const updatedSubcat = await axios.put(`/api/blog/subcategory/update/${subcategory.slug}`, subcategory)
        console.log(updatedSubcat.data.subcategory);
        setClicked("");
        setReadyForSubmit(false);
    } catch (error) {
        
    }

    
    
}

  return (
    <Box className='flex flex-col gap-3' sx={{}}>

        {subcategories.map((s:any, i:number)=>{
            return (
                <div  key={s._id}>
                    <Box sx={{bgcolor: i % 2 === 0 ? grey[900] : grey[700], borderRadius: '10px'}} className="p-3">

                        <div className='flex flex-row gap-3 justify-between items-center w-full' onClick={()=>handleClick(s)}>

                            <div className='w-3/5'>
                                <Typography variant='h3' sx={{fontSize: '1.5rem'}} className='w-full gradient-text-two'>
                                    {s.name}
                                </Typography>
                            </div>                                    
                      


                            <div className='w-2/5 flex justify-end' onClick={()=>handleClick(s)} >
                                <Avatar
                                    alt={s.description}
                                    src={s.photo_landscape}
                                    sx={{ width: "10vh", height: "10vh" }}
                                    />
                            </div>                

                        </div>

                        {clicked === s._id ?
                            <div className='my-3 '>
                                <form>

                                    {update ?
                                        <div className='flex flex-col gap-3'>


                                            <div>
                                                <CssTextField
                                                    value={s.name}
                                                    sx={{}}
                                                    className=""
                                                    variant='outlined'
                                                    label="name"
                                                    onChange={(e) => setSubcategory({ ...subcategory, name: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <CssTextField
                                                    onChange={(e) => setSubcategory({ ...subcategory, description: e.target.value })}
                                                    fullWidth
                                                    multiline
                                                    rows={5}
                                                    variant='outlined'
                                                    sx={{}}
                                                    value={subcategory.description}
                                                    className=''
                                                    label="Description"
                                                />
                                            </div>

                                            <div>
                                                <CssTextField
                                                    onChange={(e) => setSubcategory({ ...subcategory, photo_landscape: e.target.value })}
                                                    fullWidth
                                                    variant='outlined'
                                                    sx={{}}
                                                    className=''
                                                    value={subcategory.photo_landscape}
                                                    label='Photo Landscape'
                                                />
                                            </div>

                                            <div>
                                                <CssTextField
                                                    onChange={(e) => setSubcategory({ ...subcategory, photo_portrait: e.target.value })}
                                                    fullWidth
                                                    variant='outlined'
                                                    sx={{}}
                                                    className=''
                                                    value={subcategory.photo_portrait}
                                                    label='Photo Portrait'
                                                />
                                            </div>

                                        </div>

                                        : 
                                        <div>
                                            <Typography variant='body1' sx={{}} className=''>
                                                {subcategory.description}
                                            </Typography>                                
                                        </div>                                    
                                    }



                                    <div className='flex flex-row gap-6 justify-center mt-3'>
                                      
                                            <Button onClick={(e)=>handleOpen(e, subcategory._id)}  variant="contained" sx={{color:grey[900]}} className="gradient-button-yellow">
                                                Update
                                            </Button>  


                                        <Button variant="contained" sx={{}} className="gradient-button-red">
                                            Delete
                                        </Button>

                                    </div>


                                </form>


                            </div>
                        : ""
                        }

                    </Box>                        
                </div>

            )
        })}

<Modal
                sx={{}}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="flex flex-col gap-2 text-center" sx={style}>
                  <Typography id="modal-modal-title" variant="h6" >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description mb-2" >
                    Are you sure you would like to delete this post? This action is <span className='font-bold'>irreversible</span> .
                  </Typography>
                  <Typography variant='body2' sx={{color: grey[500]}} className='font-bold'>
                    Click outside this alert to cancel.
                  </Typography>
                  <div className='flex flex-row gap-3 justify-center items-center'>
                    <Button variant='contained' id={id} onClick={(e)=>handleUpdate(e,id)} sx={{bgcolor: red[500]}} className=''>
                      Update
                    </Button>
                    <Button onClick={handleClose} variant='contained' sx={{bgcolor: grey[700]}} className=''>
                      Cancel
                    </Button>   

                  </div>

                </Box>
              </Modal>   

    </Box>
)
}

export default SubcategoryModify