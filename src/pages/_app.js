import '../styles/globals.css'
import { StateContext } from '../../Context/StateContext'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "@mui/material"
import lightTheme from '../../utility/lightTheme'
import createEmotionCache from "../../utility/createEmotionCache"
import { CacheProvider } from "@emotion/react"
import Layout from '../components/Layout'
import { SessionProvider, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'



const clientSideEmotionCache = createEmotionCache();

export default function App({ session, Component,
  emotionCache = clientSideEmotionCache, pageProps, }) {








    return (
        
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={lightTheme}>
            <SessionProvider session={session}>
                <StateContext>
                    <Toaster />
                    
                    {Component.auth ? (
                        <Auth>
                            <Component {...pageProps} />    
                        </Auth>
                    ) : (
                        <Component {...pageProps} />
                    )}
                    
                </StateContext>            
            </SessionProvider>
          </ThemeProvider>
        </CacheProvider>


    )

}


function Auth({children}){
  const{data:session, status } = getSession({required: true})
  const router = useRouter();

  if (status === 'loading') {

      return <div>Loading...</div>


  }

  if(!session){

      preventDefault()
      router.push('/');

  }

  if (!session?.user?.user.confirmed_account) {


    return <><p>{session.user.name}</p></>;

  }

  return children;
}