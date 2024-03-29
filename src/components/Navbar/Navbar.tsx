
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface NavbarProps {
    title?: string;
}

export const Navbar = ({ ...props }: NavbarProps) => {

    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between md:block rounded">

                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex items-baseline btn" onClick={() => navigate(`/`)}>
                                <p className="text-3xl font-bold italic">Kwaski</p>
                                <p className="flex items-baseline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="6 -7.1 12 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className=" text-blue-500 items"><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" fill="currentColor" stroke-width="0"></path></svg>
                                </p>
                                <p className="text-xl font-semibold">tech</p>
                            </div>

                        </div>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <div className="flex items-center justify-center">
                            <ul className="items-center justify-center space-y-4 md:flex md:space-x-6 md:space-y-0">
                                <li className="text-gray-600 hover:text-blue-600">
                                    <a href="javascript:void(0)">Home</a>
                                </li>
                                <li className="text-gray-600 hover:text-blue-600">
                                    <a href="javascript:void(0)">About</a>
                                </li>
                                <li className="text-gray-600 hover:text-blue-600">
                                    <a href="javascript:void(0)">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

    // <nav className="bg-gray-800 lg:block">
    //     <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    // <div className="relative flex h-16 items-center justify-between">

    //     <div className="flex text-white items-baseline btn" onClick={() => navigate(`/`)}>
    //         <p className="text-3xl font-bold italic">Kwaski</p>
    //         <p className="flex items-baseline">
    //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="6 -7.1 12 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className=" text-blue-500 items"><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" fill="currentColor" stroke-width="0"></path></svg>
    //         </p>
    //         <p className="text-xl font-semibold">tech</p>
    //     </div>

    // </div>
    //     </div>

    // </nav>
}