import React, { useContext, useRef } from "react";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { auth } from "../firebaseSetup";
import { useNavigate } from "react-router-dom";

function LoginPage({ user }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      await auth.createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <div>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand>Firebase Authentication</Navbar.Brand>
        {user && <Button onClick={signOut}>Sign Out</Button>}
      </Navbar>
      <Container style={{ maxWidth: "500px" }} fluid>
        <Form className="mt-4">
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control ref={emailRef} type="email" placeholder="email" />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passwordRef}
              type="password"
              placeholder="password"
            />
          </Form.Group>
          <Row>
            <Col xs={6}>
              <Button onClick={createAccount} type="button">
                Sign Up
              </Button>
            </Col>
            <Col xs={6}>
              <Button onClick={signIn} type="button" variant="secondary">
                Sign In
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default LoginPage;
