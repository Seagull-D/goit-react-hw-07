import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const contactsList = useSelector(selectFilteredContacts);

  if (contactsList.length === 0) {
    return <p>Список контактів порожній.</p>;
  }

  return (
    <div className={s.contactsList}>
      {contactsList.map((contact) => (
        <Contact key={contact.id} contactItem={contact} />
      ))}
    </div>
  );
};

export default ContactList;
