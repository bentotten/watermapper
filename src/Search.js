import { useState } from "react";

// URL to Game of Thrones API to fetch all characters
let url = 'https://thronesapi.com/api/v2/Characters';

export default function Search(props) {

    const [character, setCharacter] = useState(null);
    const [search, setSearch] = useState('');

    const getCharacter = async function (event) {
        event.preventDefault()
        const axios = require('axios');

        try {
            let response = await axios.get(url)
            console.log(response.data)

            // Split First and Last name
            let name = search.split(" ")
            let found = response.data.filter(function (entry) { return entry.firstName === name[0] })

            console.log(found)
            setCharacter(response.data[found[0].id])
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(event) {
        setSearch(event.target.value);
    }

    return (
        <div className="m-2">
            <h2>Search</h2>
            <br />
            <form onSubmit={getCharacter}>
                <label className='form-label' htmlFor='item'>Type First Name to Search &nbsp;</label>

                <input type='text' id='item' placeholder='Search' onChange={handleChange} /> &nbsp;
                <input className='btn btn-primary' type='submit' value='Submit' />
            </form>

            {character &&
                <div>
                    <h2>{character.firstName} {character.lastName}</h2>
                    <p>{character.house}</p>
                    <img src={character.imageUrl} alt={character.firstName + ' ' + character.lastName}></img>
                </div>
            }
        </div>
    );
}