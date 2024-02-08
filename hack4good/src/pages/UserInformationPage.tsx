import { Button, Form } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { firestore } from "../firebaseSetup";
import { Input } from "@/components/ui/input";

function UserInformationPage({ user }) {
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  async function savePreferences(e) {
    e.preventDefault();
    try {
      await firestore.collection("users").doc(user.uid).update({
        "information.age": age,
        "information.name": name,
        "information.number": number,
      });

      console.log("Information saved successfully!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Fill in your information here!</CardTitle>
        <CardDescription>Let us know more about yourself</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={savePreferences}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Enter your name:</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Enter your age:</Label>
              <Input
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="21"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Enter your phone number:</Label>
              <Input
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="99998888"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button onClick={savePreferences}>Save</Button>
      </CardFooter>
    </Card>
  );
}

export default UserInformationPage;