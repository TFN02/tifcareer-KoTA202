import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";



const FormNewSkill = ({ auth, getIdCategory, processing, className, errors, Transition }) => {

    // const skillId = getIdCategory.id;
    // console.log('id skill yang ke get:', skillId);

    const [name, setName] = useState('');
    const [nameCategory, setNameCategory] = useState([]);

    // const [show, setShow] = useState(false);

    useEffect(() => {
        const getCategory = async () => {
            const { data } = await axios.get(`/api/skillCategories`);
            const datas = data.data.data;
            setNameCategory(datas);
        }

        getCategory();
    }, [])

    console.log("cek kategori", nameCategory);

    
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }
    console.log(selectedOption);

    const submit = async (e) => {
        e.preventDefault();

        // axios.post(`/api/skillCategories`, {
        //     name: nameCategory,
        // }).then(res => console.log('data category', res))
        //     .catch(err => console.log(err));

        axios.post(`/api/skills`, {
            applicant_id: auth.user.applicant_id,
            skill_category_id: selectedOption,
            name: name,
        }).then(res => console.log('data skill', res))
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

                                <label htmlFor="dropdown">Kategori Skill:</label>
                                <select className="select select-primary w-full max-w-xs" id="dropdown" 
                                onChange={handleSelectChange} value={selectedOption}>
                                <option selected>--Pilih Kategori Yang Sesuai--</option>
                                    {nameCategory.map((nameCat, i) => (
                                        <option key={i} value={nameCat.id}>{nameCat.name}</option>
                                        
                                    ))}
                                </select>

                                <InputError className="mt-2" message={errors.nameCategory} />

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

export default FormNewSkill