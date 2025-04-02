import { EBibleVersion } from "../enums/bible-version.enum";
import { IBibleVersionItem } from "../interfaces/bible.interface";

export const BIBLE_VERSIONS: IBibleVersionItem[] = [
  {
    title: "NAA",
    type: EBibleVersion.NAA,
    path: `https://yloewldtfnpxyfgvrjly.supabase.co/storage/v1/object/public/versions//naa.json`,
  },
  {
    title: "NVI",
    type: EBibleVersion.NVI,
    path: `https://yloewldtfnpxyfgvrjly.supabase.co/storage/v1/object/public/versions//nvi.json`,
  },
  {
    title: "ACF",
    type: EBibleVersion.ACF,
    path: `https://yloewldtfnpxyfgvrjly.supabase.co/storage/v1/object/public/versions//acf.json`,
  },
  {
    title: "AA",
    type: EBibleVersion.AA,
    path: `https://yloewldtfnpxyfgvrjly.supabase.co/storage/v1/object/public/versions//aa.json`,
  },
];
