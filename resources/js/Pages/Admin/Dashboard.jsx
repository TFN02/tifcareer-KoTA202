import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
// import { useState } from 'react';
// import { MdSwitchAccount } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc';
import { BsBuildings } from 'react-icons/bs';
import { FaUserTie } from 'react-icons/fa';

export default function Dashboard({ auth, errors }) {

    // handleApprove = () => {

    // }

    // handleReject = () => {

    // }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Admin</h2>}
        >
            <Head title="Dashboard" />
            <div className='p-5'>
                <p className='m-5 text-2xl font-semibold'>Dashboard Admin</p>
                <div className='card bg-white m-5'>
                    <div className='card-body flex flex-col gap-y-3'>
                        <div className="stats shadow w-full">

                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <BsBuildings size={30} />
                                </div>
                                <div className="stat-title">Total Company Accounts</div>
                                <div className="stat-value">31K</div>
                                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                            </div>

                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <FaUserTie size={30} />
                                </div>
                                <div className="stat-title">Total Applicant Accounts</div>
                                <div className="stat-value">4,200</div>
                                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                            </div>

                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <VscAccount size={30} />
                                </div>
                                <div className="stat-title">Total Users</div>
                                <div className="stat-value">1,200</div>
                                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                            </div>

                        </div>
                        <div className='grid grid-cols-2 gap-x-5 py-5'>

                            <div className="card card-compact w-full bg-base-100 shadow-xl">
                                <figure><img src="/img/assets/company.svg" width={250} alt="Company" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Manage Company Accounts!</h2>
                                    <p>Atur hak akses Perusahaan !</p>
                                    <div className="card-actions justify-end">
                                        <Link href={'/companyPermission'}>
                                            <PrimaryButton className="btn btn-primary w-full">Go to Company Permission</PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-compact w-full bg-base-100 shadow-xl">
                                <figure><img src="/img/assets/applicant.svg" width={400} className='m-10' alt="Applicant" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Manage Applicants Accounts !</h2>
                                    <p>Atur hak akses pelamar !</p>
                                    <div className="card-actions justify-end">
                                    <Link href={'/companyPermission'}>
                                            <PrimaryButton className="btn btn-primary w-full">Go to Applicant Permission</PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
