import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  domains: [],
};

const domainsSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {
    setDomains: (state, action) => {
      state.domains = action.payload;
    },
  },
});

export const { setDomains } = domainsSlice.actions;
export default domainsSlice.reducer;
