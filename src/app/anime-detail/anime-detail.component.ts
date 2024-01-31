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
import { NgClass, NgStyle } from '@angular/common';
import { getNameOfAnime } from '../../assets/util/GetNameOfAnime';
import { KformatterPipe } from './pipes/kformatter.pipe';

@Component({
  selector: 'app-anime-detail',
  standalone: true,
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.scss',
  imports: [LoaderComponent, NgStyle, NgClass, KformatterPipe],
})
export class AnimeDetailComponent implements OnInit {
  router = inject(Router);
  animeDetail: WritableSignal<Anime> = signal({} as Anime);
  averageRatingOfAnime!: string;
  loading = true;

  ngOnInit(): void {
    this.animeDetail.set(history.state.animeDetail);
    this.averageRatingOfAnime = this.getAverageRatingOfAnime(
      this.animeDetail()
    );
    this.loading = false;
  }

  getNameOfAnime = (anime: Anime) => getNameOfAnime(anime);

  getAverageRatingOfAnime = (anime: Anime) =>
    (anime.attributes.averageRating / 2 / 10).toFixed(1);

  getArrayOfNumber = () =>
    new Array(Math.round(Number(this.averageRatingOfAnime)));
}
