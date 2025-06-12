import { Formik, Field, Form, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { normalizePhoneNumber } from '../../utils';
import { memo, useId } from 'react';

import style from './ContactForm.module.css';
import type { Contact } from '../../types';

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (contact: Contact) => void;
  onCancel: () => void;
}

export const ContactForm = memo(
  ({ contact = null, onSubmit, onCancel }: ContactFormProps) => {
    const nameFieldId = useId();
    const numberFieldId = useId();

    const initialValues = {
      name: '',
      number: '',
      ...contact,
    };

    const handleSubmit = (values: Contact, actions: FormikHelpers<Contact>) => {
      onSubmit(values);
      actions.resetForm();
    };

    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .min(3, 'Name must be at least 5 characters long')
        .max(50, 'Name must be 20 characters or less')
        .required('Required'),
      number: Yup.string()
        .transform(value => {
          return normalizePhoneNumber(value);
        })
        .matches(
          /^\+?[0-9]+$/,
          'Phone number can contain only numbers, white space'
        )
        .min(3, 'Number must be at least 5 characters long')
        .max(50, 'Number must be 20 characters or less')
        .required('Required'),
    });
    return (
      <div className={style.modal}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className={style.container}>
            <div className={style.fieldWrap}>
              <label htmlFor={nameFieldId}>Name</label>
              <Field id={nameFieldId} name="name" className={style.formField} />
              <ErrorMessage
                name="name"
                component="span"
                className={style.errorMessage}
              />
            </div>
            <div className={style.fieldWrap}>
              <label htmlFor={numberFieldId}>Number</label>
              <Field
                id={numberFieldId}
                name="number"
                className={style.formField}
              />
              <ErrorMessage
                name="number"
                component="span"
                className={style.errorMessage}
              />
            </div>
            <div className={style.controls}>
              <button type="submit" className={style.button}>
                Add Contact
              </button>
              <button onClick={onCancel} className={style.button}>
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
);
