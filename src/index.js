import React from "react";
import ReactDOM from "react-dom";

import MyImage from './assets/dog.jpeg';
import './index.css';

import Dashboard from './components/dashboard.js'

const App = () => {
	return (
		<div>
		    <h2>Header</h2>
		    {/*<img src={MyImage} />*/}
		    <Dashboard/>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
