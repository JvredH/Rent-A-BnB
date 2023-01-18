import SpotsForm from "./SpotsForm";

const CreateSpot = () => {
  const spot = {
    address: '',
    city: '',
    state: '',
    country: '',
    name: '',
    description: '',
    price: '',
    url: '',
  }

  return (
    <SpotsForm spot={spot} formType='Create Spot' />
  );
}

export default CreateSpot;
