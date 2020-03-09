import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Discussion from "./Discussion";
import Home from "./Home";
import DashBoard from "./DashBoard"

class Main extends Component {
    render() {
        const getRoot = () => {
            return <Redirect to="/home" />;
        }

        const getHome = () => {
            return this.props.isLoggedIn ? <Redirect to="/dashboard" /> : <Home handleLogin={this.props.handleLogin}/>;
        }

        const getDashBoard = () => {
            return this.props.isLoggedIn ? <DashBoard /> : <Home handleLogin={this.props.handleLogin}/>;
        }

        return (
            <div className="main">
                <Switch>
                    <Route path="/dashboard" render={getDashBoard}/>
                    <Route path="/home" render={getHome}/>
                    <Route render={getRoot}/>
                </Switch>
            </div>
        );
    }
}

export default Main;