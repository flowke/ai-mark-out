
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers.js';
import thunk from 'redux-thunk';

const history = createHistory();

const routerML = routerMiddleware(history);

export {history};

export default function configureStore() {

    if(process.env.NODE_ENV==='production'){
        return createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk,routerML)
            )
        );
    }else{
        const store = createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk,routerML),
                window.devToolsExtension ? window.devToolsExtension() : f=>f
            )
        );
        // if (module.hot) {
        //     // Enable Webpack hot module replacement for reducers
        //     module.hot.accept('./reducers.js', () => {
        //       const nextRootReducer = require('./reducers.js');
        //       store.replaceReducer(nextRootReducer);
        //     });
        // }
        return store;
    }


}
