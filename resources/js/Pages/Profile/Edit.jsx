import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link } from '@inertiajs/react';
import LayoutPelamar from '@/Layouts/LayoutPelamar';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <LayoutPelamar
            auth={auth}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className='flex flex-row justify-between py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-2">
                    <Link href={route('profile.show')}>
                        <button className="p-5 bg-indigo-800 text-white hover:bg-slate-500 hover:text-white shadow shadow-md w-full rounded-lg font-medium">
                            Data Pelamar
                        </button>
                    </Link>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>

                <div className='sm:px-6 lg:px-8 space-y-2 w-full'>
                    <div className="card bg-white shadow sm:rounded-lg">
                        <figure><h1 className='text-lg bg-slate-200 w-full p-5'>Edit Data Pelamar</h1></figure>
                        <div className="card-body ">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-7xl"
                            />
                        </div>
                    </div>
                    <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>

            </div>
        </LayoutPelamar>
    );
}
