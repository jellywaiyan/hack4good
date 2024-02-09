import { firestore } from "@/firebaseSetup";
import { useEffect, useState } from "react";
import { Button as DialogButton } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "react-bootstrap";

function AdminHomePage({ user }) {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [details, setDetails] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const toggleGroup = (group: string) => {
    setSelectedGroups((prevGroups) =>
      prevGroups.includes(group)
        ? prevGroups.filter((g) => g !== group)
        : [...prevGroups, group]
    );
  };

  const saveOpportunity = async () => {
    if (
      !event ||
      !date ||
      !organisation ||
      !details ||
      !frequency ||
      selectedGroups.length === 0
    ) {
      console.error("Please fill in all fields");
      return;
    }

    try {
      await firestore.collection("opportunities").add({
        event,
        date,
        organisation,
        details,
        frequency,
        target: selectedGroups,
        volunteers: [],
      });

      setEvent("");
      setDate("");
      setOrganisation("");
      setDetails("");
      setFrequency("");
      setSelectedGroups([]);
      console.log("Opportunity added successfully!");
    } catch (error) {
      console.error("Error adding opportunity:", error);
    }
  };

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

  // console.log(opportunities);

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <DialogButton variant="outline">Add opportunity</DialogButton>
          </DialogTrigger>
          <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle>Add volunteering opportunity</DialogTitle>
              <DialogDescription>
                Fill in the details regarding the volunteering opportunity
                below!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Volunteering event:
                </Label>
                <Input
                  id="name"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="col-span-3"
                  placeholder="Eg. Outing Support for Seniors"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Start date:
                </Label>
                <Input
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="col-span-3"
                  placeholder="Eg. 23/02/2024"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="organisation" className="text-right">
                  Organisation name:
                </Label>
                <Input
                  id="organisation"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  className="col-span-3"
                  placeholder="Eg. Big at Heart"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="details" className="text-right">
                  Details:
                </Label>
                <Textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="col-span-3"
                  placeholder="Eg. Seniors from Active Global will be going to ITE College Central for CNY celebration and will require volunteers to assist the staff in ensuring the seniors' safety."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="frequency" className="text-right">
                  Frequency:
                </Label>
                <Textarea
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="col-span-3"
                  placeholder="Eg. Seniors from Active Global will be going to ITE College Central for CNY celebration and will require volunteers to assist the staff in ensuring the seniors' safety."
                />
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">
                    Select volunteer event's target volunteer group(s):
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
                      selectedGroups.includes("Low-income")
                        ? "primary"
                        : "light"
                    }
                    onClick={() => toggleGroup("Low-income")}
                    className="m-1"
                  >
                    Low-income
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={saveOpportunity}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="container flex flex-wrap justify-between">
        {opportunities.map((opportunity) => (
          <Card
            className="w-[300px] m-4 h-[350px]"
            key={opportunity.id}
            //style={{ backgroundColor: "#FAF9F6" }}
          >
            <CardHeader>
              <CardTitle>{opportunity.event}</CardTitle>
              <CardDescription>Start date:</CardDescription>
              <CardDescription>{opportunity.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Organisation</Label>
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
            <CardFooter className="flex justify-center space-x-2">
              {/* <Button variant="outline">Cancel</Button> */}
              <Button>View Details</Button>
              <Button>Edit Opportunity</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default AdminHomePage;
