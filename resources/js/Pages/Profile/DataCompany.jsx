import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import { Head, Link, usePage } from '@inertiajs/react';
import LayoutPerusahaan from '@/Layouts/LayoutPerusahaan';


export default function DataCompany({ auth, mustVerifyEmail, status }) {
    // const users = usePage().props.auth.user;

    return (
        <LayoutPerusahaan
            auth={auth}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />
            <div className='flex flex-row justify-between py-5'>
                <div className="mx-auto sm:px-6 lg:px-8 space-y-2">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                        
                    </div>
                    <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>

                <div className='sm:px-6 lg:px-8 space-y-5 w-full'>
                    <div className="card mb-3 bg-white shadow sm:rounded-lg">
                        <figure>
                            <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                Data Perusahaan
                                <Link
                                    href={route("profile.dataDiri.edit")}
                                // data={{ id_dataDiri: aplicant_id }}
                                >
                                    <button className='btn btn-warning btn-sm text-xs'>
                                        Update Data Diri
                                    </button>
                                </Link>
                            </h1>
                        </figure>
                        <div className="card-body flex flex-row gap-10">
                            <div>
                                <img className='avatar rounded w-24' src="/img/jayandraLogo.png" alt="foto tegar" />
                            </div>
                            <table className='table '>
                                <tbody>
                                    <tr>
                                        <td className='font-bold'>PT Harmoni Mitra Jayandra</td>
                                    </tr>
                                </tbody>
                                <tbody >

                                    <tr>
                                        <td colSpan="3" className='text-sm text-justify w-full max-w-2xl'>Perusahaan yang bergerak di bidang Outsourcing</td>
                                    </tr>
                                    <tr className='text-xs h-7'>
                                        <td>Jakarta</td>
                                        <td>081-0098-987-98</td>
                                        <td>jayandra@gmail.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>

        </LayoutPerusahaan>
    );
}
