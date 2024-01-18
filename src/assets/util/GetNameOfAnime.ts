import { Anime } from '../../app/services/models/Response';

export function getNameOfAnime(anime: Anime) {
  return (
    anime.attributes.titles.en ||
    anime.attributes.titles.en_us ||
    anime.attributes.titles.en_jp
  );
}
