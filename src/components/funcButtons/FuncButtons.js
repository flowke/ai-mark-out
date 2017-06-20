
import {connect} from 'react-redux';

import * as actionCreators from './FuncButtonsRedux';

class FuncButtons extends Component{
    constructor(props){
        super(props);
    }

    render(){

        let {redoAPoint} = this.props;
        return (
            <div className="btn-group">
                {/* <input type="button" className="btn btn-danger" value="上传"/> */}
                {/* <input
                    onClick={redoAPoint}
                type="button" className="btn btn-danger" value="上一步"/> */}
                {/* <input type="button" className="btn btn-danger" value="下一步"/> */}
            </div>
        );
    }
}

export default connect(
    state => state,
    actionCreators
)(FuncButtons)
