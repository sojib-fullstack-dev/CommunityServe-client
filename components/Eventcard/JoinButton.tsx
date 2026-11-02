'use client';

import { authClient } from "@/lib/auth-client";
import { IEvents } from "../type/type";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";



const JoinButton = ({ event }: { event: IEvents }) => {

    const [loading, setLoading] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;
    //    console.log(user)

    const handleJoinSubmit = async () => {
        if (!user) {
            toast.error("Please login to join this event!")
            return;
        }
            setLoading(true); 

        const { _id, ...eventDataWithoutId } = event;

        const data = {
            ...eventDataWithoutId,
            eventId: _id,
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            userImage: user?.image,

        }
        // console.log('Join button clicked for event:', data);
        try {
            const res = await fetch('http://localhost:5000/join-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const jointRes = await res.json();

            if (res.ok) {
               toast.success("Successfully joined the event!");
            } else {
               toast.error(jointRes.message || "Something went wrong!");            }
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Failed to connect to the server.");
        } finally {
            setLoading(false); 
        }
    }
    

    return (
        <div>

            <button
                type="button"
                className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#008C45] text-base font-bold text-white sm:w-auto sm:px-10 hover:bg-[#006B32] transition-colors duration-300 cursor-pointer"
                disabled={loading}
                onClick={handleJoinSubmit}
            >
                <UserPlus className="size-5 shrink-0" aria-hidden="true" />
   
                {loading ? "Joining..." : "Join Event"}
            </button>
        </div>
    );
};

export default JoinButton;