import { useState, FormEvent, ChangeEvent } from 'react'
import LocationsResultsCard from './LocationsResultsCard';

interface Location {
    id: number;
    name: string;
}

function LocationsSearch() {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Location[]>([]);


    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:3000/locations`);
          const data = await response.json();

            const lowercaseSearchQuery = searchQuery.toLowerCase();
            const filteredResults = data.filter((location: Location) =>
            location.name.toLowerCase().includes(lowercaseSearchQuery)
            );

        setSearchResults(filteredResults);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };

    return (
        <>
          <form onSubmit={handleSearchSubmit} className='profile'>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search locations"
            />
            <button type="submit">Search</button>
          </form>
            <ul>
                {searchResults.map((location) => (
                <LocationsResultsCard key={location.id} location={location} />
                ))}
            </ul>
        </>
      );
    };

export default LocationsSearch
