import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { constructor } from 'moment';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameFocus;
  passwordFocus;

  loginForm: Login;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.loginForm = {
      username: '',
      password: ''
    };
  }

  login() {
    if (this.loginForm.password && this.loginForm.username) {
      this.httpService.login(this.loginForm);
    }
  }
}
