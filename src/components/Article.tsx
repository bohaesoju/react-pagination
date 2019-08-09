import * as React from 'react';

interface IArticle{
    article: any
}

export const Article = ({
        article
                        }: IArticle) => {
    return(
        <>
            { article &&
                <div className="articleWrap">
                    <div className="articleId">content #{article.id}</div>
                    <div className="articleTitle">{article.title}</div>
                    <div className="articleContent">{article.content}</div>
                    <div className="articleCreatedAt">작성일 : {article.createdAt.slice(0, 10)}</div>
                </div>
            }
        </>
    )
};
