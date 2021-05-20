import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import styles from '../../css/SubmitModal.module.css';
import {selectUserData} from "../../reducers/getUserData";

export function CreateTournament() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const ownerData = useSelector(selectUserData);
  const ownerName = ownerData['first_name'] + ' ' + ownerData['family_name'];

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (!form.noEnd.checked && form.endDate.value === '') {
      form.endDate.setAttribute("required", true);
      form.noEnd.setAttribute("required", true);
    } else if (form.noEnd.checked) {
      form.endDate.removeAttribute("required");
    } else if (form.endDate.value !== '') {
      form.noEnd.removeAttribute("required");
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log(form.tourName.value);
      console.log(form.owner.value);
      console.log(form.startDate.value);
      console.log(form.endDate.value);
      console.log(form.noEnd.checked);

      setValidated(false);
      handleClose();
    }
    setValidated(true);
  };

  return (
    <div>
      <Button className={styles.createTournament} variant="primary" onClick={() => {setShow(true); setValidated(false);}}>
        Skapa turnering
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skapa en turnering</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Turneringens namn:</Form.Label>
              <Form.Control name="tourName" type="input" placeholder="Min turnering" required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ägare:</Form.Label>
              <Form.Control name="owner" placeholder={ ownerName } readOnly />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Startdatum:</Form.Label>
                <Form.Control name="startDate" type="date" required/>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Slutdatum:</Form.Label>
                <Form.Control name="endDate" type="date" required/>
                <Form.Check name="noEnd" type="checkbox" label="Tillsvidare" required/>
              </Form.Group>
            </Form.Row>

            <Form.Row id="form-submit">
              <Form.Group className={styles.submitArea}>
                <Button variant="primary" type="submit">
                  Skapa turnering
                </Button>
              </Form.Group>

              <Form.Group className={styles.submitButtons}>
                <Button variant="secondary" onClick={handleClose}>
                  Avbryt
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
