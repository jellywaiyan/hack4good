import React, { useContext, useRef } from "react";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { auth } from "../firebaseSetup";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import GuestNavBar from "@/components/ui/guestnavbar";

function LoginPage() {
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
      navigate("/wlc");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <GuestNavBar/>
      <Container style={{ maxWidth: "500px"}} fluid>
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
              <Button type="submit"
              style={{margin: "20px 0"}}
              >Sign In</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default LoginPage;
