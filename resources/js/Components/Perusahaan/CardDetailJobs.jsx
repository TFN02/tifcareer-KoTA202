import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton"

const CardDetailJobs = ({getIdJobs, auth}) => {

    console.log("data di carddetail", getIdJobs);

    const id = getIdJobs.id;


    const handleApplyJob = () => {
        const applicationData = {
          applicant_id: auth.user.applicant_id,
          job_id: id,
        };
      
        axios
          .post('http://localhost:8000/api/applications', applicationData)
          .then(response => {
            console.log(response.data); 
          })
          .catch(error => {
            console.error(error);
          });
      };

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
                            <tr>
                                <td>Tanggung Jawab</td>
                                <td>{qualification}</td>
                            </tr>
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

                <div className="card-actions justify-end">
                    <PrimaryButton onClick={handleApplyJob}>Lamar Pekerjaan</PrimaryButton>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetailJobs