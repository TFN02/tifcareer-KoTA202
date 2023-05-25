import React, { useEffect, useState } from "react";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { Head, Link, usePage } from "@inertiajs/react";
import WarningButton from "@/Components/WarningButton";
import axios from "axios";

export default function EditLoker({ myJobs, applicant }) {
    const user = usePage().props;
    const company_id = usePage().props.auth.user.company_id;

    console.log("data di carddetail", myJobs);

    const id = myJobs.id;
    // const jobId = job.id;

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

    const [selectedCriteria, setSelectedCriteria] = useState("");
    const [criteriaName, setCriteriaName] = useState("");
    const [criteriaWeight, setCriteriaWeight] = useState("");
    const [showVariableInput, setShowVariableInput] = useState(false);
    const [variableName, setVariableName] = useState("");
    const [variableWeight, setVariableWeight] = useState("");

    const [weightingCriteria, setWeightingCriteria] = useState([]);
    const [weightingVariables, setWeightingVariables] = useState([]);

    const [applications, setApplications] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [allApplications, setAllApplications] = useState([]);

    const [selectedApplicants, setSelectedApplicants] = useState(0);
    const [selectedApplicantsList, setSelectedApplicantsList] = useState([]);

    const [message, setMessage] = useState("");
    const [showMessageInput, setShowMessageInput] = useState(false);

    useEffect(() => {
        const getDataDetailJobs = async () => {
            const { data } = await axios.get(
                `http://localhost:8000/api/jobs/${id}`
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
            setJobDescription(datas.job_desc);

            const response = await axios.get(
                `http://localhost:8000/api/jobs/${id}/applicants`
            );
            setAllApplications(response.data.data);
        };
        getDataDetailJobs();
    }, [id]);

    const handleSubmit = async () => {
        try {
            await axios.post(`/lowonganKerjaPerusahaan/update`, job);
        } catch (error) {
            console.error(error);
        }
    };

    const sendNotification = async (applicantId, message) => {
        try {
            const payload = {
                company_id: company_id,
                message: message,
                applicant: [
                    {
                        applicant_id: id,
                    },
                ],
            };

            const response = await axios.post(
                "http://localhost:8000/api/notifications",
                payload
            );

            console.log(
                "Notifikasi terkirim dan pemberitahuan pelamar disimpan:",
                response.data
            );
        } catch (error) {
            console.error("Gagal mengirim notifikasi:", error);
        }
    };

    const handleGenerate = async () => {
        const selectedApplicantsListLocal = applications
            .map((applicant, index) => ({
                ...applicant,
                rank: index + 1,
                applicant_id: applicant.id,
            }))
            .slice(0, selectedApplicants);

        try {
            const response = await axios.post(
                `http://localhost:8000/api/applyJob/${id}`,
                selectedApplicantsListLocal
            );
            const rankedApplicants = response.data;
            setSelectedApplicantsList(rankedApplicants);
            console.log("Perangkingan berhasil:", rankedApplicants);
        } catch (error) {
            console.error(
                "Terjadi kesalahan saat melakukan perangkingan:",
                error
            );
        }
    };

    const handleSendNotification = async () => {
        setShowMessageInput(true);
    };

    const handleSendMessage = async () => {
        for (const applicant of selectedApplicantsList) {
            // Retrieve the applicant ID
            await sendNotification(applicant, message); // Pass the applicant ID to the sendNotification function
        }
        console.log("Semua notifikasi berhasil terkirim");
    };

    return (
        <LayoutPerusahaan
            auth={user.auth}
            errors={user.errors}
            footer={
                <h5 className="text-center">
                    Copyright KoTA 202 ©️ All Reserved
                </h5>
            }
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Lowongan Kerja
                </h2>
            }
        >
            <Head title="Edit Loker Aktif" />

            {/* Tampilkan dan atur input form sesuai dengan data job */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-3 border bg-slate-100">
                <div>
                    <label className="label" htmlFor={title}>
                        <span class="label-text mt-3">Job Title</span>
                    </label>
                    <input
                        class="input input-bordered w-full m-0 mb-3 bg-slate-200 text-black"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={job_position}>
                        <span class="label-text">Job Position</span>
                    </label>
                    <input
                        className="input input-bordered w-full m-0 mb-3 bg-slate-200 text-black"
                        type="text"
                        id="job_position"
                        value={job_position}
                        onChange={(e) => setJobPosition(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={job_desc}>
                        <span class="label-text">Job Description</span>
                    </label>
                    <textarea
                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                        type="text"
                        id="job_desc"
                        value={job_desc}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={job_category}>
                        <span class="label-text">Job Category</span>
                    </label>
                    <select
                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                        id="job_category"
                        value={job_category}
                        onChange={(e) => setJobCategoryId(e.target.value)}
                    >
                        <option value="">Select a Category</option>
                        {job_categories.map((job_category) => (
                            <option
                                key={job_category.id}
                                value={job_category.name}
                            >
                                {job_category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label class="label" htmlFor={location}>
                        <span class="label-text">Job Location</span>
                    </label>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={salary}>
                        <span class="label-text">Job Salary</span>
                    </label>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                        type="text"
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={qualification}>
                        <span class="label-text">Job Qualification</span>
                    </label>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                        type="text"
                        id="salary"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={status}>
                        <span class="label-text">Job Status</span>
                    </label>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                        type="text"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
                <div class="flex space-x-4">
                    <div class="w-1/2">
                        <label class="label" htmlFor={start_date}>
                            <span class="label-text">Job Opening</span>
                        </label>
                        <input
                            className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                            type="date"
                            id="start_date"
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div class="w-1/2">
                        <label class="label" htmlFor={end_date}>
                            <span class="label-text">Job Closed</span>
                        </label>
                        <input
                            className="m-0 input input-bordered w-full mb-5 bg-slate-200 text-black"
                            type="date"
                            id="end_date"
                            value={end_date}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="my-8">
                    <h3 className="text-xl font-semibold">Applicants</h3>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">No</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allApplications.map((applicant, index) => (
                                <tr key={applicant.id}>
                                    <td className="border px-4 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {applicant.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Link
                                            href={``} 
                                            className="text-blue-500 underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="my-8">
                    <h3 className="text-xl font-semibold">Applicants</h3>
                    <p>Jumlah Karyawan Diloloskan:</p>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                        type="number"
                        min="0"
                        max={applications.length}
                        value={selectedApplicants}
                        onChange={(e) =>
                            setSelectedApplicants(parseInt(e.target.value))
                        }
                    />
                    <WarningButton
                        className="m-2 flex flex-row-reverse"
                        onClick={handleGenerate}
                    >
                        Generate
                    </WarningButton>

                    {selectedApplicantsList.length > 0 && (
                        <div className="my-8">
                            <h3 className="text-xl font-semibold">
                                Selected Applicants
                            </h3>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Rank</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Score</th>
                                        <th className="px-4 py-2">
                                            Id Applicant
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedApplicantsList
                                        .slice(0, selectedApplicants)
                                        .map((applicant, index) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">
                                                    {index + 1}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {applicant.name}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {applicant.score}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {applicant.applicant_id}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <WarningButton
                                className="m-2 flex flex-row-reverse"
                                onClick={handleSendNotification}
                            >
                                Send Notification
                            </WarningButton>
                        </div>
                    )}

                    {showMessageInput && (
                        <div className="my-8">
                            <label className="text-xl font-semibold">
                                Message to Applicants:
                            </label>
                            <textarea
                                className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <WarningButton
                                className="m-2 flex flex-row-reverse"
                                onClick={handleSendMessage}
                            >
                                Send
                            </WarningButton>
                        </div>
                    )}
                </div>
            </div>

            <WarningButton
                className="m-2 flex flex-row-reverse"
                onClick={() => handleSubmit()}
            >
                Update
            </WarningButton>
        </LayoutPerusahaan>
    );
}
