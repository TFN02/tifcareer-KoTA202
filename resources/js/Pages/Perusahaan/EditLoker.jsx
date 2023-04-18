import React, { useEffect, useState } from 'react';
import LayoutPerusahaan from '@/Layouts/LayoutPerusahaan';
import { Head, Link, router } from '@inertiajs/react';
import WarningButton from '@/Components/WarningButton';

export default function EditLoker(props) {
    const [posisiPekerjaan, setPosisiPekerjaan] = useState('');
    const [jenisPekerjaan, setJenisPekerjaan] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [gajih, setGajih] = useState('');

    const handleSubmit = () => {
        const data = {
            id: props.myJobs.id ,posisiPekerjaan, jenisPekerjaan, lokasi, gajih
        }
        router.post('/lowonganKerjaPerusahaan/update', data);

    }
    return (
        <LayoutPerusahaan
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Lowongan Kerja</h2>}
        >
            <Head title='Edit Loker Aktif' />

            <input type="text" placeholder="Posisi Pekerjaan" className="m-2 input input-bordered w-full bg-slate-200 text-black"
                            onChange={(posisiPekerjaan) => setPosisiPekerjaan(posisiPekerjaan.target.value)} defaultValue={props.myJobs.posisiPekerjaan} />
                        <input type="text" placeholder="Jenis Pekerjaan" className="m-2 input input-bordered w-full bg-slate-200 text-black"
                            onChange={(jenisPekerjaan) => setJenisPekerjaan(jenisPekerjaan.target.value)} defaultValue={props.myJobs.jenisPekerjaan} />
                        <input type="text" placeholder="Lokasi Penempatan" className="m-2 input input-bordered w-full bg-slate-200 text-black"
                            onChange={(lokasi) => setLokasi(lokasi.target.value)} defaultValue={props.myJobs.lokasi} />
                        <input type="number" placeholder="Gajih" className="m-2 input input-bordered w-full bg-slate-200 text-black"
                            onChange={(gajih) => setGajih(gajih.target.value)} defaultValue={props.myJobs.gajih} />
                        <WarningButton className="m-2 flex flex-row-reverse" onClick={() => handleSubmit()}>Update</WarningButton>
        </LayoutPerusahaan>
    )
}