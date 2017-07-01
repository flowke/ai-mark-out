
import {connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
const {Stage, Layer, Circle, Line, Image} = KV;
import PaintingGroup from './PaintingGroup';
import PaintingLayer from './PaintingLayer';
import * as actionCreators from './BoardRedux';

import S from './style.scss';

class Board extends Component{
    constructor(props){
        super(props);

        this.state = {
            image: null
        }

    }

    loadImage(url){
        let imgObj = new window.Image();

        imgObj.onload = ()=>{
            this.setState({
                image: imgObj
            })
        }

        imgObj.src = url;
    }

    componentWillReceiveProps(nProps){

        this.loadImage(nProps.curtPhoto.url);
    }

    componentDidMount(){

    }

    render(){

        let { paintingBoard, curtPhoto, actions, shape, stage } = this.props;

        let {id: curtPhotoID} = curtPhoto;

        let layersGroup = paintingBoard[curtPhotoID];

        if(!layersGroup) return null;

        let {image} = this.state;

        return (
            <div
                className={S.fl}
                ref="container"
            >
                <PaintingGroup
                    {...{
                        layersGroup,
                        image,
                        shape,
                        stage
                    }}
                    {...actions}
                />
            </div>
        );
    }
}

export default connect(
    state => {
        let {curtPhoto, paintingBoard, photosData, shape, stage} = state;
        return {
            curtPhoto,
            paintingBoard,
            photosData,
            shape,
            stage
        }
    },
    dispatch => ({actions: bindActionCreators({...actionCreators}, dispatch)})
)(Board);
