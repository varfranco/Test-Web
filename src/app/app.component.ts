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
  public selectedType: string = '';
  
  public status: string;
  public cid: string;
  public time: TimeLine[];
  
  constructor(private api: TestWeb, private router: Router) { 
   }

  public tryLogin(username: string, password: string, type: string): void {

    let user = new User();    
    /*
    // *** This code catch de true values in the UI, but the services take a Bad Request ***
    user.username = username;
    user.password = password;
    user.type = this.selectedType;
    // *** This code catch de true values in the UI, but the services take a Bad Request ***
    */

    // *** HardCode by test, dont forget delete ***
    user.username = 'synergy';
    user.password = 'synergy123';
    user.type = 'V';

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

  }

  public tryTime(cid: string): void {
        //if(cid){
            this.api.getTimeLine(cid).subscribe(
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
        //}
    }

    //event handler for the select element's change event
    selectChangeHandler (event: any) {
        //update the ui
        this.selectedType = event.target.value;
    }

}
