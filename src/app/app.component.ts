import {Component} from '@angular/core';
import {TestWeb} from './services/test-web.service';
import {Router} from '@angular/router';
import { User } from './model/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private api: TestWeb, private router: Router) {
    
  }

  public tryLogin(): void {

    let user = new User();
    user.username = 'synergy';
    user.password = 'synergy123';
    user.type = 'V';

    this.api.login(user).subscribe(
        (result) => {
            // This code will be executed when the HTTP call returns successfully
            alert("status: " + result.status + " Cid: " + result.cid);
            return result;
        },
        (error) => {
            alert("Error =  Status: " + error.status + " Texto: " + error.statusText);
            console.log(error);
        }
    );
  }
  
}
