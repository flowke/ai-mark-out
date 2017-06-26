
import {addTempLayer} from 'drawingBoard/BoardRedux';
import {hintFinish, finishFirst} from 'common/util/Util';

const SWITCH_PHOTO = 'SWITCH_PHOTO';
const NEXT_PHOTO = 'NEXT_PHOTO';
const PREVIOUS_PHOTO = 'PREVIOUS_PHOTO';




export const switchPhoto = (photo) => (dispatch, getState)=>{

    let curtPhotoID = getState().curtPhoto.id;

    if( curtPhotoID !== undefined ){

        let layerGroup = getState().paintingBoard[curtPhotoID];
        if(layerGroup.holdingLayerID || finishFirst(layerGroup.layers, layerGroup.curtTag)){
            hintFinish();
            return;
        }
    }

    dispatch({
        type : SWITCH_PHOTO,
        photo
    });

    if(!getState().paintingBoard[photo.id]){
        dispatch(addTempLayer(photo.id));
    }else{
        if(getState().paintingBoard[photo.id].curtTag) return;
        dispatch(addTempLayer(photo.id));
    }

}
// 当前 photo 的 id
export default function curtPhoto(state={}, action) {

    let {type, photo } = action

    switch (type) {
        case SWITCH_PHOTO:
            return photo;
            break;

        default:
            return state;
    }
}
