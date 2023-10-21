import * as React from 'react';
import theme from '../../../styles/theme/lightThemeOptions'
import { Button, TextField, Typography } from '@mui/material'
import { IMaskInput } from 'react-imask';


interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

  
const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref as React.Ref<HTMLInputElement>}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

interface State {
  textmask: string;
  numberformat: string;
}

const ContactForm = () => {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [values, setValues] = React.useState<State>({
    textmask: '',
    numberformat: '1320',
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const contactForm = {
      name,
      phone: values.textmask,
      email,
      message
    }
    console.log(contactForm);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>

      <div className='text-center flex flex-col gap-3' style={{padding: theme.spacing(3)}}>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='h3' sx={{color: theme.palette.primary.main}} className=''>
            Tell Us What&apos;s On Your Mind
          </Typography>
        </div>

        <div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3' style={{paddingInline: theme.spacing(3)}}>

            <div>
              <TextField onChange={(e)=>setName(e.target.value)} fullWidth variant='outlined' sx={{}} className='' value={name} label='Name' />              
            </div>

            <div>
              <TextField
              fullWidth
              value={values.textmask}
              onChange={handleChange}
              name="textmask"
              id="formatted-text-mask-input"
              InputProps={{
                inputComponent: TextMaskCustom as any,
              }}
              label='Phone' />              
            </div>

            <div style={{marginBlockEnd: theme.spacing(3)}}>
              <TextField onChange={(e)=>setEmail(e.target.value)} fullWidth variant='outlined' sx={{}} className='' value={email} label='Email' />              
            </div>

            <div style={{marginBlockEnd: theme.spacing(1)}}>
              <TextField onChange={(e)=>setMessage(e.target.value)} fullWidth multiline rows={4} variant='outlined' sx={{}} className='' value={message} label='Message' />              
            </div>

            <div>
              <Button type='submit' size='large' fullWidth variant='contained' sx={{}} className=''>
                Send
              </Button>
            </div>


          </form>
        </div>

      </div>

    </div>
  )
}

export default ContactForm