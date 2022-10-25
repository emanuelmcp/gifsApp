import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private oldSearches: string[] = [];

  private apiKey: string = 'BygVR12dkBPQ822i2k5CYxzYeOo318lM';

  public results: Gif[] = [];

  get history(): string[] {
    return[...this.oldSearches];
  }

  constructor( private http: HttpClient){
    
  }

  searchGifs = (query: string): void => {
    query = query.trim().toLocaleLowerCase();
    if (!this.oldSearches.includes(query)){
      this.oldSearches.unshift(query);
      this.oldSearches = this.oldSearches.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this.oldSearches));
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
    .subscribe((response: SearchGifsResponse) => this.results = response.data);
  }

}
