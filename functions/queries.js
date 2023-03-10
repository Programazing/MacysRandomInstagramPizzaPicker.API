const MENUS_QUERY = `
  query MENUS($input: MenusInput!) {
    menusV3(input: $input) {
      ... on MenusResponse {
        menus {
          id
          name
          groups {
            guid
            name
            description
            items {
              description
              guid
              name
              outOfStock
              price
              imageUrl
              calories
              itemGroupGuid
              unitOfMeasure
              usesFractionalQuantity
              masterId
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      ... on GeneralError {
        code
        message
        __typename
      }
      __typename
    }
  }
`;

module.exports = {
  MENUS_QUERY,
};
