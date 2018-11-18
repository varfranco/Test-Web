import { Injectable } from '@angular/core';

@Injectable()
export class TimeLine {
  public id: number;
  public title: string;
  public url: string;
  public thumbnailUrl: string;

  constructor()
  {
      this.id = 0;
      this.title = '';
      this.url = '';
      this.thumbnailUrl = '';
  }
}