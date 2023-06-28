import MountainIcon from "./icon";

interface MarkerProps {
    lat: number;
    lng: number;
    text: string;
    onClick: (ev: { name: string, coordinates: [number, number] }) => void;
    highlighted: any;
  }

const Marker: React.FC<MarkerProps> = ({onClick, highlighted}) => (
    <div 
      onClick={onClick}
      className={`custom-marker ${highlighted ? 'highlighted' : ''}`}
    >
      <MountainIcon />
    </div>
  );

  export default Marker
  