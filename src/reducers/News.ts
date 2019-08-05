export const NEWS_REQUEST = 'NEWS_REQUEST';
export const NEWS_SUCCESS = 'NEWS_SUCCESS';
export const NEWS_FAILURE = 'NEWS_FAILURE';

export const newsRequest = () => {
    return {
        type: NEWS_REQUEST
    }
};

const initialState = {
    data: [],
    isFetchNews: false
};

const news = (state = initialState, action: any) => {
    switch(action.type){
        case NEWS_REQUEST:
            return {
                ...state,
                isFetchNews: false,
            };
        case NEWS_SUCCESS:
            return {
                ...state,
                data: action.data,
                isFetchNews: true,
            };
        case NEWS_REQUEST:
            return {
                ...state,
                isFetchNews: false,
            };
        default:
            return Object.assign({}, state);

    }
};

export default news;
