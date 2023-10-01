import { Button, TextField } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react'

const TextEditor = ({handleSubmit, handleChange, title, handleEditorChange, editorContent}) => {
    const editorRef = useRef<any>(null);
    const [cleared, setCleared] = useState<boolean>(false);



    const TINY_API_KEY = process.env.TINY_API_KEY
    const submitBlog = async(e) => {
        handleSubmit(e);
    }


  return (
    <div>
    <form onSubmit={submitBlog}>

        
            <form className='p-3'>
            <div className='mb-3'>
            <TextField
                fullWidth
                variant='outlined'
                sx={{}}
                className=''
                value={title}
                label='title'
                onChange={handleChange('title')} // Update title state on change
            />
            </div>
            <div className='py-3'>
            <Editor
            apiKey={TINY_API_KEY}
                onInit={(evt, editor) => {
                editorRef.current = editor;
                }}
                // init={{
                //   height: 500,
                //   menubar: false,
                //   plugins: [
                //     'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                //     'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                //     'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                //   ],
                //   toolbar: 'undo redo | blocks | ' +
                //     'bold italic forecolor | alignleft aligncenter ' +
                //     'alignright alignjustify | bullist numlist outdent indent | ' +
                //     'removeformat | help',
                //   content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                // }}
                init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor emoticons',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help' + 'image | code |image' ,
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={handleEditorChange} // Update editor content state on change
                value={editorContent}
            />
            </div>
        </form>

        <div className='px-3'>
            <Button type='submit' variant='contained' >
            Submit
            </Button>    
        </div>                             

    </form>
    </div>
  )
}

export default TextEditor