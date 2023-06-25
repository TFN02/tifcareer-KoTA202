import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";



const FormNewWorkExperience = ({ auth, getId, processing, className, errors, Transition }) => {

    const workId = getId;
    console.log('id WE yang ke get:', auth.user);

    const [position, setPosition] = useState('');
    const [work_institution, setWorkInstitution] = useState('');
    const [start_year, setStartYear] = useState('');
    const [end_year, setEndYear] = useState('');
    const [description, setDescription] = useState('');

    console.log('position:', position);

    const [show, setShow] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
       
        axios.put(`/api/applicants/${auth.user.applicant_id}`, {
            work_experience: [
                {
                    // id:workId.id,
                    work_institution: work_institution,
                    position: position,
                    start_year: start_year,
                    end_year: end_year,
                    description: description,
                    is_add: false,
                }
            ]
        }).then(res => console.log('data res-2', res))
            .catch(err => console.log(err));

    };

    const handleChange = () => {
        const workClone = {}
    }
    
    return (
        <LayoutPelamar
            auth={auth}
        >

            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><h1 className='text-lg bg-violet-700 text-white w-full p-5'>Pengalaman Kerja</h1></figure>
                    <div className="card-body divide-y divide-double">
                        <form onSubmit={submit} className="space-y-6">
                            <div className='flex flex-col gap-y-2'>
                                <InputLabel htmlFor={'position'} value="Posisi Kerja" />

                                <TextInput

                                    id="position"
                                    name="position"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="position"
                                />

                                <InputError className="mt-2" message={errors.position} />



                                <InputLabel htmlFor={work_institution} value="Nama Perusahaan" />

                                <TextInput
                                    id="work_institution"
                                    name="work_institution"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    defaultValue={work_institution}
                                    onChange={(e) => setWorkInstitution(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="work_institution"
                                />

                                <InputError className="mt-2" message={errors.work_institution} />




                                <div className="grid grid-cols-2 gap-x-3">
                                    <div>

                                        <InputLabel htmlFor={start_year} value="Tahun Masuk" />

                                        <input
                                            id="start_year"
                                            name="start_year"
                                            className="mt-1 input input-bordered block text-black w-full input-sm"
                                            value={start_year}
                                            min="2000"
                                            onChange={(e) => setStartYear(e.target.value)}
                                            type="number"
                                            required
                                            // autoComplete="start_year"
                                        />

                                        <InputError className="mt-2" message={errors.start_year} />
                                    </div>


                                    <div>

                                        <InputLabel htmlFor={end_year} value="Tahun Keluar" />

                                        <input
                                            id="end_year"
                                            name="end_year"
                                            className="mt-1 input input-bordered block text-black w-full input-sm"
                                            value={end_year}
                                            onChange={(e) => setEndYear(e.target.value)}
                                            type="number"
                                            required
                                            autoComplete="end_year"
                                        />

                                        <InputError className="mt-2" message={errors.end_year} />
                                    </div>

                                </div>


                                <InputLabel htmlFor={description} value="Deskripsi Kerja" />

                                <textarea
                                    id="description"
                                    name="description"
                                    className="mt-1 textarea textarea-bordered block text-black w-full max-w-7xl"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="description"
                                />

                                <InputError className="mt-2" message={errors.description} />
                                <PrimaryButton disable={processing} className="justify-center">Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutPelamar>
    )
}

export default FormNewWorkExperience