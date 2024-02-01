import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Anime, MinifiedAttributes, Root } from './models/Response';

@Injectable({
  providedIn: 'root',
})
export class AnimesService {
  constructor() {}

  BACKEND_URL = environment.ANIME_API_URL;
  httpClient = inject(HttpClient);
  animes: WritableSignal<Anime[]> = signal([]);
  loadingPagination: WritableSignal<Boolean> = signal(false);
  findAnimes: WritableSignal<Anime[]> = signal([]);
  activeGenreOfAnime: WritableSignal<MinifiedAttributes[]> = signal([]);

  getAnimesByPage(page: number, limit = 20) {
    this.httpClient
      .get<Root>(
        `${this.BACKEND_URL}anime?page[limit]=${limit}&page[offset]=${page}`
      )
      .pipe(map(res => res.data))
      .subscribe(animes => {
        if (page > 0) {
          this.animes.set(this.animes().concat(animes));
          this.loadingPagination.set(false);
        } else {
          this.animes.set(animes);
        }
      });
  }

  getAnimesByName(name: string) {
    this.httpClient
      .get<Root>(`${this.BACKEND_URL}anime?filter[text]=${name}`)
      .pipe(map(res => res.data))
      .subscribe(animes => this.findAnimes.set(animes));
  }

  getGenresOfAnime(anime: Anime) {
    this.httpClient
      .get<Root>(`${this.BACKEND_URL}anime/${anime.id}/genres`)
      .pipe(map(res => res.data))
      .subscribe(genres => {
        const genresMapped = genres.map(genreData => genreData.attributes.name);
        this.activeGenreOfAnime.set(genresMapped);
      });
  }

  getAnimes = () => this.animes;

  getLoadingPagination = () => this.loadingPagination;

  getFindAnimes = () => this.findAnimes.asReadonly();

  getGenreOfAnime = () => this.activeGenreOfAnime.asReadonly();
}
