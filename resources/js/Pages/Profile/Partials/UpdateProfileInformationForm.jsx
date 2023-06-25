import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import axios from 'axios';

export default function UpdateProfileInformationForm(className, errors, processing, mustVerifyEmail, status) {
    const user = usePage().props.auth.user;
    const aplicant = usePage().props.auth.user.applicant_id;
    // const applicant_id = usePage().props.auth.user.
    // console.log('data User:', user);
    // console.log('data Applicant:', aplicant);

    // Data Diri
    const { data, setData, patch, } = useForm({ name: user.name, email: user.email });
    const [name, setName] = useState('');
    const [phone_no, setPhone] = useState('');
    const [aplicantDescription, setAplicantDescription] = useState('');
    const [domicile, setDomicile] = useState('');
    const [birth_of_date, setBirthOfDate] = useState('');
    const [gender, setGender] = useState('');

    // work experience
    const [workExperience, setWorkExperience] = useState([]);
    console.log('dataUsestate:', workExperience);
    const [position, setPosition] = useState('');
    const [work_institution, setWorkInstitution] = useState('');
    const [start_year, setStartYear] = useState('');
    const [end_year, setEndYear] = useState('');
    const [description, setDescription] = useState('');

    const [show, setShow] = useState(false);



    useEffect(() => {
        axios.get(`/api/applicants/${aplicant}`)
            .then(res => {
                const applicant_id = res.data.data.user.applicant_id;
                const datas = res.data.data;
                const arrayWorkExperience = res.data.data.work_experience;
                const work_experience = res.data.data.work_experience.find(exp => exp.applicant_id === applicant_id);
                console.log('dataLuar', applicant_id);
                console.log('datas:', datas);
                console.log('applicant_id:', aplicant);
                console.log('pengalaman', work_experience);
                console.log('data pengalaman', arrayWorkExperience);

                setName(datas.name || '');
                setPhone(datas.phone_no || '');
                setAplicantDescription(datas.aplicantDescription || '');
                setDomicile(datas.domicile || '');
                setBirthOfDate(datas.birth_of_date || '');
                setGender(datas.gender || '');
                setWorkExperience(arrayWorkExperience || '');
                setPosition(work_experience?.position || '');
                setWorkInstitution(work_experience?.work_institution || '');
                setStartYear(work_experience?.start_year || '');
                setEndYear(work_experience?.end_year || '');
                setDescription(work_experience?.description || '');
            })
            .catch(err => console.log(err));
    }, []);

    const [list, setList] = useState([]);

    console.log('list', list);
    const handleChange = (index, e) => {
        // setList(prevList => {
        //     const newList = [...prevList];
        //     newList[index] = {
        //       ...newList[index],
        //       [e.target.name]: value
        //     };
        //     console.log(e.target.name);
        //     return newList;
        //   });
        const { name, value } = e.target;
        setList(prevList => {
          const newList = [...prevList];
          newList[index] = { ...newList[index], [name]: value };
          return newList;
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        const item = list[e.target.id];
        console.log('item:',item.position);

        patch(route('profile.update'));
        axios.put(`/api/applicants/${aplicant}`, {
            name: data.name,
            phone_no: phone_no,
            aplicantDescription: aplicantDescription,
            domicile: domicile,
            birth_of_date: birth_of_date,
            gender: gender,
            work_experience:[
                {
                    work_institution: item.work_institution,
                    position: item.position,
                    start_year: item.start_year,
                    end_year: item.end_year,
                    description: item.description,
                    is_add: true,
                }
            ]
        }).then(res => res.data.success ? setShow(true) && console.log('data res-2', res.data) : setShow(false))
            .catch(err => console.log(err));

    };

    return (
        <section className={className}>

            {/* SECTION DATA DIRI PELAMAR */}

            <div className="card bg-white shadow sm:rounded-lg">
                <figure><h1 className='text-lg bg-slate-200 w-full p-5'>Data Diri</h1></figure>
                <div className="card-body">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full text-black"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full text-black"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone_no" value="No. HP" />

                                <TextInput
                                    id="phone_no"
                                    className="mt-1 block w-full text-black"
                                    value={phone_no}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    autoComplete="phone_no"
                                />

                                <InputError className="mt-2" message={errors.phone_no} />
                            </div>

                        </div>
                        <div>
                            <InputLabel htmlFor="aplicantDescription" value="Deskripsi Diri" />
                            <textarea
                                id="aplicantDescription"
                                className="mt-1 textarea textarea-bordered textarea-md w-full max-w-2xl"
                                placeholder="Bio"
                                value={'deskripsi'}
                                onChange={(e) => setAplicantDescription(e.target.value)}
                                // required
                                disabled
                                autoComplete="aplicantDescription"
                            />

                            <InputError className="mt-2" message={errors.aplicantDescription} />
                        </div>

                        <div>
                            <InputLabel htmlFor="domicile" value="Domisili" />

                            <TextInput
                                id="domicile"
                                className="mt-1 block w-full text-black"
                                value={domicile}
                                onChange={(e) => setDomicile(e.target.value)}
                                required
                                autoComplete="domicile"
                            />

                            <InputError className="mt-2" message={errors.domicile} />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>

                            <div>
                                <InputLabel htmlFor="birth_of_date" value="Tanggal Lahir" />

                                <TextInput
                                    id="birth_of_date"
                                    className="mt-1 block w-full text-black w-full max-w-xs"
                                    value={birth_of_date}
                                    onChange={(e) => setBirthOfDate(e.target.value)}
                                    type="date"
                                    required
                                    autoComplete="birth_of_date"
                                />

                                <InputError className="mt-2" message={errors.birth_of_date} />
                            </div>

                            <div>
                                <InputLabel htmlFor="gender" value="Jenis Kelamin" />
                                <select
                                    id="gender"
                                    className="mt-1 select select-bordered w-full max-w-xs"
                                    value={'laki - laki'}
                                    onChange={(e) => setGender(e.target.value)}
                                    // required
                                    disabled
                                    autoComplete="gender"
                                >
                                    <option>Laki - Laki</option>
                                    <option>Perempuan</option>
                                </select>

                                <InputError className="mt-2" message={errors.gender} />
                            </div>

                        </div>

                        {/* SECTION PENGALAMAN KERJA */}
                        <div className="card bg-white shadow sm:rounded-lg">
                            <figure><h1 className='text-lg bg-slate-200 w-full p-5'>Pengalaman Kerja</h1></figure>
                            <div className="card-body divide-y divide-double gap-5 ">
                                {workExperience.map((we, index) => (
                                    <div key={index} className='pt-3'>
                                        <InputLabel htmlFor={`position-${index}`} value="Posisi Kerja" />

                                        <TextInput

                                            id={`position-${index}`}
                                            name="position"
                                            className="mt-1 block w-full text-black w-full max-w-xl"
                                            defaultValue={we.position}
                                            onChange={(e) => handleChange(index, e)}
                                            type="text"
                                            required
                                            autoComplete="position"
                                        />

                                        <InputError className="mt-2" message={errors.position} />



                                        <InputLabel htmlFor={`work_institution-${index}`} value="Nama Perusahaan" />

                                        <TextInput
                                            id={`work_institution-${index}`}
                                            name="work_institution"
                                            className="mt-1 block w-full text-black w-full max-w-xl"
                                            defaultValue={we.work_institution}
                                            onChange={(e) => handleChange(index, e)}
                                            type="text"
                                            required
                                            autoComplete="work_institution"
                                        />

                                        <InputError className="mt-2" message={errors.work_institution} />




                                        <div className="grid grid-cols-2 gap-4">
                                            <div>

                                                <InputLabel htmlFor={`start_year-${index}`} value="Tahun Masuk" />

                                                <TextInput
                                                    id={`start_year-${index}`}
                                                    name="start_year"
                                                    className="mt-1 block w-full text-black w-full max-w-xs flex -flex-row grid grid-cols-2"
                                                    value={we.start_year}
                                                    onChange={(e) => handleChange(index, e)}
                                                    type="number"
                                                    required
                                                    autoComplete="start_year"
                                                />

                                                <InputError className="mt-2" message={errors.start_year} />
                                            </div>


                                            <div>

                                                <InputLabel htmlFor={`end_year-${index}`} value="Tahun Keluar" />

                                                <TextInput
                                                    id={`end_year-${index}`}
                                                    name="end_year"
                                                    className="mt-1 block w-full text-black w-full max-w-xs flex flex-row grid grid-cols-2"
                                                    value={we.end_year}
                                                    onChange={(e) => handleChange(index, e)}
                                                    type="number"
                                                    required
                                                    autoComplete="end_year"
                                                />

                                                <InputError className="mt-2" message={errors.end_year} />
                                            </div>

                                        </div>


                                        <InputLabel htmlFor={`description-${index}`} value="Deskripsi Kerja" />

                                        <TextInput
                                            id={`description-${index}`}
                                            name="description"
                                            className="mt-1 block w-full text-black w-full max-w-xl"
                                            value={we.description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            type="text"
                                            required
                                            autoComplete="description"
                                        />

                                        <InputError className="mt-2" message={errors.description} />
                                        <PrimaryButton id={index} onClick={submit}>Save</PrimaryButton>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="text-sm mt-2 text-gray-800">
                                    Your email address is unverified.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Click here to re-send the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 font-medium text-sm text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            

                            <Transition
                                show={show}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    );
}
