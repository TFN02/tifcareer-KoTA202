import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { MdSwitchAccount } from 'react-icons/md'

export default function ApplicantPermission({ auth, errors }) {

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
            <div className='flex flex-row justify-between'>

            <p className='font-bold text-xl pt-6 px-7'>User Permission</p>
            <div className="text-sm breadcrumbs pt-6 px-7">
                <ul>
                    <li>Dashboard</li>
                    <li>Applicant Permission</li>
                </ul>
            </div>
            </div>
            <div className='card bg-white m-5 pb-20'>
                <div className='card-body'>
                    <PrimaryButton className="btn flex flex-row gap-x-2 btn-primary text-xs w-1/4">
                        Create Company Account
                        <MdSwitchAccount size={20} />
                    </PrimaryButton>
                    <div className="overflow-x-auto">
                        <table className="table w-full max-w-7xl">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='bg-violet-500 text-white'>No</th>
                                    <th className='bg-violet-500 text-white'>Nama Perusahaan</th>
                                    <th className='bg-violet-500 text-white'>Penanggung Jawab</th>
                                    <th className='bg-violet-500 text-white text-center'>NIK</th>
                                    <th className='bg-violet-500 text-white text-center'>No KK</th>
                                    <th className='bg-violet-500 text-white'>Status</th>
                                    <th className='bg-violet-500 text-white text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='border'>
                                {/* row 1 */}
                                <tr className='hover'>
                                    <th>1</th>
                                    <td>PT Tujuh Sembilan</td>
                                    <td>Rizky Febian</td>
                                    <td className='text-center'>456456565</td>
                                    <td className='text-center'>958536353</td>
                                    <td>Pending</td>
                                    <td className='text-center'>
                                        {/* <button onClick={() => handleApprove(id)} className='btn btn-xs btn-primary'>Approve</button> &nbsp;| &nbsp;
                                        <button onClick={() => handleReject(id)} className='btn btn-xs btn-danger'>Reject</button> */}
                                        <button className='btn btn-xs btn-primary'>Approve</button> &nbsp;| &nbsp;
                                        <button className='btn btn-xs btn-danger'>Reject</button>
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="hover">
                                    <th>2</th>
                                    <td>PT Freeport</td>
                                    <td>Febian</td>
                                    <td className='text-center'>456456565</td>
                                    <td className='text-center'>958536353</td>
                                    <td>Pending</td>
                                    <td className='text-center'>
                                        <button className='btn btn-xs btn-primary'>Approve</button> &nbsp;| &nbsp;
                                        <button className='btn btn-xs btn-danger'>Reject</button>
                                    </td>
                                </tr>
                                {/* row 3 */}
                                <tr className='hover'>
                                    <th>3</th>
                                    <td>PT Unilever</td>
                                    <td>Rizky</td>
                                    <td className='text-center'>456456565</td>
                                    <td className='text-center'>958536353</td>
                                    <td>Pending</td>
                                    <td className='text-center'>
                                        <button className='btn btn-xs btn-primary'>Approve</button> &nbsp;| &nbsp;
                                        <button className='btn btn-xs btn-danger'>Reject</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
