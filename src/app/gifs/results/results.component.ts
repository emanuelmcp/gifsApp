import { Component, OnInit } from '@angular/core';
import { Gif } from 'src/app/interfaces/gifs.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(private gifsService: GifsService) { }

  get results(): Gif[] {
    return this.gifsService.results;
  }
}
