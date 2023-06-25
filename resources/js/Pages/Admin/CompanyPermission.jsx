import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { MdSwitchAccount } from 'react-icons/md'

export default function companyPermission({ auth, errors }) {
    const [dataCompany, setDataCompany] = useState(['']);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [dataValidation, setDataValidation] = useState([]);

    useEffect(() => {
        const getDataCompany = async () => {
            const { data } = await axios.get(`/api/users?role=perusahaan`);
            const datas = data.data;
            
            setDataCompany(datas);
            
            setDisabledButtons(new Array(datas.length).fill(false));
            console.log("data res", datas);
        }
        const getDataValidation = async () => {
            const { data } = await axios.get(`/api/companies`);
            const datas = data.data.data;
            
            setDataValidation(datas);
            
           
            console.log("data companies", datas);
        }
        getDataCompany();
        getDataValidation();
    }, [])

    const handleApprove = async(companyID, index) => {
        console.log("ada id ga",companyID);
        try {
            const response = await axios.put(`/api/users/updateStatus/${companyID}`,{
                is_active: true,
            });
            setDisabledButtons((prevDisabledButtons) => {
                const newDisabledButtons = [...prevDisabledButtons];
                newDisabledButtons[index] = true;
                return newDisabledButtons;
              });
            console.log("sukses",response);
          } catch (error) {
            console.error(error);
          }

    }

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
                        <li>Company Permission</li>
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
                                {dataCompany.length > 0 ? dataCompany.map((company, index) => (

                                    <tr key={index} className='hover'>
                                        <th>{index + 1}</th>
                                        <td>{company.name}</td>
                                        

                                            <td>{dataValidation[index]?.pic}</td>
                                        <td className='text-center'>{dataValidation[index]?.no_kk}</td>
                                        <td className='text-center'>{dataValidation[index]?.no_ktp}</td>
                                        
                                        <td>{company.is_active == 1 ? 'Validated' : 'Pending'}</td>
                                        <td className='text-center'>
                                            {company.is_active == 1 ?
                                                <div className='flex flex-row gap-x-2'>
                                                    <button disabled className='btn btn-xs btn-primary'>Validate</button>
                                                    {/* <button disabled className='btn btn-xs btn-danger'>Denied</button> */}
                                                </div>
                                                :
                                                <div className='flex flex-row gap-x-2'>

                                                    <button disabled={disabledButtons[index]} onClick={(e) => handleApprove(company.id, index)} className='btn btn-xs btn-primary'>Validate</button>
                                                    {/* <button disabled={disabledButtons[index]} onClick={(e) => handleReject(company.id, index)} className='btn btn-xs btn-danger'>Reject</button> */}
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                )) : <p>Data Masih Kosong</p>}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
