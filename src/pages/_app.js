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

export default function App({ Component,
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
                    ) : (
                        <Component {...pageProps} />
                    )}
                    
                </StateContext>            
            </SessionProvider>
          </ThemeProvider>
        </CacheProvider>


    )

}

function Auth({ children }) {
  const router = useRouter();
  const [session, loading] = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) router.push("/") // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}