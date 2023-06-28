
interface Location {
  id: number;
  name: string;
}

interface Props {
  location: Location;
}

const LocationsResultsCard: React.FC<Props> = ({ location }) => {
  return (
    <div>
      {location.name}
    </div>
  );
};

export default LocationsResultsCard;