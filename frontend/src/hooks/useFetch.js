import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                const result = await res.json();
                setData(result.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [url, user?.token]);

    return {
        data,
        error,
        loading,
    };
};

export default useFetch;