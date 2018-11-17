export class User {    
    username: string;
    GetUserName(): string { return this.username }

    password: string;
    GetPassword(): string { return this.password }

    type: string;
    GetType(): string { return this.type }

    constructor()
    {
        this.username = '';
        this.password = '';
        this.type = '';
    }

    fillFromJSON(json: string) {
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
}