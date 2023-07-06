import { useState, FormEvent, ChangeEvent } from 'react'
import LocationsResultsCard from './LocationsResultsCard';
import { PacmanLoader } from 'react-spinners';
import { apiUrl } from '../../../env';

interface Location {
    id: number;
    name: string;
}

function LocationsSearch() {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);


    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            setLoading(true);

            const response = await fetch(apiUrl);
            const allData = await response.json();
            const data = allData.locations

            const lowercaseSearchQuery = searchQuery.toLowerCase();
            const filteredResults = data.filter((location: Location) =>
            location.name.toLowerCase().includes(lowercaseSearchQuery)
            ).slice(0, 5);;

        setSearchResults(filteredResults);
        setSearchQuery('')
        setLoading(false);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setLoading(false)
        }
      };

      const override: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      };

    return (
        <>
          <form onSubmit={handleSearchSubmit} className='searchBar'>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search locations"
            />
            <button type="submit">Search</button>
          </form>
            {loading ? (
                <PacmanLoader color="black" cssOverride={override} />
            ) : (
                <div className='resultsList'>
                    <ul>
                        {searchResults.map((location) => (
                            <LocationsResultsCard key={location.id} location={location} />
                        ))}
                    </ul>
                </div>
            )}
        </>
      );
    };

export default LocationsSearch
