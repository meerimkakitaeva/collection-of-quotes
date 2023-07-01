import React, { useCallback, useEffect, useState } from 'react';
import { IApiQuote, IQuote } from '../../types';
import axiosApi from '../../axiosApi';
import QuotesItem from '../../components/QuotesItem/QuotesItem';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../constants';

const Quotes = () => {
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [category, setCategory] = useState<string | null>(null);

    const fetchData = useCallback(async (category?: string) => {
        try {
            let url = '/quotes.json';

            if (category !== 'all') {
                url = `/quotes.json?orderBy="category"&equalTo="${category}"`;
            }

            const response = await axiosApi.get<IApiQuote>(url);
            if (response.data) {
                const quotes = Object.keys(response.data).map((key) => {
                    return {
                        ...response.data[key],
                        id: key,
                    };
                });
                setQuotes(quotes);
            }
        } finally {
        }
    }, []);

    const onDelete = useCallback(async (id: string) => {
            try {
                await axiosApi.delete(`/quotes/${id}.json`);
            } finally {
                alert('Пост удален');
                void fetchData(category!);
            }
        }, [category, fetchData]);

    const getCategoryQuotes = useCallback((category: string) => {
            setCategory(category);
            void fetchData(category);
            }, [fetchData]);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    return (
        <div className="posts-container text-start mt-5">
            <div className="d-flex justify-content-between">
                <ul className="nav justify-content-start">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/"
                            onClick={() => getCategoryQuotes('all')}
                        >
                            All
                        </NavLink>
                    </li>
                    {CATEGORIES.map((category) => (
                        <li className="nav-item" key={category.id}>
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/"
                                onClick={() => getCategoryQuotes(category.id)}
                            >
                                {category.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <h4 className="category-title text-center m-3">
                {CATEGORIES.reduce((title, categoryItem) => (
                    categoryItem.id === category ? categoryItem.title : title
                ), '')}
            </h4>

            {quotes.length > 0 ? (
                quotes.map((quote) => (
                    <QuotesItem
                        author={quote.author}
                        text={quote.text}
                        key={quote.id}
                        id={quote.id}
                        onDelete={() => onDelete(quote.id!)}
                    />
                ))
            ) : (
                <div className="main-container text-center">
                    <p>No quotes</p>
                </div>
            )}
        </div>
    );
};

export default Quotes;