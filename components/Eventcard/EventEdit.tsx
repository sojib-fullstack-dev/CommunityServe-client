'use client'

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IEvents } from "@/components/type/type";
import { useState } from "react";

const EventEdit = ({ event }: { event: IEvents }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  

    const form = (e.currentTarget)
    const formData = new  FormData(form);
    
    const updatedData = {
      title: formData.get("title"),
      description: formData.get("description"),
      eventDate: formData.get("eventDate"),
     location: formData.get("location"),
    };

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/create-event/${event._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast.success("Event updated successfully!");
        setOpen(false);
        router.refresh(); 
      } else {
        const result = await res.json().catch(() => null);
        toast.error(result?.message || "Failed to update event");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button
          size="sm"
          variant="outline"
          className="border-[#008C45]/50 text-[#008C45] hover:bg-[#008C45]/10 hover:text-[#008C45] cursor-pointer"
          aria-label="Edit event"
          title="Edit event"
        >
          <Pencil />
          Edit Event
        </Button>
        } />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
                Make changes to your event here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <FieldGroup>
              <Field>
                <Label htmlFor={`title-${event._id}`}>Name</Label>
                <Input id={`title-${event._id}`} name="title" defaultValue={event.title} />
              </Field>
              <Field>
                <Label htmlFor={`description-${event._id}`}>Description</Label>
                <Input id={`description-${event._id}`} name="description" defaultValue={event.description} />
              </Field>
                 <Field>
                <Label htmlFor={`location-${event._id}`}>location</Label>
                <Input id={`location-${event._id}`} name="location" defaultValue={event.location} />
              </Field>
              <Field>
                <Label htmlFor={`eventDate-${event._id}`}>Event Date</Label>
                <Input id={`eventDate-${event._id}`} name="eventDate" type="date" defaultValue={event.eventDate} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  );
};

export default EventEdit;