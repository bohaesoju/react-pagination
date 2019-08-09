import * as React from 'react';

interface IProps{
    currentContent: any
    clickArticle(e: number): void
}

interface IContent{
    id: number
    title: string
}

export const Contents = ({
                             currentContent,
                             clickArticle
                          }: IProps) => {
    return (
        <div className="list-group">
            {currentContent.map((content: IContent) => (
                <div
                    className="list-group-item list-group-item-action"
                    key={ content.id }
                    onClick={() => clickArticle( content.id )}
                >
                    <small>content #{content.id}</small>
                    <div className="mb-1">{ content.title }</div>
                </div>
            ))}
        </div>
    )
};
