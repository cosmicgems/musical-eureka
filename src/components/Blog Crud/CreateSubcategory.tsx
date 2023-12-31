import React, { useState } from 'react'
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { green, grey } from '@mui/material/colors';
import axios from 'axios'
import { Layout } from '@components/big-three-components';
import { alpha, styled } from '@mui/material/styles';


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


const CreateSubcategory = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [photo_landscape, setPhoto_landscape] = useState<string>('');
    const [photo_portrait, setPhoto_portrait] = useState<string>('');
    const [sending, setSending] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleCreate = async(e:any) => {
        e.preventDefault();
        const sub_category = {
            name, description, photo_landscape, photo_portrait
        }

        setSending(true);

        try {
            
            axios.post('/api/blog/subcategory/create', sub_category);

            setTimeout(()=> {
                setSending(false);
                setSuccess(true);
                setSuccessMessage(`The subcategory ${name} has been successfully created!`);
                setName('');
                setDescription('');
                setPhoto_landscape('');
                setPhoto_portrait('');
            }, 500);

            setTimeout(()=> {
                setSuccess(false);
                setSuccessMessage("");
            }, 5000);
        
        } catch (error) {
            
            setError(true);
            setErrorMessage(`There was an issue creating the subcategory ${name}. Please try again.`);
            setSending(false);
            setTimeout(() => {
                setError(false);
                setErrorMessage("");
            }, 5000);
            return
        }

    }
    
    return (

        <Box className="w-full flex flex-col gap-6  p-3 " sx={{bgcolor:grey[900], borderRadius: '5px'}}>

        {
            success ? 
                <Alert severity="success">{successMessage}</Alert>
            : error ?
                <Alert severity="error">{errorMessage}</Alert>
            : sending ?
            <Typography variant='h3' className='gradient-text-five w-full text-center font-bold' sx={{fontSize: '2rem'}}>
                Creating Subategory...
            </Typography>
            :
            <Typography variant='h3' className='gradient-text-category w-full text-center' sx={{}}>
                New Subcategory
            </Typography>

        }


            <div className='flex flex-col gap-6'>

                <div className='w-full'>
                    <form className="flex flex-col justify-center items-center gap-3 w-full" onSubmit={(e)=>handleCreate(e)}>


                        <CssTextField fullWidth variant='outlined' value={name} sx={{}} className='' label='Subcategory Name' onChange={(e)=>setName(e.target.value)} />


                        <CssTextField fullWidth multiline rows={4} variant='outlined' value={description} sx={{}} className='' label='Description' onChange={(e)=>setDescription(e.target.value)} />

            

                        <CssTextField fullWidth variant='outlined' value={photo_landscape} sx={{}} className='' label='Landscape Photo' onChange={(e)=>setPhoto_landscape(e.target.value)} />


                        <CssTextField fullWidth variant='outlined' value={photo_portrait} sx={{}} className='' label='Portrait Photo' onChange={(e)=>setPhoto_portrait(e.target.value)} />


                    


                        {
                                success ? 
                                null
                                : error ?
                                null
                                : sending ?
                                <Button fullWidth type='submit' variant='outlined' sx={{}} className=''>
                                    <CircularProgress />
                                </Button>
                                :
                                <Button fullWidth type='submit' variant='contained' sx={{}} className=''>
                                    Create
                                </Button>
                            }
                        

                

                    </form>                    
                </div>

            </div>

        </Box>

    )
}

export default CreateSubcategory