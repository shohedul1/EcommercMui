

'use client';
import { Grid, } from '@mui/material'
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';


function WorkCard() {


    // const startArray = Array.from({ length: item?.attributes?.rating }, (_, index) => (
    //     <span key={index} style={{ color: 'Orange' }}>
    //         <StarBorderPurple500TwoToneIcon />
    //     </span>

    // ));
    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 455 }} className='hiddden'>
                <div style={{ position: 'relative' }}>
                    <Link href={"/"} >
                        <Image src={'https://res.cloudinary.com/djhjt07rh/image/upload/v1717607036/next.js_blog_images/rs4otnmin2w5jg7j4d0s.jpg'} width={500} height={500} priority alt='image' style={{ height: 200, width: '100%' }} />
                    </Link>

                    <FavoriteIcon

                        sx={{
                            position: 'absolute', top: 4, right: 4, color: 'yellow', '&:hover': {
                                color: 'black', // optional, change text color on hover
                            }, "&:active": { color: 'red' }
                        }}

                    />
                </div>
                <CardContent>
                    {/* title */}
                    <Typography variant="h5" className='title' sx={{ marginBottom: '5px' }}>
                        title
                    </Typography>
                    {/* image/presentange/price/previousPrice */}
                    <Grid display={'flex'} justifyContent={"space-between"} marginY={1}>
                        <Typography sx={{ border: '1px solid red', borderRadius: '10px', paddingX: '2px' }}>
                            545%off
                        </Typography>
                        <Grid display={'flex'}>
                            <Typography sx={{ textDecoration: 'line-through', fontWeight: 'normal', marginRight: 2 }}>
                                {/* <FormattedPrice amount={item?.attributes?.prvPrice} /> */}
                                54654
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {/* <FormattedPrice amount={item?.attributes?.price} /> */}
                                65
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* description */}
                    <Typography variant="body2" color="text.secondary">
                        {/* {item?.attributes?.description.substring(0, 80)} */}
                        description
                    </Typography>

                    {/* icons */}
                    <Grid display={'flex'} marginY={1}>
                        start
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Button

                    >
                        add to cart
                    </Button>
                    <Link href={"/"} >
                        <Button color="secondary" variant="outlined" sx={{ backgroundColor: '#e0f7fa', color: 'black', borderBlockStartColor: "green", }}>More info</Button>
                    </Link>
                </CardActions>
            </Card>

        </Grid>
    )
}

export default WorkCard;