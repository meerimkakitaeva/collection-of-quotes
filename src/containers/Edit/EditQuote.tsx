import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {TNewQuote} from "../../types";
import axiosApi from "../../axiosApi";
import EditForm from "./EditForm";
import Spinner from "../../components/Spinner/Spinner";

const EditQuote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quote, setQuote] = useState<TNewQuote | null>(null);

    const fetchData = useCallback(async (id: string) => {
        try {
            const response = await axiosApi.get<TNewQuote>(`/quotes/${id}.json`);
            setQuote(response.data);
        } finally {

        }
    }, []);

    useEffect(() => {
       if (id) {
           void fetchData(id);
       }
    },[fetchData, id]);

    const updateQuote = async (data: TNewQuote) => {
      try {
          await axiosApi.put(`/quotes/${id}.json`, data);
          navigate('/');
      }  finally {
         alert("Цитата изменена")
      }
    };

    return (
        <div>
            {quote ?
                <EditForm editPost={quote} onSubmit={updateQuote} /> :
                <Spinner />
            }
        </div>
    );
};

export default EditQuote;