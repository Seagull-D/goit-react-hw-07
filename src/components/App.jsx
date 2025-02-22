import { useEffect } from "react";
import { toggleFormVisibility } from "../redux/visibleSlice";
import "./App.css";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contactsOps";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contactsList = useSelector((state) => state.contacts.contacts.items);
  const isFormVisible = useSelector((state) => state.visible.isFormVisible);

  const toggleForm = () => {
    dispatch(toggleFormVisibility(), [dispatch]);
  };

  return (
    <div className="appStyle">
      <h1>Телефонна книга</h1>
      {contactsList.length > 1 && <SearchBox />}
      {isFormVisible ? (
        <ContactForm closeForm={toggleForm} />
      ) : (
        <button className="toggleFormBtn" onClick={toggleForm}>
          Додати контакт
        </button>
      )}
      <ContactList closeForm={toggleForm} />
    </div>
  );
};

export default App;
