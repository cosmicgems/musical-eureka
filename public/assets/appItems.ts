
import { SvgIconComponent } from '@mui/icons-material';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import TroubleshootRoundedIcon from '@mui/icons-material/TroubleshootRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

interface Page {
    name: string,
    path: string,
    icon: SvgIconComponent,
}

interface App {
    name: string;
    description: string;
    icon: string;
    href: string;
    slug: string;
    _id: string;
    pages: Page[];
}

export const appItems: App[] = [
    {
        name: "Real Estate Connect",
        description: "Your all-in-one portfolio management tool for exploring and evaluating lucrative investment opportunities in the real estate market.",
        icon: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        href: "/apps/real-estate-connect",
        slug: "real-estate-connect",
        _id: "h738hd7389ejd9h27",
        pages: [

        ]
    },
    {
        name: "AI Skills Team",
        description: "Empowering the future through AI accessibility. Our dedicated team bridges the gap by making artificial intelligence skills accessible to all.",
        icon: "https://images.pexels.com/photos/17483811/pexels-photo-17483811/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-ai-accountability-is-a-strong-foundation-in-a-world-of-unpredictability-it-was-created-by-artist-champ.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        href: "/apps/ai-skills-team",
        slug: "ai-skills-team",
        _id: "in3a8dc98jw93ej9d",
        pages: [

        ]
    },
    {
        name: "Credit Zen",
        description: "Credit Zen is an educational app that empowers users to understand, track, and improve their credit scores. With user-friendly tools and technology, it enables seamless credit management and repair, putting financial control back in users' hands.",
        icon: "https://images.pexels.com/photos/515631/pexels-photo-515631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        href: "/apps/credit-zen",
            slug: "credit-zen",
        _id: "i2373bxx304xgf32xuf3489",
        pages: [
            
            {
                name: 'Home',
                path: '/',
                icon: HomeRoundedIcon
            },
            {
                name: 'Our Services',
                path: '/our-services',
                icon: TroubleshootRoundedIcon 
            },
            {
                name: 'Credit Improvement',
                path: 'credit-improvement',
                icon: TrendingUpRoundedIcon
            },
            {
                name: 'About Us',
                path: '/about',
                icon: InfoRoundedIcon 
            },
            {
                name: 'Contact Us',
                path: '/contact',
                icon: PhoneRoundedIcon 
            },
            {
                name: 'Client Login',
                path: '/login',
                icon: LoginRoundedIcon
            },
        ]
    },
]



// {
//     name: "",
//     description: "",
//     icon: "",
//     href: "",
//         slug: "",
//     _id: "",
// },