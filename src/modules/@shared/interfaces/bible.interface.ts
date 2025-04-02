import { EBibleVersion } from "../enums/bible-version.enum";

export interface IBibleItem {
  name: string;
  abbrev: string;
  chapters: any[];
}

export interface IBibleVersionItem {
  title: string;
  path: string;
  type: EBibleVersion;
}

export interface IVersicleSaveItem {
  book: string;
  number: number;
  chapter: number;
}
