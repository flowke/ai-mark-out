
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    redoAPoint
} from 'drawingBoard/BoardRedux';


import * as toolActions from './ToolBoxRedux';
import * as stageActions from 'reduxes/StageRedux';
class ToolBox extends Component{
    constructor(props){
        super(props);
    }

    render(){

        let {
            redoAPoint,
            changeShape,
            layersGroup,
            shape,
            curtPhotoID,
            adaptStage,
            incrementStage,
            decrementStage
        } = this.props;

        return (
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 tool">
                <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-info"
                        onClick={ev=>incrementStage()}
                    >
                        <span className="fa fa-pencil"></span>
                        <span className="hidden-sm hidden-xs">放大</span>
                    </button>

                    <button type="button" className="list-group-item list-group-item-info"
                        onClick={ev=>decrementStage()}
                    >
                        <span className="fa fa-pencil"></span>
                        <span className="hidden-sm hidden-xs">缩小</span>
                    </button>

                    <button type="button" className="list-group-item list-group-item-info"
                        onClick={ev=>adaptStage()}
                    >
                        <span className="fa fa-pencil"></span>
                        <span className="hidden-sm hidden-xs">适应</span>
                    </button>

                    <button type="button" className="list-group-item list-group-item-info"
                        onClick={
                            ev=>{
                                changeShape(0);
                            }
                        }
                    >
                        <span className="fa fa-photo"></span>
                        <span className="hidden-sm hidden-xs">点描</span>
                    </button>

                    <button type="button" className="list-group-item list-group-item-info"
                        onClick={
                            ev=>{
                                changeShape(1);
                            }
                        }
                    >
                        <span className="fa fa-reorder"></span>
                        <span className="hidden-sm hidden-xs">框选</span>
                    </button>

                    <button type="button" className="list-group-item list-group-item-info"
                        onClick={ev => {

                            if( layersGroup && layersGroup.curtTag && shape === 0){

                                redoAPoint();
                            }
                        }}
                    >
                        <span className="fa fa-circle-o-notch"> </span>
                        <span className="hidden-sm hidden-xs">上一步</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(
    state=>{
        let {curtPhoto, paintingBoard, shape} = state;
        return {
            layersGroup: paintingBoard[curtPhoto.id],
            shape,
            curtPhotoID: curtPhoto.id
        };
    },
    dispatch => ({
        ...bindActionCreators({ redoAPoint}, dispatch),
        ...bindActionCreators( toolActions, dispatch),
        ...bindActionCreators( stageActions, dispatch )
    })
)(ToolBox);
