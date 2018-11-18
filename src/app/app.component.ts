import {Component, Input} from '@angular/core';
import {TestWeb} from './services/test-web.service';
import {Router} from '@angular/router';
import { User } from './model/user'
import { LoginResultModel } from './model/loginResultModel'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(private api: TestWeb, private router: Router) { }

  public tryLogin(): void {

    let user = new User();

    // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************
    user.username = 'synergy';
    user.password = 'synergy123';
    user.type = 'V';
    // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************

    this.api.login(user).subscribe(
        (loginResult) => {
            // This code will be executed when the HTTP call returns successfully
            alert("status: " + loginResult.status + " Cid: " + loginResult.cid);            
            return loginResult;
        },
        (error) => {
            alert("Error =  Status: " + error.status + " Texto: " + error.statusText);
            console.log(error);
            return error;
        }
    );
  }
  
}
