import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/pages/Landing';
import ChatSession from './components/pages/ChatSession';
export default class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/chat" component={ChatSession} />
				</Switch>
			</Router>
		);
	}
}
