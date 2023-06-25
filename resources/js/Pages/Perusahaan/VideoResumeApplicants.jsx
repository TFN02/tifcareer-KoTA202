import PrimaryButton from "@/Components/PrimaryButton";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan"
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

const VideoResumeApplicants = ({ auth, errors, getIdJobs }) => {
    const jobId = getIdJobs.id;
    const companyId = getIdJobs.company_id;

    const [acceptedApplications, setAcceptedApplications] = useState([]);
    const [message, setMessage] = useState('');
    console.log("company",getIdJobs);

    useEffect(() => {
        const getAcceptedApplications = async () => {
            try {
                const response = await axios.get(
                    //ini dirubah nanti status nya
                    // `/api/applicationsAccepted?is_pass_selection_1=1&job_id=${jobId}`
                    `/api/applications?job_id=${jobId}`
                );
                // if (response.data) {
                //     const sortedData = response.data.sort(
                //         (a, b) => a.rank - b.rank
                //     );
                // }
                console.log("ada ga",response)
                setAcceptedApplications(response.data.data);
            } catch (error) {
                console.error(
                    "Gagal mengambil data pelamar yang diterima:",
                    error
                );
            }
        };

        getAcceptedApplications();
    }, [jobId]);

    const handleAccept = async (applicationId) => {
        console.log(applicationId);

        try {
            const response = await axios.put(`/api/applications/passVideoResume/${applicationId}`, {

                is_pass_selection_2: true,
            });

            console.log("berhasil", response.data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }
    };
    const handleSendMessage = async () => {
        
        try {      
            const applicant_accepted = acceptedApplications
            .filter(
                (application) =>
                    application.is_pass_selection_2 ===
                    1
            )
            .map((application) => ({
                applicant_id: application.applicant_id,
                is_pass_selection_2: application.is_pass_selection_2,
            }));

            const requestData = {
                company_id: companyId,
                job_id: jobId,
                message: message,
                applicant: applicant_accepted,
              };

          const response = await axios.post('/api/notifications', requestData);
          console.log('Message sent successfully');
          // Handle the response or perform any additional tasks here
        } catch (error) {
          console.error('Error sending message:', error);
          // Handle the error or display an error message
        }
      };
      


    const handleReject = async (applicationId) => {
        console.log(applicationId);
        // await axios.post(`/api/applications/${applicationId}`,{
        //     is_pass_selection_2: true,

        // })

    }

    return (
        <LayoutPerusahaan
            auth={auth}
            errors={errors}
            header={<h3 className="font-bold">Tahap Video Resume</h3>}
        >
            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><p className="text-lg text-white bg-violet-700 w-full p-5">Rata Rata Nilai Video Resume Pelamar</p></figure>
                    <div className="card-body">
                        <table className="table table-compact">
                            <thead>
                                <tr>

                                    <th className="text-center">Nama</th>
                                    <th className="text-center">Rata Rata</th>
                                    <th className="text-center">Total Score</th>
                                    <th className="text-center">Terima &nbsp;- &nbsp; Tolak</th>
                                    <th className="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acceptedApplications.map((application, index) => (
                                    <tr key={application.id}>
                                        <td className="px-4 py-2">
                                            {application.applicant.name}
                                        </td>
                                        <td className="text-center px-4 py-2">
                                            {application.video_resume.avg_score}
                                        </td>
                                        <td className="text-center px-4 py-2">
                                            {application.video_resume.total_score}
                                        </td>
                                        <td>
                                            <div className="flex justify-center items-center gap-x-2">
                                                <button
                                                    onClick={() => handleAccept(application.id)}
                                                    className="btn btn-xs btn-secondary text-xs">
                                                    Terima
                                                </button>
                                                <button
                                                    onClick={() => handleReject(application.id)}
                                                    className="btn btn-xs btn-error text-xs">
                                                    Tolak
                                                </button>

                                            </div>
                                        </td>
                                        <td className="flex justify-center items-center">
                                            <Link
                                                data={{ id: application.id }}
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
                <div className="card bg-white mt-3">
                    <figure>
                        <p className="font-bold text-lg text-white bg-violet-700 w-full p-5">
                            Pesan dan Persyaratan Hasil Keputusan Tahap Video Resume
                        </p>
                    </figure>
                    <div className="card-body p-5">
                        <label className="mt-1">Pesan Kepada Pelamar:</label>
                        <input
                            id="message"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Selamat Anda lolos ke tahap video resume"
                            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <PrimaryButton onClick={handleSendMessage} className="flex justify-center">Submit</PrimaryButton>
                        {/* {isDataSent && (
                            <div className="alert bg-violet-500 flex justify-center items-center w-full p-2 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Pesan Berhasil Terkirim !</span>
                            </div>
                        )} */}

                    </div>
                </div>

            </div>
        </LayoutPerusahaan>
    )
}
export default VideoResumeApplicants