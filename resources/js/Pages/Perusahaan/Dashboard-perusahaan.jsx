import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import LayoutPerusahaan from '@/Layouts/LayoutPerusahaan';
import { Head, router } from '@inertiajs/react';


export default function Dashboard(props) {
    const [posisiPekerjaan, setPosisiPekerjaan] = useState('');
    const [jenisPekerjaan, setJenisPekerjaan] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [gajih, setGajih] = useState('');
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            posisiPekerjaan, jenisPekerjaan, lokasi, gajih
        }
        router.post('/jobs', data);
        setIsNotif(true);
        setPosisiPekerjaan('');
        setJenisPekerjaan('');
        setLokasi('');
        setGajih('');
    }

    // useEffect(() => {
    //     if (!props.myJobs) {

    //         router.get('/jobs')
    //     }
    //     return;
    // }, []);

    return (
        <LayoutPerusahaan
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rincian Postingan Lowongan Kerja</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="w-full pl-3 pb-3">

                            {isNotif && <div className="alert alert-info shadow-lg flex justify-center items-center">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{props.flash.message}</span>
                                </div>
                            </div>}
                        </div>
                        <input type="text" placeholder="Posisi Pekerjaan" className="m-2 input input-bordered w-full bg-slate-200 text-black"
                            onChange={(posisiPekerjaan) => setPosisiPekerjaan(posisiPekerjaan.target.value)} value={posisiPekerjaan} />
                        <input type="text" placeholder="Jenis Pekerjaan" className="m-2 input input-bordered w-full bg-slate-200 text-black"
                            onChange={(jenisPekerjaan) => setJenisPekerjaan(jenisPekerjaan.target.value)} value={jenisPekerjaan} />
                        <input type="text" placeholder="Lokasi Penempatan" className="m-2 input input-bordered w-full bg-slate-200 text-black"
                            onChange={(lokasi) => setLokasi(lokasi.target.value)} value={lokasi} />
                        <input type="number" placeholder="Gajih" className="m-2 input input-bordered w-full bg-slate-200 text-black"
                            onChange={(gajih) => setGajih(gajih.target.value)} value={gajih} />
                        <PrimaryButton className="m-2 flex flex-row-reverse" onClick={() => handleSubmit()}>Submit</PrimaryButton>
                    </div>

                </div>
            </div>
        </LayoutPerusahaan>
    );
}
