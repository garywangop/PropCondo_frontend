import React, {Component} from 'react';
import Login from "./Login"
import Register from "./Register"

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Register className="home-register"/>
                <Login history={this.props.history} handleLogin={this.props.handleLogin} className="home-login"/>
            </div>
        );
    }
}

export default Home;