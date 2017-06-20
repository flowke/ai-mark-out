
const SWITCH_PHOTO = 'SWITCH_PHOTO';


export function switchPhoto(photo){
    return {
        type : SWITCH_PHOTO,
        photo
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
