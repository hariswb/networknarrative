import React,  {useState, useEffect} from "react";

function CharInfo(props) {

	function getNodeInfo(charName){
		const charIndex= props.chars.findIndex(node=>node.character == charName)
		return charIndex >= 0? props.chars[charIndex].info:"none"
	}
	console.log()

	return (
		<div className={props.focus!==""?"char-info":"char-info-hidden"}>
			<h4>Character Info</h4>
			<p>
				<strong>{props.focus}: </strong>
				{getNodeInfo(props.focus)==null?
					"No info about this character":
					getNodeInfo(props.focus)
				}
			</p>
		</div>
		)
}

export default CharInfo