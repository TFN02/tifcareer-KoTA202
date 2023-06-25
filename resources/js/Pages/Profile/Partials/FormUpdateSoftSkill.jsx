import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";



const FormUpdateSoftSkill = ({ auth, getIdSoftSkill, processing, className, errors, Transition }) => {

    const softSkillId = getIdSoftSkill.id;
    console.log('id interest yang ke get:', getIdSoftSkill);

    const [name, setName] = useState(getIdSoftSkill.name);

    // const [show, setShow] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        axios.put(`/api/softSkills/${softSkillId}`, {
            
            applicant_id: auth.user.applicant_id,
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
                    <figure><h1 className='text-lg bg-violet-700 text-white w-full p-5'>Soft Skill</h1></figure>
                    <div className="card-body divide-y divide-double">
                        <form onSubmit={submit} className="space-y-6">
                            <div className='flex flex-col gap-y-2'>
                                <InputLabel htmlFor={'name'} value="Soft Skill" />

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

export default FormUpdateSoftSkill