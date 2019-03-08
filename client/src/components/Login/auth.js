export const isAuthenticated = () => {
    if (this.authenticated){
        return ({
            type: true
          })
    }else{
        return ({
            type: false
        })
    }
    
  }


class Auth{
    constructor(){
        this.authenticated = false;
    }

    //cb = callback
    login(cb){
        this.authenticated=true;
        cb()
    }

    logout(cb){
        console.log("AUTH LOGGOUT")
        this.authenticated=false;
        cb()
    }

    isAuthenticated(){
        return this.authenticated
    }
}

export default new Auth;