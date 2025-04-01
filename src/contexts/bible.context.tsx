import bibleStore from "@/store/bible.store";
import loadingStore from "@/store/loading.store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IndexedDBService } from "@/modules/@shared/services/index-db.service";
import { BIBLE_VERSIONS } from "@/modules/@shared/constants/bible-version.contant";
import {
  IBibleItem,
  IBibleVersionItem,
} from "@/modules/@shared/interfaces/bible.interface";

interface IBibleContext {
  data: IBibleItem[];
  versions: IBibleVersionItem[];
  oldTestamentData: IBibleItem[];
  newTestamentData: IBibleItem[];

  selectVersion: (version: IBibleVersionItem) => void;
}

const BibleContext = createContext<IBibleContext>({
  data: [],
  versions: [],
  oldTestamentData: [],
  newTestamentData: [],
  selectVersion: () => {},
});

const dbService = new IndexedDBService("@App", "Bible");

interface IBibleProviderProps {
  children: React.ReactNode;
}
const BibleProvider: React.FC<IBibleProviderProps> = ({ children }) => {
  const [data, setData] = useState<IBibleItem[]>([]);
  const [oldTestamentData, setOldTestamentData] = useState<IBibleItem[]>([]);
  const [newTestamentData, setNewTestamentData] = useState<IBibleItem[]>([]);

  const _bibleStore = bibleStore((state) => state);
  const _loadingStore = loadingStore((state) => state);

  const selectVersion = (version: IBibleVersionItem) => {
    _bibleStore.setVersion(version);
  };

  const getVersionData = async () => {
    const cachedData = await dbService.getData<IBibleItem[]>(
      _bibleStore.version.type
    );

    if (cachedData) setData([...cachedData]);
    else {
      _loadingStore.setShow(true);

      fetch(_bibleStore.version.path)
        .then((res) => res.json())
        .then(async (data) => {
          setData(data);
          await dbService.saveData(_bibleStore.version.type, data);
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

  useEffect(() => {
    getVersionData();
  }, [_bibleStore.version]);

  useEffect(() => {
    setTestamentsData();
  }, [data]);

  const providerValue: IBibleContext = {
    data,
    selectVersion,
    oldTestamentData,
    newTestamentData,
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
