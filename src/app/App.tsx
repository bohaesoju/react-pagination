import * as React from 'react';
import { useEffect } from "react";
import '../styles/style.scss';
import { Tabs, Contents, Buttons } from '../components'
import { useDispatch, useSelector } from "react-redux";
import { NEWS_REQUEST } from "../reducers/News";

export const App = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [articlesPerPage, setArticlesPerPage] = React.useState(5);
    const [isFetch, setIsFetch] = React.useState(false);
    const { isFetchNews } = useSelector((state: any) => state.News);
    const { data } = useSelector((state: any) => state.News);
    console.log( isFetchNews );
    console.log( data );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: NEWS_REQUEST
        });
    }, []);
    return (
        <div className="App">
            {isFetchNews}
            <Tabs />
            <Contents />
            <Buttons />
        </div>
    )
};
