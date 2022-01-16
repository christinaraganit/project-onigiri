import { Component, OnInit } from '@angular/core';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    })
  }
}
