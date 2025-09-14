 'use server'

import { BASE_URL, API_KEY } from "@/lib/catApi";
import { Cat } from "../types";

/**getCatIds Api to fetch images to display on the grid */
const getCatIds = async (page: number, limit: number, breedId?: string | null) => {
    const url = new URL(`${BASE_URL}/images/search`);
    if (breedId) {
        url.searchParams.set("breed_Ids", breedId.toString());
    }
    url.searchParams.set("limit", limit.toString());
    url.searchParams.set("page", page.toString());
    url.searchParams.set("order", "ASC");
    url.searchParams.set("has_breeds", "true");

    const res = await fetch(url.toString(), {
        headers: {
            'x-api-key': API_KEY,
        },
        cache: 'no-store'
    })


    if (!res.ok) {
        throw new Error("Failed to fetch cats");
    }

    const data = await res.json();    
    return data.map((cat: any) => cat.id);

}
/** getCatDetailsById used to get breed details of the above results and show in card*/
const getCatDetailsById = async (id: string): Promise<Cat> => {
    const res = await fetch(`${BASE_URL}/images/${id}`, {
        headers: {
            'x-api-key': API_KEY
        },
        cache: 'no-store'

    })
    if (!res.ok) {
        throw new Error("Failed to fetch cats");
    }
    return res.json()
}

export const getCats = async(page:number,limit:number,breedId?: string | null):Promise<Cat[]> =>{
    const ids = await getCatIds(page,limit,breedId);
    const cats = await Promise.all(ids.map((id:string) => getCatDetailsById(id)));
    return cats;
}