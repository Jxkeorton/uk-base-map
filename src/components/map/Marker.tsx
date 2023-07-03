import MountainIcon from "./icon";

interface MarkerProps {
  lat: number;
  lng: number;
  text: string;
  onClick: (ev: { name: string, coordinates: [number, number] }) => void;
  highlighted: boolean;
  isSaved: boolean;
}

const Marker: React.FC<MarkerProps> = ({onClick, highlighted, isSaved}) => (
    <div 
      onClick={() => onClick({ name: "", coordinates: [0, 0] })}
      className={`custom-marker ${isSaved ? 'saved' : ''} ${highlighted ? 'highlighted' : ''}`}
    >
      <MountainIcon />
    </div>
  );

  export default Marker
  