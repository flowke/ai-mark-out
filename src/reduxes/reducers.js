
import {combineReducers} from 'redux';

import paintingBoard from 'drawingBoard/BoardRedux';
import curtPhoto from 'photoGallery/PhotoGalleryRedux';
import photosData from './InitPhotosRedux';
import tagsBoard from 'property/PropertyRedux';
// console.log(tagsI);
export default combineReducers({
    photosData,
    paintingBoard,
    curtPhoto,
    tagsBoard
});
