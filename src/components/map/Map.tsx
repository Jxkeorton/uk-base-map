import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

interface MapProps {
    center: {lat: number, lng: number};
    zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  return (
    <div className='map' >
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA5YDarjMw4UAUSVCIrBX1PJwP14l9nqSg' }}
        defaultCenter={ center }
        defaultZoom={ zoom }
      >
        <LocationMarker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  )
}

Map.defaultProps = {
    center: {
        lat: 53.232842,
        lng: -1.587728
    },
    zoom: 7
}

export default Map
