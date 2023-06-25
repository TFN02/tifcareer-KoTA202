import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

const FormWorkExperience = (props, errors) => {
    const aplicant = usePage().props.auth.user.applicant;
    // console.log('data Applicant:', aplicant);

    const [position, setPosition] = useState('');
    const [work_institution, setWorkInstitution] = useState('');
    const [start_year, setStartYear] = useState('');
    const [end_year, setEndYear] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get(`/api/applicants/${aplicant.id}`)
            .then(res => {
                const work_experience = res.data.data.work_experience;
                console.log('pengalaman', work_experience);

                setPosition(work_experience.position || '');
                setWorkInstitution(work_experience.work_institution || '');
                setStartYear(work_experience.start_year || '');
                setEndYear(work_experience.end_year || '');
                setDescription(work_experience.description || '');
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedWorkExperience = {
            position, work_institution, start_year, end_year, description,
        };
        props.onSubmit(updatedWorkExperience);
    };

    return (
        <>
            <div className="card bg-white shadow sm:rounded-lg">
                <figure><h1 className='text-lg bg-violet-700 text-white w-full p-5'>Pengalaman Kerja</h1></figure>
                <div className="card-bod ">
                    <form onSubmit={handleSubmit}>

                        <div className='flex flex-col gap-y-2'>
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
                                    type="date"
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
                                    type="date"
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
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormWorkExperience