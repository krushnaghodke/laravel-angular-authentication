import { Component, OnInit } from '@angular/core';
import {JarwisService} from "../../Services/jarwis.service";

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

  constructor(private Jarwis: JarwisService) { }

  ngOnInit(): void {
  }

  onSubmit() {
     this.Jarwis.signup(this.form).subscribe(
        data => console.log(data),
        error => this.handleError(error),
      );
  }

  handleError(error) {
    this.error = error.error.errors;
  }
}
