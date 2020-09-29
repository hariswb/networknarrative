import React,  {useState, useEffect} from "react";

function Menu(props) {
	const [selected,setSelected] = useState("")

	useEffect(()=>{

	},[])

	const menuButtons = props.categories.map((d)=>
								<li key={d}>
								<button  
									className={props.category==d?"button-selected":"button"}
									onClick={()=>{props.onCategory(d)}}>
									<a>{d}</a>
								</button>
								</li>
							)
	return (
		<div className="menu">
			<div className="menu-buttons">
				<ul>{menuButtons}</ul>
				<div className="menu-info">
					<p>{props.data.description[props.category]}</p>
				</div>
			</div>
		</div>
		)
	}



export default Menu;