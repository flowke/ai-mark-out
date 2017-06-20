
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers.js';
import thunk from 'redux-thunk';

export default function configureStore() {

    if(process.env.NODE_ENV==='production'){
        return createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk)
            )
        );
    }else{
        return createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk),
                window.devToolsExtension ? window.devToolsExtension() : f=>f
            )
        );
    }


}
