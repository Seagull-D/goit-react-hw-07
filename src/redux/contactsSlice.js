import { createSlice } from "@reduxjs/toolkit";
import { deleteContact, fetchContacts } from "./contactsOps";

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
    addContact: (state, action) => {
      state.contacts.items.push(action.payload);
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
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.isError = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload
        );
      });
  },
});

export const contactsReducer = slice.reducer;
export const { addContact, fetchAll, setIsError, setIsLoading } = slice.actions;
