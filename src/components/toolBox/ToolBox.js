import S from './style.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    redoAPoint
} from 'drawingBoard/BoardRedux';

import {List, Button} from 'semantic-ui-react';

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
            <ul className={S.toolButton}>
                <li
                    onClick={ev=>incrementStage()}
                >
                    <i></i>
                    放大
                </li>
                <li
                    onClick={ev=>decrementStage()}
                >
                    <i></i>
                    缩小
                </li>
                <li
                    onClick={ev=>adaptStage()}
                >
                    <i></i>
                    适应
                </li>
                <li
                    onClick={
                        ev=>{
                            changeShape(0);
                        }
                    }
                >
                    <i></i>
                    点描

                </li>
                <li
                    onClick={
                        ev=>{
                            changeShape(1);
                        }
                    }
                >
                    <i></i>
                    框选
                </li>

                <li
                    onClick={ev => {

                        if( layersGroup && layersGroup.curtTag && shape === 0){

                            redoAPoint();
                        }
                    }}
                >
                    <i></i>
                    上一步
                </li>
            </ul>
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
