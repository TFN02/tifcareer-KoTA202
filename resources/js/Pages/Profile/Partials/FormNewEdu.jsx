import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";




const FormNewEdu = ({ auth, processing, errors, Transition }) => {

    console.log('id edu yang ke get:', auth.user);

    const [level, setLevel] = useState('');
    const [major, setMajor] = useState('');
    const [educational_institution, setEducationalInstitution] = useState('');
    const [graduation_year, setGraduationYear] = useState('');
    const [eduList, setEduList] = useState(['']);
    console.log(level);
    useEffect(() => {
        axios.get(`/api/educations`)
            .then(res => {
                const datas = res.data.data.data;
                console.log('datas:', datas);

                setEduList(datas);

            })
            .catch(err => console.log(err));
    }, []);


    // const [show, setShow] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        axios.post(`/api/educations`, {
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
                {/* <div > */}
                <Link
                    href={route('profile.show')}
                    className="flex flex-row gap-x-3 mx-5 mb-5">
                    <IoMdArrowRoundBack size={30} />
                    <p className="mt-1 font-semibold">Back</p>
                </Link>
                {/* </div> */}
                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><h1 className='text-lg bg-slate-200 w-full p-5'>Riwayat Pendidikan</h1></figure>
                    <div className="card-body divide-y divide-double">
                        <form onSubmit={submit} className="space-y-6">
                            <div className='pt-3'>
                                <InputLabel htmlFor={'level'} value="Jenjang Pendidikan" />
                                <select
                                id="level"
                                    value={level}
                                    onChange={(e) =>
                                        setLevel(e.target.value)
                                    }
                                    className="select select-bordered w-full max-w-xs">
                                    <option disabled>Pilih Jenjang</option>
                                    {eduList.map((edu, index) => (

                                        <option key={index}>{edu.level}</option>
                                    ))}

                                </select>

                                <InputError className="mt-2" message={errors.level} />

                                <InputLabel htmlFor={major} value="Jurusan" />
                                <select
                                id="major"
                                    value={major}
                                    onChange={(e) =>
                                        setMajor(e.target.value)
                                    }
                                    className="select select-bordered w-full max-w-xs">
                                    <option disabled>Pilih Jenjang</option>
                                    {eduList.map((edu, index) => (

                                        <option key={index}>{edu.major}</option>
                                    ))}

                                </select>

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

                                <div className="flex flex-row pt-3 gap-x-3">
                                    <PrimaryButton disable={processing}>Save</PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutPelamar>
    )
}

export default FormNewEdu