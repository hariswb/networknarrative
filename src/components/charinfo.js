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
	const boxWidth = ()=>{
		return props.chartSize.width > 300? 300:props.chartSize.width
	}
	return (
		<div className={props.focus!==""?"char-info":"char-info hidden"}
				style={{width:boxWidth}}>
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