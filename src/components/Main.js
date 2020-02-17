import React, {Component} from 'react';
import Register from "./Register"
import Login from "./Login"

class Main extends Component {
    render() {
        return (
            <div>
                <Register/>
                <Login/>
            </div>
        );
    }
}

export default Main;