import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";



const FormUpdateDataDiri = ({ auth, processing, className, errors, Transition}) => {

    const userId = auth.user.applicant_id;
    const dataUser = auth.user.applicant;
    console.log('id user yang ke get:', dataUser);

    

    // const [name, setName] = useState(dataUser.name); // update name di table applicant
    const { data, setData, patch} = useForm({ name: dataUser.name }); //update name di table users
    const [phone_no, setPhone] = useState(dataUser.phone_no);
    const [description, setDescription] = useState(dataUser.description);
    const [domicile, setDomicile] = useState(dataUser.domicile);
    const [birth_of_date, setBirthOfDate] = useState(dataUser.birth_of_date);
    const [gender, setGender] = useState(dataUser.gender);

    // const [show, setShow] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        patch(route('profile.dataDiri.update'));
        axios.put(`/api/applicants/${userId}`, {

            user_id: auth.user.id,
            name: data.name,
            phone_no: phone_no,
            birth_of_date: birth_of_date,
            domicile: domicile,
            description: description,

        }).then(res => console.log('data res-2', res))
            .catch(err => console.log(err));

    };

    return (
        <LayoutPelamar
            auth={auth}
        >

            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><h1 className='text-lg bg-violet-700 text-white w-full p-5'>Update Data Diri</h1></figure>
                    <div className="card-body">
                        <form onSubmit={submit} className="space-y-6">
                            <div className='flex flex-col gap-y-2'>
                                <InputLabel htmlFor={'name'} value="Nama Lengkap" />

                                <TextInput

                                    id="name"
                                    name="name"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    value={data.name}
                                    onChange={(e) => setData('name',e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.name} />

                                <InputLabel htmlFor={'aplicantDescription'} value="Deskripsi Diri" />

                                <TextInput

                                    id="description"
                                    name="description"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="description"
                                />

                                <InputError className="mt-2" message={errors.description} />

                                <InputLabel htmlFor={phone_no} value="Nomor Handphone" />

                                <TextInput
                                    id="phone_no"
                                    name="phone_no"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    defaultValue={phone_no}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="phone_no"
                                />

                                <InputError className="mt-2" message={errors.phone_no} />

                                <InputLabel htmlFor={birth_of_date} value="Tanggal Lahir" />

                                <TextInput
                                    id="birth_of_date"
                                    name="birth_of_date"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    defaultValue={birth_of_date}
                                    onChange={(e) => setBirthOfDate(e.target.value)}
                                    type="date"
                                    required
                                    autoComplete="birth_of_date"
                                />

                                <InputError className="mt-2" message={errors.birth_of_date} />

                                <InputLabel htmlFor={domicile} value="Domisili" />

                                <TextInput
                                    id="domicile"
                                    name="domicile"
                                    className="mt-1 block text-black w-full max-w-7xl"
                                    defaultValue={domicile}
                                    onChange={(e) => setDomicile(e.target.value)}
                                    type="text"
                                    required
                                    autoComplete="domicile"
                                />

                                <InputError className="mt-2" message={errors.domicile} />

                                <PrimaryButton disable={processing} className="justify-center">Save</PrimaryButton>
                                

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutPelamar>
    )
}

export default FormUpdateDataDiri