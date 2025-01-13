import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone : false
})
export class LoginPage implements OnInit {

  from = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Los validadores deben ir dentro de un array
    password: new FormControl('', [Validators.required]), // Los validadores deben ir dentro de un array
  
  });
  


  constructor() { }

  ngOnInit() {
  }

}
