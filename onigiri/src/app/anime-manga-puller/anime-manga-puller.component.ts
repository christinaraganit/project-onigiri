import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class ImageSize {
  constructor (
    public extraLarge: string
  ){}
}
export class Title {
  constructor (
    public english: string,
    public romaji: string
  ) {}
}

export class Media {
  constructor (
    public id: number,
    public title: Title,
    public coverImage: ImageSize
  ) {

  }
}

@Component({
  selector: 'app-anime-manga-puller',
  templateUrl: './anime-manga-puller.component.html',
  styleUrls: ['./anime-manga-puller.component.css']
})
export class AnimeMangaPullerComponent implements OnInit {
  search: string = "";
  li:any;
  medias: Media[] = [];
  all_list_query = `
  query {
    Page {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (sort: POPULARITY_DESC){
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }`;
  



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({'Content-Type':'application/json', Accept:'application/json'});
    this.http.post<any>('https://graphql.anilist.co/', JSON.stringify({query: this.all_list_query}), {headers})
    .subscribe(data=> {
      this.li = data;
      this.medias = this.li.data.Page.media;
    });

  }

  onSearchChange() {
    var search_query = this.search !== "" ? `
    query {
      Page {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: " + ${this.search} + " sort: POPULARITY_DESC){
          id
          title {
            english
            romaji
          }
          coverImage {
            extraLarge
          }
        }
      }
    }`: `
    query {
      Page {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (sort: POPULARITY_DESC){
          id
          title {
            english
            romaji
          }
          coverImage {
            extraLarge
          }
        }
      }
    }`;
    const headers = new HttpHeaders({'Content-Type':'application/json', Accept:'application/json'});
    this.http.post<any>('https://graphql.anilist.co/', JSON.stringify({query: search_query}), {headers})
    .subscribe(data=> {
      this.li = data;
      this.medias = this.li.data.Page.media;
    });
  }

}
