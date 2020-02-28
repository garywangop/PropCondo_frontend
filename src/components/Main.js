import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Discussion from "./Discussion";
import Home from "./Home";

class Main extends Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path="/discussion" component={Discussion}/>
                    <Route path="/home" component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default Main;