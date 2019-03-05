import React,{Component} from 'react';
import auth from './auth'

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
      }
    
    render(){
        return(
            <div>
                <h1>SIGN IN</h1>
                {/* <input type="text" value={this.state.username} onChange={this.handleChange} />
                <input type="text" value={this.state.password} onChange={this.handleChange} /> */}

                <input type="text" value={this.state.username}/>
                <input type="text" value={this.state.password}/>

                <button onClick = {() => {
                    auth.login(()=>{
                        this.props.history.push("/")
                    })
                }}> LOGIN </button>
            </div>
        )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;