import PrimaryButton from "../PrimaryButton"

const isJobs = (jobs) => {
    return jobs.map((data, i) => {
        return (
            <div key={i} className="card w-full lg:w-96 bg-white shadow-xl">
                <div className="card-body">

                    <h4 className="card-title text-black h-8">
                        <div className="avatar shadow shadow-md shadow-black mr-2 mt-5">
                            <div className="w-16 rounded">
                                <img src="/img/jayandraLogo.png" alt="Tailwind-CSS-Avatar-component" />
                            </div>
                        </div>
                        {data.posisiPekerjaan}
                    </h4>
                    <p className="text-black ml-20 h-2">PT Mitra Harmoni Jayandra</p>
                    <div className="pt-10">

                        <p className="text-black">Lokasi: {data.lokasi}</p>
                        <p className="text-black">Jenis Pekerjaan: {data.jenisPekerjaan}</p>
                        <p className="text-black">Gajih: Rp. {data.gajih}/bln</p>
                        <div className="card-actions justify-end">
                            <PrimaryButton className="mt-5">Detail Pekerjaan</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
}

const noJobs = () => {
    return (
        <div>Maaf, Lowongan Kerja Belum Tersedia !</div>
    )
}

const CardJobs = ({ jobs }) => {
    return !jobs ? noJobs() : isJobs(jobs)
}

export default CardJobs