interface Locations {
    info: any;
  }


const InfoBox: React.FC<Locations>  = ({ info }) => {
  return (
    <div className="infoBox" >
      <h2>Location</h2>
      <ul>
        <li>TITLE: <strong>{ info.name }</strong></li>
        <li>COORDINATES: <strong>{ info.coordinates[0] }, {info.coordinates[1]}</strong></li>
      </ul>
      <button>SAVE</button>
    </div>
  )
}

export default InfoBox
