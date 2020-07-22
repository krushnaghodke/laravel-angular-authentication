import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JarwisService} from "../../../Services/jarwis.service";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }

  constructor(
    private route: ActivatedRoute,
    private jarwis: JarwisService,
    private router: Router,
    private notify: SnotifyService
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
     this.jarwis.changePassword(this.form).subscribe(
       data => this.handleResponse(data),
       error => this.handleError(error)
     );
  }

  private handleResponse(data: Object) {
    this.notify.confirm('Done! Login with new password',{
      buttons: [
        {text: 'Yes', bold: true },
      ]
    })
    this.router.navigateByUrl('/login')
  }

  private handleError(error: any) {
      this.error = error.error.errors;
  }
}
