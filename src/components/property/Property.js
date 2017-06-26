import S from './style.scss';
import {connect} from 'react-redux';
import {combineReducers, bindActionCreators} from 'redux';

import {finishFirst} from 'common/util/Util.js';
import {selectShape, fixLayerHold, fixShapeFill} from 'drawingBoard/BoardRedux';

import Tag from './tag';

class Property extends Component{
    constructor(props){
        super(props);

    }

    render(){

        let { paintingBoard, curtPhotoID, selectShape, fixLayerHold, fixShapeFill} = this.props;

        let tags = null;

        if(paintingBoard && paintingBoard[curtPhotoID]){

            let layerGroup =  paintingBoard[curtPhotoID];

            let {curtTag, selectedTag} = paintingBoard[curtPhotoID];



            tags = paintingBoard[curtPhotoID].layers.map(layer=>{
                if(layer && curtTag===layer.id) {
                    // points = layer.points;
                    return;
                };
                return (
                    <Tag
                        {...{
                            key: layer.id,
                            id: layer.id,
                            tagName: layer.tagName,
                            active: selectedTag === layer.id,
                            selectShape,
                            fixLayerHold,
                            fixShapeFill
                        }}
                    />
                )
            });
        }

        return (
            <div className={S.showData}>
                {tags}
            </div>
        );
    }
}

export default connect(
    state => {
        let {paintingBoard, curtPhoto} = state;
        return {
            paintingBoard, curtPhotoID: curtPhoto.id
        }
    },
    dispatch => bindActionCreators({selectShape, fixLayerHold, fixShapeFill}, dispatch)
)(Property);
