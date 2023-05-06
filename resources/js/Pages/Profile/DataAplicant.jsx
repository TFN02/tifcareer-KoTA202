import React, { useEffect, useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import { Head, Link, usePage } from '@inertiajs/react';
import LayoutPelamar from '@/Layouts/LayoutPelamar';
import fotoTegar from '../../../../public/img/tegar-1.jpg';
import axios from 'axios';


export default function DataAplicant({ auth, mustVerifyEmail, status }) {
    const users = usePage().props.auth.user;
    const aplicant_id = usePage().props.auth.user.applicant_id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [domicile, setDomicile] = useState('');
    const [phone_no, setPhone] = useState('');
    const [birth_of_date, setBirthOfDate] = useState('');
    const [workExperience, setWorkExperience] = useState([]);
    const [education, setEducation] = useState([]);

    useEffect(() => {
        const getAplicants = async () => {
            const { data } = await axios.get(`http://localhost:8000/api/applicants/${aplicant_id}`);
            const datas = data.data;
            setName(datas.user.name);
            setEmail(datas.user.email);
            setDomicile(datas.domicile);
            setPhone(datas.phone_no);
            setBirthOfDate(datas.birth_of_date);
            setWorkExperience(datas.work_experience || []);
            setEducation(datas.educations);

        }
        getAplicants();
    }, []);
    

    console.log("data pengalaman", workExperience);
    console.log(name);

    const handleDelete = async(id) => {
        const we_id = id;
        try {
            setWorkExperience(workExperience.filter((p) => p.id !== we_id));
            await axios.delete(`http://localhost:8000/api/applicants/${aplicant_id}`);
        }catch(err){
            console.log(err);
        }
    }


    return (
        <LayoutPelamar
            auth={auth}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className='flex flex-row justify-between py-12'>
                <div className="mx-auto sm:px-6 lg:px-8 space-y-2">
                    <Link href={route('profile.edit')}>
                        <button className="p-5 bg-indigo-800 text-white hover:bg-slate-500 hover:text-white shadow shadow-md w-full rounded-lg font-medium">
                            Update Data Kamu Disini !
                        </button>
                    </Link>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>

                <div className='sm:px-6 lg:px-8 space-y-5 w-full'>
                    <div className="card bg-white shadow sm:rounded-lg">
                        <figure><h1 className='text-lg text-white bg-violet-700 w-full p-5'>Data Pelamar</h1></figure>
                        <div className="card-body">
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure><h1 className='text-md text-white bg-violet-700 w-full p-3'>Data Diri</h1></figure>
                                <div className="card-body flex flex-row gap-10">
                                    <img className='avatar rounded w-24' src={fotoTegar} alt="foto tegar" />
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='font-bold'>{name}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className='text-md text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, eveniet. Unde cumque mollitia tenetur eaque nobis rem asperiores sit dolorem cupiditate </td>
                                            </tr>
                                            <tr className='text-xs h-7'>
                                                <td>{phone_no}</td>
                                                <td>{email}</td>
                                                <td>{domicile}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure>
                                    <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                        Pengalaman Kerja
                                        <Link href={route('profile.new')} data={{ no_id: 'new' }}>
                                        <button 
                                        className="btn btn-primary">Create New</button>
                                        </Link>
                                    </h1>
                                    
                                </figure>
                                <div className="card-body">
                                    <table className='table'>
                                        <tbody>
                                            {workExperience && workExperience.length > 0 ? workExperience.map((pengalaman, i) => (
                                                
                                            <tr key={i}>
                                                <td colSpan={2} className='font-bold'>{pengalaman.position}</td>
                                                <td className='text-md text-justify'>{pengalaman.work_institution}</td>                                                     
                                                <td>{pengalaman.start_year} - {pengalaman.end_year}</td>                                         
                                                <td ><Link href={route('profile.edit')} method="GET"
                                        data={{ no_id: pengalaman.id }} ><button className="btn btn-warning btn-sm text-sm">

                                            Edit
                                        </button>
                                        </Link></td>
                                                <td ><button onClick={() => handleDelete(workExperience.id)} className="btn btn-danger btn-sm text-xs">Delete</button></td>
                                                </tr>
                                                
                                            )): <p className='text-center'>Data Masih Kosong</p>}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure>
                                    <h1 className='text-md text-white bg-violet-700 w-full p-3'>
                                        Riwayat Pendidikan
                                        <Link>
                                        <button>
                                            Create New
                                        </button>
                                        </Link>
                                    </h1>
                                </figure>
                                <div className="card-body flex flex-row gap-10">
                                    <table>
                                        <tbody>
                                                {education && education.length > 0 ? education.map((edu, i) => (

                                                
                                            <tr key={i}>
                                                <td className='font-bold'>{edu.level}-{edu.major}</td>                                                                                       
                                                <td className='text-md text-justify pr-10'>{edu.educational_institution}</td>
                                                <td className='pr-10'>{edu.graduation_year}</td>
                                                <td className='text-sm'><Link>Update</Link> | <Link>Delete</Link></td>

                                            </tr>
                                            )): <p className="text-center">Data Masih Kosong</p>}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
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
                                        <tbody>

                                            <tr>
                                                <td className='font-bold text-left'>Master React Js</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>

                                            </tr>
                                            <tr>
                                                <td className='text-md'>Udemy</td>
                                                <td className='text-center pl-10'>September 2020 - Now</td>
                                                <td className='text-center pl-10'>Update | Delete</td>

                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
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
