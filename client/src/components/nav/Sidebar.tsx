import React, { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import DownwardChevron from "../../assets/DownwardChevron"
import { Transition } from "@headlessui/react"
import { useModal } from "../../context/ModalContext";

interface ISidebarProps {
    username: string,
    currentProgramId: string,
}

const dummyPrograms = [
    {
        name: "12345678901234567890",
        id: "id1"
    },
    {
        name: "program2",
        id: "id2"
    },
    {
        name: "program3",
        id: "id3"
    },
    {
        name: "program4",
        id: "id4"
    },
    {
        name: "program5",
        id: "id5"
    },
]

//TODO: keep sidebar content in place when app content overflows viewport height

const Sidebar = ({username, currentProgramId}: ISidebarProps) => {
    const {state, dispatch} = useModal()
    const [open, setOpen] = useState(false)

    return (
        <div className="min-h-screen w-3/12 max-w-xxs space-y-6 p-3 bg-gray-100 shadow-lg">
            <div className="text-center">
                <span className="text-xl font-extrabold block">Periodized</span>
                <span className="text-lg font-semibold block break-words">{username}</span>
            </div>
            <nav>
                <ul className="space-y-2 text-sm">
                    <NavLink className="flex items-center space-x-3 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline" to="/workout">
                        <span className="text-gray-600">icon</span>
                        <span>Log Workout</span>
                    </NavLink>
                    <NavLink className="flex items-center space-x-3 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline break-words" to={`/programs/${currentProgramId}`}>
                        <span className="text-gray-600">icon</span>
                        <span>Current Program</span>
                    </NavLink>
                    <div className="flex flex-col p-2 rounded-md font-medium ">
                        <div className="flex">
                            <span className="text-left">Programs</span>
                        </div>
                        <div className="flex flex-col p-2 font-sm text-gray-600">
                            {dummyPrograms && 
                                dummyPrograms.slice(0, 3).map((program) => (
                                    <NavLink to={`/programs/${program.id}`} key={program.id} className="hover:bg-gray-200 rounded-md p-2 focus:shadow-outline break-words">
                                        {program.name}
                                    </NavLink>
                                ))
                            }
                            <Transition 
                                show={open}
                                enter="transition ease-in duration-100 origin-top transform"
                                enterFrom="scale-y-0"
                                enterTo="scale-y-100"
                                leave="transition-height ease-in-out duration-100"
                                leaveFrom="h-20"
                                leaveTo="h-0"
                            >
                            <div className={`w-full flex flex-col font-sm text-gray-600 first:pt-0 `}>
                                {dummyPrograms.length > 2 &&
                                    dummyPrograms.slice(3).map((program) => (
                                        <NavLink to={`/programs/${program.id}`} key={program.id} className="hover:bg-gray-200 rounded-md p-2 focus:shadow-outline break-words">
                                            {program.name}
                                        </NavLink>
                                    ))
                                }
                            </div>
                            </Transition>
                                <button className={`transition transform duration-300 ${open ? 'rotate-180' : ''} hover:scale-125 text-gray-400 text-lg mx-auto`} onClick={() => setOpen(!open)}>
                                    <DownwardChevron />
                                </button>
                                <span className="text-xs rounded-md mt-2 text-gray-400 p-2 cursor-pointer transition transform hover:scale-110" onClick={() => dispatch({type: 'open', payload: 'newprogram'})}>&#43; Create new Program</span>
                        </div>
                    </div>
                    <NavLink className="flex items-center space-x-3 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline break-words" to={`/history`}>
                    <span className="text-gray-600">icon</span>
                    <span>Workout History</span>
                    </NavLink>
                    <NavLink className="flex items-center space-x-3 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline break-words" to={`/statistics`}>
                        <span className="text-gray-600">icon</span>
                        <span>Statistics</span>
                    </NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;