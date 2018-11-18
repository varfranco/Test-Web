import {Component, Input} from '@angular/core';
import {TestWeb} from './services/test-web.service';
import {Router} from '@angular/router';
import { User } from './model/user'
import { TimeLine } from './model/timeLine'
import { LoginResultModel } from './model/loginResultModel'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'app';
  public status: string;
  public cid: string;
  public time:TimeLine[];

  // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************
    public cidDummy = '2kj34h345';
  // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************


  constructor(private api: TestWeb, private router: Router) { 
   }

  public tryLogin(): void {

    let user = new User();
    let timeLine = new TimeLine();

    // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************
    user.username = 'synergy';
    user.password = 'synergy123';
    user.type = 'V';
    // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************

    this.api.login(user).subscribe(
        (loginResult) => {
            this.status = loginResult.status;
            this.cid = loginResult.cid;
            
            //this.router.navigateByUrl('/ResComponent');
        },
        (error) => {
            alert("Error =  Status: " + error.status + " Texto: " + error.statusText);
            console.log(error);
            return error;
        }
    );

    this.api.getTimeLine(this.cidDummy).subscribe(
      (timeLine) => {
          this.cid = this.cidDummy;
      },
      (error) => {
          alert("Error =  Status: " + error.status + " Texto: " + error.statusText);
          console.log(error);
          return error;
      }
    );    

  }
}
