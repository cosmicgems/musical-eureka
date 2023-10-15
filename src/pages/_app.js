import '../styles/globals.css'
import { StateContext } from '../../Context/StateContext'
import { Toaster } from 'react-hot-toast'
import { Box, ThemeProvider, Typography } from "@mui/material"
import lightTheme from '../../utility/lightTheme'
import createEmotionCache from "../../utility/createEmotionCache"
import { CacheProvider } from "@emotion/react"
import Layout from '../components/Layout'
import { SessionProvider, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { grey } from '@mui/material/colors'
import React from 'react'


const clientSideEmotionCache = createEmotionCache();

export default function App({ session, Component,
  emotionCache = clientSideEmotionCache, pageProps, }) {






    return (
        
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={lightTheme}>
            <SessionProvider session={pageProps.session}>
                <StateContext>
                    <Toaster />
                    
                    {Component.auth ? (
                        <Auth>
                            <Component {...pageProps} />    
                        </Auth>
                    ) : Component.superAuth ? (
                      <SuperAuth>
                        <Component {...pageProps} />
                      </SuperAuth>
                      
                    ): Component.userAuth ? 
                      (<Component {...pageProps} />) :
                      (<Component {...pageProps} />)}
                    
                </StateContext>            
            </SessionProvider>
          </ThemeProvider>
        </CacheProvider>


    )

}
    export const fetchCache = 'force-no-store';


function UserAuth({ children }) {
  const router = useRouter();
  const { status } = useSession({ required: true })

  if(status === "loading"){
  return (
    <Box sx={{bgcolor: grey[500]}}>
      <Layout>

        <div className='min-h-[85vh] flex flex-col justify-center items-center'>
          <Typography variant='h2' className='gradient-text w-full'>
            Loading...
          </Typography>
        </div>

      </Layout>
    </Box>
  )}

  return children
}

function Auth({ children }) {
  const router = useRouter();
  const { data:session, status } = useSession({ required: true })

  if(status === "loading"){
  return (
    <Box sx={{bgcolor: grey[500]}}>
      <Layout>

        <div className='min-h-[85vh] flex flex-col justify-center items-center'>
          <Typography variant='h2' className='gradient-text w-full'>
            Loading...
          </Typography>
        </div>

      </Layout>
    </Box>
  )}
  
  if(session.user.role === 12 || session.user.role === 24){
    return children
  }
  
}

function SuperAuth({ children }) {
  const router = useRouter();
  const { data:session, status } = useSession({ required: true });

  if(status === "loading"){
  return (
    <Box sx={{bgcolor: grey[500]}}>
      <Layout>

        <div className='min-h-[85vh] flex flex-col justify-center items-center'>
          <Typography variant='h2' className='gradient-text w-full'>
            Loading...
          </Typography>
        </div>

      </Layout>
    </Box>
  )}

  if(session.user.role !== 24){
    router.push("/")
  }

  if(session.user.role === 24){
    return children
  }


  
}
