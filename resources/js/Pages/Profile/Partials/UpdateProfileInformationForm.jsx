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
    // console.log('data User:', user);
    // console.log('data Applicant:', aplicant);

    // Data Diri
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhone] = useState('');
    const [aplicantDescription, setAplicantDescription] = useState('');
    const [domicile, setDomicile] = useState('');
    const [birth_of_date, setBirthOfDate] = useState('');
    const [gender, setGender] = useState('');

    // work experience
    // const [work_experience, setWorkExperience] =useState(['']);
    const [position, setPosition] = useState('');
    const [work_institution, setWorkInstitution] = useState('');
    const [start_year, setStartYear] = useState('');
    const [end_year, setEndYear] = useState('');
    const [description, setDescription] = useState('');

    const [show, setShow] = useState(false);

    // const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    //     name: user.name,
    //     email: user.email,
    //     phone_no: aplicant.phone_no,
    //     aplicantDescription: '',
    //     domicile: aplicant.domicile,
    //     birth_of_date: aplicant.birth_of_date,
    //     gender: '',
    // });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/applicants/${aplicant}`)
            .then(res => {
                const dataLuar = res.data.data.work_experience?.[aplicant];
                const datas = res.data.data;
                // const work_experience = res.data.data.work_experience?.[aplicant];
                console.log('dataLuar', dataLuar);
                console.log('datas:', datas);
                console.log(aplicant);
                // console.log('pengalaman', work_experience);
                setName(datas.name || '');
                setEmail(datas.email || '');
                setPhone(datas.phone_no || '');
                setAplicantDescription(datas.aplicantDescription || '');
                setDomicile(datas.domicile || '');
                setBirthOfDate(datas.birth_of_date || '');
                setGender(datas.gender || '');
                setPosition(work_experience.position || '');
                setWorkInstitution(work_experience.work_institution || '');
                setStartYear(work_experience.start_year || '');
                setEndYear(work_experience.end_year || '');
                setDescription(work_experience.description || '');
            })
            .catch(err => console.log(err));
    }, []);

    const submit = (e) => {
        e.preventDefault();

        // patch(route('profile.update'));
        axios.put(`http://localhost:8000/api/applicants/${aplicant.id}`, {
            name: name,
            email: email,
            phone_no: phone_no,
            aplicantDescription: aplicantDescription,
            domicile: domicile,
            birth_of_date: birth_of_date,
            gender: gender,
            work_experience: [
                {
                    work_institution: work_institution,
                    position: position,
                    start_year: start_year,
                    end_year: end_year,
                    description: description,
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            <div className="card-body ">
                                <div>
                                    <InputLabel htmlFor="position" value="Posisi Kerja" />

                                    <TextInput
                                        id="position"
                                        className="mt-1 block w-full text-black w-full max-w-xl"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        type="text"
                                        required
                                        autoComplete="position"
                                    />

                                    <InputError className="mt-2" message={errors.position} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="work_institution" value="Nama Perusahaan" />

                                    <TextInput
                                        id="work_institution"
                                        className="mt-1 block w-full text-black w-full max-w-xl"
                                        value={work_institution}
                                        onChange={(e) => setWorkInstitution(e.target.value)}
                                        type="text"
                                        required
                                        autoComplete="work_institution"
                                    />

                                    <InputError className="mt-2" message={errors.work_institution} />
                                </div>

                                <div className='grid grid-cols-2 gap-4'>

                                    <div>
                                        <InputLabel htmlFor="start_year" value="Tahun Masuk" />

                                        <TextInput
                                            id="start_year"
                                            className="mt-1 block w-full text-black w-full max-w-xs"
                                            value={start_year}
                                            onChange={(e) => setStartYear(e.target.value)}
                                            type="number"
                                            required
                                            autoComplete="start_year"
                                        />

                                        <InputError className="mt-2" message={errors.start_year} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="end_year" value="Tahun Keluar" />

                                        <TextInput
                                            id="end_year"
                                            className="mt-1 block w-full text-black w-full max-w-xs"
                                            value={end_year}
                                            onChange={(e) => setEndYear(e.target.value)}
                                            type="number"
                                            required
                                            autoComplete="end_year"
                                        />

                                        <InputError className="mt-2" message={errors.end_year} />
                                    </div>
                                </div>
                                <div>
                                    <InputLabel htmlFor="description" value="Deskripsi Kerja" />

                                    <TextInput
                                        id="description"
                                        className="mt-1 block w-full text-black w-full max-w-xl"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                        required
                                        autoComplete="description"
                                    />

                                    <InputError className="mt-2" message={errors.description} />
                                </div>
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
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
