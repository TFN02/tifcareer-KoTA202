import CardDetailJobs from "@/Components/Perusahaan/CardDetailJobs"
import PrimaryButton from "@/Components/PrimaryButton"
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan"
import { Link } from "@inertiajs/react";
import { useState } from "react";

const VideoResumeApplicants = (props) => {
    const [videos, setVideos] = useState([]);

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const newVideos = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file.type === 'video/mp4') {
                newVideos.push(file);
            }
        }

        setVideos([...videos, ...newVideos]);
    };

    const handleRemoveVideo = (index) => {
        const newVideos = [...videos];
        newVideos.splice(index, 1);
        setVideos(newVideos);
    };
    return (
        <LayoutPerusahaan
            auth={props.auth}
            errors={props.errors}
            header={<h3 className="font-bold">Tahap Video Resume</h3>}
        >
            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><p className="text-lg text-white bg-violet-700 w-full p-5">List Pelamar</p></figure>
                    <div className="card-body">
                        <table className="table table-compact">
                            <thead>
                                <th>Nama</th>
                                <th>Domisili</th>
                                <th>Score</th>
                                <th>Rank</th>
                                <th>Terima &nbsp;- &nbsp; Tolak</th>
                                <th>Aksi</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tegar Faris Nurhakim</td>
                                    <td>Bandung</td>
                                    <td>9.0</td>
                                    <td>1</td>
                                    <td>
                                        <div className="grid grid-cols-3 max-w-xs gap-5">
                                            <input type="radio" name="radio-5" className="radio radio-success" checked />
                                            <input type="radio" name="radio-5" className="radio radio-success" />
                                            
                                        </div>
                                    </td>
                                    <td>
                                    <Link 
                                    href={route("videoResume.applicant")}
                                    >
                                    <button className="btn btn-primary btn-xs">View Video</button>
                                    </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </LayoutPerusahaan>
    )
}
export default VideoResumeApplicants