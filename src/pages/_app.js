import '../styles/globals.css'
// import { Layout } from '../components'
import { StateContext } from '../../Context/StateContext'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "@mui/material"
import lightTheme from '../../utility/lightTheme'
import createEmotionCache from "../../utility/createEmotionCache"
import { CacheProvider } from "@emotion/react"
import Layout from '../components/Layout'



const clientSideEmotionCache = createEmotionCache();

export default function App({ Component,
  emotionCache = clientSideEmotionCache, pageProps }) {
  return (
      
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <StateContext>
          <Layout>
              <Toaster />
              <Component {...pageProps} />
          </Layout>
            </StateContext>
        </ThemeProvider>
      </CacheProvider>


  )
  

}
