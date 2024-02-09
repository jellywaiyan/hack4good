import { firestore } from "../firebaseSetup";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import firebase from "firebase/compat/app";

function UserOpportunitiesPage({ user }) {
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

  async function registerForOpportunity(opportunity) {
    try {
      const userDoc = await firestore.collection("users").doc(user.uid).get();
      const userData = userDoc.data();

      await firestore
        .collection("opportunities")
        .doc(opportunity.id)
        .update({
          volunteers: firebase.firestore.FieldValue.arrayUnion(userData),
        });

      await firestore
        .collection("users")
        .doc(user.uid)
        .update({
          events: firebase.firestore.FieldValue.arrayUnion(opportunity),
        });

      console.log("Registered successfully!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container fluid">
      <div className="container flex flex-wrap justify-between">
        {opportunities.map((opportunity) => (
          <Card
            className="w-[300px] m-4 h-[350px]"
            key={opportunity.id}
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
                    <CardDescription>
                      {opportunity.organisation}
                    </CardDescription>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">Register</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                    <DialogDescription>{opportunity.details}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <DialogTitle className="text-right">
                        Date and Time
                      </DialogTitle>
                      <DialogDescription>
                        {opportunity.frequency}
                      </DialogDescription>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => registerForOpportunity(opportunity)}
                      type="submit"
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* <Button>Register</Button> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserOpportunitiesPage;
