import React, { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { Head, Link, usePage } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import WarningButton from "@/Components/WarningButton";

const LowonganKerjaPerusahaan = ({ auth }) => {
    const company_id = usePage().props.auth.user.company_id;
    const user = usePage();

    console.log(user);

    const [myJobs, setMyJobs] = useState([]);
    const [editJobId, setEditJobId] = useState(null);
    const [filter, setFilter] = useState("semua");
    const [applicantCounts, setApplicantCounts] = useState({});

    useEffect(() => {
        const getMyJobs = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/api/myJobs/${company_id}`
                );
                const datas = data;

                const today = new Date();
                console.log(today);

                let filteredJobs = [];
                if (filter === "semua") {
                    filteredJobs = datas;
                } else if (filter === "aktif") {
                    filteredJobs = datas.filter(
                        (job) => new Date(job.end_date) >= new Date()
                    );
                    console.log("Lowongan Kerja Aktif:", filteredJobs);
                } else if (filter === "tidakaktif") {
                    filteredJobs = datas.filter(
                        (job) => new Date(job.end_date) < new Date()
                    );
                    console.log("Lowongan Kerja Tidak Aktif:", filteredJobs);
                }

                setMyJobs(filteredJobs);

                const applicantCounts = await Promise.all(
                    filteredJobs.map(async (job) => {
                        try {
                            const response = await axios.get(
                                `http://localhost:8000/api/jobs/${job.id}/applicants/count`
                            );
                            return {
                                jobId: job.id,
                                count: response.data.count,
                            };
                        } catch (error) {
                            console.error(error);
                        }
                    })
                );

                const counts = applicantCounts.reduce((obj, item) => {
                    obj[item.jobId] = item.count;
                    return obj;
                }, {});
                setApplicantCounts(counts);
            } catch (error) {
                console.log(error);
            }
        };

        getMyJobs();
    }, [company_id, filter]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/jobs/${id}`);
            setMyJobs(myJobs.filter((job) => job.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/jobs/${id}`
            );
            // Lakukan sesuatu dengan data job yang diambil
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <LayoutPerusahaan
            auth={auth}
            errors={[]}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Postingan Lowongan Kerja Anda
                        </h2>
                        <div className="mb-4">
                            <label htmlFor="filter" className="mr-2">
                                Filter:
                            </label>
                            <select
                                id="filter"
                                className="border rounded-md p-1"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="semua">Semua</option>
                                <option value="aktif">Aktif</option>
                                <option value="tidakaktif">Tidak Aktif</option>
                            </select>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Loker Aktif" />
            <div className="p-3 flex flex-row flex-wrap justify-start items-start">
                {myJobs && myJobs.length > 0 ? (
                    myJobs.map((job) => (
                        <div
                            key={job.id}
                            className="card w-full lg:w-96 bg-white shadow-xl m-2 p-4"
                            style={{ flex: "0 0 calc(33.33% - 1rem)" }}
                        >
                            <div className="card-body">
                                <h4 className="card-title text-black h-8">
                                    {job.job_position}
                                    {new Date(job.end_date) >= new Date() ? (
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 bg-gray-400 rounded-full mr-2"></div>
                                        </div>
                                    )}
                                </h4>
                                <hr />
                                <p className="text-black">{job.title}</p>
                                <p className="text-black">
                                    End Date {job.end_date}{" "}
                                </p>
                                <p className="text-black">
                                    Jenis Pekerjaan: {job.job_position}
                                </p>
                                <p className="text-black">
                                    Gajih: Rp. {job.salary} /bln
                                </p>
                                <p className="text-black">
                                    Jumlah Pelamar:{" "}
                                    {applicantCounts[job.id] || 0}
                                </p>
                                <div className="flex flex-row-reverse gap-2 mt-4">

                                    <DangerButton
                                        className="rounded-full"
                                        onClick={() => handleDelete(job.id)}
                                    >
                                        <Link>Delete</Link>
                                    </DangerButton>
                                    <WarningButton className="rounded-full">
                                        <Link
                                            href={route(
                                                "LowonganKerjaPerusahaan.edit"
                                            )}
                                            data={{ id: job.id }}
                                        >
                                            Edit
                                        </Link>
                                    </WarningButton>
                                    <Link
                                        data={{ id: job.id }}
                                        href={route("applicants.rank")}
                                    >
                                        <button className="btn btn-primary btn-sm text-sm">
                                            Buka
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-black">
                        Anda Belum Memiliki Lowongan Kerja Aktif
                    </p>
                )}
            </div>
        </LayoutPerusahaan>
    );
};

export default LowonganKerjaPerusahaan;
