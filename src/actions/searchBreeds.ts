import { API_KEY, BASE_URL } from "@/lib/catApi"
import { Cat } from "@/types";

/**searchCats Api returns the breed details of the searched breed */
const searchCats = async (breedId?: any) => {
    const url = new URL(`${BASE_URL}/breeds/${breedId}`);

    const res = await fetch(url.toString(), {
        headers: {
            'x-api-key': API_KEY
        },
        cache: 'no-store'
    })
    if (!res.ok) {
        throw new Error("Failed to search")
    }
    const data = await res.json();
    return data.id;
}
/**getCatsbyCategory takes the id from searchCats and returns image details */
const getCatsbyCategory = async (id: string, limit: number) => {
    const url = new URL(`${BASE_URL}/images/search`);
    url.searchParams.set("breed_ids", id.toString());
    url.searchParams.set("limit", limit.toString());
    
    const res = await fetch(url.toString(), {
        headers: {
            'x-api-key': API_KEY
        },
        cache: 'no-store'

    })
    if (!res.ok) {
        throw new Error("Failed to fetch cats");
    }

    return res.json();
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

export const searchBreeds = async (breedId?: string | null):Promise<Cat[]>  => {
    const id = await searchCats(breedId);
    const cats = await getCatsbyCategory(id,24);
    const searchedcats = await Promise.all(cats.map((cat: any) => getCatDetailsById(cat.id)));
    return searchedcats;
}