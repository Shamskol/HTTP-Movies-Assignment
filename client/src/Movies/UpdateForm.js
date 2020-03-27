import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateForm = props => {
  // ********** get the params and history objects ********** //
  const { id } = useParams();
  const { push } = useHistory();
  // ********** get the params and history objects ********** //

  const [item, setItem] = useState(initialItem);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  // ********** Find the item and set it to state ********** //
  // get the id from params
  // loop through the items list to find the item
  // set the item to state to pre-populate the form\
  useEffect(() => {
    const itemToUpdate = props.items.find(e => `${e.id}` === id);
    if (itemToUpdate) {
      setItem(itemToUpdate);
    }
  }, [props.items, id]);
  // ********** Find the item and set it to state ********** //

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item

    // ********** Make the put request ********** //
    axios.put("/api/movies/:id")
        .then( res => console.log(res))
        .catch(err => console.log(err))
  
  };
    // ********** Make the put request ********** //
  

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          onChange={changeHandler}
          placeholder="id"
          value={item.id}
        />
        <div className="baseline" />

        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={item.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );

  }
export default UpdateForm;
