import {Component} from '@angular/core';
import {TestWeb} from './services/test-web.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  username = 'synergy';
  password = 'synergy123';
  type = 'V';

  constructor(private api: TestWeb, private router: Router) {
  }

  tryLogin() {
    this.api.login(this.username, this.password)
      .subscribe(
        r => {
          if (r.status) {
            //this.reultado.setStatus(r.status);
            //this.reultado.setCid(r.cid);
            this.router.navigateByUrl('../index');
          }
        },
        r => {
          alert(r.error.error);
        });
  }
}
