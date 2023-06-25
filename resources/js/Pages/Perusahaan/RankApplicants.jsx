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


    const jobId = getIdJobs.id;

    const [title, setTitle] = useState("");
    const [job_position, setJobPosition] = useState("");
    const [job_desc, setJobDescription] = useState("");
    const [qualification, setQualification] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [is_selection_1, setIsSelection1] = useState(0);
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [job_category, setJobCategoryId] = useState("");
    const [job_categories, setJobCategories] = useState([]);
    const [applications, setApplications] = useState([]);
    const [allApplications, setAllApplications] = useState([]);
    const [numSelectedApplicants, setNumSelectedApplicants] = useState(0);
    const [acceptedApplications, setAcceptedApplications] = useState([]);
    const [message, setMessage] = useState("");

    const [inputs, setInputs] = useState([{ question: '' }]);
    const [requirements, setRequirements] = useState('');
    const [isDataSent, setIsDataSent] = useState(false);
    const [isAbleRank, setIsAbleRank] = useState(false);
    const [isGenerate, setIsGenerate] = useState(false);
    const [isAfterGenerate, setIsAfterGenerate] = useState(false);

    useEffect(() => {
        const getDataDetailJobs = async () => {
            const { data } = await axios.get(
                `/api/jobs/${jobId}`
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
            setIsSelection1(datas.is_selection_1);
            // setJobCategoryId(datas.job_category);

            const response = await axios.get(
                `/api/jobs/${jobId}/applicants`
            );
            
            setAllApplications(response.data.data);
            if(response.data.data.length!=0){
                setIsAbleRank(true)
            }
        
            const dateNew = new Date()
            
            if (datas.end_date === dateNew.toISOString().slice(0, 10)) {
                setIsGenerate(true) 
            }else{
                setIsGenerate(false) 
            };

            if(datas.end_date < dateNew.toISOString().slice(0, 10)){
                setIsGenerate(true) 
                handleRankSaw()
            }
        };
        getDataDetailJobs();
    }, [jobId]);

    useEffect(() => {
        const getAcceptedApplications = async () => {
            try {
                const response = await axios.get(
                    `/api/applicationsAccepted?is_pass_selection_1=1&job_id=${jobId}`
                );
                
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

    const handleRankSaw = async () => {
            try {
                const response = await axios.post(
                    `/api/saw/${jobId}`
                );
                setApplications(response.data);
                setAllApplications(response.data);
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

    const handleGenerate = async () => {
        // Mengupdate status pelamar berdasarkan peringkat
        const updatedApplications = applications.map(
        (application, index) => {
            if (index < numSelectedApplicants) {
                return { ...application, is_pass_selection_1: 1};
            } else {
                return { ...application, is_pass_selection_1: 0 };
            }
        }
        );
        setApplications(updatedApplications);

        try {
            const updateStatusPromises = updatedApplications.map(
                (application) =>
                    axios.put(
                        `/api/applications/${application.id}`,
                        { is_pass_selection_1: application.is_pass_selection_1 }
                    )
            );
            await Promise.all(updateStatusPromises);
            setIsAfterGenerate(true)
    
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
    };

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

    };

    const handleSendMessage = async () => {
        try {
            console.log("req_appl: ", applications)
            const applicationAcc = applications
            .filter(
                (application) =>
                    application.is_pass_selection_1 ===
                    1
            )
            .map((application) => ({
                application_id: application.id,
                
            }));
            const applicant_accepted = applications
            .filter(
                (application) =>
                    application.is_pass_selection_1 ===
                    1
            )
            .map((application) => ({
                applicant_id: application.applicant_id,
                is_pass_selection_1: application.is_pass_selection_1,
            }));

            const applicant_rejected = applications
            .filter(
                (application) =>
                    application.is_pass_selection_1 ===
                    0
            )
            .map((application) => ({
                applicant_id: application.applicant_id,
                is_pass_selection_1: application.is_pass_selection_1,
            }));

            const requestData_1 = {
                company_id: company_id,
                job_id: jobId,
                message: message,
                applicant: applicant_accepted,
            };

            console.log("req_acc: ", applicant_accepted)
            const requestData_2 = {
                company_id: company_id,
                job_id: jobId,
                message: "Mohon maaf Anda belum lolos pada tahap ini. Jangan berkecil hati, Anda bisa mencoba melamar kembali pada pekerjaan lain yang sesuai dengan Anda!",
                applicant: applicant_rejected,
            };

            console.log("req_reject: ", applicant_rejected)

            const response_acc = await axios.post(
                "/api/notifications",
                requestData_1
            );

            const response_reject = await axios.post(
                "/api/notifications",
                requestData_2
            );

            const response2 = await axios.post(
                '/api/assignmentVideoResumes',{
                application: applicationAcc,
                job_id: jobId,
                start_date: start_date,
                end_date: end_date,
                technical_requirement: requirements,
                question: inputs,
                }
            )
            

            setIsDataSent(true);
            setMessage("");
            setRequirements("");
            // setInputs("");
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
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
                                        {is_selection_1}
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
                            Pelamar Masuk
                        </p>
                    </figure>
                    <div className="card-body">
                        <table className="table-auto">
                            <thead>
                                <tr>
                                <th className="px-4 py-2">No</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Phone No</th>
                                    <th className="px-4 py-2">Gender</th>
                                    <th className="px-4 py-2">Score</th>
                                    <th className="px-4 py-2">Rank</th>
                                    <th className="px-4 py-2">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {allApplications.map((application_1, index) => (
                                    <tr key={application_1.id}>
                                        <td className="border px-4 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {application_1.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {application_1.phone_no}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {application_1.gender}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {application_1.score}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {application_1.rank}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                        <PrimaryButton className="rounded-full">
                                        <Link
                                            href={route(
                                                "applicant.detail"
                                            )}
                                            data={{ id: application_1.applicant_id }}
                                        >
                                            Detail
                                        </Link>
                                        </PrimaryButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <PrimaryButton onClick={handleRankSaw} 
                        disabled={!isAbleRank}
                        className="flex justify-center">{isAbleRank ? "LIHAT HASIL PERANKINGAN" : "BELUM ADA PELAMAR MASUK"}
                        </PrimaryButton>
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
                                                application.is_pass_selection_1 ===
                                                1
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
                                                    {application.is_pass_selection_1}
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
                                    min={0}
                                    max={applications.length}
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
                        
                        <PrimaryButton onClick={handleGenerate} disabled={!isGenerate} className="flex justify-center">Generate Ranking Applicants</PrimaryButton>
                        
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
                                    <th className="px-4 py-2">Ranking</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Score</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {acceptedApplications.length !== 0 ? (
                                acceptedApplications.map((application, index) => (
                                <tr key={application.id}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{application.applicant_name}</td>
                                    <td className="border px-4 py-2 text-center">{application.score}</td>
                                    <td className="border px-4 py-2">accepted</td>
                                </tr>
                                ))
                            ) : (
                                applications
                                .filter((application) => application.is_pass_selection_1 === 1)
                                .map((application) => (
                                    <tr key={application.id}>
                                    <td className="border px-4 py-2 text-center">{application.rank}</td>
                                    <td className="border px-4 py-2">{application.name}</td>
                                    <td className="border px-4 py-2">{application.score}</td>
                                    <td className="border px-4 py-2">accepted</td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <p className="font-bold text-lg text-white bg-violet-700 w-full p-5">
                            Pesan dan Persyaratan Assignment Video Resume
                        </p>
                    </figure>
                    <div className="card-body">
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
                        
                        <PrimaryButton onClick={handleSendMessage} className="flex justify-center">Submit</PrimaryButton>
                        {isDataSent && (
                                    <div className="alert bg-violet-500 flex justify-center items-center w-full p-2 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>Pesan Dan Persyaratan Berhasil Terkirim !</span>
                                    </div>
                                )}
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
