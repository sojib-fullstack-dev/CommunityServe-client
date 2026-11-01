'use client';

import { IEvents } from "../type/type";



const JoinButton = ({ event }: { event: IEvents }) => {

    const handleJoinSubmit = () => {
          console.log('Join button clicked for event:', event);
    }

    return (
        <div>

            <button
                type="button"
                className="mt-8 h-12 w-full rounded-lg bg-[#008C45] text-base font-bold text-white sm:w-auto sm:px-10 cursor=pointer hover:bg-[#006B32] transition-colors duration-300 cursor-pointer"
                onClick={handleJoinSubmit}
            >
                Join Event
            </button>
        </div>
    );
};

export default JoinButton;