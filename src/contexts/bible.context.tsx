import bibleStore from "@/store/bible.store";
import loadingStore from "@/store/loading.store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IndexedDBService } from "@/modules/@shared/services/index-db.service";
import { BIBLE_VERSIONS } from "@/modules/@shared/constants/bible-version.contant";
import {
  IBibleItem,
  IBibleVersionItem,
  IVersicleSaveItem,
} from "@/modules/@shared/interfaces/bible.interface";

interface IBibleContext {
  data: IBibleItem[];
  versions: IBibleVersionItem[];
  oldTestamentData: IBibleItem[];
  newTestamentData: IBibleItem[];
  savedVersicles: IVersicleSaveItem[];

  selectVersion: (data: IBibleVersionItem) => void;
  handleSaveVersicle: (data: IVersicleSaveItem) => void;
}

const BibleContext = createContext<IBibleContext>({
  data: [],
  versions: [],
  savedVersicles: [],
  oldTestamentData: [],
  newTestamentData: [],
  selectVersion: () => {},
  handleSaveVersicle: () => {},
});

const _dbBible = new IndexedDBService("@App", "Bible");

interface IBibleProviderProps {
  children: React.ReactNode;
}
const BibleProvider: React.FC<IBibleProviderProps> = ({ children }) => {
  const [data, setData] = useState<IBibleItem[]>([]);
  const [oldTestamentData, setOldTestamentData] = useState<IBibleItem[]>([]);
  const [newTestamentData, setNewTestamentData] = useState<IBibleItem[]>([]);
  const [savedVersicles, setSavedVersicles] = useState<IVersicleSaveItem[]>([]);

  const _bibleStore = bibleStore((state) => state);
  const _loadingStore = loadingStore((state) => state);

  const selectVersion = (version: IBibleVersionItem) => {
    _bibleStore.setVersion(version);
  };

  const getVersionData = async () => {
    const cachedData = await _dbBible.getData<IBibleItem[]>(
      _bibleStore.version.type
    );

    if (cachedData) setData([...cachedData]);
    else {
      _loadingStore.setShow(true);

      fetch(_bibleStore.version.path)
        .then((res) => res.json())
        .then(async (data) => {
          setData(data);
          await _dbBible.saveData(_bibleStore.version.type, data);
          _loadingStore.setShow(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar JSON:", err);
          _loadingStore.setShow(false);
        });
    }
  };

  const setTestamentsData = () => {
    const mtReference = data?.findIndex(
      (item) => item.abbrev.toLowerCase() === "mt"
    );

    if (mtReference > 0 && data.length) {
      setOldTestamentData(data?.slice(0, mtReference));
      setNewTestamentData(data?.slice(mtReference, data.length));
    }
  };

  const initSavedVersicle = async () => {
    const key = "SavedVersicles";
    const data = (await _dbBible.getData<string[]>(key)) || [];

    setSavedVersicles(
      data.map((i) => ({
        book: i.split(":")[0],
        chapter: Number(i.split(":")[1]),
        number: Number(i.split(":")[2]),
      }))
    );
  };

  const handleSaveVersicle = async (item: IVersicleSaveItem) => {
    let data: string[] = [];
    const key = "SavedVersicles";
    const value = `${item.book}:${item.chapter}:${item.number}`;
    const cachedData = (await _dbBible.getData<string[]>(key)) || [];
    const existedItem = cachedData.findIndex((item) => item === value);

    if (existedItem >= 0) data = cachedData.filter((item) => item !== value);
    else data = [...cachedData, value];

    await _dbBible.saveData(key, data);

    setSavedVersicles(
      data.map((i) => ({
        book: i.split(":")[0],
        chapter: Number(i.split(":")[1]),
        number: Number(i.split(":")[2]),
      }))
    );
  };

  useEffect(() => {
    getVersionData();
    initSavedVersicle();
  }, [_bibleStore.version]);

  useEffect(() => {
    setTestamentsData();
  }, [data]);

  const providerValue: IBibleContext = {
    data,
    selectVersion,
    savedVersicles,
    oldTestamentData,
    newTestamentData,
    handleSaveVersicle,
    versions: BIBLE_VERSIONS,
  };

  return (
    <BibleContext.Provider value={providerValue}>
      {children}
    </BibleContext.Provider>
  );
};

export { BibleContext, BibleProvider };

export const useBible = () => {
  const context = useContext(BibleContext);

  if (context === undefined)
    throw new Error("useBible must be used within a BibleProvider");

  return context;
};
