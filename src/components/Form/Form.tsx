import React from 'react';
import { categories } from '@/lib/CategoriesData/data';
import { Grid, Typography, TextField, IconButton, Card, CardMedia, Box, Button, ImageList } from '@mui/material'; // Import Material UI components
import styled from '@emotion/styled'; // Import styled from @emotion/styled
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FormProps {
    type: string;
    work: {
        creator: string;
        category: string;
        title: string;
        description: string;
        price: string;
        photos: File[]; // Change photos type to File[]
    };
    setWork: React.Dispatch<React.SetStateAction<{
        creator: string;
        category: string;
        title: string;
        description: string;
        price: string;
        photos: File[]; // Change photos type to File[]
    }>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CategoryItem = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isActive', // Ensure isActive prop is forwarded
}) <{ isActive: boolean }>`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    color: ${({ isActive }) => (isActive ? 'red' : 'inherit')};

    &:hover {
        color: red;
    }
`;

const Form: React.FC<FormProps> = ({ type, work, setWork, handleSubmit }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setWork((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleRemovePhoto = (indexToRemove: number) => {
        setWork((prevWork) => ({
            ...prevWork,
            photos: prevWork.photos.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhotos = Array.from(e.target.files || []);
        setWork((prevWork) => ({
            ...prevWork,
            photos: [...prevWork.photos, ...newPhotos],
        }));
    };

    const handleCategoryClick = (item: string) => {
        setWork((prevWork) => ({ ...prevWork, category: item }));
    };

    return (
        <Box sx={{
            bgcolor: "lime",
            px: { xs: 5, md: 5 },
            py: 10,
            minHeight: "100vh" // Change minHeight to "100vh" for full screen height
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: 'column',
                bgcolor: 'white',
                p: 5,
                gap: 2
            }}>
                <Typography variant="h4" >{type} Your Work</Typography>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                            gap: 2
                        }}
                    >

                        <Typography variant="h6">Which of these categories best describes your work?</Typography>
                        <Box
                            sx={{
                                my: 5,
                                display: "flex",
                                flexWrap: 'wrap',
                                justifyItems: "between",
                                gap: { xs: 2, sm: 5, md: 5, lg: 8 }
                            }}
                        >
                            {categories?.map((item, index) => (
                                <CategoryItem
                                    key={index}
                                    isActive={work.category === item}
                                    onClick={() => handleCategoryClick(item)}
                                    variant='h6' // Assuming CategoryItem can handle this variant
                                >
                                    {item}
                                </CategoryItem>

                            ))}
                        </Box>
                        <Typography variant="h6" >Add some photos of your work</Typography>


                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>


                            {work.photos.length > 0 && work.photos.map((photo, index) => (
                                <Grid item xs={4} sm={4} md={4} key={index} >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: "full",
                                            height: "300px",
                                            cursor: 'pointer',
                                            border: "1px solid red"
                                        }}
                                    >

                                        <CardMedia
                                            component="img"
                                            image={photo instanceof Object ? URL.createObjectURL(photo) : photo}
                                            alt="Example Image"
                                            sx={{
                                                height: '100%', // Set to 100% height of parent container
                                                width: '100%',  // Set to 100% width of parent container
                                                objectFit: 'fill',  // Ensure the image covers the area
                                            }}
                                        />

                                        <Button
                                            sx={{
                                                position: "absolute",
                                                top: 1,
                                                right: 1,
                                                p: 1,
                                                bgcolor: "white",
                                                borderRadius: "50%",
                                                color: "black",
                                                '&:hover': {
                                                    color: "red",
                                                    bgcolor: "black"
                                                }
                                            }}
                                            type="button"
                                            onClick={() => handleRemovePhoto(index)}
                                        >
                                            <CloseIcon />

                                        </Button>
                                    </Box>
                                </Grid>
                            ))}

                            {work.photos.length === 0 ? (
                                <Grid item xs={4} sm={4} md={4}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "300px",
                                            cursor: 'pointer',
                                            border: "1px dashed red",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center", // Center horizontally
                                            flexDirection: "column", // Stack children vertically
                                            textAlign: "center", // Center text horizontally
                                        }}
                                    >
                                        <input
                                            id="image"
                                            type="file"
                                            style={{ display: "none" }}
                                            accept="image/*"
                                            onChange={handleUploadPhotos}
                                            multiple
                                        />
                                        <label htmlFor="image" >
                                            <CloudUploadIcon sx={{ width: "full" }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Upload from your device</Typography>
                                        </label>
                                    </Box>
                                </Grid>
                            ) : (
                                <Grid item xs={4} sm={4} md={4}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "300px",
                                            cursor: 'pointer',
                                            border: "1px dashed red",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center", // Center horizontally
                                            flexDirection: "column", // Stack children vertically
                                            textAlign: "center", // Center text horizontally
                                        }}
                                    >
                                        <input
                                            id="image"
                                            type="file"
                                            style={{ display: "none" }}
                                            accept="image/*"
                                            onChange={handleUploadPhotos}
                                            multiple
                                        />
                                        <label htmlFor="image" >
                                            <CloudUploadIcon sx={{ width: "full" }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Upload from your device</Typography>
                                        </label>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>

                        <Typography variant="h6" className="mb-2">What makes your work attractive?</Typography>

                        <div>
                            <Typography variant="body1" className="font-medium">Title</Typography>
                            <TextField
                                type="text"
                                placeholder="Title"
                                onChange={handleChange}
                                name="title"
                                value={work.title}
                                required
                                fullWidth
                                variant="outlined"
                                className="mb-3"
                            />
                        </div>
                        <div>
                            <Typography variant="body1" className="font-medium">Description</Typography>
                            <TextField
                                placeholder="Description"
                                onChange={handleChange}
                                name="description"
                                value={work.description}
                                required
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                className="mb-3"
                            />
                        </div>

                        <div>
                            <Typography variant="body1" className="font-medium">Now, set your PRICE</Typography>
                            <Grid container alignItems="center" spacing={1} className="mb-3">
                                <Grid item>
                                    <Typography variant="body1">$</Typography>
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        type="number"
                                        placeholder="Price"
                                        onChange={handleChange}
                                        name="price"
                                        value={work.price}
                                        required
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <Button className="mt-4" variant="contained" color="primary" fullWidth type="submit">
                            PUBLISH YOUR WORK
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Form;
