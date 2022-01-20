import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER_SNOW, MUTATION_DELETE_SNOW } from '../../utils/queries';

const SavedSnow = () => {
  const [userId, setUserId] = useState(localStorage.getItem('uuid'));
  const [updatedSnow, setUpdatedSnow] = useState();

  const { loading, data } = useQuery(QUERY_USER_SNOW, {
    variables: { user: userId },
    fetchPolicy: "network-only"
  });
  const [deleteSnow, { data: deletedSnowData, loading: deletedSnowLoading }] = useMutation(MUTATION_DELETE_SNOW)
  const userSnow = data?.getUserSnow || [];

  const handleDeleteSnow = (id) => {
    deleteSnow({ variables: { id } })
  }
  // setUpdatedSnow(userSnow);
  useEffect(() => {
    if (deletedSnowData) {
      alert("snow deleted")
    }
  }, [deletedSnowData])

  return (
    <>
      <div className='recent-search-wrapper'>
        <div className='recent-search-header'>
          <h1 className='recent-searches'>Saved Snow Searches</h1>
          <h1 className='recent-searches'>Recent Snow Searches</h1>
          {
            userSnow.map((singleSnow) => {
              return (
                <div className='sweeper-data-output' key={singleSnow._id}>
                  <span className='sweeper-date'>On {singleSnow.on_street}</span>
                  <span className='sweeper-ward'>From {singleSnow.from_stree}</span>
                  <span className='sweeper-ward'>To {singleSnow.to_street}</span>
                  <button className='login-btn save-btn' onClick={() => handleDeleteSnow(singleSnow._id)}>Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>


  )

}

export default SavedSnow