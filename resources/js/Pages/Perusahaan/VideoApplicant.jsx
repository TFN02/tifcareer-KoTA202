import PrimaryButton from "@/Components/PrimaryButton";
import VideoGallery from "@/Components/VideoGallery"
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan"
import axios from "axios";
import { useState, useEffect } from "react";

const VideoApplicant = ({ auth, errors, getIdApplication }) => {
    const idVideo = getIdApplication.video_resume_id;
    const idApplicant = getIdApplication.applicant_id;
    const jobId = getIdApplication.job_id;
    console.log("data video",idVideo)
    const [applicantName, setApplicantName] = useState('');
    const [question, setQuestion] = useState(['']);
    const [questionValue, setQuestionValue] = useState(['']);

    useEffect(() => {
        const getName = async () => {
            try {
                const { data } = await axios.get(`/api/applicants/${idApplicant}`)

                setApplicantName(data.data.name);
            } catch (err) {
                console.log(err)
            }
        }
        const getDataAssigment = () => {
            axios.get(`/api/assignmentVideoResumes?job_id=${jobId}`)
                .then(response => {
                    const datas = response.data.data;
                    const dataQuestions = datas[0].question;

                    setQuestion(dataQuestions);

                    console.log("data response", dataQuestions)
                })
        }
        getDataAssigment();
        getName();
    }, [])
    console.log("score",questionValue);

    const handleChange = (index, score) => {
        const updatedValue = [...questionValue];
        updatedValue[index] = { ...updatedValue[index], score };

        setQuestionValue(updatedValue);
      };

      const handleSubmit = () => {
        // Membuat array untuk menyimpan data yang akan dikirim
        const scoreData = questionValue.map((value) => ({ question: value?.score || 0 }));
      console.log(scoreData);
        // Mengirim data ke API menggunakan axios
        axios.post(`/api/scoringVideoResume/${idVideo}`, {
          score: scoreData
        })
          .then(response => {
            // Menghandle respons dari API jika diperlukan
            console.log("berhasil", response.data);
          })
          .catch(error => {
            // Menghandle error jika terjadi kesalahan pada pengiriman data
            console.error(error);
          });
      };
      
      
      

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
                                    id="question"
                                    type="number"
                                    value={questionValue[index]?.score || ''}
                                    min={0}
                                    max={100}
                                    className="block input input-info input-md mx-4"
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    />
                            </div>
                        ))}
                        <hr />
                        <PrimaryButton onClick={handleSubmit} className="justify-center">Submit Nilai</PrimaryButton>
                        
                    </div>
                </div>
            </div>
        </LayoutPerusahaan>
    )
}
export default VideoApplicant