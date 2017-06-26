import {combineReducers} from 'redux';
const ADD_TAG = 'ADD_TAGSSS';
const SWITCH_TAG = 'SWITCH_TAGSSS';
import {addTempLayer} from 'drawingBoard/BoardRedux';
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

export const addTag = () => (dispatch, getStage)=> {

    let {id} = getStage().curtPhoto;

    let tag = {id: Math.random(), tagName: `图层:${Math.random().toString().slice(2,6)}`};

    dispatch({
        type: ADD_TAG,
        curtPhotoID:id,
        tag
    });

    dispatch(addTempLayer(id, tag.id));

    // dispatch(switchTag(id, tag.id));
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

            // if(!tagsGroup.curtTag){
            //
            //     return {...state, ...{
            //         [curtPhotoID]: {...tagsGroup, ...{
            //             tags: [tag, ...tags],
            //             curtTag: tag.id
            //         }}
            //     }};
            // }

            return {...state, ...{
                [curtPhotoID]: {...tagsGroup, ...{tags: [tag, ...tags], curtTag: tag.id}}
            }};

        case SWITCH_TAG:
            return {...state, ...{
                [curtPhotoID]: {...tagsGroup, ...{curtTag: id}}
            }}
        default:
            return state;
    }
}
