import {
  Component,
  HostListener,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnimesService } from '../services/animes.service';
import { JsonPipe, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ajustaGrid } from '../../assets/util/AjustaGrid';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';
import { Anime } from '../services/models/Response';
import { getNameOfAnime } from '../../assets/util/GetNameOfAnime';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    MatCardModule,
    JsonPipe,
    NgStyle,
    MatIconModule,
    MatGridListModule,
    SkeletonComponent,
  ],
})
export class HomeComponent {
  constructor() {
    afterNextRender(() => this.onWindowResize());
    this.animesService.getAnimesByPage(0);
  }

  animesService = inject(AnimesService);
  animes = this.animesService.getAnimes();

  screenWidth = signal(0);
  innerWidth = signal(0);

  getNameOfAnime = (anime: Anime) => getNameOfAnime(anime);

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth / 9);
    this.innerWidth.set(ajustaGrid(window.innerWidth));
  }
}
