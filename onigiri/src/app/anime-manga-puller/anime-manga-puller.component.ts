import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Media } from '../media-classes/media-classes';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-anime-manga-puller',
  templateUrl: './anime-manga-puller.component.html',
  styleUrls: ['./anime-manga-puller.component.css']
})
export class AnimeMangaPullerComponent implements OnInit {

  page: number = 1;
  search: string = "";
  li:any;
  medias: Media[] = [];
  all_list_query = `
  query {
    Page (page: ${this.page}) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (sort: POPULARITY_DESC){
        type
        id
        title {
          english
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }`;



  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: Auth,
    private fr: FirestoreService
  ) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({'Content-Type':'application/json', Accept:'application/json'});
    this.http.post<any>('https://graphql.anilist.co/', JSON.stringify({query: this.all_list_query}), {headers})
    .subscribe(data=> {
      this.li = data;
      this.medias = this.li.data.Page.media;
    });

  }

  onSearchChange() {
    this.page = 1;
    var search_query = this.search !== "" ? `
    query {
      Page (page: ${this.page}) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: " + ${this.search} + " sort: POPULARITY_DESC){
          id
          type
          title {
            english
            romaji
          }
          coverImage {
            large
          }
        }
      }
    }`: `
    query {
      Page (page: ${this.page}) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (sort: POPULARITY_DESC){
          id
          type
          title {
            english
            romaji
          }
          coverImage {
            large
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

  goToDetails(id: number) {
    this.router.navigate(['/media/' + id]);
  }

  @HostListener("window: scroll", [])
  atBottom() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.page++;
      this.loadMoreMedia();
    }
  }

  loadMoreMedia() {
    var search_query = this.search !== "" ? `
    query {
      Page (page: ${this.page}) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: " + ${this.search} + " sort: POPULARITY_DESC){
          id
          type
          title {
            english
            romaji
          }
          coverImage {
            large
          }
        }
      }
    }`: `
    query {
      Page (page: ${this.page}) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (sort: POPULARITY_DESC){
          id
          type
          title {
            english
            romaji
          }
          coverImage {
            large
          }
        }
      }
    }`;
    const headers = new HttpHeaders({'Content-Type':'application/json', Accept:'application/json'});
    this.http.post<any>('https://graphql.anilist.co/', JSON.stringify({query: search_query}), {headers})
    .subscribe(data=> {
      this.li = data;
      this.medias.push.apply(this.medias, this.li.data.Page.media);
    });
  }

  addToFavorites(id: number) {
    if (this.auth.currentUser && id) {
      const mediaId = id.toString()
      this.fr.addMediaToFavorites(this.auth.currentUser.uid, mediaId);
    }
  }
}
