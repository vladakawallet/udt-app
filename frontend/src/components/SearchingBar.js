import { Form } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import api from "../API"
import debounce from 'lodash.debounce'

const SearchingBar = ({ setResult, setFocus }) => {

    const [input, setInput] = useState('')

    const handleFocus = async () => {
        setFocus(true);
        const res = await api.get('http://localhost:8000/rooms/search');
        const data = res.data
        setResult(data.slice(0, 5))
    }

    const handleBlur = () => {

        setTimeout(() => {
            setFocus(false);
        }, 300);
    }

    const fetchQueryData = async (value) => {
        const response = await api.get('http://localhost:8000/rooms/search');
        const rooms = response.data
        const results = rooms.filter((room) => {
            return value && room && room.title && room.title.toLowerCase().startsWith(value.toLowerCase())
        })
        setResult(results)
        }
    
    const debouncedQuery = useMemo(
        () => debounce(fetchQueryData, 300)
      , []);

      const handleQuery = (value) => {
          setInput(value);
          debouncedQuery(value.trim());
          }

    useEffect(() => {
        return () => {
          debouncedQuery.cancel();
        }
    }, [debouncedQuery]);
    


    return (
    <Form className="input" method="get" action="rooms">
        <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" 
            placeholder="search..."
            name="search"
            autoComplete="off" value={input} onChange={(e) => handleQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}/>
    </Form>
    );
}
 
export default SearchingBar;