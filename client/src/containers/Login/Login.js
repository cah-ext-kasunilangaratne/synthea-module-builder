import React,{Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Login.css';
import '../../../node_modules/react-tabs/style/react-tabs.css'
import { ToastContainer, toast } from "react-toastify";
import ProxiLogo from '../../images/proxi-logo.png';
import AuthService from '../../services/AuthService'

class Login extends Component{
    constructor(props) {
        super(props);        
        this.state = {
            email : '',
            password: '',
            firstname: '',
            lastname: '',
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
    };
    
    login = (event) => {
        event.preventDefault();
        var details= {
            email: this.state.email,
            password: this.state.password 
        };

        AuthService.login(details)
        .then(data => {
            if (data.data.token){
                sessionStorage.setItem('token', data.data.token);
                sessionStorage.setItem('email', data.data.user.email);
                sessionStorage.setItem('user', data.data.user.name);
                this.props.history.push("/");
                window.location.reload();
            }else{
                const error = new Error();
                throw error;
            }
            console.log(data)
        })
        .catch(err => {
            toast.error("Invalid credentials. Please try again.");
        });
    }

    signup = (event) =>{
        event.preventDefault();
        if (this.state.password_s === this.state.password_confirm_s){
            var details = {
                'name': this.state.firstname + " " + this.state.lastname,
                'email': this.state.email_s,
                'password': this.state.password_s
            };
            
            AuthService.register(details)
            .then(data => {
                toast.success('User successfully Created');
            })
            .then(
                this.setState({
                    firstname: '',
                    lastname: '',
                    email_s: '',
                    password_s: '',
                    password_confirm_s: ''
                })
            )
            .catch(err => {
                toast.error(err);
            });
        }else{
            toast.error('Password fields do not match');
            this.setState({
                password_s: '',
                password_confirm_s: ''
            })
        }
    }

    render(){
        return(
            <div>
                <div className='Login-top'>
                <img src={ProxiLogo} className='Login-top-logo'/>
                <div className='Login-top-title'>Model Builder</div>   
                </div>
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
                        <ToastContainer/>
                    </TabPanel> 
                    <TabPanel> 
                    <form onSubmit={this.signup}>
                        <div className="card">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Enter First name"
                            value={this.state.firstname}
                            onChange={this.handleInputChange}
                            className="form-item"
                            required
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Enter Last name"
                            value={this.state.lastname}
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
                        <ToastContainer/>
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