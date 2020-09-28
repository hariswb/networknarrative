import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";

function Menu(props) {
	const [selected,setSelected] = useState("")

	useEffect(()=>{

	},[])

	const menuButtons = props.categories.map((d)=>
								<li key={d}>
								<button  
									className={props.category==d?"button-selected":"button"}
									onClick={()=>{
										props.onCategory(d)
										props.onFocusChange("")
										}
									}
									>
									<a>{d}</a>
								</button>
								</li>
							)

	function getNodeInfo(charName){
		const charIndex= props.chars.findIndex(node=>node.character == charName)
		return charIndex >= 0? props.chars[charIndex].info:"none"
	}
	return (
		<div className="menu">
			<div className="menu-buttons">
				<ul>{menuButtons}</ul>
				<p>{props.data.description[props.category]}</p>
			</div>
			<div className={props.focus!==""?"char-info":"char-info-hidden"}>
				<h4>Character Info</h4>
					<p>
						<strong>{props.focus}: </strong>
						{getNodeInfo(props.focus)==null?"No info about this character":getNodeInfo(props.focus)}
					</p>
			</div>
		</div>
		)
	}



export default Menu;