import React, { useRef, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');
  const [variant, setVariant] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_q2ebzhh', 'template_fitzo4o', form.current, {
        publicKey: '8Y8mijfAsd_l9PrQW',
      })
      .then(
        () => {
          setVariant('success');
          setStatusMessage('Your message has been sent successfully!');
          form.current.reset();
        },
        (error) => {
          setVariant('danger');
          setStatusMessage(`Failed to send the message: ${error.text}`);
        }
      );
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>Contact Us</h2>
          {statusMessage && <Alert variant={variant}>{statusMessage}</Alert>}
          <Form ref={form} onSubmit={sendEmail}>
            <Form.Group controlId="user_name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="user_name" required />
            </Form.Group>

            <Form.Group controlId="user_email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="user_email" required />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} name="message" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
