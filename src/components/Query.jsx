import React from 'react';
import { useQuery } from '@apollo/react-hooks';

function Query(props) {
  const { data, loading, error } = useQuery(props.query, {
    variables: props.variables,
  });

  if (loading)
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '400px',
          color: '#bada55',
        }}
      >
        Loading...
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: 'center', marginTop: '400px' }}>
        <span style={{ color: 'red' }}>! ERROR ! </span>- {error.message}
      </div>
    );

  if (data) {
    return props.callback(data);
  }
}

export default Query;
