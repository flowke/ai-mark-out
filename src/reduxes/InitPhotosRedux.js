import {push} from 'react-router-redux';
import {switchPhoto} from 'photoGallery/PhotoGalleryRedux';
let imgArr = [
    require("img/2.jpg"),
    require("img/3.jpg"),
    require("img/4.jpg"),
    require("img/5.jpg"),
    require("img/1.jpg"),
    // require("img/boot_03.png"),
    // require("img/boot_05.png"),
    // require("img/boot_07.png"),
    // require("img/boot_09.png"),
    // require("img/boot_15.png"),
    // require("img/boot_16.png"),
    // require("img/boot_17.png"),
    // require("img/boot_18.png"),
    // require("img/boot_23.png"),
    // require("img/boot_24.png"),
    // require("img/boot_25.png"),
    // require("img/boot_26.png")

];

// let imgData = {};
// imgArr.forEach((elt,i)=>{
//     imgData[i] = { id: i, url: elt};
// });

let imgData = imgArr.map((elt,i)=>({id: i, url: elt}))

let initState = [];

const LOAD_IMAGE = 'LOAD_IMAGE';

export function addPhotos(imgArr) {
    return {
        type: LOAD_IMAGE,
        imgArr
    }
}

export const loadImage = () => (dispatch, getState) =>{

    let photosData = getState().router.location.state;

    dispatch(addPhotos(imgData));
    // if(!photosData){
    //
    // }

    if(!getState().curtPhoto.id){
        let photo = imgData[0];
        dispatch(switchPhoto(photo));
    }
}

export default function photos(state=[], action) {
    let {type, imgArr} = action;
    switch (type) {
        case LOAD_IMAGE:
            return [...state, ...imgArr];
            break;
        default:
            return state;
    }
}
