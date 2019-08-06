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
    constructor(props){
        super(props);
        this.props.onNewsRequest();
        this.state = {
            allContents: [],
            currentCategory: '정치',
            currentContent: [],
            currentPage: 1,
        };
        this.contentPerPage = 5;
        this.categories = [
            {
                id: 1,
                name: '정치'
            },
            {
                id: 2,
                name: '경제'
            },
            {
                id: 3,
                name: '사회'
            }
        ];
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                allContents: this.props.News.data,
                currentContent: this.props.News.data.filter(content => content.UserId === 1)
                    .slice(0, this.contentPerPage)
            });
        }, 1000)
    }

    changeCurrentCategory = userSelectedCategory => {
        const { allContents } = this.state;
        const category = this.categories.find(category =>
            category.name === userSelectedCategory
        );
        this.setState({
            currentCategory: category.name,
            currentContent: allContents
                .filter(post => post.UserId === category.id)
                .slice(0, this.contentPerPage),
            currentPage: 1
        })
    };

    render(){
        return (
            <div className="App">
                <Tabs
                    categories={ this.categories }
                    currentCategory={ this.state.currentCategory }
                    changeCurrentCategory = { this.changeCurrentCategory }
                />
                <Contents contents={ this.state.currentContent } />
                <Buttons />
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
