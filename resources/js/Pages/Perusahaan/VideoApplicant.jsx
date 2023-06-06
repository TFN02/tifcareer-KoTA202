import PrimaryButton from "@/Components/PrimaryButton";
import VideoGallery from "@/Components/VideoGallery"
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan"
import axios from "axios";
import { useState, useEffect } from "react";

const VideoApplicant = ({ auth, errors, getIdApplication }) => {
    const idVideo = getIdApplication.video_resume_id;
    const idApplicant = getIdApplication.applicant_id;
    const jobId = getIdApplication.job_id;
    console.log("id Video", jobId)
    const [applicantName, setApplicantName] = useState('');
    const [question, setQuestion] = useState(['']);

    useEffect(() => {
        const getName = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/applicants/${idApplicant}`)

                setApplicantName(data.data.name);
            } catch (err) {
                console.log(err)
            }
        }
        const getDataAssigment = () => {
            axios.get(`http://localhost:8000/api/assignmentVideoResumes?job_id=${jobId}`)
                .then(response => {
                    const datas = response.data.data.data;
                    const dataQuestions = datas[0].question;
                    setQuestion(dataQuestions);
                    console.log("data response", datas)
                })
        }
        getDataAssigment();
        getName();
    }, [])
    console.log(question);

    return (
        <LayoutPerusahaan
            auth={auth}
            errors={errors}
        >
            <div className="flex flex-col gap-y-3 p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><p className="text-lg text-white bg-violet-700 w-full p-5">Video Resume <strong>{applicantName}</strong></p></figure>
                    <div className="card-body">
                        <VideoGallery idVideo={idVideo} />
                    </div>
                </div>
                <div className="card bg-white">
                    <div className="card-body">
                        <div className="flex justify-between w-full max-w-6xl">

                    <p className="text-md font-bold py-3">List Pertanyaan:</p>
                    <p className="text-md font-bold flex justify-end items-end mr-12">Nilai</p>
                        </div>
                        {question.map((ques, index) => (
                            <div key={index} className="flex flex-row gap-x-2">


                                <div className="bg-white shadow shadow-black shadow-sm w-full max-w-5xl p-2 rounded-lg">
                                    {ques.question}
                                </div>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    className="block input input-info input-md mx-4"
                                />
                            </div>
                        ))}
                        <hr />
                        <PrimaryButton className="justify-center">Submit Nilai</PrimaryButton>
                    </div>
                </div>
            </div>
        </LayoutPerusahaan>
    )
}
export default VideoApplicant