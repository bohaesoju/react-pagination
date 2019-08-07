import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import '../styles/style.scss';
import { NEWS_REQUEST } from "../reducers/News";
import { Tabs, Contents, Buttons } from '../components'
import { useCallback } from "react";

const App2 = () => {
    const [allContents, setAllContents] = React.useState([]);
    const [currentCategory, setCurrentCategory] = React.useState('정치');
    const [currentContent, setCurrentContent] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [contentPerPage, setContentPerPage] = React.useState(5);
    const { categories, data, isFetchNews } = useSelector(state => state.News);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if(!isFetchNews){
            dispatch({
                type: NEWS_REQUEST,
            });
        }
        setAllContents(data);
        setCurrentContent(data.filter(content => content.UserId === 1)
            .slice(0, contentPerPage))
    }, [data]);

    const changeCurrentCategory = useCallback((e) => {
        const category = categories.find(category => category.name === e);
        return (
            setCurrentCategory(category.name),
            setCurrentContent(allContents.filter(e => e.UserId === category.id)
                .slice(0, contentPerPage))
        )
    });

    const loadMoreContents = useCallback((e) => {
        const currentCategoryId = categories.find(category =>
            category.name === currentCategory
        ).id;

        const currentCategoryContents = allContents.filter(
            content => content.UserId === currentCategoryId
        );

        const pagedContents = page => {
            const lastIndex = page * contentPerPage;
            const firstIndex = lastIndex - contentPerPage;
            return currentCategoryContents.slice(firstIndex, lastIndex);
        };

        const getLastPage = () => {
            return (
                Math.floor(currentCategoryContents.length / contentPerPage)
            )
        };

        switch(e){
            case 'prev':
                if(currentPage === 1){
                    setCurrentPage(getLastPage());
                    setCurrentContent(pagedContents(getLastPage()))
                } else {
                    setCurrentPage(currentPage - 1);
                    setCurrentContent(pagedContents(currentPage - 1))
                }
                break;
            case 'next':
                if(currentPage === getLastPage()){
                    // return {
                    setCurrentPage(1);
                    setCurrentContent(pagedContents(1))
                    // }
                } else {
                    setCurrentPage(currentPage + 1);
                    setCurrentContent(pagedContents(currentPage + 1))
                }
                break;
            default: null;
        }
    });

    return(
        <div className="App">
            <Tabs categories={ categories } changeCurrentCategory = { changeCurrentCategory } />
            <Contents currentContent = { currentContent } />
            <Buttons loadMoreContents = { loadMoreContents } />
        </div>
    )
};

export default App2;
