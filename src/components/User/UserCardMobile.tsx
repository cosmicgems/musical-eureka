import { Avatar, Box, Button, ButtonGroup, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'


interface Session {
  data:{
      user:{
          about: string;
          confirmed_account: boolean;
          createdAt: Date;
          email: string;
          first_name: string;
          last_name: string;
          password: string;
          photo: string;
          role: number;
          updatedAt: Date;
          username: string;
          verification_token: string;
          verification_token_expiration: string;
          _id: string;
          
      }      
  },
  status: string;

}

const UserCardMobile = () => {

  const router = useRouter();
  const {data: session, status} = useSession() as Session;

  if(status === "loading") {
    return (
      <Box className="" sx={{bgcolor: grey[50]}}>

      </Box>
    )
  }


  const handleNavigate = (e:any, href:string) => {
    e.preventDefault();
    router.push(href);
  }

  return (
    <Box className="flex h-[150px]" sx={{bgcolor: grey[50], borderRadius: '5px'}}>
        <div
                    className='w-2/5 flex flex-col '>
                {session?.user?.photo ? 
                    <CardMedia 
                    component="img"
                    image={session.user.photo}
                    className='h-full'
                    alt=''
                    sx={{borderTopLeftRadius:'5px', borderBottomLeftRadius: "5px", objectFit:"cover"}}
                    />                
                    :
                    <Avatar variant='square' sx={{borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px"}} className='h-[150px] w-2/6'> <Typography  className='gradient-text-subcategories' variant='h2'>{session?.user?.first_name}</Typography> </Avatar>
                }
        </div>
        <div className='w-3/5 h-full'>
        <ButtonGroup
          sx={{borderBottomLeftRadius: "0", borderTopLeftRadius: "0"}}
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          className='w-full justify-between items-stretch flex-column h-[100%]'
        >
        <Button className='w-[100%] h-1/3'  onClick={(e)=> {handleNavigate(e, `/admin/dashboard/${session.user.username}`)}}
        sx={{borderBottomLeftRadius: "0", borderTopLeftRadius: "0"}}>
          Dashboard
        </Button>
          <Button onClick={(e)=> {handleNavigate(e, `/profile/${session.user.username}`)}} className='w-[100%] h-1/3'
          sx={{borderBottomLeftRadius: "0", borderTopLeftRadius: "0"}}>
            Profile
          </Button>
          <Button className='w-[100%] h-1/3' onClick={(e)=> {handleNavigate(e, `/admin/settings/${session.user.username}`)}}
          sx={{borderBottomLeftRadius: "0", borderTopLeftRadius: "0"}}>
            Settings
          </Button>
        </ButtonGroup>
        </div>
    </Box>
  )
}

export default UserCardMobile