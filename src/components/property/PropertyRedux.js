import {combineReducers} from 'redux';
const ADD_TAG = 'ADD_TAGSSS';
const SWITCH_TAG = 'SWITCH_TAGSSS';
import {addLayer} from 'drawingBoard/BoardRedux';
const initState = {};

// initState: {
//     curtPhotoID: {
//         curtTag,
//         tags
//     }
// }

// tag: {
//     key: elt.id,
//     tagName:
// }

export const addTag = (curtPhotoID, tag) => (dispatch, getStage)=> {

    let {id} = getStage().curtPhoto;

    dispatch(addLayer(id, tag.id));

    dispatch({
        type: ADD_TAG,
        curtPhotoID,
        tag
    });
}

export function switchTag(curtPhotoID,id) {
    return {type: SWITCH_TAG, curtPhotoID, id}
}


export default function tagsBoard(state=initState, action){
    let {type, curtPhotoID, tag, id} = action;

    let tagsGroup = state[curtPhotoID];
    if(!tagsGroup){
        tagsGroup = {};
    }

    switch (type) {
        case ADD_TAG:

            let {tags} = tagsGroup;
            if(!tags){
                tags = [];
            }

            let curtTag = null;

            if(!tagsGroup.curtTag){
                return {...state, ...{
                    [curtPhotoID]: {...tagsGroup, ...{
                        tags: [tag, ...tags],
                        curtTag: tag.id
                    }}
                }};
            }

            return {...state, ...{
                [curtPhotoID]: {...tagsGroup, ...{tags: [tag, ...tags]}}
            }};

        case SWITCH_TAG:
            return {...state, ...{
                [curtPhotoID]: {...tagsGroup, ...{curtTag: id}}
            }}
        default:
            return state;
    }
}
