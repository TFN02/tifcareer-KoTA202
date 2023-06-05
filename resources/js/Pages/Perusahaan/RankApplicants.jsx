import React, { useEffect, useState } from "react";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import WarningButton from "@/Components/WarningButton";
import axios from "axios";

export default function RankApplicants({ getIdJobs, application }) {
    // const job = props.myJobs;
    // console.log("data job", props);
    const user = usePage().props;
    const company_id = usePage().props.auth.user.company_id;

    // console.log("data di carddetail", myJobs);

    console.log("data di carddetail", getIdJobs);

    const jobId = getIdJobs.id;

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

    const handleSendMessage = async () => {
        try {
            const applicants = applications.map((application) => ({
                applicant_id: application.applicant_id,
                status: application.status,
            }));

            const requestData = {
                company_id: company_id,
                message: message,
                applicant: applicants,
            };

            const response = await axios.post(
                "http://localhost:8000/api/notifications",
                requestData
            );

            console.log("Response:", response.data);

            setMessage("");
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
            console.log("Response:", applications);
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
                                {acceptedApplications.map((application, index) => (
                                    <tr key={application.id}>
                                        <td className="border px-4 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {application.applicant_name}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
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
                            Pesan Untuk Pelamar Yang Lolos
                        </p>
                    </figure>
                    <div className="card-body">
                        <input
                            id="message"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
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
