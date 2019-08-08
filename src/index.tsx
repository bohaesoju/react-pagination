import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from './reducers';
import App3 from './app/App3';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

const rootElement: any = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App3 />
    </Provider>,
    rootElement
);
