import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, TextField } from '@mui/material';

interface RichTextEditorProps {
    onPropsChange: (props: any) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onPropsChange }) => {
    const editorRef = useRef<any>(null);
    const [editorContent, setEditorContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [savedPost, setSavedPost] = useState<boolean>(null)

 



    const handleEditorChange = (content: string) => {
        setEditorContent(content);
        localStorage.setItem("Body", content);
    };
    
    const handleChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'title') {
            console.log(e.target.value);
            setTitle(e.target.value);
            localStorage.setItem('Title', e.target.value);
        } else{
            return
        }
    };

    const log = () => {
        // if (editorRef.current) {
        // console.log(editorRef.current.getContent());
        // }
    };

    useEffect(() => {
        // Call onPropsChange when title or editorContent changes
        onPropsChange({ title, body: editorContent });
    }, [title, editorContent, onPropsChange]);

    return (
        <>
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
                onInit={(evt, editor) => {
                editorRef.current = editor;
                editor.setContent(editorContent); // Set editor content from state
                }}
                initialValue={savedPost ? editorContent :"Write something beautiful"}
                init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
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
            />
            </div>
        </form>
        </>
    );
};

export default RichTextEditor;
