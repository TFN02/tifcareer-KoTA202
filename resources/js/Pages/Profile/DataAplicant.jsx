import React, { useEffect, useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import { Head, Link, usePage } from '@inertiajs/react';
import LayoutPelamar from '@/Layouts/LayoutPelamar';
import fotoTegar from '../../../../public/img/tegar-1.jpg';
import axios from 'axios';


export default function DataAplicant({ auth, mustVerifyEmail, status }) {
    const aplicant_id = usePage().props.auth.user.applicant_id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [domicile, setDomicile] = useState('');
    const [phone_no, setPhone] = useState('');
    const [birth_of_date, setBirthOfDate] = useState('');
    const [workExperience, setWorkExperience] = useState([]);
    const [education, setEducation] = useState([]);

    // const [idCategory, setIdCategory] = useState('');
    // const [skillCategory, setSkillCategory] = useState([]);
    const [hardSkill, setHardSkill] = useState([]);
    const [interest_area, setInterestArea] = useState([]);
    const [softSkill, setSoftSkill] = useState([]);
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const getAplicants = async () => {
            const { data } = await axios.get(`http://localhost:8000/api/applicants/${aplicant_id}`);
            const datas = data.data;

            console.log('cek data', datas);

            setName(datas.user.name);
            setEmail(datas.user.email);
            setDomicile(datas.domicile);
            setPhone(datas.phone_no);
            setBirthOfDate(datas.birth_of_date);
            setWorkExperience(datas.work_experience || []);
            setEducation(datas.education || []);
            // setIdCategory(datas.skill.skill_category_id);
            setHardSkill(datas.skill || []);
            setInterestArea(datas.interest_area || []);
            setSoftSkill(datas.soft_skill || []);
            setCertificates(datas.certificate || []);

        }
        // const getSkillCategory = async() => {
        //     const { data } = await axios.get(`http://localhost:8000/api/skillCategories/${idCategory}`);
        //     setSkillCategory(data);
        // }
        getAplicants();
        // getSkillCategory();
    }, []);


    console.log("data pengalaman", workExperience);
    console.log("data education", education);
    console.log("data hard skill", hardSkill);
    console.log("data interest area:", interest_area);
    console.log("data softskill:", softSkill);
    console.log("data certificates:", certificates);
    // console.log("data kategori:", skillCategory);


    const handleDeleteWE = async (id) => {

        try {
            setWorkExperience(workExperience.filter((p) => p.id !== id));
            await axios.delete(`http://localhost:8000/api/workExperiences/${id}`);

        } catch (err) {
            console.log(err);
        }

    }

    const handleDeleteEdu = async (id) => {
        try {
            setEducation(education.filter((p) => p.id !== id));
            await axios.delete(`http://localhost:8000/api/educations/${id}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteSkill = async (id) => {
        try {
            setHardSkill(hardSkill.filter((p) => p.id !== id));
            await axios.delete(`http://localhost:8000/api/skills/${id}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteInterest = async (id) => {
        try {
            setInterestArea(interest_area.filter((p) => p.id !== id));
            await axios.delete(`http://localhost:8000/api/interestAreas/${id}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteSoftSkill = async (id) => {
        try {
            setSoftSkill(softSkill.filter((p) => p.id !== id));
            await axios.delete(`http://localhost:8000/api/softSkills/${id}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteCertificates = async (id) => {
        try {
            setCertificates(certificates.filter((p) => p.id !== id));
            await axios.delete(`http://localhost:8000/api/certificates/${id}`);
        } catch (err) {
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

                                                <tr key={i} className='flex justify-between'>
                                                    <td colSpan={2} className='font-bold'>{pengalaman.position}</td>
                                                    <td className='text-md text-justify'>{pengalaman.work_institution}</td>
                                                    <td>{pengalaman.start_year} - {pengalaman.end_year}</td>
                                                    <td ><Link href={route('profile.edit')} method="GET"
                                                        data={{ work_id: pengalaman.id }} ><button className="btn btn-warning btn-sm text-sm">

                                                            Edit
                                                        </button>
                                                    </Link>
                                                        &nbsp; | &nbsp;
                                                        <button onClick={() => handleDeleteWE(pengalaman.id)} className="btn btn-danger btn-sm text-xs">Delete</button></td>
                                                </tr>

                                            )) : <p className='text-center'>Data Masih Kosong</p>}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure>
                                    <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                        Riwayat Pendidikan
                                        <Link href={route('profile.edu.new')}>
                                            <button className="btn btn-primary">
                                                Create New
                                            </button>
                                        </Link>
                                    </h1>
                                </figure>
                                <div className="card-body">
                                    <table className='table'>
                                        <tbody>
                                            {education && education.length > 0 ? education.map((edu, i) => (


                                                <tr key={i} className='flex justify-between'>
                                                    <td className='font-bold'>{edu.level} - {edu.major}</td>
                                                    <td className='text-md text-justify pr-10'>{edu.educational_institution}</td>
                                                    <td className='pr-10'>{edu.graduation_year}</td>
                                                    <td ><Link href={route('profile.edu.edit')} method="GET"
                                                        data={{ edu_id: edu.id }} ><button className="btn btn-warning btn-sm text-sm">

                                                            Edit
                                                        </button>
                                                    </Link>
                                                        &nbsp; | &nbsp;
                                                        <button onClick={() => handleDeleteEdu(edu.id)} className="btn btn-danger btn-sm text-xs">Delete</button></td>

                                                </tr>
                                            )) : <p className="text-center">Data Masih Kosong</p>}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure>
                                    <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                        Hardskill
                                        <Link href={route('profile.skill.new')}>
                                            <button className='btn btn-primary'>
                                                Create New
                                            </button>
                                        </Link>
                                    </h1>
                                </figure>

                                <div className="card-body">
                                    <table className='table'>
                                        <tbody>
                                            {hardSkill && hardSkill.length > 0 ? hardSkill.map((skill, i) => (
                                                <tr key={i} className='flex justify-between'>
                                                    <td colSpan={2} className='font-bold'>{skill.name}</td>
                                                    <td>
                                                        <Link
                                                            href={route('profile.skill.edit')}
                                                            data={{ skill_id: skill.id }}
                                                        ><button className='btn btn-warning btn-sm text-xs'>Edit</button></Link> &nbsp;|
                                                        &nbsp;<Link><button onClick={() => handleDeleteSkill(skill.id)} className='btn btn-danger btn-sm text-xs'>Delete</button></Link>
                                                    </td>
                                                </tr>
                                            )) : <p>Data Masih Kosong</p>}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure>
                                    <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between '>
                                        Bidang Ketertarikan
                                        <Link href={route('profile.interest.new')}>
                                            <button className='btn btn-primary'>
                                                Create New
                                            </button>
                                        </Link>
                                    </h1>
                                </figure>
                                <div className="card-body">
                                    <table>
                                        <tbody>
                                            {interest_area && interest_area.length > 0 ? interest_area.map((interest, i) => (

                                                <tr key={i} className='flex justify-between'>
                                                    <td className='font-bold'>{interest.name_of_field}</td>
                                                    <td>
                                                        <Link
                                                            href={route('profile.interest.edit')}
                                                            data={{ interest_id: interest.id }}
                                                        ><button className='btn btn-warning btn-sm text-xs'>Edit</button></Link>
                                                        &nbsp; | &nbsp;
                                                        <button onClick={() => handleDeleteInterest(interest.id)} className='btn btn-danger btn-sm text-xs'>Delete</button>
                                                    </td>
                                                </tr>
                                            )) : <p>Data Masih Kosong</p>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure>
                                    <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                        Softskill
                                        <Link href={route('profile.softSkill.new')}>
                                            <button className='btn btn-primary'>
                                                Create New
                                            </button>
                                        </Link>
                                    </h1>
                                </figure>
                                <div className="card-body">
                                    <table className='table'>
                                        <tbody>
                                            {softSkill && softSkill.length > 0 ? softSkill.map((soft, i) => (

                                                <tr key={i} className='flex justify-between'>
                                                    <td className='font-bold'>{soft.name}</td>
                                                    <td>
                                                        <Link
                                                            href={route('profile.softSkill.edit')}
                                                            data={{ softskill_id: soft.id }}
                                                        ><button className='btn btn-warning btn-sm text-xs'>Edit</button></Link>
                                                        &nbsp; | &nbsp;
                                                        <button onClick={() => handleDeleteSoftSkill(soft.id)} className='btn btn-danger btn-sm text-xs'>Delete</button>
                                                    </td>
                                                </tr>
                                            )) : <p>Data Masih Kosong</p>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card mb-3 bg-white shadow sm:rounded-lg">
                                <figure>
                                    <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                        Sertifikat
                                        <Link
                                        href={route('profile.certificate.new')}
                                        >
                                        <button className='btn btn-primary'>
                                            Create New
                                        </button>
                                        </Link>
                                    </h1>
                                </figure>
                                <div className="card-body">
                                    <table className='table'>
                                        <tbody>
                                                {certificates && certificates.length > 0 ? certificates.map((sertif, i) => (
                                        
    
                                                    <tr key={i} className='flex justify-between'>
                                                <td className='font-bold text-left'>{sertif.title}</td>
                                                <td >{sertif.description}</td>
                                                <td >{sertif.no_certificate}</td>
                                                <td >
                                                    <Link
                                                    href={route('profile.certificate.edit')}
                                                    data={{ certificate_id: sertif.id }}
                                                    >
                                                    <button className='btn btn-warning btn-sm text-xs'>Edit</button>
                                                    </Link>
                                                    &nbsp; | &nbsp;
                                                    <button className="btn btn-danger btn-sm text-xs" onClick={() => handleDeleteCertificates(sertif.id)}>Delete</button>
                                                </td>

                                            </tr>
                                            
                                                )): <p>Data Masih Kosong</p>}
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
