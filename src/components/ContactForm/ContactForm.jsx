import s from "./ContactForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";

const ContactForm = ({ closeForm }) => {
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
    const newConatc = {
      name: values.name,
      number: values.phone,
    };
    dispatch(addContact(newConatc));
    actions.resetForm();
    closeForm();
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
