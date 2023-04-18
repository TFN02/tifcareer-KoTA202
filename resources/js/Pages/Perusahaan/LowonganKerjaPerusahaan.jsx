import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import LayoutPerusahaan from '@/Layouts/LayoutPerusahaan';
import { Head, Link, router } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import WarningButton from '@/Components/WarningButton';

export default function LowonganKerjaPerusahaan(props) {
    return (
        <LayoutPerusahaan
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Postingan Lowongan Kerja Anda</h2>}
        >
            <Head title='Loker Aktif' />
            <div className="p-3 flex flex-row flex-wrap justify-start items-start">
                {props.myJobs && props.myJobs.length > 0 ? props.myJobs.map((jobs, i) => {
                    return (
                        <div key={i} className="card w-full lg:w-96 bg-white shadow-xl m-2">
                            <div className="card-body">
                                <h4 className="card-title text-black h-8">
                                    {jobs.posisiPekerjaan}
                                </h4>
                                <hr />
                                <p className="text-black">{jobs.author}</p>
                                <p className="text-black">Lokasi: {jobs.lokasi} </p>
                                <p className="text-black">Jenis Pekerjaan: {jobs.jenisPekerjaan}</p>
                                <p className="text-black">Gajih: Rp. {jobs.gajih} /bln</p>
                                <div className="flex flex-row-reverse gap-2 mt-4">
                                    <DangerButton className="rounded-full">
                                        <Link>
                                            Delete
                                        </Link>
                                    </DangerButton>
                                    <WarningButton className="rounded-full">
                                        <Link href={route('LowonganKerjaPerusahaan.edit')} method="GET"
                                        data={{ id: jobs.id }} >
                                            Edit
                                        </Link>
                                    </WarningButton>
                                </div>
                            </div>
                        </div>
                    )
                }) : <p className="text-black">Anda Belum Memiliki Lowongan Kerja Aktif</p>}

            </div>
        </LayoutPerusahaan>
    )
}