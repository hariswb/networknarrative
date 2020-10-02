import React,  {useState, useEffect} from "react";

function Menu(props) {
	const width = props.chartSize.width //> 300 &&  props.chartSize.width < 800?
					// props.chartSize.width+300:props.chartSize.width
	const height = props.chartSize.height
	const [show, setShow] = useState(width > 600? "block":"none")
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
	const buttonPopup = <button className="button-popup" onClick={()=>setShow(show=="none"?"block":"none")}/>
	const backgroundPopup = {
		"display":show,
		"width":width,
		"height":height,
	}
	const menuPopup ={
		'display':show,
		'width':width*0.7,
		'height':height,
	}
	return (
		<div>
			{width <600?buttonPopup:<div/>}
			<div className="menu-background" 
				 style={width > 600?{}:backgroundPopup}
				 onClick={()=>setShow("none")}/>
			<div className="menu" style={width > 600?{}:menuPopup}>  
				<div className="menu-buttons">
					<ul>{menuButtons}</ul>
					<div className="menu-info">
						<p>{props.data.description[props.category]}</p>
					</div>
				</div>
			</div>
		</div>
		)
	}



export default Menu;