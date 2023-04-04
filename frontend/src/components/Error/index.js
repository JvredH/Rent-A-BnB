import './error.css'
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='main-error-container'>
      <h1>Oops, the page you are looking for does not exist</h1>
      <NavLink className='home-btn' to='/'>Home</NavLink>
    </div>
  )
}

export default ErrorPage;
