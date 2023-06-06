import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton"

const CardDetailJobs = ({getIdJobs, auth}) => {
    const id = getIdJobs.id;
    const [job_position, setJobPosition] = useState('');
    const [status, setStatus] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [typeJob, setTypeJob] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [qualification, setQualification] = useState('');
    const [education, setEducation] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [interestArea, setInterestArea] = useState('');
    const [isDataSent, setIsDataSent] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    

    const handleApplyJob = () => {
        const applicationData = {
          applicant_id: auth.user.applicant_id,
          job_id: id,
        };
      
        axios
          .post('http://localhost:8000/api/applications', applicationData)
          .then(response => {
            setIsDataSent(true);
            setIsDisable(true);
            console.log(response.data); 
          })
          .catch(error => {
            console.error(error);
          });
      };

    useEffect(() => {
        const getDataDetailJobs = async () => {
            const { data } = await axios.get(`http://localhost:8000/api/jobs/${id}`);
            const datas = data.data;

            console.log('cek data', datas);

            setJobPosition(datas.job_position);
            setStatus(datas.status);
            setCompanyName(datas.company.name);
            setAddress(datas.company.address);
            setJobDesc(datas.job_desc);
            setQualification(datas.qualification);
            

        }
        getDataDetailJobs();
    },[id]);

    return (
        <div className="grid gap-y-3">
            <div className="card w-full bg-base-100 shadow-xl">
                <figure><img src="/img/jayandraLogo.png" alt="logo perusahaan" /></figure>
                <hr />
                <div className="card-body">
                    <h2 className="card-title">
                        {job_position}
                        <div className="badge badge-secondary">{status} Jobs</div>
                    </h2>

                    <div className="card-actions flex justify-between">
                        <div className="badge badge-outline">{companyName}</div>
                        <div className="badge badge-outline">{address}</div>
                        <div className="badge badge-outline">Tentang Perusahaan</div>
                    </div>
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
                <figure><p className="font-bold w-full p-5 text-xl">Deskripsi Kerja</p></figure>
                <hr />
                <div className="card-body flex flex-wrap">
                    <table className="table flex flex-wrap ">
                        <tbody>
                            <tr>
                                <td>Jenis Pekerjaan</td>
                                <td>Work From Office, Full Time</td>
                            </tr>
                            <tr>
                                <td>Deskripsi Pekerjaan</td>
                                <td className=" max-w-sm flex flex-wrap">{jobDesc}</td>
                            </tr>
                            {/* <tr>
                                <td>Tanggung Jawab</td>
                                <td>{qualification}</td>
                            </tr> */}
                        </tbody>

                    </table>
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
                <figure><p className="font-bold w-full p-5 text-xl">Persyaratan</p></figure>
                <hr />
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Pendidikan</td>
                                <td>D3 - Teknik Informatika, S1 Ilmu Komputer</td>
                            </tr>
                            <tr>
                                <td>Pengalaman Kerja</td>
                                <td>Minimal 2 tahun dalam menjadi seorang Front End Developer</td>
                            </tr>
                            <tr>
                                <td>HardSkill</td>
                                <td>React Js, JavaScript</td>
                            </tr>
                            <tr>
                                <td>Bidang Ketertarikan</td>
                                <td>Web Development</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">

                <div className="card-actions justify-center">
                    <PrimaryButton onClick={handleApplyJob} disabled={isDisable} className="w-full max-w-8xl justify-center">Lamar Pekerjaan</PrimaryButton>
                    {isDataSent && (
                                    <div className="alert bg-violet-500 flex justify-center items-center w-full max-w-5xl p-2 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>Berhasil Mengirim Lamaran</span>
                                    </div>
                                )}
                </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetailJobs