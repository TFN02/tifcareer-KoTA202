import CardDetailJobs from "@/Components/Perusahaan/CardDetailJobs"
import PrimaryButton from "@/Components/PrimaryButton"
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan"
import { Link } from "@inertiajs/react"

const RankApplicants = (props) => {
    // const job = props.myJobs;
    // console.log("data job", props);
    return (
        <LayoutPerusahaan
            auth={props.auth}
            errors={props.errors}
        >
            <div className="grid gap-y-5 p-5">
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure><img src="/img/jayandraLogo.png" alt="logo perusahaan" /></figure>
                    <hr />
                    <div className="card-body">
                        <h2 className="card-title">
                            Front End Developer
                            <div className="badge badge-secondary">New Jobs</div>
                        </h2>

                        <div className="card-actions flex justify-between">
                            <div className="badge badge-outline">Jayandra</div>
                            <div className="badge badge-outline">Bandung</div>
                            <div className="badge badge-outline">Tentang Perusahaan</div>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure><p className="font-bold text-lg text-white bg-violet-700 w-full p-5">Ranking Pelamar</p></figure>
                    <div className="card-body">
                        <table className="table table-compact">
                            <tbody>
                                <tr>
                                    <th>Rank</th>
                                    <th>Nama</th>
                                    <th>Score</th>
                                    <th>Aksi</th>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="text-center pt-5">Data Masih Kosong</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                <div className="card-body">

                <div className="card-actions justify-end">
                    <Link
                    href={route("videoResume")}
                    >
                    <PrimaryButton
                    >Go to Video Resume</PrimaryButton>
                    </Link>
                </div>
                </div>
            </div>

            </div>
        </LayoutPerusahaan>
    )
}
export default RankApplicants