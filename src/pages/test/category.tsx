import { Box, Button, TextField } from '@mui/material'
import { grey } from '@mui/material/colors';
import React, { useState } from 'react'
import axios from 'axios'

const Category = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [photo_landscape, setPhoto_landscape] = useState<string>('');
    const [photo_portrait, setPhoto_portrait] = useState<string>('');
    const [sending, setSending] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleCreate = () => {
        const category = {
            name, description, photo_landscape, photo_portrait
        }

        setSending(true);

        try {
            
            axios.post('/api/blog/category/create', category)
        
        } catch (error) {
            
            setError(true);
            setErrorMessage(`There was an issue creating the category ${name}. Please try again.`);
            setSending(false)
            return
        }
        setSending(false);
        setSuccess(true);
        setSuccessMessage(`The category ${name} has been successfully created!`);
        setName('');
        setDescription('');
        setPhoto_landscape('');
        setPhoto_portrait('');

    }

    return (
        <>
            <Box className='min-h-screen flex' sx={{bgcolor: grey[200]}}>
                <div>
                    <form onSubmit={handleCreate}>

                        <div>

                            <TextField variant='outlined' value={name} sx={{}} className='' label='Category Name' onChange={(e)=>setName(e.target.value)} />

                        </div>  

                        <div>

                            <TextField multiline rows={4} variant='outlined' value={description} sx={{}} className='' label='Description' onChange={(e)=>setDescription(e.target.value)} />

                        </div>  

                        <div>

                            <TextField variant='outlined' value={photo_landscape} sx={{}} className='' label='Landscape Photo' onChange={(e)=>setPhoto_landscape(e.target.value)} />

                        </div>  

                        <div>

                            <TextField variant='outlined' value={photo_portrait} sx={{}} className='' label='Portrait Photo' onChange={(e)=>setPhoto_portrait(e.target.value)} />

                        </div>  

                        <div>   
                            <Button type='submit' variant='contained' sx={{}} className=''>
                                Create
                            </Button>
                        </div>

                    </form>                    
                </div>

            </Box>        
        </>



    )
}

export default Category