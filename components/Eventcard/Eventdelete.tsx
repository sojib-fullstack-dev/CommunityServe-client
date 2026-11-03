'use client'

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { IEvents } from "@/components/type/type";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";



const Eventdelete = ({ event }: { event: IEvents }) => {
  const router = useRouter();

  const handleDelete = async () => {

      const { data:TokenData, error } = await authClient.token()
               const token=TokenData?.token
    try {
      const res = await fetch(`http://localhost:5000/create-event/${event._id}`, {
        method: "DELETE" ,
        headers:{
          authorization: `Bearer ${token}`
        },
      }
     );

      if (res.ok) {
        toast.success("Event deleted successfully!");
        router.push("/events");
        router.refresh();
      } else {
        toast.error("Failed to delete event");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div >

      <AlertDialog>
        <AlertDialogTrigger render={<Button
          type="button"
          size="sm"
          variant="destructive"
          aria-label="Delete event"
          title="Delete event"
         
        >
          <Trash2 />
          Delete Event
        </Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} variant="destructive"  className="cursor-pointer">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



    </div>
  );
};

export default Eventdelete;