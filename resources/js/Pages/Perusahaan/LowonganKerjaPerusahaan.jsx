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

    useEffect(() => {
        const getMyJobs = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/myJobs/${company_id}`);
                const datas = data;

                setMyJobs(datas);
            } catch (error) {
                console.log(error);
            }
        };

        getMyJobs();
    }, [company_id]);

    return (
        <LayoutPerusahaan
            auth={auth}
            errors={[]}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Postingan Lowongan Kerja Anda
                </h2>
            }
        >
            <Head title="Loker Aktif" />
            <div className="p-3 flex flex-row flex-wrap justify-start items-start">
                {myJobs && myJobs.length > 0 ? (
                    myJobs.map((job) => (
                        <div
                            key={job.id}
                            className="card w-full lg:w-96 bg-white shadow-xl m-2"
                        >
                            <div className="card-body">
                                <h4 className="card-title text-black h-8">
                                    {job.job_title}
                                </h4>
                                <hr />
                                <p className="text-black">{job.title}</p>
                                <p className="text-black">
                                    Lokasi: {job.location}{" "}
                                </p>
                                <p className="text-black">
                                    Jenis Pekerjaan: {job.job_position}
                                </p>
                                <p className="text-black">
                                    Gajih: Rp. {job.salary} /bln
                                </p>
                                <div className="flex flex-row-reverse gap-2 mt-4">
                                    <DangerButton className="rounded-full">
                                        <Link>Delete</Link>
                                    </DangerButton>
                                    <WarningButton className="rounded-full">
                                        <Link
                                            href={route(
                                                "LowonganKerjaPerusahaan.edit"
                                            )}
                                            method="GET"
                                            data={{ id: job.id }}
                                        >
                                            Edit
                                        </Link>
                                    </WarningButton>
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
