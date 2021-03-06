
import {combineReducers} from 'redux';

import paintingBoard from 'drawingBoard/BoardRedux';
import curtPhoto from 'photoGallery/PhotoGalleryRedux';
import photosData from './InitPhotosRedux';
import stage from './StageRedux';
import tagsBoard from 'property/PropertyRedux';
import shape from 'toolBox/ToolBoxRedux';
// console.log(tagsI);
export default {
    photosData,
    paintingBoard,
    curtPhoto,
    tagsBoard,
    shape,
    stage
};
