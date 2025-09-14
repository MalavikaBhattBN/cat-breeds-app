"use client"
import { getBreeds } from "@/actions/getBreeds";
import { SearchBarProps, Breeds } from "@/types";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";


const SearchBar = ({ onSelect }: SearchBarProps) => {
    const [breeds, setBreeds] = useState<Breeds[]>([]);

    useEffect(() => {  
        getBreeds().then((data) => {
            setBreeds(data.map((b: any) => ({ id: b.id, name: b.name })))
        }
        );
    }, []);

    return (
        <Autocomplete
            disablePortal
            options={breeds}
            noOptionsText={'No breed found'}
            sx={{ width: 300, display: "flex", justifyContent: "center", alignItems: "center", mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.id}
            onChange={(_, value) => onSelect(value ? value.id : null)}
            renderInput={(params) => <TextField {...params} label="Choose a breed" />}
        />
    )
}

export default SearchBar;