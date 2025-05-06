export class User {
    constructor({ id, name, email }) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
  
    getDisplayName() {
        return this.name.split(' ')[0];
    }
}