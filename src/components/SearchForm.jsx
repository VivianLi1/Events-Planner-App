import { useState } from "react";

import '../Form.css';

export default function SearchForm({handleSearch}){
    const [formData, setFormData] = useState({
        query: "",
        city: "",
        startDate: "",
        endDate: ""
    });

    const handleChange = (event) =>{
        setFormData((prevFormData) => {
            return{
                ...prevFormData,
                [event.target.id]: event.target.value 
            }
        })
    }

    const handleSumbit = (event) =>{
        event.preventDefault()
        //console.log(formData)
        handleSearch(formData);
    }


    return (
        <div className="form">
        <form onSubmit={handleSumbit}>
            <label><p>what are you looking for?</p></label>
            <input 
                type="text" 
                id="query"
                onChange={handleChange}
                value={formData.query}
            />
            <div className="form--row2">
                <div className="city">
                    <label><p>city</p></label>
                    <input 
                        type="text" 
                        id="city"
                        onChange={handleChange}
                        value={formData.city}
                    />
                </div>
                <div className="start">
                    <label><p>from</p></label>
                    <input 
                        type="date" 
                        id="startDate"
                        onChange={handleChange}
                        value={formData.startDate}
                    />
                </div>
                <div>
                    <label><p>to</p></label>
                    <input 
                        type="date" 
                        id="endDate"
                        onChange={handleChange}
                        value={formData.endDate}
                    />
                </div>
            </div>
            <button className="searchButton">search <i className="fas fa-search"></i></button>
        </form>
        </div>
    )
}