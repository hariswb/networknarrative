import React,  {useState, useEffect} from "react";

function CharInfo(props) {

	function getNodeInfo(charName){
		const charIndex= props.chars.findIndex(node=>node.character == charName)
		return charIndex >= 0? props.chars[charIndex].info:"none"
	}
	console.log()

	function createMarkup(text) {
  		return {__html: text};
	}
	return (
		<div className={props.focus!==""?"char-info texture":"char-info hidden"}>
			<div>
				<strong>{props.focus}: </strong>
				<p dangerouslySetInnerHTML={
					createMarkup(getNodeInfo(props.focus)==null?
					"No info":
					getNodeInfo(props.focus))} />
				
			</div>
		</div>
		)
}

export default CharInfo