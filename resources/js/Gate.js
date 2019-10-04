export default class Gate{

    constructor(user){
        this.user = user;
    }

    isAdmin(){
        return this.user.access === 'admin';
    }

    isParent(){
        return this.user.access === 'parent';
    }

    isAdminOrParent(){
        if(this.user.access === 'parent' || this.user.access === 'admin'){
            return true;
        }
    }
}