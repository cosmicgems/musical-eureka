import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { motion } from 'framer-motion'
import { blue, orange, yellow } from '@mui/material/colors';



const index = () => {

const coreValues = ['Passion', 'Purpose', 'Innovation', 'Growth', 'Integrity', 'Impact', 'Simplicity', 'Balance', ];

  return (
    <div style={{width: '100%', marginBlockStart: '10vh'}}>
      <Typography variant='h2' component='div' sx={{width:'100%', textAlign:'center', marginBlock: '2vh', color: yellow[100], fontSize: {xs:'4rem',md:'6rem'}, fontWeight: 'bold'}}>
        Pearl Box
      </Typography>
      <Box sx={{}}>
        <Grid container sx={{color: yellow[100],}} spacing={0}>

          <Grid item sx={{}} xs>

              <Grid container spacing={0} sx={{}}>
                

                {/* Our Mission Section */}


                <Grid item xs={12} sx={{marginBlockEnd: '3vh'}}>
                  <Box>
                    <Typography variant='h4' component='div' sx={{width: '100%', textAlign: 'center', fontSize: '4rem', fontWeight: 'bold'}}> Our Mission</Typography>
                    <Typography variant='p' component='div' sx={{width: '100%', textAlign: 'center', marginBlock: '1vh 3vh'}}>
                      We are dedicated to increasing the quality of life by cultivating a lifestyle worth living.
                    </Typography>                    
                  </Box>

                  <Grid item sx={{}} xs={12}>

                    
                      <Grid container sx={{}}>
                        {coreValues.map((c, i) => {
                          return        <Grid key={i}  item xs >       <Link href='/technology'>
                              <motion.div
                              whileHover={{x: '-50%', scaleX: 1.1 }}
                              whileTap={{ scaleX: 0.9 }}
                              >
                                <Card elevation={0} sx={{borderRadius: 0}}
                                >      
                                  <CardMedia
                                  id='tech'
                                  sx={{ height: '25vh', objectFit: 'cover', }}
                                  image="https://images.pexels.com/photos/4816921/pexels-photo-4816921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                  title="pearl-box-tech"
                                  
                                  />
                                  <CardContent sx={{}} >
                                    <Typography variant='h6' component='div' sx={{width: '100%', textAlign:'center', color: orange[600]}}>
                                      {c}
                                    </Typography>
                                  </CardContent>

                                </Card>          
                              </motion.div>      
                            </Link> </Grid>

                        })}                      
                      </Grid>

                    



                  </Grid>     
                        
                </Grid>
                
                <Grid item xs={12} sx={{}}>
                  <Box sx={{paddingInline: {xs:'3vw', md:'17.5vw'}, fontSize: {xs:'1rem',}}}>
                    <Typography variant='h4' component='div' sx={{width: '100%', textAlign: 'center', fontSize: '4rem', fontWeight: 'bold'}}> Our Story</Typography>
                    <Typography variant='body' component='div' sx={{width: '100%', textAlign: 'left', marginBlock: '3vh'}}>
                      In a world filled with uncertainties, Maliek Davis understood the deep desire to create a life that was truly worth living. He faced his own share of challenges, from the frustration of finding reliable sources of information to the struggle of maintaining positive habits. In those moments, he realized the transformative power of guidance, support, and a community of like-minded individuals.
                      <br/>
                      <br/>
                      Fueled by his personal experiences, Maliek embarked on a mission to revolutionize the way people approached their lives. With unwavering determination, he founded Pearl Box, a company driven by an intense passion for helping individuals unlock their full potential and cultivate a lifestyle that goes beyond ordinary existence.
                      <br/>
                      <br/>
                      Pearl Box was not built on empty promises; it was built on the belief that personal growth is the cornerstone of a fulfilling life. Maliek assembled a team of experts across various fields - from life coaches and psychologists to nutritionists and fitness trainers - all sharing his relentless commitment to empowering others.
                      <br/>
                      <br/>
                      At Pearl Box, they understand that no two journeys are the same. They provide a personalized experience, tailored to meet the unique needs of each individual. Through their platform, they offer invaluable guidance on setting meaningful goals, developing sustainable habits, managing stress, and building authentic relationships. It is a holistic approach that encompasses the mind, body, and spirit.
                      <br/>
                      <br/>
                      But Pearl Box is more than just a resource hub. It is a vibrant community of individuals on a shared quest for personal growth and a life of purpose. They host interactive workshops, transformative events, and provide a space where connections are forged and support is abundant. Together, they celebrate victories, uplift each other through challenges, and foster an environment that nurtures growth and resilience.
                      <br/>
                      <br/>
                      At the core of Pearl Box beats a relentless mission: to empower individuals in cultivating a lifestyle that surpasses mere existence and embraces the extraordinary. Their values of passion, purpose, innovation, growth, integrity, impact, simplicity, and balance guide every facet of their work, ensuring that they remain steadfast in their commitment to making a profound difference in the lives of their customers.
                      <br/>
                      <br/>
                      So, whether you&gt;re seeking a roadmap for personal transformation or a tribe of like-minded individuals to walk the path with you, Pearl Box welcomes you. Join Maliek and their empowering community, and embark on a journey that will redefine what it means to truly live. Together, let&gt;s unleash your limitless potential and cultivate a life that is authentically yours.
                    </Typography>                    
                  </Box>
                </Grid>



                
              </Grid>
              <Grid item xs>
                <Typography variant='h4' component='div' sx={{ width: '100%', textAlign: 'center', marginBlock:'5vh 2vh'}}>
                  How We Can Help?
                </Typography>
              </Grid>
              <Grid item xs>
                <Box  sx={{paddingInline: {xs: '3vw', md:'17.5vw'}, fontSize: {xs:'1rem', }}} >
                    <Typography variant='body'component='div' sx={{marginBlockEnd: '3vh'}}>
                    At Pearl Box, our mission is to empower individuals in cultivating a lifestyle worth living. We curate relevant and factual information on mindset and resilience, ensuring that our platform serves as a trusted source of knowledge in these areas.
                    </Typography>
                    <Typography variant='body'component='div' sx={{marginBlockEnd: '3vh'}}>
                        <span className='we-can-help-span' style={{}} >Curated Information and Products</span>
                      We meticulously curate articles and resources on mindset and resilience, providing you with practical insights and strategies to enhance personal growth. Our shop features handpicked products directly sourced from the articles on our site, offering you convenient access to tools that can support your journey towards a fulfilling lifestyle.
                    </Typography>
                    <Typography variant='body'component='div' sx={{marginBlockEnd: '3vh'}}>
                        <span className='we-can-help-span' style={{}} >Goal Tracking and Reminder System</span> We understand that setting and achieving goals can be challenging. That&gt;s why we&gt;re developing a cutting-edge tracking system and reminder tool to help you stay on track once you&gt;ve defined your objectives. This innovative feature will provide gentle nudges, ensuring you maintain focus and motivation on your path towards success. As you progress, we&gt;ll also introduce a reward system to celebrate your achievements and keep you inspired along the way.
                    </Typography>
                    <Typography variant='body'component='div' sx={{marginBlockEnd: '3vh'}}>
                        <span className='we-can-help-span' style={{}} >Positive Community and Support</span> At Pearl Box, we believe that a positive environment is essential for personal growth. Our community is filled with like-minded individuals who are passionate about cultivating a lifestyle worth living. By joining our community, you&gt;ll experience the power of connection, support, and encouragement from individuals who share your aspirations. Together, we reinforce positivity and create an uplifting atmosphere that fuels personal transformation.
                    </Typography>
                    <Typography variant='body'component='div' sx={{marginBlockEnd: '3vh'}}>
                        <span className='we-can-help-span' style={{}} >Education and Technological Tools</span> We are dedicated to empowering you through education and technology. Our courses, carefully designed and led by industry experts, cover a range of topics related to personal growth and well-being. Additionally, we provide a comprehensive library of information and research, ensuring that you have access to a wealth of knowledge to support your journey.
                    </Typography>
                    <Typography variant='body'component='div' sx={{marginBlockEnd: '3vh'}}>
                        <span className='we-can-help-span mr-5' style={{}}  >Enhancing Quality of Life</span> At Pearl Box, we go beyond theory and actively seek ways to enhance the quality of life in all aspects. Our commitment to providing high-quality information and utilizing innovative tech tools ensures that we empower you to lead a more fulfilling life. From mental and physical well-being to personal development and self-discovery, we strive to be your trusted partner in every step of your journey.

                        Join Pearl Box today and unlock your potential for a lifestyle that exceeds expectations. Explore our courses, access our vast library of resources, and connect with our vibrant community. Together, we&gt;ll cultivate a life worth living.
                    </Typography>
                </Box>
                
              </Grid>
          </Grid>



        </Grid>
      </Box>

    </div>
  )
}

export default index