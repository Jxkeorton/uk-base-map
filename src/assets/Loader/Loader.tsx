import spinner from './Ripple-1s-200px.gif'

const Loader = () => {
  return (
    <div className='loader'>
      <img src={spinner} alt='loading' />
      <h1>Fetching Data</h1>
    </div>
  )
}

export default Loader
