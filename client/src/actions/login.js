export const do_login = (token, user) =>{
    return ({
      type: 'LOGIN_USER',
      data:{
        token,
        user
      }
    }) 
  }