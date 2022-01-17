import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET_WARD } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

const Sweeper = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');
  const [err, setErr] = useState('');
  const saveBtn = Auth.loggedIn ? 'SAVE' : 'LOG IN TO SAVE YOUR RESULTS';

  //WARD FORM USEQUERY
  const { loading, data } = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = data?.getWard || [];

  //WARD FORM SUBMIT
  const wardNumberSubmit = async (event, i) => {
    event.preventDefault();

    if (wardNumber.current.value.length == 2 && wardNumber.current.value > 50) {
      setErr('Please enter a valid Chicago Zipcode or Ward Number (1-50)');
      return false;
    }

    //TODO- CHECK ZIPCODE VAL

    setWard(wardNumber.current.value);

    // if (!wardInfo.length) {
    //   setErr('Please enter a valid Chicago Zipcode or Ward Number (1-50)');
    // }

    setErr('');
    return true;
  };

  return (
    <div className='sweeper-wrapper'>
      <div className='sweeper-form-wrapper'>
        <div className='zip-form-wrapper'>
          <form
            onSubmit={(event) => wardNumberSubmit(event)}
            className='zipform-wrapper'
          >
            <input
              ref={wardNumber}
              name='wardNumber'
              placeholder='Enter your Ward Number or Zipcode!'
              className='zipform-input'
            />
            <button
              type='submit'
              className='zipform-input zipform-btn'
            >
              Find your schedule!
            </button>
            <p className='error-msg'>{err}</p>
          </form>
        </div>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className='sweeper-data-output-wrapper'>
          {
            wardInfo.map((info, index) => {
              return (
                <div className='sweeper-data-output' key={index}>
                  <h4>Month: {info.month_name}</h4>
                  <h3>Dates: {info.dates}</h3>
                  <h2>Ward: {info.ward}</h2>
                  <button className='login-btn save-btn'>{saveBtn}</button>
                </div>
              )
            })
          }
        </div>
      )}
    </div >
  );
};

export default Sweeper;