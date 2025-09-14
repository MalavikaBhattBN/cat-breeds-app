import CatGrid from "@/components/CatGrid";
import { getCats } from "./../actions/getCats";

export const revalidate = 60;

const CatHomePage = async () => {

  const initialList = await getCats(0,12);
  return (
    <main style={{ padding: "1rem" }}>
      <CatGrid initialList={initialList} />
    </main>
  );
}

export default CatHomePage;