//https://67b9f6eb51192bd378def0c5.mockapi.io/contacts

import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchData",
  async (body, thunkApi) => {
    try {
      const { data } = await axios.get(
        "https://67b9f6eb51192bd378def0c5.mockapi.io/contacts"
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export default fetchContacts;
