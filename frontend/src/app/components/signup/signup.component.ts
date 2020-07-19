import { Component, OnInit } from '@angular/core';
import {JarwisService} from "../../Services/jarwis.service";
import {TokenService} from "../../Services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error = [];

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
     this.Jarwis.signup(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error),
      );
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }
}
