import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [userdata, setUserdata] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if( !res.ok ) {
                        throw Error('denied to fetch the data from that resource');
                    }
                    return res.json();
                })
                .then((data) => {
                    setUserdata(data);
                    setIsPending(false);
                    setFetchError(null);
                })
                .catch((err) => {
                    setFetchError(err.message);
                    setIsPending(false);
                })
        }, 1000);
    }, [url]);

    return { userdata, isPending, fetchError }
}
export default useFetch;