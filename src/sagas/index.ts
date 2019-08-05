import { all, fork } from 'redux-saga/effects';
import news from './News';

export default function* rootSaga(){
    yield all([
        fork(news),
    ]);
}
