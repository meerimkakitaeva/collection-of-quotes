import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {INewQuote} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";
import {CATEGORIES} from "../../constants";

const Add = () => {
    const [quote, setQuote] = useState<INewQuote>({
        author: '',
        text: '',
        category: '',
        id: '',
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const quoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setQuote((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (quote.text && quote.author && quote.category) {
            const selectedCategory = CATEGORIES.find((category) => category.id === quote.category);
            const data: INewQuote = {
                author: quote.author,
                text: quote.text,
                category: selectedCategory?.id!,
                id: quote.id,
            };

            try {
                await axiosApi.post('/quotes.json', data);
            } finally {
                setLoading(false);
                navigate('/');
            }
        } else {
            alert('Пожалуйста, заполните все поля');
            setLoading(false);
        }
    };

    let form = (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    className="form-control"
                    value={quote.category}
                    onChange={quoteChange}
                >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input
                    id="author"
                    type="text"
                    name="author"
                    className="form-control"
                    value={quote.author}
                    onChange={quoteChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="text">Quote:</label>
                <textarea
                    id="text"
                    name="text"
                    className="form-control"
                    value={quote.text}
                    onChange={quoteChange}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                Save
            </button>
        </form>
    );

    if (loading) {
        form = <Spinner />;
    }

    return (
        <div className="posts-container row mt-2">
            <div className="col">{form}</div>
        </div>
    );
};

export default Add;