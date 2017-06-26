
import {fixPointPosition} from 'drawingBoard/BoardRedux';

const ADAPT_STAGE = 'ADAPT_STAGE';
const INCREMENT_STAGE = 'INCREMENT_STAGE';
const DECREMENT_STAGE = 'DECREMENT_STAGE';

let OriWidth=760;
let OriHeight=500;

const initState = {
    width: OriWidth,
    height: OriHeight,
    preWidth: OriWidth,
    preHeight: OriHeight
}

export const adaptStage = ()=> (dispatch, getState) =>{
    let {width, height} = getState().stage;

    dispatch({
        type: ADAPT_STAGE,
        width: OriWidth,
        height: OriHeight,
        preWidth: width,
        preHeight: height
    });

    dispatch(fixPointPosition());

}

export const incrementStage = ()=> (dispatch, getState) =>{
    let {width, height} = getState().stage;

    let preWidth = width,
        preHeight = height;

    width*=1.2;
    height*=1.2;

    if(width>2760 || height>1500){
        return;
    }

    dispatch({
        type: INCREMENT_STAGE,
        width, height, preWidth, preHeight
    });

    dispatch(fixPointPosition());
}

export const decrementStage = ()=> (dispatch, getState) =>{

    let {width, height} = getState().stage;

    let preWidth = width,
        preHeight = height;

    width= width / 1.2;
    height= height/1.2;

    if(width<760 || height<500){
        width = OriWidth;
        height = OriHeight;

    }

    dispatch({
        type: DECREMENT_STAGE,
        width, height, preWidth, preHeight
    });

    dispatch(fixPointPosition());
}

export default function stage(state=initState, action){
    let {
        type, width, height, preWidth, preHeight
    } = action;
    switch (type) {
        case ADAPT_STAGE:
        case INCREMENT_STAGE:
            // return state+=0.2;
        case DECREMENT_STAGE:
            return {...state, width, height, preWidth, preHeight}
        default:
            return state;
    }
}
