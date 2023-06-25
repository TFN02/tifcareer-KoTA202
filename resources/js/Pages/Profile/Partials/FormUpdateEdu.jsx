import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";



const FormUpdateEdu = ({ auth, getIdEdu, processing, className, errors, Transition }) => {

    const eduId = getIdEdu.id;
    console.log('id edu yang ke get:', eduId);

    const [level, setLevel] = useState(getIdEdu.level);
    const [major, setMajor] = useState(getIdEdu.major);
    const [educational_institution, setEducationalInstitution] = useState(getIdEdu.educational_institution);
    const [graduation_year, setGraduationYear] = useState(getIdEdu.graduation_year);

    // const [show, setShow] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        axios.put(`/api/educations/${eduId}`, {
            applicant_id: auth.user.applicant_id,
            level: level,
            major: major,
            educational_institution: educational_institution,
            graduation_year: graduation_year,
        }).then(res => console.log('data res-2', res))
            .catch(err => console.log(err));

    };

    return (
        <LayoutPelamar
            auth={auth}
        >

            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><h1 className='text-lg bg-slate-200 w-full p-5'>Riwayat Pendidikan</h1></figure>
                    <div className="card-body divide-y divide-double">
                        <form onSubmit={submit} className="space-y-6">
                            <div className='pt-3'>
                                <InputLabel htmlFor={'level'} value="Jenjang Pendidikan" />

                                <TextInput

                                    id="level"
                                    name="level"
                                    className="mt-1 block text-black w-full max-w-xl"
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="level"
                                />

                                <InputError className="mt-2" message={errors.level} />



                                <InputLabel htmlFor={major} value="Jurusan" />

                                <TextInput
                                    id="major"
                                    name="major"
                                    className="mt-1 block text-black w-full max-w-xl"
                                    defaultValue={major}
                                    onChange={(e) => setMajor(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="major"
                                />

                                <InputError className="mt-2" message={errors.major} />

                                <InputLabel htmlFor={educational_institution} value="Universitas / Politeknik" />

                                <TextInput
                                    id="educational_institution"
                                    name="educational_institution"
                                    className="mt-1 block text-black w-full max-w-xl"
                                    defaultValue={educational_institution}
                                    onChange={(e) => setEducationalInstitution(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="major"
                                />

                                <InputError className="mt-2" message={errors.educational_institution} />

                                <InputLabel htmlFor={graduation_year} value="Tahun Lulus" />

                                <TextInput
                                    id="graduation_year"
                                    name="graduation_year"
                                    className="mt-1 block w-full text-black w-full max-w-xl"
                                    value={graduation_year}
                                    onChange={(e) => setGraduationYear(e.target.value)}
                                    type="number"
                                    required
                                    autoComplete="graduation_year"
                                />

                                <InputError className="mt-2" message={errors.graduation_year} />

                                <PrimaryButton disable={processing}>Save</PrimaryButton>
                                {/* <Link route={route('profile.show')}>Back</Link> */}
                                <div className="flex items-center gap-4">


                                    {/* <Transition
                                        show={show}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutPelamar>
    )
}

export default FormUpdateEdu