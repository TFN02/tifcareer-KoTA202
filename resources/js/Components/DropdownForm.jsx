import { Link } from "@inertiajs/react";

export default function DropdownForm({ children, children2, children3 }) {
    return (
        <div className="dropdown dropdown-end flex justify-end">

            <label tabIndex={2} className="bg-indigo-500 px-2 mb-3 flex flex-row gap-1 text-sm rounded-md text-white ">
                <div>
                    <svg
                        className="ml-1 mt-0.5 -mr-0.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {children3}</label>
            <ul tabIndex={0} className="dropdown-content menu text-white bg-sky-900 rounded-box w-22">
                <li><Link href='/register-pelamar'>{children}</Link></li>
                <li><Link href='/register-perusahaan'>{children2}</Link></li>
            </ul>
        </div>
    );
}