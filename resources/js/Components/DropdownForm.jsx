import { Link } from "@inertiajs/react";

export default function DropdownForm({ children, children2}) {
    return (
        <div className="dropdown dropdown-end flex justify-end">
            <label tabIndex={2} className="bg-indigo-500 w-20 py-1 text-center text-sm rounded-md text-white m-1">{children}</label>
            <ul tabIndex={0} className="dropdown-content menu text-white bg-sky-900 rounded-box w-22">
                <li><Link href='/register-pelamar'>{children}</Link></li>
                <li><Link href='/register-perusahaan'>{children2}</Link></li>
            </ul>
        </div>
    );
}