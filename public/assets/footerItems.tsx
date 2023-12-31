import { ReactElement } from "react";
import { Facebook, 
    Instagram, 
    YouTube, 
    Telegram, 
    Twitter, 
    WhatsApp 
} from '@mui/icons-material'
import { grey } from "@mui/material/colors";



interface Icon {
    icon: ReactElement
    path: string
}

export const footerItems: Icon[] = [
    {
        icon: <Facebook sx={{color: grey[900], fontSize: "2em"}} />,
        path: "https://www.facebook.com/pearlboxandco",
    },
    {
        icon: <Instagram sx={{color: grey[900], fontSize: "2em"}} />,
        path: "https://instagram.com/pearlboxandco?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr",
    },
    {
        icon: <YouTube sx={{color: grey[900], fontSize: "2em"}} />,
        path: "https://www.youtube.com/channel/UCF_QOiSVYqteXK1_xIb2lIw",
    },
]