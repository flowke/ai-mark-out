
import Img from './Img';
import {connect} from 'react-redux';
import {combineReducers, bindActionCreators} from 'redux';
import * as actions from './PhotoGalleryRedux';
import {selectShape} from 'drawingBoard/BoardRedux';
import {finishFirst} from 'common/util/Util.js';
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
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container imglist">
                    <div className="btn btn-danger listBtnLeft"
                        onClick={ev=>{
                            photosData.forEach((photo, i, arr)=>{

                                if(curtPhoto.id===photo.id && i>0){

                                    switchPhoto(arr[i-1]);
                                }
                            });
                        }}
                    >&lt;</div>
                    <div className="row">
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
                    </div>
                    <div className="btn btn-danger listBtnRight"
                        onClick={ev=>{
                            photosData.forEach((photo, i, arr)=>{
                                if(curtPhoto.id===photo.id && i<arr.length-1){
                                    switchPhoto(arr[i+1]);
                                }
                            });
                        }}
                    >&gt;</div>
                </div>
            </nav>
        );
    }
}

export default connect(
    state => ({photosData: state.photosData, curtPhoto: state.curtPhoto, paintingBoard: state.paintingBoard}),
    dispatch => bindActionCreators( {...actions, selectShape}, dispatch)
)(PhotoGallery)
