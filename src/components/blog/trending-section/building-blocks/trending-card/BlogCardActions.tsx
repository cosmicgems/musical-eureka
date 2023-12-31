import React, 
    { useCallback, 
        useEffect, 
        useState 
    } from 'react'
import axios from 'axios';
import { 
    CardActions, 
    Chip, 
    Typography, 
} from '@mui/material';
import { 
    grey, 
    red 
} from '@mui/material/colors';
import SocialShare from '@components/SocialShare';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';




interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
}));


const BlogCardActions = ({
    clickCount,
    readCount,
    shareCount,
    user,
    title,
    id,
    path,
    excerpt,
    excerptTwo,
}) => {
    
    const [expanded, setExpanded] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(null);
    
    const data = {
        title,
        url: path,
        text: excerpt ? excerpt : excerptTwo
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const fetchUser = useCallback(async () => {

        try {
    
            const userLiked = user?.favorite_posts?.some((post) => id.includes(post._id));
        
            if (userLiked) {
                setLiked(true);
            } else {
                setLiked(false);
            }

        } catch (error) {

            console.error("Error fetching user:", error);

        }

    }, [user, id, ]);

    const handleFavorite = async(e:any) => {
        e.preventDefault();
        const fav = await axios.put(`/api/user-actions/favorite-a-post?user_id=${user._id}&post_id=${id}`);
        console.log(fav.data.liked_posts);
        await fetchUser();
    }

    
    useEffect(() => {
        
        if(liked === null) {
            if(user !== null )
            fetchUser();
        }        
        
    }, [liked, fetchUser, user])
    


    return (

        <CardActions className='justify-between bg-gray-950/50 rounded  mt-1'>
            
            {

                user ?

                    <IconButton onClick={(e) => {handleFavorite(e); }} aria-label="add to favorites">
                        <FavoriteIcon sx={{color: liked ? red[500] : grey[50]}} />
                    </IconButton>   

                : user === null || user === undefined ?

                    null : null

            }

            <Chip
                variant='outlined'
                icon={<Typography variant="caption" sx={{ fontSize: "1.25rem", }} className='gradient-text-category'>{clickCount}</Typography>} 
                label="Reads"
                className='py-1 px-2'
                sx={
                    {
                        ".MuiChip-icon": {color: "transparent"},
                        fontWeight: "bold",
                        color: grey[50]
                    }
                }
            />


            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
                <SocialShare data={data} />
            </ExpandMore>                
        </CardActions>

    )
}

export default BlogCardActions