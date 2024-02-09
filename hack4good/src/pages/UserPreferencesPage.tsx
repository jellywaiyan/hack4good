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
import { useNavigate } from "react-router-dom";

function UserPreferencesPage({ user }) {
  const [interests, setInterests] = useState("");
  const [experiences, setExperiences] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const navigate = useNavigate();

  const toggleGroup = (group: string) => {
    setSelectedGroups((prevGroups) =>
      prevGroups.includes(group)
        ? prevGroups.filter((g) => g !== group)
        : [...prevGroups, group]
    );
  };

  async function savePreferences(e) {
    e.preventDefault();
    try {
      const interestsArray = interests
        .split(",")
        .map((interest) => interest.trim());

      await firestore.collection("users").doc(user.uid).update({
        "preferences.experience": experiences,
        "preferences.interests": interestsArray,
        "preferences.target": selectedGroups,
      });
      navigate("/");
      console.log("Preferences saved successfully!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card-container">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Fill in your preferences here!</CardTitle>
          <CardDescription>Let us know more about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={savePreferences}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">
                  Select your target volunteer group(s):
                </Label>
                <Button
                  variant={
                    selectedGroups.includes("Children") ? "primary" : "light"
                  }
                  onClick={() => toggleGroup("Children")}
                  className="m-1"
                >
                  Children
                </Button>
                <Button
                  variant={
                    selectedGroups.includes("Youth") ? "primary" : "light"
                  }
                  onClick={() => toggleGroup("Youth")}
                  className="m-1"
                >
                  Youth
                </Button>
                <Button
                  variant={
                    selectedGroups.includes("Elderly") ? "primary" : "light"
                  }
                  onClick={() => toggleGroup("Elderly")}
                  className="m-1"
                >
                  Elderly
                </Button>
                <Button
                  variant={
                    selectedGroups.includes("Disabled") ? "primary" : "light"
                  }
                  onClick={() => toggleGroup("Disabled")}
                  className="m-1"
                >
                  Disabled
                </Button>
                <Button
                  variant={
                    selectedGroups.includes("Low-income") ? "primary" : "light"
                  }
                  onClick={() => toggleGroup("Low-income")}
                  className="m-1"
                >
                  Low-income
                </Button>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Interests:</Label>
                <Textarea
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Eg. cooking, baking, tutoring"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Past experiences:</Label>
                <Textarea
                  id="experiences"
                  value={experiences}
                  onChange={(e) => setExperiences(e.target.value)}
                  placeholder="Eg. Volunteered at old folks home"
                />
              </div>
            </div>
            <button type="submit" style={{ display: "none" }}></button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button> */}
          <Button onClick={savePreferences}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserPreferencesPage;
