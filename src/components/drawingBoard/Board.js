
import {connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
const {Stage, Layer, Circle, Line, Image} = KV;
import PaintingGroup from './PaintingGroup';
import PaintingLayer from './PaintingLayer';
import * as actionCreators from './BoardRedux';

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

        let { paintingBoard, curtPhoto, actions, tagsBoard } = this.props;

        let {id: curtPhotoID} = curtPhoto;

        let layersData = paintingBoard[curtPhotoID];

        let PG = null;

        let curtTag = null;

        if(tagsBoard && tagsBoard[curtPhotoID]){
            curtTag = tagsBoard[curtPhotoID].curtTag;
        }

        let {image} = this.state;


        return (
            <div
                className="thumbnail img"
                ref="container"
            >
                <PaintingGroup
                    {...{
                        layersData,
                        curtTag,
                        image
                    }}
                    {...actions}
                />
            </div>
        );
    }
}

export default connect(
    state => {
        let {curtPhoto, paintingBoard, photosData, tagsBoard} = state;
        return {
            curtPhoto,
            paintingBoard,
            photosData,
            tagsBoard
        }
    },
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(Board);
