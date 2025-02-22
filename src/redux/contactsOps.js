//https://67b9f6eb51192bd378def0c5.mockapi.io/contacts

import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
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

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `https://67b9f6eb51192bd378def0c5.mockapi.io/contacts/${id}`
      );
      console.log(data);
      return data.id;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkApi) => {
    try {
      const { data } = await axios.post(
        `https://67b9f6eb51192bd378def0c5.mockapi.io/contacts`,
        body
      );
      return data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
