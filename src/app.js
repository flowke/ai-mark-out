require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');
require('style/main.scss');
import {Provider, connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import configureStore, {history} from 'reduxes/configureStore';


import FuncButtons from 'funcButtons/FuncButtons';
import Board from 'drawingBoard/Board';
import PhotoGallery from 'photoGallery/PhotoGallery';
import ToolBox from 'toolBox/ToolBox';
import Property from 'property/Property';

import {loadImage} from 'reduxes/InitPhotosRedux';

let store = configureStore();

class App extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let {loadImage }  = this.props.actions;
        loadImage();
    }

    render(){

        let {photosData, actions, curtPhoto} = this.props;

        let { loadImage } = actions;

        return (
            <div className="appRoot">

                <PhotoGallery/>
                <div className="container-fluid height">
                    <div className="row height">
                        <ToolBox/>
                        <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 height">
                            <Board/>
                            {/* <FuncButtons/> */}
                        </div>
                        <Property
                            {...{
                                curtPhotoID: curtPhoto.id
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

App = connect(
    state => state,
    dispatch => ({actions: bindActionCreators({loadImage}, dispatch)})
)(App)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>

    </Provider>
    ,
    document.getElementById('root')
);
