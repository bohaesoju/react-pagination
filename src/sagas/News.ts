import { put, all, call, fork, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    NEWS_REQUEST,
    NEWS_SUCCESS,
    NEWS_FAILURE
} from "../reducers/News";

function fetchAPI(args: any){
    return axios.get('https://koreanjson.com/posts')
}

function* fetchNews(action: any){
    try{
        const result = yield call(fetchAPI, action.data);
        yield put({
            type: NEWS_SUCCESS,
            data: result.data
        });
    } catch(e){
        console.error(e);
        yield put({
            type: NEWS_FAILURE,
            message: e.message
        });
    }
}

function* watchFetch(){
    yield takeEvery(NEWS_REQUEST, fetchNews);
}

export default function* userSaga(){
    yield all([
        fork(watchFetch),
    ]);
}
