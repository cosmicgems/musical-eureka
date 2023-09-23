import '../styles/globals.css'
// import { Layout } from '../components'
import { StateContext } from '../../Context/StateContext'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "@mui/material"
import lightTheme from '../../utility/lightTheme'
import createEmotionCache from "../../utility/createEmotionCache"
import { CacheProvider } from "@emotion/react"
import Layout from '../components/Layout'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'



const clientSideEmotionCache = createEmotionCache();

export default function App({ session, Component,
  emotionCache = clientSideEmotionCache, pageProps, }) {

    // const {data:session} = useSession();

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
  const{data:session, status } = useSession({required: true})
  const router = useRouter();

  if (status === 'loading') {
      return <div>Loading...</div>

      
  }
 
  if(!session){
      preventDefault()
      router.push('/');
  }
  console.log(session.user);
  if (!session?.user?.confirmed_account) {
      
    router.push('/admin/account/setup'); // Redirect to account setup page
    return null;
  }

  return children;
}