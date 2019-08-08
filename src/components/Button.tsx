import * as React from 'react';

interface IButtons{
    loadMoreContents(e: string): void
}

export const Buttons = ({
                            loadMoreContents
                                 }: IButtons) => {
    return (
        <div className="mt-3">
            <button
                className="btn btn-outline-dark btn-lm mr-2"
                onClick={() => loadMoreContents('prev')}
            >
                <i className="fas fa-angle-left" />
            </button>
            <button
                className="btn btn-outline-dark btn-lm"
                onClick={() => loadMoreContents('next')}
            >
                <i className="fas fa-angle-right" />
            </button>
        </div>
    )
};
