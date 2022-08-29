import {browserHistory} from 'react-router'
var bbid = 0;

class Auth {

    setUser(id){
        bbid = id;
    }

    getBbid(){
        if(bbid !== 0){
            return bbid;
        }else{
            browserHistory.push('/login');
        }
    }

    logout(){
        bbid = null;
        browserHistory.push('/login')
    }
}

export default Auth;