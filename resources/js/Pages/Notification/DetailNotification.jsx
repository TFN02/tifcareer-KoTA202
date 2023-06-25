import DynamicTextInput from "@/Components/DynamicTextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Head, router } from '@inertiajs/react';
import axios from "axios";
import moment from 'moment/moment';
import { format } from 'date-fns';


const DetailNotification = (props) => {

    const applicantId = props.auth.user.applicant_id;
    const jobId = props.idNotif.job_id;
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputs, setInputs] = useState([{ hour: '', minute: '', second: '' }]);
    const [applicationId, setApplicationId] = useState('');
    const [deadline, setDeadline] = useState('');
    const [technicalRequirement, setTechnicalRequirement] = useState(['']);
    const [question, setQuestion] = useState(['']);
    const [isDataSent, setIsDataSent] = useState(false);
console.log("isi props", props)

    useEffect(() => {
        const getApplicationId = () => {
            axios.get(`/api/application/${applicantId}/${jobId}`)
                .then(response => {
                    setApplicationId(response.data.application_id);
                    console.log("application id", applicationId);
                })
                .catch(error => {
                    // Tangani kesalahan jika ada
                    console.error(error);
                });
        }
        const getDataAssigment = () => {
            axios.get(`/api/assignmentVideoResumes?job_id=${jobId}`)
                .then(response => {
                    const datas = response.data.data;
                    const deadlineAssignment = datas[0].end_date; 
                    const requirement = datas[0].technical_requirement;
                    const dataQuestions = datas[0].question;
                    setDeadline(deadlineAssignment);
                    setTechnicalRequirement(requirement);
                    setQuestion(dataQuestions);
                    console.log("data response detail", datas)
                })
        }
        getApplicationId();
        getDataAssigment();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'video/mp4') {
            setSelectedFile(file);
            //setSelectedFilePath(URL.createObjectURL(event.target.files[0]));

        } else {
            setSelectedFile(null);
            alert('Mohon pilih file dengan format .mp4');
        }
    };

    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    const addInput = () => {
        const newInputs = [...inputs, { hour: '', minute: '', second: '' }];
        setInputs(newInputs);

    };

    const removeInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);

    };


    const handleSubmit = async () => {

        const formattedInputs = inputs.map(input => {
            const { hour, minute, second } = input;
            const formattedTime = moment(`${hour}:${minute}:${second}`, 'HH:mm:ss').format('HH:mm:ss');
            return formattedTime;
        });

        const dataToSend = inputs.map((input, index) => {
            return {
                segment_title: `Pertanyaan ${index + 1}`,
                time_to_jump: formattedInputs[index],

            };
        });

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('application_id', applicationId);
        formData.append('title', 'Video Resume Pelamar');
        formData.append('tags', 'tags');
        formData.append('description', 'Diupload oleh TifCareer Untuk Kebutuhan Seleksi Video Resume');
        formData.append('segment_video', JSON.stringify(dataToSend));

        try {
            const response = await axios.get('/api/auth/youtube', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    //'Content-Type': 'application/json',
                },
            });


            const response2 = await axios.post('/api/youtube/session', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    //'Content-Type': 'application/json',
                },
            });
            setIsDataSent(true);
            console.log(response2.data.segment)
            window.location.href = response.data.authUrl
        } catch (error) {
            console.error(error);
        }

    };



    return (
        <LayoutPelamar
            auth={props.auth}
            errors={props.errors}
            footer={<h5 className="text-center">Copyright KoTA 202 ©️ All Reserved</h5>}
        >
            <Head title="Informasi Persyaratan" />
            <div className="flex flex-col gap-3 p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><h1 className='text-lg text-white bg-violet-700 w-full p-5'>Informasi Seleksi Video Resume</h1></figure>
                    <div className="card-body">
                        <p>Selamat, karena telah lolos tahapan seleksi data pelamar!
                            Berikut merupakan beberapa pertanyaan yang harus Anda jawab dalam bentuk resume sebagai bahan penilaian dan pertimbangan perusahaan. Harap dilakukan dengan memenuhi persyaratan-persayaratan yang tertulis dibawah ini dengan tidak melupakan batas waktu upload video resume itu sendiri.
                            Semoga berhasil! </p>
                        <div className="card mb-3 bg-white shadow sm:rounded-lg">
                            <figure>
                                <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                    Persyaratan Video Resume
                                </h1>
                            </figure>
                            

                                <div className="card-body flex flex-row gap-10">
                                    <p>{technicalRequirement}</p>
                                </div>
                            
                        </div>
                        <div className="card mb-3 bg-white shadow sm:rounded-lg">
                            <figure>
                                <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                    Pertanyaan Interview
                                </h1>
                            </figure>

                            <table className="table-auto">
                                <tbody>
                                    {question.map((ques, index) => (
                                        <tr key={index}>
                                            <td className="py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2">{ques.question}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>Batas waktu pengumpulan video resume: <strong>{deadline}</strong></p>

                        <input type="file" accept=".mp4" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-7xl" />
                        {selectedFile && <p>File yang dipilih: {selectedFile.name}</p>}


                        <div className="card bg-white shadow sm:rounded-lg">
                            <figure>
                                <p className="font-bold text-md text-white bg-violet-700 w-full p-3 flex justify-between">Informasi Waktu Jawaban Video Resume</p>
                            </figure>

                            <div className="card-body">
                                {/* <p className="">Inputkan waktu (dalam satuan menit) anda memulai menjawab pertanyaan. <br />
                                    Misal: <br />
                                    Pertanyaan 1: 1 (yang berarti dimulai pada menit ke-1) <br />
                                    Pertanyaan 2: 3 (yang berarti dimulai pada menit ke-3) <br />
                                    Pertanyaan 3: 5 (yang berarti dimulai pada menit ke-5) <br />
                                    Dst ...</p> */}
                                <strong>Wajib memberikan informasi waktu untuk seluruh pertanyaan yang ada pada video !</strong>
                                <hr />
                                <DynamicTextInput
                                    inputs={inputs}
                                    handleInputChange={handleInputChange}
                                    addInput={addInput}
                                    removeInput={removeInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 flex justify-center">
                    <PrimaryButton className="justify-center w-full max-w-7xl" onClick={handleSubmit}>Submit</PrimaryButton>
                    {isDataSent && (
                                    <div className="alert bg-violet-500 flex justify-center items-center w-full p-2 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>Pesan Dan Persyaratan Berhasil Terkirim !</span>
                                    </div>
                                )}
                </div>
            </div>
        </LayoutPelamar>
    )
}
export default DetailNotification