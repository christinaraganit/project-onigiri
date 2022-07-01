import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

interface Anime {
  value: string;
  viewValue: string;
}

interface Manga {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  @Output() formData: EventEmitter<{
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    anime_choice: Anime,
    manga_choice: Manga,
  }> = new EventEmitter();

  animes: Anime[] = [
    {value: 'attack-on-titan-0', viewValue: 'Attack on Titan'},
    {value: 'jujutsu-kaisen-1', viewValue: 'Jujutsu Kaisen'},
    {value: 'demon-slayer-2', viewValue: 'Demon Slayer'},
  ];

  mangas: Manga[] = [
    {value: 'dragon-ball-0', viewValue: 'Dragon Ball'},
    {value: 'inuyasha-1', viewValue: 'Inuyasha'},
    {value: 'naruto-2', viewValue: 'Naruto'},
  ];

  formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      anime: [''],
      manga: [''],
    });
  }

  onSubmit() {
    this.formData.emit(this.formGroup.value);
  }

}
