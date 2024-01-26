import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from '../services/models/Response';
import { LoaderComponent } from '../components/loader/loader.component';
import { NgStyle } from '@angular/common';
import { getNameOfAnime } from '../../assets/util/GetNameOfAnime';

@Component({
  selector: 'app-anime-detail',
  standalone: true,
  imports: [LoaderComponent, NgStyle],
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.scss',
})
export class AnimeDetailComponent implements OnInit {
  router = inject(Router);
  animeDetail: WritableSignal<Anime> = signal({} as Anime);
  loading = true;

  ngOnInit(): void {
    this.animeDetail.set(history.state.animeDetail);
    this.loading = false;
  }

  getNameOfAnime = (anime: Anime) => getNameOfAnime(anime);
}
