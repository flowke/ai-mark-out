// require('bootstrap/dist/css/bootstrap.min.css');
// require('font-awesome/css/font-awesome.min.css');



require('style/main.scss');
import S from './style.scss';
import 'semantic-ui-css/semantic.min.css';
import {Provider, connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Grid, Image } from 'semantic-ui-react';

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

            <div className={`${S.gridWrap}`}>
                <div className={S.topRow}>
                    <div className={S.logo}>
                        <div className={S.imgWrap}>
                            <a href="http://art.microbu.com"><img src={require("img/logo.png")} alt="miaov.com"/></a>
                        </div>
                    </div>
                    <div className={S.gallery}>
                        <PhotoGallery/>
                    </div>
                </div>
                <div className={S.bottomRow}>
                    <div className={S.tool}>
                        <ToolBox/>
                        <a href=""></a>
                        <div className="a"></div>
                    </div>
                    <div className={S.board}>
                        <Board/>
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
)( App );

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>

    </Provider>
    ,
    document.getElementById('root')
);

// if(module.hot){
//     module.hot.accept();
// }
