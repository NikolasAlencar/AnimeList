import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnimesService } from '../services/animes.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  animesService = inject(AnimesService);
  animes = this.animesService.getAnimes();

  ngOnInit(): void {
    this.animesService.getAnimesByPage(0);
  }
}
