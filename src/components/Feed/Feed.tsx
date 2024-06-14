'use client';

import { categories } from "@/lib/CategoriesData/data";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import WorkList from "../WorkList/WorkList";

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                py: { xs: 2, sm: 3, md: 5 },
                px: { xs: 2, sm: 4, md: 6 },
                border: "1px solid black",
              
            }}>
                {categories.map((item, index) => (
                    <Typography
                        onClick={() => setSelectedCategory(item)}
                        key={index}
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            cursor: 'pointer',
                            color: item === selectedCategory ? 'red' : 'black',
                            '&:hover': {
                                color: 'red'
                            }
                        }}
                    >
                        {item}
                    </Typography>
                ))}
            </Box>
            <WorkList />
        </>
    )
}

export default Feed;
