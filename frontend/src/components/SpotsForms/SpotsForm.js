import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk, editSpotThunk } from "../../store/spotsReducer";
import { useHistory} from "react-router-dom";
import './SpotsForm.css'

const SpotsForm = ({spot, formType}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const sessionUser = useSelector(state => state.session)
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [url, setUrl] = useState(spot.url)
  const [errors, setErrors] = useState([]);



  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([])
    spot = {...spot, address, city, state, country, name, description, price, url}

    const spotToCreate = {
      address,
      city,
      state,
      country,
      lat: 50.1234567,
      lng: 50.1234567,
      name,
      description,
      price,
    }

    const newSpotImage = {
      url,
      preview: true
    }

    if (formType === 'Edit Spot') {
      return await dispatch(editSpotThunk(spotToCreate, spot.id))
        .then(() => history.push(`/spots/${spot.id}`))
        .catch(
          async (res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
          }
        )
    }

    if(formType === 'Create Spot') {
      return await dispatch(createSpotThunk(spotToCreate, newSpotImage))
        .then(res => history.push(`/spots/${res.id}`))
        .catch(
          async (res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
          }
        )
    }
  }

  //  const imgInput = {imgLabel: <label>Image URL of Spot<input type='url' value={url} onChange={(e) => setUrl(e.target.value)}/></label>}

  return (
    <div className='create-spot-form-container'>
      <form onSubmit={handleSubmit} className='spotForm'>
        <h2>{formType}</h2>
        <ul className='errors'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Address
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Country
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}>
              Description of spot...
          </textarea>
        </label>
        <label>
          Price
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
        </label>
        {/* {formType !== 'Create Spot' ? null : imgInput.imgLabel} */}
        <label>
          Image URL of Spot
          <input
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type='submit'>
          submit/edit spot
        </button>
      </form>
    </div>
  );
}

export default SpotsForm;
