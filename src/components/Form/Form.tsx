import React from 'react';
import { categories } from '@/lib/CategoriesData/data';
import { Grid, Typography, TextField, Box, Button, CardMedia } from '@mui/material';
import styled from '@emotion/styled';
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
        photos: (File | { id: string, url: string })[];
    };
    setWork: React.Dispatch<React.SetStateAction<{
        creator: string;
        category: string;
        title: string;
        description: string;
        price: string;
        photos: (File | { id: string, url: string })[];
    }>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loader: boolean;
}

const CategoryItem = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    color: ${({ isActive }) => (isActive ? 'red' : 'inherit')};

    &:hover {
        color: red;
    }
`;

const Form: React.FC<FormProps> = ({ type, work, setWork, handleSubmit, loader }) => {

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
            minHeight: "100vh"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: 'column',
                bgcolor: 'white',
                p: 5,
                gap: 2
            }}>
                <Typography variant="h4">{type} Your Work</Typography>
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
                                gap: { xs: 2, lg: 5 }
                            }}
                        >
                            {categories?.map((item, index) => (
                                <CategoryItem
                                    key={index}
                                    isActive={work.category === item}
                                    onClick={() => handleCategoryClick(item)}
                                >
                                    {item}
                                </CategoryItem>
                            ))}
                        </Box>
                        <Typography variant="h6">Add some photos of your work</Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {work.photos.length > 0 && work.photos.map((photo, index) => (
                                <Grid item xs={4} sm={4} md={4} key={index}>
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
                                            image={photo instanceof File ? URL.createObjectURL(photo) : photo.url}
                                            alt="Example Image"
                                            sx={{
                                                height: '100%',
                                                width: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                top: 1,
                                                right: 1,
                                                width: '48px',
                                                height: '48px',
                                                background: 'white',
                                                padding: '4px',
                                                borderRadius: '50%',
                                                color: 'black',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: 'red',
                                                    bgcolor: 'black',
                                                },
                                            }}
                                            onClick={() => handleRemovePhoto(index)}
                                        >
                                            <CloseIcon />
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                            <Grid item xs={4} sm={4} md={4}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "300px",
                                        cursor: 'pointer',
                                        border: "1px dashed red",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        textAlign: "center",
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
                                    <label htmlFor="image">
                                        <CloudUploadIcon sx={{ width: "full" }} />
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Upload from your device</Typography>
                                    </label>
                                </Box>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">What makes your work attractive?</Typography>
                        <div>
                            <Typography variant="body1">Title</Typography>
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
                            <Typography variant="body1">Description</Typography>
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
                            <Typography variant="body1">Set your PRICE</Typography>
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
                        </div>
                        <Button className="mt-4" variant="contained" color="primary" fullWidth type="submit">
                            {loader ? "Submitting..." : 'PUBLISH YOUR WORK'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Form;
