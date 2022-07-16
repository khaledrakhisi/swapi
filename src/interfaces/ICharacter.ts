export interface ICharacter {
  id: string;
  name: string;
  height: number;
  mass: number;
  hair_color: string[10];
  skin_color: string[10];
  eye_color: string[10];
  birth_year: string;
  gender: string[6];
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: Date;
  edited: Date;
  url: string;
}
