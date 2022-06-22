import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  user_medias: any = [];
  userName: string;

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private fr: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.auth.currentUser) {
      this.getList(this.auth.currentUser.uid);
      this.userName = JSON.parse(localStorage.getItem('name') || 'null');
    }
  }

  async getList(userId: string) {
    const media_ids = await this.fr.getUserFavorites(userId);
    const ids = media_ids.map(data => {
      return data.mediaId;
    })
    var list_query = `
    query {
      Page {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (id_in: [${ids}]){
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' });
    this.http.post<any>('https://graphql.anilist.co/', JSON.stringify({ query: list_query }), { headers })
      .subscribe(data => {
        this.user_medias = data.data.Page.media;
        this.merge(this.user_medias, media_ids);
        this.user_medias.sort((a, b) => {
          return a.date_added - b.date_added;
        })
      });
  }
  merge(array1, array2) {
    let findMedia = id => array2.find(element => element.mediaId === id);
    array1.forEach(element => {
      let media = findMedia(`${element.id}`);
      let { date_added } = media;
      Object.assign(element, { date_added });
    });
  }

}
