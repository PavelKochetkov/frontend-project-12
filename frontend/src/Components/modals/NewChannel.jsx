import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useAddChannelMutation } from '../../api/chatApi.js';
import { changeChannel } from '../../store/slice/appSlice.js';

const NewChannel = (props) => {
  const inputRef = useRef(null);
  const {
    showModal, addChannelSchema, handleCloseModal, dispatch,
  } = props;
  const [addChannel] = useAddChannelMutation();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await addChannel({ name: values.name });
      const { id, name } = response.data;
      handleCloseModal();
      dispatch(changeChannel({ id, name }));
      toast.success('Канал создан');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={showModal === 'adding'} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={addChannelSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors, touched, isSubmitting,
          }) => (
            <Form>
              <Field
                name="name"
                className={errors.name && touched.name ? 'mb-2 form-control is-invalid' : 'mb-2 form-control'}
                innerRef={inputRef}
              />
              {errors.name && touched.name ? (
                <div className="invalid-feedback">{errors.name}</div>
              ) : null}
              <div className="d-flex justify-content-end">
                <div className="me-2">
                  <Button variant="secondary" onClick={handleCloseModal}>Отменить</Button>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  Отправить
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannel;