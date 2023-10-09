import React, {useEffect, useState, useRef, useCallback} from 'react';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { grey, lightBlue, red } from '@mui/material/colors';
import Layout from '../../../components/Layout'
import Head from 'next/head';
import { getClientOgImageUrl, getOgImageUrl } from '../../../../helpers/ogImageHelper';
import { useStateContext } from '../../../../Context/StateContext';
import axios from 'axios';
import parse from "html-react-parser"
import RecentBlogCard from '../../../components/blog/RecentBlogCard';
import { API, DOMAIN, APP_NAME } from "../../../../config";
import connectDB from '../../../../lib/connectDB';
import Blog from '../../../../lib/models/blog';
import Category from '../../../../lib/models/category';
import SubCategory from '../../../../lib/models/sub_category';
import User from '../../../../lib/models/user';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useSession } from 'next-auth/react';
import Loading from '../../../components/Loading';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

interface Author {
  _id: string;
  first_name: string;
  last_name: string;
  photo: string;
  username: string;
  email: string;
}

interface Blog {
  _id: string;
  title: string;
  categories: any[];
  sub_categories: any[];
  photo: string;
  body: string;
  excerpt: string;
  slug: string;
  mtitle: string;
  mdesc: string;
  createdAt: Date;
  updatedAt: Date;
  postedBy: Author;
}

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

const DynamicArticlePage = (props) => {
  const {data: session, status} = useSession() as Session;
  
  const {post:{title, body, _id:id, categories, sub_categories, mtitle, mdesc, createdAt, updatedAt, slug, photo, postedBy}, related_posts, ogImageUrl} = props;
  const [user, setUser] = useState<any>();
  const [liked, setLiked] = useState<boolean>(null);
  console.log(ogImageUrl)
  const [expanded, setExpanded] = useState<boolean>(false)
  const url = `https://pearlbox.co/articles/post/${slug}`
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const scrollContainerRef = useRef(null);

  useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
  
      // Add an event listener to handle scroll snap on scroll end
      const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const relatedCards = scrollContainer.querySelectorAll('.scrollable-item');
  
      let nearestCard = null;
      let minDistance = Infinity;
  
      // Find the nearest project card based on scroll position
      relatedCards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const distance = Math.abs(cardRect.left - scrollLeft);
  
          if (distance < minDistance) {
          minDistance = distance;
          nearestCard = card;
          }
      });
  
      // Snap to the nearest project card
      if (nearestCard) {
          scrollContainer.scrollTo({
          left: nearestCard.offsetLeft,
          behavior: 'smooth',
          });
      }
      };
  
      if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      }
  
      return () => {
      if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
      }
      };
  
  }, []);

  useEffect(() => {
    if(status === "loading"){
      return
    } else {
      setUser(session?.user);
    }
  }, [setUser, status, session?.user]);


  const fetchUser = useCallback(async () => {
    try {
      console.log(user?.favorite_posts);

      const userLiked = user?.favorite_posts?.some((post) => id.includes(post._id));
      console.log(userLiked);

      if (userLiked) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      console.log(liked);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [user, id, liked]);

  useEffect(() => {
    if (user !== null ) {
      if(liked === null){
        fetchUser();
      }
    }
  })

  const handleFavorite = async(e:any) => {
    e.preventDefault();
    const fav = await axios.put(`/api/user-actions/favorite-a-post?user_id=${user._id}&post_id=${id}`);
    console.log(fav.data.liked_posts);
    await fetchUser();
}
    const {pathSegment} = useStateContext();

  if(status === "loading"  || user === null) {
    return <Loading />
  } else {

        return (
            <>
                <Head>
                  <title>Pearl Box</title>
                  <meta property="og:url" content={`https://pearlbox.co/articles/post/${slug}`} />
                  <meta property="og:type" content="article" />
                  <meta property="og:image" content={ogImageUrl} />
                  <meta property='og:title' content={`Pearl Box | ${title}`} />
                </Head>
                <Box className='' sx={{bgcolor: grey[100]}}>
                  <Layout  >
                      <div className='flex flex-col gap-3 pt-12'>
                        <div className='w-full mt-6'>
                          <Typography variant='h2' className='gradient-text w-full text-center' sx={{fontSize: {xs: "1.5rem", sm:"3rem"}}}>
                            Pearl Box {categories[0].name}
                          </Typography>
                        </div>

                        <div className='flex flex-col sm:flex-row '>

                          <div className='sm:w-4/5 sm:pl-3 flex flex-col gap-6'>
                            <CardMedia 
                            component='img'
                            image={photo}
                            alt=''
                            sx={{objectFit: 'cover'}}
                            className='h-[33vh] sm:h-[25vh] '
                            />

                            <div className=''>
                              <Typography sx={{ fontSize: { xs: '2rem', sm:'3.5rem' }, fontWeight: 'bold', width: '100%', textAlign: 'center' }} className='gradient-text' variant="h1" component="div">
                                  {title}
                              </Typography>
                            </div>
                            <div className='flex gap-1 justify-center items-center'>

                            <Avatar alt={`${postedBy.first_name} ${postedBy.last_name}`} sx={{height:"75px", width: "75px"}} src={postedBy.photo} />
                              <div className='flex flex-col'>
                                <Typography variant='body1' sx={{}} className=''>
                                  {postedBy.first_name} {postedBy.last_name}
                                </Typography>
                                <Typography variant='body1' sx={{}} className=''>
                                  {moment(postedBy.createdAt).fromNow()}
                                </Typography>
                              </div>
                            </div>

                            <div className=''>
                              <Grid container className='justify-center items-center gap-6' >
                                {sub_categories.map((sc, i)=>{
                                  return (
                                    <Grid item key={sc._id}  >
                                        <Button href={`/articles/categories/category/${categories[0].name}/subcategories/subcategory/${sc.slug}`}>
                                            <Chip
                                            avatar={<Avatar alt={`Photo of ${sc.name}, ${sc.desrciption}`} src={sc.photo_portrait} />}
                                            label={sc.name}
                                            variant="outlined"
                                            />  
                                        </Button>
                                    </Grid>
                                  )
                                })}                  
                              </Grid>

                            </div>
                            <div className='flex justify-center items-center'>
                              
           
                                <CardContent sx={{bgcolor: grey[100], borderRadius: "5px"}} className='p-1 flex justify-evenly items-center'>
                                      
                                      {
                                          user ?
                                          <IconButton onClick={(e) => {handleFavorite(e); }} aria-label="add to favorites">
                                          <FavoriteIcon sx={{color: liked ? red[500] : grey[500]}} />
                                          </IconButton>   
                                          : user === null || user === undefined ?
                                          null : null
                                      }

                                        <IconButton>
                                            <FacebookShareButton url={url} >
                                                <FacebookIcon size={32} round />
                                            </FacebookShareButton>
                                        </IconButton>
                                        
                                        <IconButton aria-label="add to favorites">
                                            <TwitterShareButton
                                            url={url}
                                            >
                                                <TwitterIcon size={32} round />
                                            </TwitterShareButton>
                                        </IconButton>
                                        <IconButton aria-label="add to favorites">
                                            <WhatsappShareButton
                                            url={url}
                                            >
                                                <WhatsappIcon size={32} round />
                                            </WhatsappShareButton>
                                        </IconButton>    
                                </CardContent>
                            </div>

                            <div className='px-3'>
                              {parse(body)}
                            </div>
                          </div>

                          <div className='sm:w-1/5'>
                            
                            <div>
                              <Typography variant='h3' className='gradient-text' sx={{}}>
                                Ad Space
                              </Typography>
                            </div>
                          </div>

                        </div>

                        <div className='w-full'>
                          <Typography variant='h3' className='gradient-text-subcategories w-full text-center' sx={{}}>
                            Related Articles
                          </Typography>
                        </div>

                        <div  className='scrollable-container flex gap-6   pb-6 w-[100%] overflow-x-auto pr-6'>
                                      
                                      {related_posts.map((b, i)=> {
                                          if(i >= 5) {
                                              return
                                          } else if (i === b.length - 1){
                                              return (
                                                  <Box key={`${i}: ${b._id}`} className='pb-3 pl-6  mr-3 flex flex-col gap-3 sm:w-[25vw] scrollable-item' sx={{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>
                                                  <div   className='flex justify-center items-center'>
                                                      <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                          <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                              {b.categories[0].name}
                                                          </Typography>                                            
                                                      </Button>

                                                  </div>
                                                  <RecentBlogCard blog={b} />
                                              </Box>
                                              )
                                          } else if(i === 0){
                                              return (
                                                  <Box key={`${i}: ${b._id}`} className='pb-3 pl-3  flex flex-col gap-3   sm:w-[25vw] scrollable-item' sx={{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}} >
                                                  <div className='flex justify-center items-center'>
                                                      <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                          <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                              {b.categories[0].name}
                                                          </Typography>                                            
                                                      </Button>

                                                  </div>
                                                  <RecentBlogCard blog={b}  />
                                              </Box>
                                              )
                                          } else {
                                              return (
                                                  <Box key={`${i}: ${b._id}`} className='pb-3 pl-3  flex flex-col gap-3  sm:w-[25vw] scrollable-item'>
                                                      <div className='flex justify-center items-center'>
                                                          <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                              <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                                  {b.categories[0].name}
                                                              </Typography>                                            
                                                          </Button>

                                                      </div>
                                                      <RecentBlogCard blog={b}  />
                                                  </Box>
                                              )                                
                                          }

                                      })}
                                  </div> 




                      </div>
                  
                  </Layout>              
                </Box>

            </>




        );
  }
    


};







export const getStaticPaths = async () => {
  
  await connectDB();
  const response = await Blog.find({}, 'slug');
  const slugs = response.map((r) => r.slug )

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {

  await connectDB();
  await Category.find({});
  await SubCategory.find({});
  await User.find({});
  const post = await Blog.findOne({slug})
                          .populate("categories")
                          .populate("sub_categories")
                          .populate("postedBy");

  const title = post.title
  const description = post.excerpt

  const ogImageUrl = await getOgImageUrl(title, description, post.photo)
  const sub_categories = post.sub_categories.map((sc) => ({ slug: sc.slug }));
  
  let matches = [];
  sub_categories.map((m) => {
    matches.push(m.slug)
  });

  
  const related_blogs_before_filter = await Blog.find({})
                                                .populate("categories")
                                                .populate("sub_categories")
                                                .populate("postedBy");

  const related_posts =  related_blogs_before_filter.filter((blog) => 
    blog.sub_categories.some((subcategory) => 
      matches.includes(subcategory.slug)
    )
  );

  // console.log(related_posts);
  

  return {
    props: { post: JSON.parse(JSON.stringify(post)), related_posts: JSON.parse(JSON.stringify(related_posts)), ogImageUrl },
  revalidate: 60,
  };
};


export default DynamicArticlePage;
