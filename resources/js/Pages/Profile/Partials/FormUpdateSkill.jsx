import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";



const FormUpdateSkill = ({ auth, getIdSkill, processing, className, errors, Transition }) => {

    const skillId = getIdSkill.id;
    console.log('id skill yang ke get:', getIdSkill);

    const [name, setName] = useState(getIdSkill.name);

    // const [show, setShow] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        axios.put(`/api/skills/${skillId}`, {
            applicant_id: auth.user.applicant_id,
            // skill_category_id: ,
            name: name,
        }).then(res => console.log('data res-2', res))
            .catch(err => console.log(err));

    };

    return (
        <LayoutPelamar
            auth={auth}
        >

            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><h1 className='text-lg bg-violet-700 text-white w-full p-5'>Hard Skill</h1></figure>
                    <div className="card-body divide-y divide-double">
                        <form onSubmit={submit} className="space-y-6">
                            <div className='flex flex-col gap-y-2'>
                                <InputLabel htmlFor={'name'} value="HardSkill" />

                                <TextInput

                                    id="name"
                                    name="name"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.name} />



                                {/* <InputLabel htmlFor={major} value="Jurusan" />

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

                                <InputError className="mt-2" message={errors.graduation_year} /> */}

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

export default FormUpdateSkill