import * as React from 'react';

interface IProps{
    currentContent: any
}

interface IContent{
    id: number
    title: string
}

export const Contents = ({
                             currentContent
                          }: IProps) => {
    return (
        <div className="list-group">
            {currentContent.map((content: IContent) => (
                <div
                    className="list-group-item list-group-item-action"
                    key={ content.id }
                >
                    <small>content #{content.id}</small>
                    <div className="mb-1">{ content.title }</div>
                </div>
            ))}
        </div>
    )
};
