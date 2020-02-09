import React from 'react';

import Planets from './components/Planets';

function App() {
  return (
    <div className='App'>
      <Planets perPage={10} />
    </div>
  );
}

export default App;
