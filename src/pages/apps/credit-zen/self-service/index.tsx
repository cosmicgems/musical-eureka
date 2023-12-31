import React, { useEffect, useState } from 'react'
import { Layout } from '@components/big-three-components';
import { Button, CardMedia, TextField, Typography } from '@mui/material'
import axios from 'axios';

const SelfServicePage = () => {
  const [photoFileData, setPhotoFileData] = useState<any>();
  const [photoPreview, setPhotoPreview] = useState<any>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [fileType, setFileType] = useState<any>(null)



  const handleChange = (e:any) =>{
    const value = e.target.files[0] 
    console.log(value);
    
    
    const file = value;

    if(file.type === "application/pdf") {
      setPdf(URL.createObjectURL(file))
      setFileType(file.type)
      return
    }


    const imgUrl = URL.createObjectURL(file);
    setPhotoPreview(imgUrl);
    setPhotoFileData(file);
    console.log(imgUrl);


    
};

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();
    if (fileType === "application/pdf") {
      formData.append('file', pdf);
    } else {
      formData.append('file', photoFileData);
      
    }
    try {
      console.log(formData);
      const res = await axios.post("http://localhost:8080/api/home", formData);
      console.log(res.data.extracted_text);
      
      
    } catch (error) {
      // Handle error
      console.error(error);
    }
    
  }



  return (
    <div>
      <Layout>

        <div className='flex flex-col justify-center items-center min-h-[85vh]'>

          <div>
                            <Button className='' fullWidth variant='contained' size="large" >
                                <label>
                                    <Typography variant="body1" sx={{fontSize:'.75em'}} component='div'> Upload</Typography>
                                <input onChange={(e)=> handleChange(e)} type='file' accept=".pdf, image/*" name='photo-file'  hidden/>
                                </label>
                            </Button>  
          </div>
          <div>

            {
              photoPreview === null && pdf === null ?
              <p>Upload your document</p>
              :
              photoPreview ?
              <CardMedia
              component="img"
              src={photoPreview ? photoPreview : ""}
              alt=''
              sx={{borderRadius: '5px'}}
              className='w-[150px] h-[150px]'
              />
              :
              pdf ?
              <embed src={pdf} type='application/pdf' width='600' height='400' />  :
              null          
            }


          </div>
          <div>
            <Button variant='outlined' onClick={(e)=> {handleSubmit(e)}} >
              Start
            </Button>
          </div>

        </div>

      </Layout>
    </div>
  )
}

export default SelfServicePage