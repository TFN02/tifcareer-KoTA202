import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

const FormDataDiri = (props, errors) => {
    const aplicant = usePage().props.auth.user.applicant;
    // console.log('data Applicant:', aplicant);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhone] = useState('');
    const [aplicantDescription, setAplicantDescription] = useState('');
    const [domicile, setDomicile] = useState('');
    const [birth_of_date, setBirthOfDate] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        axios.get(`/api/applicants/${aplicant.id}`)
            .then(res => {
                const datas = res.data.data;
                console.log('datas:', datas);
                
                setName(datas.name || '');
                setEmail(datas.email || '');
                setPhone(datas.phone_no || '');
                setAplicantDescription(datas.aplicantDescription || '');
                setDomicile(datas.domicile || '');
                setBirthOfDate(datas.birth_of_date || '');
                setGender(datas.gender || '');
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAplicant = { 
            name, email, phone_no, aplicantDescription, domicile, birth_of_date, gender
         };
         console.log(updatedAplicant);
        props.onSubmit(updatedAplicant);
      };

    return (
        <>
            <div className="card bg-white shadow sm:rounded-lg">
                <figure><h1 className='text-lg bg-slate-200 w-full p-5'>Data Diri</h1></figure>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormDataDiri