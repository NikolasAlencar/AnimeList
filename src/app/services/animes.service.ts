import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Anime, Root } from './models/Response';

@Injectable({
  providedIn: 'root',
})
export class AnimesService {
  constructor() {}

  BACKEND_URL = environment.ANIME_API_URL;
  httpClient = inject(HttpClient);
  animes: WritableSignal<Anime[]> = signal([]);

  getAnimesByPage(page: number, limit = 20) {
    this.httpClient
      .get<Root>(
        `${this.BACKEND_URL}anime?page[limit]=${limit}&page[offset]=${page}`
      )
      .pipe(map(res => res.data))
      .subscribe(animes => this.animes.set(animes))
      .unsubscribe();
  }

  getAnimes = () => this.animes.asReadonly();
}
