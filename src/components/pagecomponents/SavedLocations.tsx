import { Link } from 'react-router-dom'

interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
  rockdrop: string;
}

interface Props {
  data: Location[];
  onDelete: (id: number) => void;
}


const SavedLocations: React.FC<Props> = ({ data, onDelete }) => {

  return (
    
      <div className='location-cards'>
        {data.map((locationData: Location) =>(
          <div key={locationData.id} className='card'>
            <Link to={`/location/${locationData.id}`} className='locationLink' >
              <div>
                <h3>{locationData.name}</h3>
                <p>Coordinates: {locationData.coordinates.join(', ')}</p>
              </div>
            </Link>
            <button onClick={() => onDelete(locationData.id)} className='cardButton'><p>Unsave</p></button>
          </div>
        ))}
      </div>
    
    
  );
}

export default SavedLocations
