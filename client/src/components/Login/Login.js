import React,{Component} from 'react';
// import { createStore } from 'redux';

import auth from './auth'
import './Login.css';

// const store = createStore(reducer, []);

export function getToken(){
    return this.state.token
}

class Login extends Component{
    constructor(props) {
        super(props);
        
        
        this.state = {
            email : '',
            password: ''
        };
    }
    
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/authenticate', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.token){
                this.props.history.push("/")
            }else{
                const error = new Error(data.error);
                throw error;
            }
            
        })
        .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                <div className="center">
                <div className="card">
                    <h1>Login Below!</h1>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            className="form-item"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            className="form-item"
                            required
                        />
                        <input 
                            type="submit" 
                            value="Login"
                        />
                </div>
                </div>
                </form>
        </div>
        )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;