import { useEffect } from "react";
import { toggleFormVisibility } from "../redux/visibleSlice";
import "./App.css";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contactsOps";
import { selectError, selectLoading } from "../redux/contactsSlice";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isFormVisible = useSelector((state) => state.visible.isFormVisible);
  const loader = useSelector(selectLoading);
  const error = useSelector(selectError);
  const toggleForm = () => {
    dispatch(toggleFormVisibility(), [dispatch]);
  };

  return (
    <div className="appStyle">
      <h1>Телефонна книга</h1>
      {error && <ErrorMessage />}
      <SearchBox />
      {isFormVisible ? (
        <ContactForm closeForm={toggleForm} />
      ) : (
        <button className="toggleFormBtn" onClick={toggleForm}>
          Додати контакт
        </button>
      )}
      {loader && <Loader />}
      <ContactList closeForm={toggleForm} />
    </div>
  );
};

export default App;
