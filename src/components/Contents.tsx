import * as React from 'react';

interface IProps{
    contents: []
}

interface IContent{
    id: number
    title: string
}

export const Contents = ({
                             contents
                          }: IProps) => {
    return (
        <div className="list-group">
            {contents.map((content: IContent) => (
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
