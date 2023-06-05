import React, { useEffect, useState } from "react";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import WarningButton from "@/Components/WarningButton";
import axios from "axios";
import AssignmentForm from "@/Components/AssignmentForm";

export default function RankApplicants({ getIdJobs, application }) {
    const user = usePage().props;
    const company_id = usePage().props.auth.user.company_id;

    console.log("data di carddetail", getIdJobs);

    const jobId = getIdJobs.id;
    console.log(jobId);

    const [title, setTitle] = useState("");
    const [job_position, setJobPosition] = useState("");
    const [job_desc, setJobDescription] = useState("");
    const [qualification, setQualification] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [job_category, setJobCategoryId] = useState("");
    const [job_categories, setJobCategories] = useState([]);
    const [applications, setApplications] = useState([]);
    const [allApplications, setAllApplications] = useState([]);
    const [numSelectedApplicants, setNumSelectedApplicants] = useState(0);
    const [acceptedApplications, setAcceptedApplications] = useState([]);
    const [message, setMessage] = useState("");

<<<<<<< HEAD
    const [questions, setQuestions] = useState([]);
    const [startDate, setStartDateAsr] = useState("");
    const [endDate, setEndDateAsr] = useState("");
    const [technicalRequirement, setTechnicalRequirement] = useState("");
=======
    const [inputs, setInputs] = useState([{ question: '' }]);
    const [requirements, setRequirements] = useState('');

    console.log(inputs);
    console.log(message);
>>>>>>> cc55993f9389a53ee80122fd7eb2cd554ab39533

    useEffect(() => {
        const getDataDetailJobs = async () => {
            const { data } = await axios.get(
                `http://localhost:8000/api/jobs/${jobId}`
            );
            const datas = data.data;

            console.log("cek data", datas);

            setTitle(datas.title);
            setJobPosition(datas.job_position);
            setJobDescription(datas.job_desc);
            setLocation(datas.location);
            setSalary(datas.salary);
            setStartDate(datas.start_date);
            setEndDate(datas.end_date);
            setQualification(datas.qualification);
            setStatus(datas.status);
            // setJobCategoryId(datas.job_category);

            const response = await axios.get(
                `http://localhost:8000/api/jobs/${jobId}/applicants`
            );
            setAllApplications(response.data.data);
        };
        getDataDetailJobs();
    }, [jobId]);

    useEffect(() => {
        const getAcceptedApplications = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/applicationsAccepted?status=accepted&job_id=${jobId}`
                );
                console.log("Response:", response.data); // Menampilkan respons dari server
                if (response.data) {
                    const sortedData = response.data.sort(
                        (a, b) => a.rank - b.rank
                    );
                    setAcceptedApplications(sortedData);
                }
            } catch (error) {
                console.error(
                    "Gagal mengambil data pelamar yang diterima:",
                    error
                );
            }
        };

        getAcceptedApplications();
    }, [jobId]);

    const handleGenerate = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/applyJob/${jobId}`
            );
            setApplications(response.data);

            // Mengupdate status pelamar berdasarkan peringkat
            const updatedApplications = response.data.map(
                (application, index) => {
                    if (index < numSelectedApplicants) {
                        return { ...application, status: "accepted" };
                    } else {
                        return { ...application, status: "rejected" };
                    }
                }
            );
            setApplications(updatedApplications);

            try {
                const updateStatusPromises = updatedApplications.map(
                    (application) =>
                        axios.put(
                            `http://localhost:8000/api/applications/${application.id}`,
                            { status: application.status }
                        )
                );
                await Promise.all(updateStatusPromises);
                console.log(
                    "Status pelamar berhasil diperbarui di server",
                    application
                );
            } catch (error) {
                console.error(
                    "Gagal memperbarui status pelamar di server:",
                    error
                );
            }
        } catch (error) {
            console.error(
                "Terjadi kesalahan dalam melakukan perangkingan:",
                error
            );
            console.log(
                "Status pelamar berhasil diperbarui di server",
                application
            );
        }
    };

<<<<<<< HEAD
    const addQuestion = () => {
        setQuestions([...questions, { question: "" }]);
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
=======
    // Assignment Video Resume
    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    const addInput = () => {
        const newInputs = [...inputs, { question: ''}];
        setInputs(newInputs);

    };

    const removeInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);

>>>>>>> cc55993f9389a53ee80122fd7eb2cd554ab39533
    };

    const handleSendMessage = async () => {
        try {
            const applicants = applications.map((application) => ({
                applicant_id: application.applicant_id,
                status: application.status,
            }));
<<<<<<< HEAD

            const requestData = {
                company_id: company_id,
                message: message,
                applicant: applicants,
                job_id : jobId, 
            };

            const response = await axios.post(
                "http://localhost:8000/api/notifications",
                requestData
            );

            console.log("Response:", response.data);

            const videoResumeData = {
                job_id: jobId,
                start_date: startDate, // Ubah dengan nilai start_date yang diperoleh dari input pengguna
                end_date: endDate,
                technical_requirement: technicalRequirement, // Ubah dengan nilai end_date yang diperoleh dari input pengguna
                question: questions, // Ubah dengan nilai array questions yang diperoleh dari input pengguna
            };

            const assignmentVideoResumeResponse = await axios.post(
                "http://localhost:8000/api/assignmentvideoresume",
                videoResumeData
            );

            console.log(
                "Response Video Resume:",
                assignmentVideoResumeResponse.data
            );

            setMessage("");
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
=======

            const requestData = {
                company_id: company_id,
                job_id: jobId,
                message: message,
                applicant: applicants,
            };

            const response = await axios.post(
                "http://localhost:8000/api/notifications",
                requestData
            );

            const response2 = await axios.post(
                'http://localhost:8000/api/assignmentVideoResumes',{
                job_id: jobId,
                start_date: start_date,
                end_date: end_date,
                technical_requirement: requirements,
                question: inputs,
                }
            )
            console.log("response 2:", response2);
            console.log("Response:", response);

            setMessage("");
            setRequirements("");
            // setInputs("");
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
            console.log("Response:", applications);
>>>>>>> cc55993f9389a53ee80122fd7eb2cd554ab39533
        }
    };

    return (
        <LayoutPerusahaan auth={user.auth} errors={user.errors}>
            <div className="grid gap-y-5 p-5">
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="/img/jayandraLogo.png"
                            alt="logo perusahaan"
                        />
                    </figure>
                    <hr />
                    <div className="card-body">
                        <h2 className="card-title">
                            {getIdJobs && (
                                <>
                                    {job_position}
                                    <div className="badge badge-secondary">
                                        {status}
                                    </div>
                                </>
                            )}
                        </h2>

                        <div className="card-actions flex justify-between">
                            <div className="badge badge-outline">Jayandra</div>
                            <div className="badge badge-outline">
                                {location}
                            </div>
                            <div className="badge badge-outline">
                                Tentang Perusahaan
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <p className="font-bold text-lg text-white bg-violet-700 w-full p-5">
                            Detail Pekerjaan
                        </p>
                    </figure>
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Deskripsi Pekerjaan
                                </h3>
                                <p>{job_desc}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Kualifikasi
                                </h3>
                                <p>{qualification}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Lokasi
                                </h3>
                                <p>{location}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Gaji</h3>
                                <p>{salary}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Tanggal Pembukaan Lowongan Kerja
                                </h3>
                                <p>{start_date}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Tanggal Penutupan Lowongan Kerja
                                </h3>
                                <p>{end_date}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">
                                Kategori Pekerjaan
                            </h3>
                            <p>{job_category}</p>
                        </div>
                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <p className="font-bold text-lg text-white bg-violet-700 w-full p-5">
                            Perangkingan Pelamar
                        </p>
                    </figure>
                    <div className="card-body">
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Rank</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allApplications.map((application) => (
                                    <tr key={application.id}>
                                        <td className="border text-center px-4 py-2">
                                            {application.rank}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {application.name}
                                        </td>
                                        <td className="border text-center px-4 py-2">
                                            {application.score}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <p className="font-bold text-lg text-white bg-violet-700 w-full p-5">
                            Pelamar Yang Lolos
                        </p>
                    </figure>
                    <div className="card-body">
                        <table className="table-auto">
                            <thead>
                                <tr>
<<<<<<< HEAD
                                    <th className="border px-4 py-2">Rank</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Score</th>
                                    <th className="border px-4 py-2">Status</th>
=======
                                    <th className="px-4 py-2">Ranking</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Score</th>
                                    <th className="px-4 py-2">Status</th>
>>>>>>> cc55993f9389a53ee80122fd7eb2cd554ab39533
                                </tr>
                            </thead>
                            <tbody>
                                {acceptedApplications.map((application, index) => (
                                    <tr key={application.id}>
<<<<<<< HEAD
                                        <td className="border text-center px-4 py-2">
                                            {application.rank}
                                        </td>
                                        <td className="border text-center px-4 py-2">
                                            {application.applicant_name}
                                        </td>
                                        <td className="border text-center px-4 py-2">
=======
                                        <td className="border px-4 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {application.applicant_name}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
>>>>>>> cc55993f9389a53ee80122fd7eb2cd554ab39533
                                            {application.score}
                                        </td>
                                        <td className="border text-center px-4 py-2">
                                            {application.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <p className="font-bold text-lg text-white bg-violet-700 w-full p-5">
                            Perangkingan
                        </p>
                    </figure>
                    <div className="card-body">
                        <div>
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Score</th>
                                        <th className="px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications
                                        .filter(
                                            (application) =>
                                                application.status ===
                                                "accepted"
                                        )
                                        .map((application) => (
                                            <tr key={application.id}>
                                                <td className="border px-4 py-2">
                                                    {application.name}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {application.score}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {application.status}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div>
                                <label
                                    htmlFor="numSelectedApplicants"
                                    className="text-sm font-medium text-gray-500 p-3"
                                >
                                    Jumlah Pelamar yang Ingin Diloloskan
                                </label>
                                <input
                                    id="numSelectedApplicants"
                                    type="number"
                                    min="0"
                                    value={numSelectedApplicants}
                                    onChange={(e) =>
                                        setNumSelectedApplicants(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleGenerate}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                        >
                            Generate Peringkat
                        </button>
                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <p className="font-bold text-lg text-white bg-violet-700 w-full p-5">
                            Pesan dan Persyaratan Assignment Video Resume
                        </p>
                    </figure>
                    <div className="card-body">
<<<<<<< HEAD
                        <div>
                            <label
                                htmlFor="startDate"
                                className="text-sm font-medium text-gray-500 p-3"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="startDate"
                                className="text-sm font-medium text-gray-500 p-3"
                            >
                                Tanggal Mulai
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDateAsr(e.target.value)
                                }
                                className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="endDate"
                                className="text-sm font-medium text-gray-500 p-3"
                            >
                                Tanggal Selesai
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDateAsr(e.target.value)}
                                className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="technicalRequirement"
                                className="text-sm font-medium text-gray-500 p-3"
                            >
                                Persyaratan Teknis
                            </label>
                            <input
                                id="technicalRequirement"
                                type="text"
                                value={technicalRequirement}
                                onChange={(e) =>
                                    setTechnicalRequirement(e.target.value)
                                }
                                className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            {questions.map((question, index) => (
                                <div key={index} className="mt-4">
                                    <label
                                        htmlFor={`question-${index + 1}`}
                                        className="block font-medium text-gray-700"
                                    >
                                        Pertanyaan {index + 1}
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            id={`question-${index + 1}`}
                                            type="text"
                                            value={question.question}
                                            onChange={(e) => {
                                                const updatedQuestions = [
                                                    ...questions,
                                                ];
                                                updatedQuestions[
                                                    index
                                                ].question = e.target.value;
                                                setQuestions(updatedQuestions);
                                            }}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeQuestion(index)
                                            }
                                            className="ml-2 px-3 py-1 text-sm font-medium text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={addQuestion}
                                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                                >
                                    Add Question
                                </button>
                            </div>
                        </div>
=======
                        <label className="mt-1">Pesan Notifikasi :</label>
                        <input
                            id="message"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Selamat Anda lolos ke tahap video resume"
                            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />

                        <label className="mt-1">Persyaratan Video Resume :</label>
                        <textarea
                            type="text"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            placeholder="Contoh: Latar Berwarna Hijau (greenscreen)"
                            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />

                        <AssignmentForm
                            inputs={inputs}
                            requirements={requirements}
                            handleInputChange={handleInputChange}
                            addInput={addInput}
                            removeInput={removeInput}
                        />
>>>>>>> cc55993f9389a53ee80122fd7eb2cd554ab39533
                        <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                        >
                            Kirim Pesan
                        </button>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-actions justify-end">
                            <Link
                                data={{ id: jobId }}
                                href={route("videoResume")}>
                                <PrimaryButton>
                                    Go to Video Resume
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutPerusahaan>
    );
}
