import { Injectable } from '@angular/core';

@Injectable()
export class User {    
    public username: string;
    public GetUserName(): string { return this.username }

    public password: string;
    public GetPassword(): string { return this.password }

    public type: string;
    public GetType(): string { return this.type }

    constructor()
    {
        this.username = '';
        this.password = '';
        this.type = '';
    }

}