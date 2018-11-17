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

  public tryLogin() {
    //var user = new User();
    //user.fillFromJSON('{"username": "synergy", "password": "synergy123", "type": "V"}');  

    let user: User;
    
    this.api.login(user);
  }
}
