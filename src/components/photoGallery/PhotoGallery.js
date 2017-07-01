
import {connect} from 'react-redux';
import {combineReducers, bindActionCreators} from 'redux';
import * as actions from './PhotoGalleryRedux';
import {selectShape} from 'drawingBoard/BoardRedux';
import { Button, List, Container} from 'semantic-ui-react';

import {finishFirst} from 'common/util/Util.js';

import Img from './Img';

import S from './style.scss';

class PhotoGallery extends Component{
    constructor(props){
        super(props);
    }

    render(){

        let {photosData, switchPhoto, paintingBoard, curtPhoto, selectShape} = this.props;

        // let shouldFinish = false;
        //
        // if(paintingBoard[curtPhoto.id]){
        //     let {curtTag} = paintingBoard[curtPhoto.id];
        //     shouldFinish = finishFirst(paintingBoard[curtPhoto.id].layers, curtTag);
        // }

        return (
            <Container textAlign="center" className={S.container}>
                <Button basic icon='chevron left' size="massive" className={S.button}
                    onClick={ev=>{
                        photosData.forEach((photo, i, arr)=>{
                            if(curtPhoto.id===photo.id && i>0){
                                switchPhoto(arr[i-1]);
                            }
                        });
                    }}
                />
                <List horizontal className={S.listWrap}>
                    {
                        photosData.map((photo,i)=>{
                            return (
                                <Img
                                    {...{
                                        key: photo.id,
                                        photo: photo,
                                        active: curtPhoto.id===photo.id,
                                        switchPhoto,
                                        selectShape
                                    }}
                                />
                            )
                        })
                    }
                </List>
                <Button basic icon='chevron right' size="massive" className={S.button}
                    onClick={ev=>{
                        photosData.forEach((photo, i, arr)=>{
                            if(curtPhoto.id===photo.id && i<arr.length-1){
                                switchPhoto(arr[i+1]);
                            }
                        });
                    }}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({photosData: state.photosData, curtPhoto: state.curtPhoto, paintingBoard: state.paintingBoard}),
    dispatch => bindActionCreators( {...actions, selectShape}, dispatch)
)(PhotoGallery)
