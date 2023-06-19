import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan"
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

const VideoResumeApplicants = ({auth, errors, getIdJobs}) => {
    const jobId = getIdJobs.id;

    const [acceptedApplications, setAcceptedApplications] = useState([]);
    console.log(acceptedApplications);

    useEffect(() => {
        const getAcceptedApplications = async () => {
            try {
                const response = await axios.get(
                    //ini dirubah nanti status nya
                    `http://localhost:8000/api/applicationsAccepted?status=accepted&job_id=${jobId}`
                );
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

    return (
        <LayoutPerusahaan
            auth={auth}
            errors={errors}
            header={<h3 className="font-bold">Tahap Video Resume</h3>}
        >
            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><p className="text-lg text-white bg-violet-700 w-full p-5">List Pelamar</p></figure>
                    <div className="card-body">
                        <table className="table table-compact">
                            <thead>
                                <tr>

                                <th className="text-center">Nama</th>
                                <th className="text-center">Score</th>
                                <th className="text-center">Rank</th>
                                <th className="text-center">Terima &nbsp;- &nbsp; Tolak</th>
                                <th className="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            {acceptedApplications.map((application, index) => (
                                    <tr key={application.id}>
                                        <td className="px-4 py-2">
                                            {application.applicant_name}
                                        </td>
                                        <td className="text-center px-4 py-2">
                                            {application.score}
                                        </td>
                                        <td className="text-center px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td>
                                        <div className="flex justify-center items-center gap-x-10">
                                            <input type="radio" name="radio-5" className="radio radio-success" defaultChecked />
                                            <input type="radio" name="radio-5" className="radio radio-success" />
                                            
                                        </div>
                                    </td>
                                    <td className="flex justify-center items-center">
                                    <Link 
                                    data={{ id: application.id}}
                                    href={route("videoResume.applicant")}
                                    >
                                    <button className="btn btn-primary btn-xs">View Video</button>
                                    </Link>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </LayoutPerusahaan>
    )
}
export default VideoResumeApplicants