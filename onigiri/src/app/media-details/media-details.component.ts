import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css']
})
export class MediaDetailsComponent implements OnInit {

  bannerImage: string;
  coverImage: string;
  title: string;
  description: string;


  constructor(
    private http: HttpClient,
    private ar: ActivatedRoute,
    private auth: Auth,
    private fr: FirestoreService
  ) { }

  ngOnInit(): void {
    const id = this.ar.snapshot.paramMap.get("id");
    if (id !== null) {
      var get_query = `
      query {
        Media (id: ${id}) {
          title {
            english
            romaji
          }
          coverImage {
            large
          }
          bannerImage
          description
        }
      }`;
      console.log(JSON.stringify({get_query}));
      const headers = new HttpHeaders({'Content-Type':'application/json', Accept:'application/json'});
      this.http.post<any>('https://graphql.anilist.co/', JSON.stringify({query: get_query}), {headers})
      .subscribe(data=> {
        const media = data.data.Media;
        this.bannerImage = media.bannerImage;
        this.coverImage = media.coverImage.large;
        this.title = media.title.english === "" ? media.title.english : media.title.romaji;
        this.description = media.description;
      });
    }
    
    
  }

  addToList() {
    const id = this.ar.snapshot.paramMap.get("id");
    if (this.auth.currentUser && id) {
      this.fr.addMediaToList(this.auth.currentUser.uid, id);
    }
  }

}
