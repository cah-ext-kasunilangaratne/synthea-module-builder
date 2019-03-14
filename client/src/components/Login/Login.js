import React,{Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Login.css';
import '../../../node_modules/react-tabs/style/react-tabs.css'

class Login extends Component{
    constructor(props) {
        super(props);
        
        
        this.state = {
            email : '',
            password: '',
            
            username: '',
            email_s: '',
            password_s: '',
            password_confirm_s: '',

            alert: ''
        };
    }
    
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    login = (event) => {
        event.preventDefault();
        var body= {
            email: this.state.email,
            password: this.state.password 
        }
        fetch('http://' + process.env.REACT_APP_BACKEND + ':5000/authenticate', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.data.token){
                this.props.history.push("/")
                sessionStorage.setItem('token', data.data.token)
                window.location.reload();
            }else{
                const error = new Error(data.error);
                throw error;
            }
        })
        .catch(err => {
            alert('Error logging in please try again');
        });
    }

    signup = (event) =>{
        event.preventDefault();
        if (this.state.password_s === this.state.password_confirm_s){
            var body = {
                'name': this.state.username,
                'email': this.state.email_s,
                'password': this.state.password_s
            }
            
            fetch('http://' + process.env.REACT_APP_BACKEND + ':5000/register', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                alert('User successfully Created')
            })
            .then(
                this.setState({
                    username: '',
                    email_s: '',
                    password_s: '',
                    password_confirm_s: ''
                })
            )
            .catch(err => {
                alert('Error signing up, please try again');
            });
        }else{
            alert('Password fields do not match')
            this.setState({
                password_s: '',
                password_confirm_s: ''
            })
        }
    }

    render(){
        return(
            <div>
                <div className="center">
                <div className="card">
                    <Tabs>
                        <TabList>
                            <Tab>LOG IN</Tab>
                            <Tab>SIGN UP</Tab>
                        </TabList>
                        <TabPanel> 
                            <form onSubmit={this.login}>
                            <div className='card'>
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
                            </form>
                        </TabPanel> 
                        <TabPanel> 
                        <form onSubmit={this.signup}>
                            <div className="card">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                className="form-item"
                                required
                            />
                            <input
                                type="email"
                                name="email_s"
                                placeholder="Enter email"
                                value={this.state.email_s}
                                onChange={this.handleInputChange}
                                className="form-item"
                                required
                            />
                            <input
                                type="password"
                                name="password_s"
                                placeholder="Enter password"
                                value={this.state.password_s}
                                onChange={this.handleInputChange}
                                className="form-item"
                                required
                            />
                            <input
                                type="password"
                                name="password_confirm_s"
                                placeholder="Enter password confirmation"
                                value={this.state.password_confirm_s}
                                onChange={this.handleInputChange}
                                className="form-item"
                                required
                            />
                            <input 
                                type="submit" 
                                value="Sign Up"
                            />
                            </div>
                            </form>
                        </TabPanel>
                    </Tabs>
                </div>
                </div>
        </div>
        )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;