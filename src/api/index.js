import gql from 'graphql-tag';

export const GET_PLANETS_COUNT_INFO = gql`
  {
    allPlanets {
      totalCount
    }
  }
`;

export const GET_PAGINATED_PLANETS_LIST = gql`
  query allPlanets($first: Int, $last: Int) {
    allPlanets(first: $first, last: $last) {
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
      planets {
        name
        id
      }
    }
  }
`;

export const GET_PLANET_DETAILS = gql`
  query planet($id: ID!) {
    planet(id: $id) {
      id
      name
      gravity
      population
      diameter
      climates
      terrains
    }
  }
`;
