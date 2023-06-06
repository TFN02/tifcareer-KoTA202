import CardJobs from '@/Components/Pelamar/CardJobs';
import Paginator from '@/Components/Pelamar/Paginator';
import SearchBar from '@/Components/Pelamar/SearchBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LayoutPelamar from '@/Layouts/LayoutPelamar';

import { Head } from '@inertiajs/react';

export default function LowonganKerja(props) {
    return (
        <LayoutPelamar
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Lowongan Kerja" />

            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="form-control mx-5">
                        <form method="GET" className="input-group">
                            <input name="keyword" type="text" placeholder="Masukan Posisi Kerja yang di inginkan .." className="input input-bordered text-black bg-white w-full" />
                            <button type="submit" className="btn btn-square bg-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </header>
            <div className="flex justify-center flex-col 
            lg:flex-row lg:flex-wrap lg:items-stretch 
            items-center gap-4 p-4">
                <CardJobs jobs={props.jobs.data} />
            </div>
            <div className="flex justify-center items-center pb-5">
                <Paginator meta={props.jobs.meta} />
            </div>
        </LayoutPelamar>
    );
}
