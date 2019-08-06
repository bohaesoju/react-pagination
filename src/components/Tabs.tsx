import * as React from 'react';

interface IProps{
    categories: []
    currentCategory: string
    changeCurrentCategory(e: string): void
}

interface ICategory {
    id: number
    name: string
}

export const Tabs = ({
                          categories,
                          currentCategory,
                          changeCurrentCategory
                      }: IProps) => {
    return (
        <>
            <ul className="nav nav-pills nav-justified">
                {categories.map((category: ICategory) => {
                    let btnClassName;
                    category.name === currentCategory
                    ? (btnClassName = 'btn-primary')
                    : (btnClassName = 'btn-outline-primary');
                    return(
                        <li className="nav-item active p-1" key={category.id}>
                            <button
                                className={`btn ${btnClassName} btn-block`}
                                onMouseEnter={ () => changeCurrentCategory(category.name)}>
                                { category.name }
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
};
