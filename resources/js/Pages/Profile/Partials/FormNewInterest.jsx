import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";



const FormNewInterest = ({ auth, processing, errors, Transition }) => {

    console.log('id interest yang ke get:', auth.user);

    const [name_of_field, setNameOfField] = useState('');
    const [reason_of_interest, setReasonOfInterest] = useState('');

    // const [show, setShow] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        axios.post(`/api/interestAreas`, {
            applicant_id: auth.user.applicant_id,
            name_of_field: name_of_field,
            reason_of_interest: reason_of_interest,
        }).then(res => console.log('data res-2', res))
            .catch(err => console.log(err));

    };

    return (
        <LayoutPelamar
            auth={auth}
        >

            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                <figure><h1 className='text-lg bg-violet-700 text-white w-full p-5'>Bidang Ketertarikan</h1></figure>
                    <div className="card-body divide-y divide-double">
                        <form onSubmit={submit} className="space-y-6">
                            <div className='flex flex-col gap-y-2'>
                                <InputLabel htmlFor={'name_of_field'} value="Bidang Yang Disukai" />

                                <TextInput

                                    id="name_of_field"
                                    name="name_of_field"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    value={name_of_field}
                                    onChange={(e) => setNameOfField(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="name_of_field"
                                />

                                <InputError className="mt-2" message={errors.name_of_field} />



                                <InputLabel htmlFor={reason_of_interest} value="Alasan Menyukai Bidang Tersebut" />

                                <TextInput
                                    id="reason_of_interest"
                                    name="reason_of_interest"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    defaultValue={reason_of_interest}
                                    onChange={(e) => setReasonOfInterest(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="reason_of_interest"
                                />

                                <InputError className="mt-2" message={errors.reason_of_interest} />

                                <PrimaryButton disable={processing} className="justify-center">Save</PrimaryButton>
                                {/* <Link route={route('profile.show')}>Back</Link> */}
                                <div className="flex items-center gap-4">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutPelamar>
    )
}

export default FormNewInterest