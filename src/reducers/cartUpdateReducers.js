const initialstate = 0
const changethenumber = (state = initialstate , action)=>{
switch(action.type){
	case "INCREMENT": return state + 1;
	default: return state
}
}

export default changethenumber;