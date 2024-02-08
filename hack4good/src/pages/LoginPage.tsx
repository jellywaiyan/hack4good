import React, { useContext, useRef } from "react";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { auth } from "../firebaseSetup";
import { useNavigate, Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

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

  const signIn = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      navigate("/");
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
        <Form className="mt-4" onSubmit={signIn}>
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
            {/* <Col xs={6}>
              <Button onClick={createAccount} type="button">
                Sign Up
              </Button>
            </Col> */}
            <Col xs={6}>
              <Button type="submit">Sign In</Button>
            </Col>

            <p>
              Don't have an account yet?{" "}
              <Link to="/register">Click here to sign up!</Link>
            </p>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default LoginPage;
