"use client"
import { getCats } from "@/actions/getCats";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import CatCard from "./CatCard";
import { useInView } from "react-intersection-observer";
import SearchBar from "./SearchBar";
import { searchBreeds } from "@/actions/searchBreeds";
import { CatGridProps } from "@/types";

const CATS_LOAD_LIMIT = 12;

const CatGrid = ({ initialList }: CatGridProps) => {
    const [cats, setCats] = useState(initialList);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const { ref, inView } = useInView();


    const loadMoreCats = async () => {
        if (loading) return;
        setLoading(true);

        const newCats = await getCats(page, CATS_LOAD_LIMIT);
        setCats((prev) => [...prev, ...newCats]);
        setPage((prev) => prev + 1);
        setLoading(false);
    };

    const handleSelect = async (newBreedId: string | null) => {
        setPage(1);
        if (newBreedId) {
            setIsSearch(true);
            const searchedCats = await searchBreeds(newBreedId);
            if (searchedCats.length > 1) {
                setCats([...searchedCats]);
            }
        }
        else {
            setCats(initialList);
            setIsSearch(false);
        }
    }

    useEffect(() => {
        if (inView && !loading && !isSearch) {
            loadMoreCats();
        }
    }, [inView, loading]);


    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", mt: { xs: 1, sm: 1 }, mb: { xs: 2, sm: 4 } }}>
                <SearchBar onSelect={handleSelect} />
            </Box>
            {cats.length ? (<><Box>
                {(isSearch && !loading) ? <h5>{`${cats.length} results found`}</h5> : null}
                <Grid container spacing={4}>
                    {cats.map((cat: any) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cat.id}>
                            <CatCard url={cat.url} breed={cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : undefined} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
                <Box ref={ref} sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                    {loading && <CircularProgress />}
                </Box>
            </>
            ) :
                (<Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>

                    <Typography variant="h5" sx={{ mb: 1 }}>Oops..</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>An unexpected error occured</Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>Please try again and refresh the page</Typography>
                    <Button variant="contained" color="primary" onClick={loadMoreCats}>Refresh</Button>

                </Box>)}

        </Box>
    )

}

export default CatGrid;