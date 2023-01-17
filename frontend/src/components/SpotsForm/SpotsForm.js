const SpotsForm = () => {
  return (
    <form>
      <h2>title here</h2>
      <ul className='errors'></ul>
      <label>
        Address
        <input type='text' />
      </label>
      <label>
        City
        <input type='text'/>
      </label>
      <label>
        State
        <input />
      </label>
      <label>
        Country
        <input type='text' />
      </label>
      <label>
        Name
        <input type='text' />
      </label>
      <label>
        Description
        <textarea></textarea>
      </label>
      <label>
        Price
        <input type='number' />
      </label>
      <label>
        Image Of Spot
        <input type='url'/>
      </label>
      <button type='submit'>
        submit/edit spot
      </button>
    </form>
  );
}

export default SpotsForm;
