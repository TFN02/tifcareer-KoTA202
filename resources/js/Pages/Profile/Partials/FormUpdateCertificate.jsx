import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";



const FormUpdateCertificate = ({ auth, getIdCertificate, processing, className, errors, Transition }) => {

    const certificateId = getIdCertificate.id;
    console.log('id certificate yang ke get:', getIdCertificate);

    const [title, setTitle] = useState(getIdCertificate.title);
    const [description, setDescription] = useState(getIdCertificate.description);
    const [no_certificate, setNoCertificate] = useState(getIdCertificate.no_certificate);

    // const [show, setShow] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        axios.put(`/api/certificates/${certificateId}`, {

            applicant_id: auth.user.applicant_id,
            title: title,
            description: description,
            no_certificate: no_certificate,

        }).then(res => console.log('data res-2', res))
            .catch(err => console.log(err));

    };

    return (
        <LayoutPelamar
            auth={auth}
        >

            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><h1 className='text-lg bg-violet-700 text-white w-full p-5'>Sertifikat Pendukung</h1></figure>
                    <div className="card-body divide-y divide-double">
                        <form onSubmit={submit} className="space-y-6">
                            <div className='flex flex-col gap-y-2'>
                                <InputLabel htmlFor={'title'} value="Judul Sertifikat" />

                                <TextInput

                                    id="title"
                                    name="title"
                                    className="mt-1 block text-black w-full max-w-xl"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="title"
                                />

                                <InputError className="mt-2" message={errors.title} />



                                <InputLabel htmlFor={description} value="Deskripsi Mengenai Sertifikat Terkait" />

                                <TextInput
                                    id="description"
                                    name="description"
                                    className="mt-1 block text-black w-full max-w-xl"
                                    defaultValue={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="description"
                                />

                                <InputError className="mt-2" message={errors.description} />

                                <InputLabel htmlFor={no_certificate} value="Nomor Sertifikat" />

                                <TextInput
                                    id="no_certificate"
                                    name="no_certificate"
                                    className="mt-1 block text-black w-full max-w-xl"
                                    defaultValue={no_certificate}
                                    onChange={(e) => setNoCertificate(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="no_certificate"
                                />

                                <InputError className="mt-2" message={errors.no_certificate} />

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

export default FormUpdateCertificate