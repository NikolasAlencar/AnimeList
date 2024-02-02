import { Anime } from '../../services/models/Response';

interface FactoryObject {
  [key: string]: () => Anime[];
}

export const filterAnimes = (paramOfFilter: string, animes: Anime[]) => {
  const factoryObject: FactoryObject = {
    'mais-populares': () => filterByCrescent(animes),
    'menos-populares': () => filterByDecrescent(animes),
    'mais-recentes': () => filterByNew(animes),
    'mais-antigos': () => filterByOld(animes),
    'mais-longos': () => filterByBiggest(animes),
    'ordem-alfa': () => filterByAlph(animes),
  };
  return factoryObject[paramOfFilter];
};

// populares crescente
export const filterByCrescent = (animes: Anime[]) =>
  animes.sort(
    (a, b) => a.attributes.popularityRank - b.attributes.popularityRank
  );
// populares decrescente
export const filterByDecrescent = (animes: Anime[]) =>
  animes.sort(
    (a, b) => b.attributes.popularityRank - a.attributes.popularityRank
  );
// mais recentes
export const filterByNew = (animes: Anime[]) =>
  animes.sort(
    (a, b) =>
      new Date(a.attributes.createdAt).valueOf() -
      new Date(b.attributes.createdAt).valueOf()
  );
// mais antigos
export const filterByOld = (animes: Anime[]) =>
  animes.sort(
    (a, b) =>
      new Date(b.attributes.createdAt).valueOf() -
      new Date(a.attributes.createdAt).valueOf()
  );
// mais longos
export const filterByBiggest = (animes: Anime[]) =>
  animes.sort((a, b) => a.attributes.totalLength - b.attributes.totalLength);
// alfabetico
export const filterByAlph = (animes: Anime[]) => {
  const result = animes.sort();
  return result;
};
