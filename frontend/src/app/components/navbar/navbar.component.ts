import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../Services/token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();

    this.Auth.changeAuthStatus(false);
    this.token.remove();
    this.router.navigateByUrl('/login');
  }
}
