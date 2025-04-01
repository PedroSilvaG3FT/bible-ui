import { EBibleVersion } from "../enums/bible-version.enum";
import { IBibleVersionItem } from "../interfaces/bible.interface";

export const BIBLE_VERSIONS: IBibleVersionItem[] = [
  { title: "NAA", path: "/versions/naa.json", type: EBibleVersion.NAA },
  { title: "NVI", path: "/versions/nvi.json", type: EBibleVersion.NVI },
  { title: "ACF", path: "/versions/acf.json", type: EBibleVersion.ACF },
  { title: "AA", path: "/versions/aa.json", type: EBibleVersion.AA },
];
