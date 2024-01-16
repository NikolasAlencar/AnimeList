import {
  Component,
  HostListener,
  OnInit,
  afterNextRender,
  inject,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnimesService } from '../services/animes.service';
import { JsonPipe, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ajustaGrid } from '../../assets/util/AjustaGrid';
import { LoaderComponent } from "../components/loader/loader.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MatCardModule, JsonPipe, NgStyle, MatIconModule, MatGridListModule, LoaderComponent]
})
export class HomeComponent implements OnInit {
  constructor() {
    afterNextRender(() => this.onWindowResize());
  }

  animesService = inject(AnimesService);
  animes = this.animesService.getAnimes();

  screenWidth!: number;
  innerWidth!: number;

  ngOnInit(): void {
    this.animesService.getAnimesByPage(0);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth / 9;
    this.innerWidth = ajustaGrid(window.innerWidth);
  }
}
