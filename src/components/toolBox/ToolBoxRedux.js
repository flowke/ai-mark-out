import {finishFirst, hintFinish} from 'common/util/Util.js';

const CHANGE_SHAPE = 'CHANGE_SHAPE';

export const changeShape = (shape)=>(dispatch, state) =>{
    let curtPhotoID = state().curtPhoto.id;

    if( curtPhotoID !== undefined ){

        let layerGroup = state().paintingBoard[curtPhotoID];
        if(layerGroup.holdingLayerID || finishFirst(layerGroup.layers, layerGroup.curtTag)){
            hintFinish();
            return;
        }
    }

    dispatch({
        type: CHANGE_SHAPE,
        shape
    });
}

export default function shape(state=0, action) {
    let {type, shape} = action;

    switch (type) {
        case CHANGE_SHAPE:
            return shape;
        default:
            return state;
    }
}
