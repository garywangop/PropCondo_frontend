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

        return (
            <div className="main">
                <Switch>
                    <Route path="/discussion" component={Discussion}/>
                    <Route path="/dashboard" component={DashBoard}/>
                    <Route path="/home" component={Home}/>
                    <Route render={getRoot}/>
                </Switch>
            </div>
        );
    }
}

export default Main;