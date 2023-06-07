
interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
  rockdrop: string;
}


const SavedLocations = ({ data, onDelete }) => {

  return (
    <div>
      {data.map((locationData: Location) =>(
        <div key={locationData.id} className='card' >
          <h3>{locationData.name}</h3>
          <p>Coordinates: {locationData.coordinates.join(', ')}</p>
          <button onClick={() => onDelete(locationData.id)} className='infoBox-button-unsave'><p>Unsave</p></button>
        </div>
      ))}
    </div>
  );
}

export default SavedLocations
