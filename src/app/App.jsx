import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { newsRequest } from '../reducers/News';
import { rootState } from '../reducers';
import { Tabs, Contents, Buttons } from '../components'
import '../styles/style.scss';

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
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                currentContent: this.props.News.data
            });
        }, 1000)
    }

    render(){
        return (
            <div className="App">
                <Tabs />
                <Contents />
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
