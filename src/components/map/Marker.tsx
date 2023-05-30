interface MarkerProps {
    lat: number;
    lng: number;
    text: string;
  }

const Marker: React.FC<MarkerProps> = ({text}) => (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        width: '20px',
        height: '20px',
        background: 'red',
        borderRadius: '50%',
      }}
    >
      {text}
    </div>
  );

  export default Marker
  