import {
  Component,
  HostListener,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnimesService } from '../services/animes.service';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ajustaGrid } from '../../assets/util/AjustaGrid';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';
import { Anime } from '../services/models/Response';
import { getNameOfAnime } from '../../assets/util/GetNameOfAnime';
import { MatRadioModule } from '@angular/material/radio';
import { RADIO_GROUP } from './constants/RadioGroup';
import { filterAnimes } from './services/FilterAnimes';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../components/loader/loader.component';
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
    MatRadioModule,
    NgClass,
    RouterLink,
    LoaderComponent,
  ],
})
export class HomeComponent {
  constructor() {
    afterNextRender(() => this.onWindowResize());
    this.animesService.getAnimesByPage(this.pagePagination);
  }

  animesService = inject(AnimesService);
  animes = this.animesService.getAnimes();
  beforeAnimes!: Anime[];

  screenWidth = signal(0);
  innerWidth = signal(0);

  radioGroup = RADIO_GROUP;

  filterList = false;

  loadingPagination = this.animesService.getLoadingPagination();
  pagePagination = 0;

  filterBy(param: string) {
    if (!this.beforeAnimes) this.beforeAnimes = Array.from(this.animes()); //ajustar função Todos

    if (this.beforeAnimes.length && param !== 'todos') {
      const filterFunction = filterAnimes(param, this.beforeAnimes);
      this.animes.set(filterFunction());
    } else {
      this.animes.set(this.beforeAnimes);
    }
  }

  getNameOfAnime = (anime: Anime) => getNameOfAnime(anime);

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth / 9);
    this.innerWidth.set(ajustaGrid(window.innerWidth));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isScrolledToBottom()) {
      this.loadingPagination.set(true);
      this.pagePagination += 20;
      this.animesService.getAnimesByPage(this.pagePagination);
    }
  }

  isScrolledToBottom(): boolean {
    const windowHeight = window.innerHeight;
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;

    return scrollY + windowHeight >= documentHeight;
  }
}
