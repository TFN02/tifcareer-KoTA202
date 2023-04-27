import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link, usePage } from '@inertiajs/react';
import LayoutPelamar from '@/Layouts/LayoutPelamar';

export default function DataCompany({ auth, mustVerifyEmail, status }) {
    const users = usePage().props.auth.user;

    return (
        <LayoutPelamar
            auth={auth}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className='flex flex-row justify-between py-12'>
                <div className="mx-auto sm:px-6 lg:px-8 space-y-2">
                    <button className="p-5 bg-indigo-800 text-white hover:bg-slate-500 hover:text-white shadow shadow-md w-full rounded-lg font-medium">
                        Update Data Kamu Disini !
                    </button>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>

                <div className='sm:px-6 lg:px-8 space-y-5 w-full'>
                    <div className="card bg-white shadow sm:rounded-lg">
                        <figure><h1 className='text-lg text-white bg-violet-700 w-full p-5'>Data Perusahaan</h1></figure>
                        <div className="card-body">
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure><h1 className='text-md text-white bg-violet-700 w-full p-3'>Tentang Perusahaan</h1></figure>
                                <div className="card-body flex flex-row gap-10">
                                    <img className='avatar rounded w-24' src="img/jayandraLogo.png" alt="foto tegar" />
                                    <table>
                                        <tr>
                                            <td className='font-bold'>{users.name}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className='text-md text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, eveniet. Unde cumque mollitia tenetur eaque nobis rem asperiores sit dolorem cupiditate </td>
                                            
                                        </tr>
                                        {/* <tr><td>&nbsp;</td></tr> */}
                                        <tr className='text-xs h-7'>
                                            <td >087801941144</td>
                                            <td>{users.email}</td>
                                            <td>Kota Bandung</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            {/* <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure><h1 className='text-md text-white bg-violet-700 w-full p-3'>Pengalaman Kerja</h1></figure>
                                <div className="card-body flex flex-row gap-10">                                    
                                    <table>
                                        <th>
                                            <td className='font-bold'>Front End Developer</td>
                                        </th>
                                        <tr>
                                            <td className='text-md text-justify pr-10'>PT Padepokan Tujuh Sembilan</td>
                                            <td className='pr-10'>Februari 2021 - Februari 2022</td>
                                            <td className='text-sm'><Link>Update</Link> | <Link>Delete</Link></td>
                                            
                                        </tr>
                                    </table>
                                    
                                </div>
                            </div> */}
                            {/* <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure><h1 className='text-md text-white bg-violet-700 w-full p-3'>Riwayat Pendidikan</h1></figure>
                                <div className="card-body flex flex-row gap-10">                                    
                                    <table>
                                        <th>
                                            <td className='font-bold'>D3 Teknik Informatika</td>
                                        </th>
                                        <tr>
                                            <td className='text-md text-justify pr-10'>Politeknik Negeri Bandung</td>
                                            <td className='pr-10'>September 2020 - Now</td>
                                            <td className='text-sm'><Link>Update</Link> | <Link>Delete</Link></td>
                                            
                                        </tr>
                                    </table>
                                    
                                </div>
                            </div> */}
                            {/* <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure><h1 className='text-md text-white bg-violet-700 w-full p-3'>Hardskill</h1></figure>
                                <div className="card-body flex flex-row gap-3">                                    
                                <div className="badge badge-lg">React JS</div>
                                <div className="badge badge-lg">Laravel</div>
                                <div className="badge badge-lg">MySQL</div>
                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure><h1 className='text-md text-white bg-violet-700 w-full p-3'>Bidang Ketertarikan</h1></figure>
                                <div className="card-body flex flex-row gap-3">                                    
                                <div className="badge badge-md">Front End Developer</div>
                                <div className="badge badge-md">Front End Engineer</div>   
                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure><h1 className='text-md text-white bg-violet-700 w-full p-3'>Softskill</h1></figure>
                                <div className="card-body flex flex-row gap-3">                                    
                                <div className="badge badge-md">Public Speaking</div>
                                <div className="badge badge-md">Team Work</div>   
                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure><h1 className='text-md text-white bg-violet-700 w-full p-3'>Sertifikat</h1></figure>
                                <div className="card-body flex flex-row">                                    
                                    <table>
                                        <tr>
                                            <td  className='font-bold text-left'>Master React Js</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            
                                        </tr>
                                        <tr>
                                            <td className='text-md'>Udemy</td>
                                            <td className='text-center pl-10'>September 2020 - Now</td>
                                            <td className='text-center pl-10'>Update | Delete</td>
                                            
                                        </tr>
                                    </table>
                                    
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div> */}
                </div>

            </div>
        </LayoutPelamar>
    );
}
