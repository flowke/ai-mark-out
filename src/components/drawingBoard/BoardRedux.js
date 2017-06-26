import Konva from 'konva';
import {combineReducers} from 'redux';
import {addTag} from 'property/PropertyRedux';
import {
    fitStageIntoParentContainer,
    drawImgCenter,
    getRectToImg
} from 'util/KonvaUtil';
import {hintFinish, finishFirst} from 'common/util/Util';

const ADD_TEMP_LAYER = "ADD_LAYER";

const UNDO = "CANCLE_A_POINT";
const NEXT = "REDO_A_POINT";
const ADD_SPOT = "ADD_SPOT";
const CLOSE_LINE = "CLOSE_LINE";
const FIX_POINT_STATE = "FIX_POINT_STATE";
const POINT_MOVE = "POINT_MOVE";
const OUT_FIRST_TIME = "OUT_FIRST_TIME";
const MOVE_A_SHAPE = "MOVE_A_SHAPE";
const FIX_SHAPE_FILL = "FIX_SHAPE_FILL";
const SELECT_A_SHAPE = "SELECT_A_SHAPE";
const ALTER_SHAPE = "ALTER_SHAPE";
const DELETE_SHAPE = "DELETE_SHAPE";
const FIX_LAYER_HOLD = "FIX_LAYER_HOLD";
const FIX_POINT_POSITION = "FIX_POINT_POSITION";
const FIRST_TIME_UNCLOSE = "FIRST_TIME_UNCLOSE";

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

export const addTempLayer = (curtPhotoID) =>(dispatch, state)=> {
    let curtPhotoID = state().curtPhoto.id;


    dispatch({
        type: ADD_TEMP_LAYER,
        curtPhotoID
    });
}

export const addSpot = (x, y, calcParm) => (dispatch, getState)=> {

    let curtPhotoID = getState().curtPhoto.id;
    let {curtTag: curtTagID, holdingLayerID} = getState().paintingBoard[curtPhotoID];

    // if(holdingLayerID){
    //     hintFinish();
    //     return;
    // }

    dispatch({
        type: ADD_SPOT,
        pointX: x,
        pointY: y,
        calcParm,
        curtTagID,
        curtPhotoID
    });
}

export const closeLine = () => (dispatch, getState) => {
    let curtPhotoID = getState().curtPhoto.id;
    let {curtTag, selectedTag} = getState().paintingBoard[curtPhotoID];

    let curtTagID = selectedTag || curtTag;

    dispatch({
        type: CLOSE_LINE,
        curtTagID,
        curtPhotoID
    });


}
export const fixFirstSpotHit = (flag, pointIndx) => (dispatch, getState) => {
    // console.log(flag);
    let curtPhotoID = getState().curtPhoto.id;
    let {curtTag, selectedTag} = getState().paintingBoard[curtPhotoID];

    let curtTagID = selectedTag || curtTag;

    dispatch({
        type: FIX_POINT_STATE,
        flag,
        curtTagID,
        curtPhotoID,
        pointIndx
    });

}

export const pointMove = ( pointIndx, x, y, calcParm) => (dispatch, getState) =>{
    let curtPhotoID = getState().curtPhoto.id;
    let {curtTag, selectedTag, holdingLayerID} = getState().paintingBoard[curtPhotoID];

    let curtTagID = selectedTag || curtTag;

    if(holdingLayerID){
        hintFinish();
        return;
    }

    dispatch({
        type: POINT_MOVE,
        curtPhotoID,
        curtTagID,
        pointIndx,
        pointX: x,
        pointY: y,
        calcParm
    });
}

export const fixPointPosition = ( ) => (dispatch, getState) =>{

    let curtPhotoID = getState().curtPhoto.id;
    let {width, height, preWidth, preHeight} = getState().stage;

    let evoScale = width/preWidth

    dispatch({
        type: FIX_POINT_POSITION,
        curtPhotoID,
        evoScale
    });

}

export const redoAPoint = ( specTag ) =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;
    let {curtTag, selectedTag, holdingLayerID} = getState().paintingBoard[curtPhotoID];

    if(holdingLayerID){
        hintFinish();
        return;
    }

    if(selectedTag){ return }

    let curtTagID = specTag || curtTag ;

    dispatch({
        type: UNDO,
        curtTagID,
        curtPhotoID
    });
}

export const fistTimeUnclose = ( specTag ) =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;
    let {curtTag, selectedTag, holdingLayerID} = getState().paintingBoard[curtPhotoID];

    // if(holdingLayerID){
    //     hintFinish();
    //     return;
    // }

    // if(selectedTag){ return }

    let curtTagID = specTag || curtTag ;

    dispatch({
        type: FIRST_TIME_UNCLOSE,
        curtTagID,
        curtPhotoID,
        holdingLayerID
    });
}

export const outFirstTime = () =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;
    let {curtTag, selectedTag} = getState().paintingBoard[curtPhotoID];

    let curtTagID = curtTag;

    dispatch({
        type: OUT_FIRST_TIME,
        curtTagID,
        curtPhotoID
    });
}


export const fixShapeFill = (isFill, curtTagID) =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;
    let {holdingLayerID} = getState().paintingBoard[curtPhotoID];



    dispatch({
        type: FIX_SHAPE_FILL,
        curtTagID,
        curtPhotoID,
        isFill
    });
}

export const selectShape = ( selectedTagID, isDepend) =>(dispatch, getState)=> {

    let curtPhotoID = getState().curtPhoto.id;

    if( curtPhotoID !== undefined && !isDepend){

        let layerGroup = getState().paintingBoard[curtPhotoID];
        if(layerGroup.holdingLayerID || finishFirst(layerGroup.layers, layerGroup.curtTag)){
            hintFinish();
            return;
        }
    }

    dispatch({
        type: SELECT_A_SHAPE,
        selectedTagID,
        curtPhotoID
    });
}



export const moveShape = (offsetDistenceArr, pointPos, specTag, calcParm) =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;
    dispatch({
        type: MOVE_A_SHAPE,
        specTag,
        curtPhotoID,
        offsetDistenceArr,
        pointPos,
        calcParm
    });
}

export const deleteShape = ( layerID ) =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;


    dispatch({
        type: DELETE_SHAPE,
        curtPhotoID,
        layerID
    });

}
export const alterShape = ( tagName, attrs, layerID ) =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;
    let shapeType = getState().shape;

    dispatch({
        type: ALTER_SHAPE,
        curtPhotoID,
        layerID,
        tagName,
        attrs,
        shapeType
    });

}

export const alterShapeState = ( {tagName='', layerID=null, attrs='',  isDelete=false, isDone=false} ) =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;

    if(isDone){
        dispatch(alterShape(tagName, attrs, layerID));
    }

    if(isDelete){
        dispatch(deleteShape( layerID ));
    }

}

export const fixLayerHold = ( holdingLayerID ) =>(dispatch, getState)=> {
    let curtPhotoID = getState().curtPhoto.id;

    dispatch({
        type: FIX_LAYER_HOLD,
        curtPhotoID,
        holdingLayerID
    });

}

export default function paintingBoard(state=initState, action){

    let {
        type,
        curtPhotoID,
        curtTagID,
        pointX,
        pointY,
        calcParm,
        flag,
        pointIndx,
        isFill,
        selectedTagID,
        layerID,
        tagName,
        holdingLayerID,
        attrs,
        shapeType,
        evoScale,
        pointPos,
        offsetDistenceArr,
        specTag
    } = action;

    let layerGroup = state[curtPhotoID];
    if(!layerGroup){ layerGroup = {}; }

    let {layers} = layerGroup;
    if(!layers) layers=[];

    switch (type) {
        case ADD_TEMP_LAYER:
            let color = Konva.Util.getRandomColor();
            let tempLayerID = Math.random();
            return {...state,
                [curtPhotoID] : {
                    layers: [...layers, {
                        id: tempLayerID,
                        tagName: '',
                        points: [],
                        actualPoints: [],
                        fill: null,
                        closed: false,
                        firstSpotHit: false,
                        lineColor: color,
                        overPointIndex: null,
                        shape: 0,
                        firstTimeNewPoint: true,
                        attrs: '',
                        shapeType: null,
                        everDone: false
                    }],
                    curtTag: tempLayerID,
                    selectedTag: null,
                    holdingLayerID: null
                }
            };

        case ADD_SPOT:
            if(true){
                // let {disW, disT} = getRectToImg(pointX, pointY, calcParm);

                layers = layers.map(layer=>{
                    if(layer.id===curtTagID){
                        layer.points = [...layer.points, {x:pointX, y:pointY}];
                        // layer.actualPoints = [...layer.actualPoints, {x:disW, y:disT}];
                    }
                    return layer;
                });

                return {...state,
                    [curtPhotoID] : {...layerGroup, layers}
                }
            };

        case CLOSE_LINE:

            // layer = {...layer, ...{
            //     closed: true,
            //     fill: 'rgba(255, 0, 0, 0.3)'
            // }}

            layers = layers.map(layer=>{
                if(layer.id===curtTagID){
                    layer.closed = true;
                };
                return layer;
            });
            return {...state,
                [curtPhotoID] : {...layerGroup, layers}
            }

        case FIX_POINT_STATE:

            layers = layers.map(layer=>{
                if(layer.id===curtTagID){
                    layer.firstSpotHit = flag;
                    layer.overPointIndex = pointIndx;
                }
                return layer;
            });

            return {...state,
                [curtPhotoID] : {...layerGroup, layers}
            }

        case FIX_SHAPE_FILL:

            layers = layers.map(layer=>{
                if(layer.id===curtTagID){
                    layer.fill = isFill ? 'rgba(255, 0, 0, 0.3)': null;
                }
                return layer;
            });

            return {...state,
                [curtPhotoID] : {...layerGroup, layers}
            }

        case SELECT_A_SHAPE:

            return {...state,
                [curtPhotoID] : {...layerGroup, selectedTag: selectedTagID}
            }

        case POINT_MOVE:

            layers = layers.map(layer=>{
                if(layer.id===curtTagID){
                    let pt = layer.points[pointIndx];
                    if(pointX!==null){
                        pt.x = pointX;
                    }
                    if(pointY!==null){
                        pt.y = pointY;
                    }

                    // let {disW, disT} = getRectToImg(pt.x, pt.y, calcParm);

                    // layer.actualPoints[pointIndx] = {x: disW, y: disT};

                }
                return layer;
            });

            return {...state,
                [curtPhotoID] : {...layerGroup, layers}
            }

        case FIX_POINT_POSITION:

            layers = layers.map(layer=>{

                let points = layer.points.map(({x,y})=>{

                    return {
                        x: x*evoScale,
                        y: y*evoScale
                    }
                });

                return {...layer, points};
            });

            return {...state,
                [curtPhotoID] : {...layerGroup, layers}
            }

        case UNDO:

            layers = layers.map(layer=>{
                if(layer.id===curtTagID){
                    if(layer.closed){
                        layer.closed = false;
                        layer.everDone = false;
                    }else{
                        layer.points.pop();
                        layer.actualPoints.pop();
                    }
                };
                return layer;
            });

            return {...state,
                [curtPhotoID] : {...layerGroup, layers}
            }
        case FIRST_TIME_UNCLOSE:

            layers = layers.map(layer=>{
                // curtTagID
                if(layer.id===holdingLayerID){
                    layer.closed = false;
                    layer.everDone = false;
                };
                return layer;
            });

            let deleteIndex = null;
            layers.forEach(( layer, i)=>{
                if(layer.id===curtTagID){
                    deleteIndex = i;
                }
            });
            layers.splice(deleteIndex, 1);

            return {...state,
                [curtPhotoID] : {...layerGroup, layers, curtTag: holdingLayerID, holdingLayerID: null}
            }
        case OUT_FIRST_TIME:

            layers = layers.map(layer=>{
                if(layer.id===curtTagID){
                    layer.firstTimeNewPoint = false;
                }
                return layer;
            });

            return {...state,
                [curtPhotoID] : {...layerGroup, layers}
            }
        case DELETE_SHAPE:

            let shouldDeleteIndex = null;
            layers.forEach(( layer, i)=>{
                if(layer.id===layerID){
                    shouldDeleteIndex = i;
                }
            });

            layers.splice(shouldDeleteIndex, 1);

            return {...state,
                [curtPhotoID] : {...layerGroup, layers, holdingLayerID: null, selectedTag: null}
            }
        case ALTER_SHAPE:

            layers = layers.map(( layer, i)=>{
                if(layer.id===layerID){
                    layer.tagName = tagName;
                    layer.attrs = attrs;
                    layer.shapeType = shapeType;
                    layer.everDone = true;
                }
                return layer;
            });

            return {...state,
                [curtPhotoID] : {...layerGroup, layers, holdingLayerID: null}
            }
        case FIX_LAYER_HOLD:

            return {...state,
                [curtPhotoID] : {...layerGroup,
                    holdingLayerID
                }
            }
        case MOVE_A_SHAPE:

            layers = layers.map(layer=>{

                if(layer.id===specTag){
                    // pointPos
                    layer.points = layer.points.map((point, i)=>{
                        return {
                            x: pointPos.x- offsetDistenceArr[i].x,
                            y: pointPos.y- offsetDistenceArr[i].y
                        }
                    });

                }
                return layer;
            });

            return {...state,
                [curtPhotoID] : {...layerGroup, layers}
            }
        default:
            return state;
    }
}
