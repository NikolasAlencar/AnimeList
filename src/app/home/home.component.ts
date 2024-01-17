import {
  Component,
  HostListener,
  OnInit,
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
import { LoaderComponent } from '../components/loader/loader.component';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';

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
    LoaderComponent,
    SkeletonComponent
  ],
})
export class HomeComponent implements OnInit {
  constructor() {
    afterNextRender(() => this.onWindowResize());
  }

  animesService = inject(AnimesService);
  animes = this.animesService.getAnimes();

  screenWidth = signal(0);
  innerWidth = signal(0);

  ngOnInit(): void {
    this.animesService.getAnimesByPage(0);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth / 9);
    this.innerWidth.set(ajustaGrid(window.innerWidth));
  }
}
