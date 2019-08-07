import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from './reducers';
import App2 from './app/App2.jsx';
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
        <App2 />
    </Provider>,
    rootElement
);
