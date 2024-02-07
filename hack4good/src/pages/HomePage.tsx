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
    <div>
      {opportunities.map((opportunity) => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{opportunity.event}</CardTitle>
            <CardDescription>{opportunity.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Location</Label>
                  <CardDescription>{opportunity.location}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Target Group(s):</Label>
                  {opportunity.target.map((target) => (
                    <Badge className="w-[100px]" variant="secondary">
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
  );
}

export default HomePage;
