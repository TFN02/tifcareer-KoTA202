import React, { useEffect, useState } from "react";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { Head, Link, usePage } from "@inertiajs/react";
import axios from "axios";


export default function DetailApplicant({getApplicantId}) {
    const user = usePage().props;
    const company_id = usePage().props.auth.user.company_id;

    const applicantId = getApplicantId.id
    console.log("data id Applicant", applicantId);

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [birth_of_date, setBirthOfDate] = useState('');
    const [domicile, setDomicile] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const getDataDetailApplicant = async () => {
            const { data } = await axios.get(
                `/api/applicants/${applicantId}`
            );
            const datas = data.data;

            console.log("cek data", datas);

            setName(datas.name);
            setGender(datas.gender);
            setPhoneNo(datas.phone_no);
            setBirthOfDate(datas.birth_of_date);
            setDomicile(datas.domicile);
            setDescription(datas.description);
     
        };
        getDataDetailApplicant();
    }, [applicantId]);

    return (
        <>
            <LayoutPerusahaan
                auth={user.auth}
                errors={user.errors}
                header={<p className="text-xl font-bold">Detail Information Applicant</p>}
                footer={<h5 className="text-center">Copyright KoTA 202 ©️ All Reserved</h5>}
            >
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <p className="font-bold text-lg text-white bg-violet-700 w-full p-5">
                            Detail Pelamar
                        </p>
                    </figure>
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Nama
                                </h3>
                                <p>{name}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Gender
                                </h3>
                                <p>{gender}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Phone No
                                </h3>
                                <p>{phone_no}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Domicile</h3>
                                <p>{domicile}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">
                                Deskripsi Diri
                            </h3>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>

            </LayoutPerusahaan>
        </>
    )
}
