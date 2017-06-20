
import {combineReducers} from 'redux';

import {
    fitStageIntoParentContainer,
    drawImgCenter,
    getRectToImg
} from 'util/KonvaUtil';

const ADD_LAYER = "ADD_LAYER";
const UNDO = "CANCLE_A_POINT";
const NEXT = "REDO_A_POINT";
const ADD_SPOT = "ADD_SPOT";
const CLOSE_LINE = "CLOSE_LINE";
const FIX_HIT = "FIX_HIT";

// let initState = {
//     curtPhotoID: layerGroup
// };

// layerGroup : {
//     curtTagID: layer
// }
// layer : {
//
//     id: 0,
//     points: [],
//     actualPoints: [],
//     fill: null,
//     closed: false,
//     firstSpotHit: false
//
// }


let initState = {};

export function addLayer(curtPhotoID, curtTagID) {

    return {
        type: ADD_LAYER,
        curtPhotoID,
        curtTagID
    }
}

export const addSpot = (x, y, calcParm, curtTagID) => (dispatch, getState)=> {

    let curtPhotoID = getState().curtPhoto.id;

    dispatch({
        type: ADD_SPOT,
        startX: x,
        startY: y,
        calcParm,
        curtTagID,
        curtPhotoID
    });
}
export const closeLine = (curtTagID) => (dispatch, getState) => {
    let curtPhotoID = getState().curtPhoto.id;
    dispatch({
        type: CLOSE_LINE,
        curtTagID,
        curtPhotoID
    });
}
export const fixFirstSpotHit = (flag, curtTagID) => (dispatch, getState) => {
    // console.log(flag);
    let curtPhotoID = getState().curtPhoto.id;

    dispatch({
        type: FIX_HIT,
        flag,
        curtTagID,
        curtPhotoID

    });

}

export default function paintingBoard(state=initState, action){

    let {
        type,
        curtPhotoID,
        curtTagID,
        startX,
        startY,
        calcParm,
        flag
    } = action;

    let LayerGroup = state[curtPhotoID];
    if(!LayerGroup){ LayerGroup = {}; }

    let layer = LayerGroup[curtTagID];

    switch (type) {
        case ADD_LAYER:

            return {...state, ...{
                [curtPhotoID] : {...LayerGroup, ...{
                    [curtTagID]: {
                        id: curtTagID,
                        points: [],
                        actualPoints: [],
                        fill: null,
                        closed: false,
                        firstSpotHit: false
                    }
                }}
            }};
        case ADD_SPOT:

            let {disW, disT} = getRectToImg(startX, startY, calcParm);

            layer = {...layer, ...{
                points: [...layer.points, startX, startY],
                actualPoints: [...layer.actualPoints, disW, disT]
            }}

            return {...state, ...{
                [curtPhotoID] : {...LayerGroup, ...{
                    [curtTagID]: layer
                }
            }}}

        case CLOSE_LINE:

            layer = {...layer, ...{
                closed: true,
                fill: 'rgba(255, 0, 0, 0.3)'
            }}

            return {...state, ...{
                [curtPhotoID] : {...LayerGroup, ...{
                    [curtTagID]: layer
                }
            }}}
        case FIX_HIT:
            layer = {...layer, ...{
                firstSpotHit: flag,
            }}

            return {...state, ...{
                [curtPhotoID] : {...LayerGroup, ...{
                    [curtTagID]: layer
                }
            }}}

        case UNDO:

            layers = layers.map(elt=>{
                if(elt.id===0){
                    elt.points.pop();
                    elt.points.pop();
                    elt.actualPoints.pop();
                    elt.actualPoints.pop();
                    elt.closed = false;
                }
                return elt;
            });

            return {...state, layers}
            break;
        default:
            return state;
    }
}
