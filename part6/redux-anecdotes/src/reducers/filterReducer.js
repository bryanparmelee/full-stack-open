const filterReducer = (state = "", action) => {
  return action.type === "FILTER" ? action.payload : state;
};

export const filterChange = (filter) => {
  return {
    type: "FILTER",
    payload: filter,
  };
};

export default filterReducer;
