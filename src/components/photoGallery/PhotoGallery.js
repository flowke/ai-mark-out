
import Img from './Img';
import {connect} from 'react-redux';
import {combineReducers, bindActionCreators} from 'redux';
import * as actions from './PhotoGalleryRedux';

class PhotoGallery extends Component{
    constructor(props){
        super(props);
    }

    render(){

        let {photosData, switchPhoto, curtPhoto} = this.props;

        return (
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container imglist">
                    <div className="btn btn-danger listBtnLeft">&lt;</div>
                    <div className="row">
                        {
                            photosData.map((photo,i)=>{
                                return (
                                    <Img
                                        {...{
                                            key: photo.id,
                                            photo: photo,
                                            active: curtPhoto.id===photo.id,
                                            switchPhoto
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="btn btn-danger listBtnRight">&gt;</div>
                </div>
            </nav>
        );
    }
}

export default connect(
    state => ({photosData: state.photosData, curtPhoto: state.curtPhoto}),
    dispatch => bindActionCreators( actions, dispatch)
)(PhotoGallery)
