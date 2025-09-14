"use client";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Breed {
    name: string,
    temperament: string,
    origin: string
}

interface CatCardProps {
    url: string,
    breed: Breed
}
const CatCard = ({ url, breed }: CatCardProps) => {
    return <Card sx={{ height: 300, display: "flex", flexDirection: "column" }}>
        <Box sx={{ position: "relative", width: "100%", height: 200 }}>
            <CardMedia
                component="img"
                height="200"
                width="200"
                image={url}
                alt={breed ? breed.name : "Cat"}
                sx={{ objectFit: "cover",background:"#ECEFF1" }} 
                />           
            <CardContent sx={{ flexGrow: 1 }}>              
                <Typography variant="subtitle1">{breed.name}</Typography>
                <Typography variant="caption">{breed.origin}</Typography>
            </CardContent>           
        </Box>
    </Card>
}

export default CatCard;