import { firestore } from "@/firebaseSetup";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function HomePage({ user }) {
  const [opportunities, setOpportunities] = useState<any[]>([]);

  useEffect(() => {
    const opportunitiesRef = firestore.collection("opportunities");

    const unsubscribe = opportunitiesRef.onSnapshot((snapshot) => {
      const opportunitiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOpportunities(opportunitiesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(opportunities);

  return (
    <div className="container fluid">
      {/* <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
        <Navbar.Brand href="#home">
          <img
          src='./src/assets/BAHLogo.jpg'
          width="50"
          height="50"
          className="d-inline-block align-center"
          />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-na">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Volunteer Preferences</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                User Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div className="container flex flex-wrap justify-between">
        {opportunities.map((opportunity) => (
          <Card
            className="w-[300px] m-4 h-[350px]"
            // style={{ backgroundColor: "#FAF9F6" }}
          >
            <CardHeader>
              <CardTitle>{opportunity.event}</CardTitle>
              <CardDescription>{opportunity.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Organisation:</Label>
                    <CardDescription>{opportunity.location}</CardDescription>
                  </div>
                  <div className="flex-wrap items-center">
                    <Label htmlFor="framework">Target Group(s):</Label>
                    {opportunity.target.map((target) => (
                      <Badge className="w-[100px] m-1" variant="secondary">
                        {target}
                      </Badge>
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Cancel</Button> */}
              <Button>Register</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
