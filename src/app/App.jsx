import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { newsRequest } from '../reducers/News';
import { rootState } from '../reducers';
import { Tabs, Contents, Buttons } from '../components'
import '../styles/style.scss';

// interface IProps {
//     onNewsRequest: typeof newsRequest
//     News: any
//     categories: any
// }

class App extends React.Component {

    state = {
        allContents: [],
        currentCategory: '정치',
        currentContent: [],
        currentPage: 1,
        contentPerPage : 5
    };

    componentDidMount() {
        this.props.onNewsRequest();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { News } = this.props;
        if(News !== prevProps.News){
            this.setState({
                allContents: News.data,
                currentContent: News.data.filter(content => content.UserId === 1)
                    .slice(0, this.state.contentPerPage)
            })
        }
    }

    changeCurrentCategory = userSelectedCategory => {
        const { allContents } = this.state;
        const { categories } = this.props.News;
        const category = categories.find(category =>
            category.name === userSelectedCategory
        );
        this.setState({
            currentCategory: category.name,
            currentContent: allContents
                .filter(post => post.UserId === category.id)
                .slice(0, this.state.contentPerPage),
            currentPage: 1
        })
    };

    loadMoreContents = direction => {
        const { allContents, currentCategory, contentPerPage } = this.state;
        const { categories } = this.props.News;

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

        switch(direction){
            case 'prev':
                this.setState(prevState => {
                    if(prevState.currentPage === 1){
                        return {
                            currentPage: getLastPage(),
                            currentContent: pagedContents(getLastPage())
                        };
                    } else {
                        return {
                            currentPage: prevState.currentPage - 1,
                            currentContent: pagedContents(prevState.currentPage - 1)
                        };
                    }
                });
                break;
            case 'next':
                this.setState(prevState => {
                    if(prevState.currentPage === getLastPage()){
                        return{
                            currentPage: 1,
                            currentContent: pagedContents(1)
                        };
                    } else {
                        return {
                            currentPage: prevState.currentPage + 1,
                            currentContent: pagedContents(prevState.currentPage + 1)
                        }
                    }
                })
        }
    };

    render(){
        const { categories } = this.props.News;
        return (
            <div className="App">
                <Tabs
                    categories={ categories }
                    currentCategory={ this.state.currentCategory }
                    changeCurrentCategory = { this.changeCurrentCategory }
                />
                <Contents contents={ this.state.currentContent } />
                <Buttons loadMoreContents={ this.loadMoreContents } />
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    onNewsRequest: () => dispatch(newsRequest())
});

const mapStateToProps = (rootState) => {
    return {
        News: rootState.News
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
