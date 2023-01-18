import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spotsReducer';
import SpotCards from '../SpotsCards';
import './Spots.css'


const Spots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots)
  let spots = Object.values(spotsObj)


  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch])


  return (
    <div className='Spots-main-div'>
      {spots.map(spot => <SpotCards spot={spot} key={spot.id}/>)}
    </div>
  )
}

export default Spots;
