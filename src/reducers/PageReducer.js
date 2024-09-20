const initiaState = "auto"

const pageStatusChange = (state=initiaState,action)=>{

    if(action.type==="disablePointerEvents"){
        return state="none"
    }
  
    if(action.type==="enablePointerEvents"){
        return state="auto"
    }

    return initiaState

}

export default pageStatusChange;