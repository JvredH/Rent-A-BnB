import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spotsReducer";

const SpotDetails = () => {
  let {spotId} = useParams()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const spot = useSelector(state => state.spots[spotId])
  // console.log('spot ====> ', spot)


  useEffect(() => {
    dispatch(getOneSpot(spotId)).then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  return(
    <>
      {isLoaded && (
        <div>
          <div>
            <h1>{spot.name}</h1>
          </div>
          <div>
            <h3>ratings/ location / crud operations on the right</h3>
          </div>
          <div>
            <img alt='' src={`${spot.SpotImages[0].url}`}/>
          </div>
        </div>
      )}
    </>
  )
}

export default SpotDetails;
