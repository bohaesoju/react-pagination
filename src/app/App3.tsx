import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import '../styles/style.scss';
import { NEWS_REQUEST } from "../reducers/News";
import { Tabs, Contents, Buttons, Article } from '../components'

const App3 = () => {
    const [allContents, setAllContents] = React.useState([]);
    const [currentCategory, setCurrentCategory] = React.useState('정치');
    const [currentContent, setCurrentContent] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [contentPerPage, setContentPerPage] = React.useState(5);
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
        setCurrentContent(data.filter(content => content.UserId === 1)
            .slice(0, contentPerPage));
        const firstArticle = allContents.filter((article: any) => article.id === 1);
        // setArticle(firstArticle[0]);
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
                    setCurrentPage(1);
                    setCurrentContent(pagedContents(1))
                } else {
                    setCurrentPage(currentPage + 1);
                    setCurrentContent(pagedContents(currentPage + 1))
                }
                break;
        }
    };

    const initFirstArticle = () => {
        const firstArticle = allContents.filter((article: any) => article.id === 1);
        setArticle(firstArticle[0])
    } ;

    const clickArticle = (e: number) => {
        const articleContent = allContents.filter((article: any) => article.id === e);
        // console.log('articleContent : ', articleContent[0])
        return(
            setArticle(articleContent[0])
        )
        // console.log('article : ', article)
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

export default App3;
