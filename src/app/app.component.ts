import {Component, Input} from '@angular/core';
import {TestWeb} from './services/test-web.service';
import {Router} from '@angular/router';
import { User } from './model/user'
import { TimeLine } from './model/timeLine'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'app';
  
  public status: string;
  public cid: string;
  public time: TimeLine[];
  
  // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************
    public cidDummy = 'k6lj87hj8';
  // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************


  constructor(private api: TestWeb, private router: Router) { 
   }

  public tryLogin(): void {

    let user = new User();

    // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************
    user.username = 'synergy';
    user.password = 'synergy123';
    user.type = 'V';
    // ******************* DUMMY DATA - DELETE and use the objects in [(ngModel)] *******************

    this.api.login(user).subscribe(
        (loginResult) => {
            this.status = loginResult.status;
            this.cid = loginResult.cid;            
        },
        (error) => {
            console.log(error);
            return error;
        }
    );

    this.api.getTimeLine(this.cidDummy).subscribe(
              time => {
                  this.time = time;
                  //alert('this.users=' + this.time);
                  //alert('this.users.length=' + this.time.length);
                  //alert('this.users[0].firstName=' + this.time[0].id);
              }, //Bind to view
                          err => {
                      // Log errors if any
                      console.log(err);
                  });
  }

}
