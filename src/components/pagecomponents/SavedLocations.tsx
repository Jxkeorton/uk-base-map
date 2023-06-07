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
    
      <>
        {data.map((locationData: Location) =>(
          <Link to={`/location/${locationData.id}`} className='locationLink' >
            <div key={locationData.id} className='card' >
              <h3>{locationData.name}</h3>
              <p>Coordinates: {locationData.coordinates.join(', ')}</p>
              <button onClick={() => onDelete(locationData.id)} className='infoBox-button-unsave'><p>Unsave</p></button>
            </div>
          </Link>
        ))}
      </>
    
    
  );
}

export default SavedLocations
