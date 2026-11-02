'use client';

import { authClient } from "@/lib/auth-client";
import { IEvents } from "../type/type";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



const JoinButton = ({ event }: { event: IEvents }) => {

    const [loading, setLoading] = useState(false);
    const [joined, setJoined] = useState(false);
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const checkJoinedStatus = async () => {
            if (!user?.email) {
                setChecking(false);
                return;
            }

            try {
                const res = await fetch(
                    `http://localhost:5000/join-event/${encodeURIComponent(user.email)}`,
                    { cache: "no-store" }
                );

                if (res.ok) {
                    const joinedEvents = await res.json();
                    const alreadyJoined = Array.isArray(joinedEvents)
                        && joinedEvents.some((item) => item.eventId === event._id);
                    setJoined(alreadyJoined);
                }
            } catch (error) {
                console.error("Joined event check failed:", error);
            } finally {
                setChecking(false);
            }
        };

        checkJoinedStatus();
    }, [user?.email, event._id]);

    const handleJoinSubmit = async () => {
        if (!user) {
            toast.error("Please login to join this event!")
            return;
        }

        if (joined) {
            toast.info("You have already joined this event.");
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
                setJoined(true);
                router.refresh();
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
                className="mt-8 inline-flex h-12 w-full shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-lg bg-[#008C45] px-6 text-base font-bold text-white transition-colors duration-300 hover:bg-[#006B32] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[150px]"
                disabled={loading || checking || joined}
                onClick={handleJoinSubmit}
            >
                <UserPlus className="size-5 shrink-0" aria-hidden="true" />
   
                {loading ? "Joining..." : checking ? "Checking..." : joined ? "Joined" : "Join Event"}
            </button>
        </div>
    );
};

export default JoinButton;