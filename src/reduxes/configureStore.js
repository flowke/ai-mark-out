
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers.js';
import thunk from 'redux-thunk';

const history = createHistory();

const routerML = routerMiddleware(history);

const reducer = combineReducers({...rootReducer, ...{
    router: routerReducer
}});

export {history};

export default function configureStore() {

    if(process.env.NODE_ENV==='production'){
        return createStore(
            reducer,
            compose(
                applyMiddleware(thunk,routerML)
            )
        );
    }else{
        return createStore(
            reducer,
            compose(
                applyMiddleware(thunk,routerML),
                window.devToolsExtension ? window.devToolsExtension() : f=>f
            )
        );
    }


}
