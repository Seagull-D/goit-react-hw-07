import s from "./ContactForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";

const ContactForm = () => {
  const contacts = useSelector((state) => state.contacts.contacts.items);
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    phone: "",
  };
  const onlyLaters = /^[A-Za-zА-Яа-яЇїІіЄєҐґ'’\s]+$/;
  const phoneValidation = /^\+?\d{9,15}$/;
  const applySchema = Yup.object().shape({
    name: Yup.string()
      .required("поле обов'язкове")
      .min(3, "мінімум 3 символи")
      .max(20, "максимум 20 символів")
      .matches(onlyLaters, "введіть літери!"),
    phone: Yup.string()
      .matches(phoneValidation, "Невірний формат номера телефону")
      .required("поле обов'язкове"),
  });
  const handleSubmit = (values, actions) => {
    const isCopy = contacts.some(
      (contact) =>
        contact.name.toLowerCase().trim() ===
          values.name.toLowerCase().trim() && contact.phone === values.phone
    );

    if (isCopy) {
      //setErrorMessage("Контакт із таким ім'ям або номером телефону вже існує.");
      actions.setSubmitting(false);
      return;
    }
    const newConatc = {
      name: values.name,
      phone: values.phone,
      id: crypto.randomUUID(),
    };
    dispatch(addContact(newConatc));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={applySchema}
    >
      <Form>
        <div className={s.formStyle}>
          <label className={s.labelText}>
            <p>Ім'я</p>
            <Field type="text" name="name" placeholder="Введіть ім'я" />
            <ErrorMessage
              className={s.errorMessage}
              name="name"
              component="p"
            />
          </label>
          <label className={s.labelText}>
            <p>Телефон</p>
            <Field
              type="text"
              name="phone"
              placeholder="Введіть номер телефону +30"
            />
            <ErrorMessage
              className={s.errorMessage}
              name="phone"
              component="p"
            />
          </label>
          <button className={s.submitBtn} type="submit">
            Зберегти
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
