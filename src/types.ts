export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string; 
}

export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}

export interface Breeds {
    id: string,
    name: string,
    origin: string,
    temperament: string
}

export interface SearchBarProps {
    onSelect: (breedId: string | null) => void;
}

export interface CatGridProps {
    initialList: any[];
}

export interface CatCardProps {
    url: string,
    breed: Breed
}
