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
                <Component {...pageProps} />
              </StateContext>            
          </SessionProvider>

        </ThemeProvider>
      </CacheProvider>


  )
  

}
