import { useNavigate } from 'react-router-dom';

interface Location {
  id: number;
  name: string;
}

interface Props {
  location: Location;
}

const LocationsResultsCard: React.FC<Props> = ({ location: { id, name } }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/location/${id}`);
  };

  return (
    <div className="searchResults" onClick={handleClick}>
      <h4>{name}</h4>
    </div>
  );
};

export default LocationsResultsCard;