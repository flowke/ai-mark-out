import S from './style.scss';
import {connect} from 'react-redux';
import {combineReducers, bindActionCreators} from 'redux';
import * as actions from './PropertyRedux';

import Tag from './tag';

class Property extends Component{
    constructor(props){
        super(props);
        this.layerName = 0;
    }

    render(){

        let { tagsBoard, curtPhotoID, addTag, switchTag } = this.props;

        let tags = null;


        if(tagsBoard && tagsBoard[curtPhotoID]){

            let curtTag = tagsBoard[curtPhotoID].curtTag;

            tags = tagsBoard[curtPhotoID].tags.map(elt=>{
                return (
                    <Tag
                        {...{
                            key: elt.id,
                            id: elt.id,
                            tagName: elt.tagName,
                            curtPhotoID,
                            switchTag,
                            active: curtTag === elt.id
                        }}
                    />
                )
            });
        }

        return (
            <div className={S.showData}>
                <div
                    onClick={ev=> {
                        addTag(curtPhotoID, {id: Math.random(), tagName: `图层:${this.layerName++}`})
                    }}
                >新建</div>
                {tags}
            </div>
        );
    }
}

export default connect(
    state => {
        let {tagsBoard, curtPhoto} = state;
        return {
            tagsBoard, curtPhotoID: curtPhoto.id
        }
    },
    dispatch => bindActionCreators(actions, dispatch)
)(Property);
