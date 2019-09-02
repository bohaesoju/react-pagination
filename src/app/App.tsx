import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import '../styles/style.scss';
import { NEWS_REQUEST } from "../reducers/News";
import { Tabs, Contents, Buttons, Article } from '../components'

const CONSTANTS = {
    FIRST_PAGE: 1,
    PREV: 'prev',
    NEXT: 'next',
    SET_CURRENT_PAGE: 1,
    TOTAL_ROW_COUNT: 5
}
const App = () => {
    const [allContents, setAllContents] = React.useState([]);
    const [currentCategory, setCurrentCategory] = React.useState('정치');
    const [currentContent, setCurrentContent] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(CONSTANTS.SET_CURRENT_PAGE);
    const [contentPerPage, setContentPerPage] = React.useState(CONSTANTS.TOTAL_ROW_COUNT);
    const [article, setArticle] = React.useState(allContents[0]);
    const { categories, data, isFetchNews } = useSelector((state: any) => state.News);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if(!isFetchNews){
            dispatch({
                type: NEWS_REQUEST,
            });
        }
        setAllContents(data);
        setCurrentContent(data.filter(content => content.UserId === CONSTANTS.FIRST_PAGE)
            .slice(0, contentPerPage));
        setArticle(data[0]);

    }, [data]);

    const changeCurrentCategory = ((e: string) => {
        const category = categories.find(category => category.name === e);
        return (
            setCurrentCategory(category.name),
                setCurrentContent(allContents.filter((e: any) => e.UserId === category.id)
                    .slice(0, contentPerPage))
        )
    });

    const loadMoreContents = (e: string) => {
        const currentCategoryId = categories.find(category =>
            category.name === currentCategory
        ).id;

        const currentCategoryContents = allContents.filter(
            (content: any) => content.UserId === currentCategoryId
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
        // const setCurrentFeatureType1 = (index: number) => {
        //     return {
        //         a: () => {
        //             setCurrentPage(currentPage + index);
        //             setCurrentContent(pagedContents(currentPage + index))
        //         },
        //         b: () => {
        //             setCurrentPage(typeof f === 'number' ? f : f());
        //             setCurrentContent(pagedContents(typeof f === 'number' ? f : f()))
        //         }
        //     }
        // }

        const setCurrentFeatureType1 = (index: number) => {
            setCurrentPage(currentPage + index);
            setCurrentContent(pagedContents(currentPage + index))
        }
        const setCurrentFeatureType2 = (f: any) => {
            setCurrentPage(typeof f === 'number' ? f : f());
            setCurrentContent(pagedContents(typeof f === 'number' ? f : f()))
        }
        const prevAction = () => {
            currentPage === CONSTANTS.FIRST_PAGE ?
                setCurrentFeatureType2(getLastPage) :
                setCurrentFeatureType1(-1);
        };
        const nextAction = () => {
            currentPage === getLastPage() ?
                setCurrentFeatureType2(1) :
                setCurrentFeatureType1(1);
        };
        const featureAction = (actionType: string) => {
            return {
                [CONSTANTS.PREV]: prevAction(),
                [CONSTANTS.NEXT]: nextAction()
            }
        };
        featureAction(CONSTANTS.PREV);
        featureAction(CONSTANTS.NEXT);
    };

    const clickArticle = (e: number) => {
        const articleContent = allContents.filter((article: any) => article.id === e);
        return(
            setArticle(articleContent[0])
        )
    };

    return(
        <div className="App">
            <div className="categoryContainer">
                <Tabs categories={ categories } currentCategory={ currentCategory } changeCurrentCategory = { changeCurrentCategory } />
                <Contents currentContent = { currentContent } clickArticle = { clickArticle } />
                <Buttons loadMoreContents = { loadMoreContents } />
            </div>
            <div className="articleContainer">
                <Article article = { article } />
            </div>
        </div>
    )
};

export default App;
