import React from "react";
import ReactDOM from "react-dom";

import './index.css';

import Dashboard from './components/dashboard.js'

if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }

const App = () => {
	return (
		<div>
		    <Dashboard/>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
