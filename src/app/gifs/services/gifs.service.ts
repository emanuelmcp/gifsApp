import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private oldSearches: string[] = [];

  private apiKey: string = 'BygVR12dkBPQ822i2k5CYxzYeOo318lM';
  private urlService = 'https://api.giphy.com/v1/gifs';

  public results: Gif[] = [];

  get history(): string[] {
    return[...this.oldSearches];
  }

  constructor( private http: HttpClient){
    this.oldSearches = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('resultadps')!) || [];
  }

  searchGifs = (query: string): void => {
    query = query.trim().toLocaleLowerCase();
    if (!this.oldSearches.includes(query)){
      this.oldSearches.unshift(query);
      this.oldSearches = this.oldSearches.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this.oldSearches));
    }
    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '10').set('q', query);
    this.http.get<SearchGifsResponse>(`${this.urlService}/search`, {params})
    .subscribe((response: SearchGifsResponse) => {
      this.results = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.results));
    });
  }

}
