import { ICharacter } from "./ICharacter";

export interface ISWAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<ICharacter>;
}
