import MountainIcon from "./icon";

interface MarkerProps {
  lat: number;
  lng: number;
  text: string;
  onClick: (ev: { name: string, coordinates: [number, number] }) => void;
  highlighted: boolean;
}

const Marker: React.FC<MarkerProps> = ({onClick, highlighted}) => (
    <div 
      onClick={() => onClick({ name: "", coordinates: [0, 0] })}
      className={`custom-marker ${highlighted ? 'highlighted' : ''}`}
    >
      <MountainIcon />
    </div>
  );

  export default Marker
  