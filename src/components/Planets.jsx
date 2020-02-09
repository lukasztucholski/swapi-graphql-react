import React, { useState, useCallback, useEffect } from 'react';
import Query from './Query';
import styles from './Planets.module.css';

import {
  GET_PLANETS_COUNT_INFO,
  GET_PAGINATED_PLANETS_LIST,
  GET_PLANET_DETAILS,
} from '../api';

function Planets({ perPage }) {
  const [page, setPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [activePlanet, setActivePlanet] = useState(null);

  const incrementPage = () => setPage(page + perPage);
  const decrementPage = () => setPage(page - perPage);

  const changeActivePlanet = useCallback(data => setActivePlanet(data), []);

  return (
    <div>
      <h1> The List of Planets from Star Wars: </h1>
      <Query
        query={GET_PAGINATED_PLANETS_LIST}
        variables={{ first: page, last: perPage }}
        callback={data => (
          <ol>
            {data.allPlanets.planets.map(planet => (
              <div key={planet.id}>
                <li onClick={() => changeActivePlanet(planet.id)}>
                  <span
                    style={{
                      cursor: 'pointer',
                      fontWeight:
                        activePlanet === planet.id ? 'bold' : 'medium',
                    }}
                  >
                    {planet.name}
                  </span>
                </li>
              </div>
            ))}

            {activePlanet && (
              <Query
                query={GET_PLANET_DETAILS}
                variables={{ id: activePlanet }}
                callback={data => (
                  <div className={styles.details}>
                    <p>Planet: {data.planet.name.toUpperCase()}</p>
                    <p>Population: {data.planet.population || 'n/d'}</p>
                    <p>Diameter: {data.planet.diameter || 'n/d'}</p>
                    <p>Gravity: {data.planet.gravity.toUpperCase()}</p>
                    <p>
                      Climates:{' '}
                      {data.planet.climates.map(
                        climate => climate.toUpperCase() + ', '
                      )}
                    </p>
                    <p>
                      Terrains:{' '}
                      {data.planet.terrains.map(
                        terrain => terrain.toUpperCase() + ', '
                      )}
                    </p>
                  </div>
                )}
              />
            )}
          </ol>
        )}
      />

      <Query
        query={GET_PLANETS_COUNT_INFO}
        callback={data => {
          setTotalCount(data.allPlanets.totalCount);
          return <div>Total planets count: {totalCount}</div>;
        }}
      />

      <p>
        Page: {page / perPage} / {totalCount / perPage}
      </p>

      {page > perPage && <button onClick={decrementPage}>PREVIOUS PAGE</button>}

      {page < totalCount && <button onClick={incrementPage}>NEXT PAGE</button>}
    </div>
  );
}

export default Planets;
