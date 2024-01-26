import { Component, OnInit, Signal, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AnimesService } from '../services/animes.service';
import { Anime } from '../services/models/Response';
import { getNameOfAnime } from '../../assets/util/GetNameOfAnime';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  service = inject(AnimesService);
  myControl = new FormControl('');
  options: Signal<Anime[]> = this.service.getFindAnimes();

  ngOnInit() {
    this.myControl.valueChanges
      .pipe(startWith(''), distinctUntilChanged(), debounceTime(500))
      .subscribe(valueInput =>
        this.service.getAnimesByName(valueInput as string)
      );
  }

  getNameOfAnime = (anime: Anime) => getNameOfAnime(anime);
}
