import { createSlice } from "@reduxjs/toolkit";
import fetchContacts from "./contactsOps";

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    isError: false,
  },
};

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    deleteContac: (state, action) => {
      state.contacts.items = state.contacts.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
    addContact: (state, action) => {
      state.contacts.items.push(action.payload);
    },

    setIsError: (state, action) => {
      state.contacts.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(fetchContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
      });
  },
});

export const contactsReducer = slice.reducer;
export const { deleteContac, addContact, fetchAll, setIsError, setIsLoading } =
  slice.actions;
