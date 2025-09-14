'use server'

import { BASE_URL, API_KEY } from "@/lib/catApi";

export const getBreeds = async() =>{   
    try{
        const url = new URL(`${BASE_URL}/breeds`);

        const res = await fetch(url.toString(),{
            headers:{
                'x-api-key':API_KEY
            },
            cache:'no-store'
        })

        if(!res.ok) throw new Error('Failed to fetch Breeds')
        return res.json();
    }
    catch(err){
        console.error('Cats Api Error',err)
        throw err;
    }
}

/**getBreeds Api call to get the list of Breeds to populate the dropdown */