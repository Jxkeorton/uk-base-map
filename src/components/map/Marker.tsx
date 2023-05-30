import MountainIcon from "./icon";

interface MarkerProps {
    lat: number;
    lng: number;
    text: string;
    onClick: (ev: { name: string, coordinates: [number, number] }) => void;
  }

const Marker: React.FC<MarkerProps> = ({onClick}) => (
    <div 
      onClick={onClick}
      className="custom-marker"
    >
      <MountainIcon />
    </div>
  );

  export default Marker
  