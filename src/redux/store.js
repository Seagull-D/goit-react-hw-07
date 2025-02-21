import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import visibleReducer from "./visibleSlice";
import { filterReducer } from "./filtersSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    visible: visibleReducer,
    filters: filterReducer,
  },
});
