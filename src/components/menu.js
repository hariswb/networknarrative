import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";

function Menu(props) {

	useEffect(()=>{

	},[])

	const menuButtons = props.categories.map(d=><li key={d}><button onClick={()=>props.onCategory(d)}>{d}</button></li>)
	
	function getNodeInfo(charName){
		const charIndex= props.chars.findIndex(node=>node.character == charName)
		return charIndex >= 0? props.chars[charIndex].info:"none"
	}
	console.log(props.category,props.focus)
	return (
		<div className="menu">
			<div>{menuButtons}</div>
			<div>{props.category}</div>
			<div>{props.graph.description[props.category]}</div>
			<h3>{props.focus}</h3>
			<p>{getNodeInfo(props.focus)}</p>
		</div>)
	}



export default Menu;