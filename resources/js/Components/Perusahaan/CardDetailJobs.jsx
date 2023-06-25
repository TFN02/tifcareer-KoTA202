import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";

const CardDetailJobs = ({ getIdJobs, auth }) => {
    console.log("data di carddetail", getIdJobs);

    const id = getIdJobs.id;

    const [job_position, setJobPosition] = useState("");
    const [status, setStatus] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [typeJob, setTypeJob] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [qualification, setQualification] = useState("");
    const [education, setEducation] = useState("");
    const [workExperience, setWorkExperience] = useState("");
    const [interestArea, setInterestArea] = useState("");

    const [isApplied, setIsApplied] = useState(false);
    const [applicantData, setApplicantData] = useState({});


    const checkIfAlreadyApplied = async () => {
        try {
            const response = await axios.get(
                `/api/applicationsApply?applicant_id=${auth.user.applicant_id}&job_id=${id}`
            );

            console.log("Ini Chcek", response.data);
            if (response.data.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const handleApplyJob = () => {
        if (!isApplied) {
            const applicationData = {
                applicant_id: auth.user.applicant_id,
                job_id: id,
                applicant_data: { ...applicantData }
            };

            axios
                .post("/api/applications", applicationData)
                .then((response) => {
                    console.log(response.data);
                    setIsApplied(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log("Anda sudah melamar pekerjaan ini.");
        }
    };

    useEffect(() => {
        const getDataDetailJobs = async () => {
            const { data } = await axios.get(
                `/api/jobs/${id}`
            );
            const datas = data.data;

            console.log("cek data", datas);

            setJobPosition(datas.job_position);
            setStatus(datas.status);
            setCompanyName(datas.company.name);
            setAddress(datas.company.address);
            setJobDesc(datas.job_desc);
            setQualification(datas.qualification);
        };
        getDataDetailJobs();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const isAlreadyApplied = await checkIfAlreadyApplied();
            setIsApplied(isAlreadyApplied);
        };

        fetchData();

        return () => {
            console.log("Anda sudah melamar pekerjaan ini.");
        };
    }, []);

    useEffect(() => {
        const getCurrentApplicantData = async () => {
            try {
                const response = await axios.get(
                    `/api/applicants/${auth.user.applicant_id}`
                );

                const currentApplicantData = response.data.data;

                // Simpan data pelamar saat ini ke state applicantData
                setApplicantData(currentApplicantData);

                console.log("Current Applicant", currentApplicantData);
            } catch (error) {
                console.error(error);
            }
        };

        // Panggil fungsi getCurrentApplicantData untuk mendapatkan data pelamar saat ini
        getCurrentApplicantData();
    }, [auth.user.applicant_id]);


    return (
        <div className="grid gap-y-3">
            <div className="card w-full bg-base-100 shadow-xl">
                <figure>
                    <img src="/img/jayandraLogo.png" alt="logo perusahaan" />
                </figure>
                <hr />
                <div className="card-body">
                    <h2 className="card-title">
                        {job_position}
                        <div className="badge badge-secondary">
                            {status} Jobs
                        </div>
                    </h2>

                    <div className="card-actions flex justify-between">
                        <div className="badge badge-outline">{companyName}</div>
                        <div className="badge badge-outline">{address}</div>
                        <div className="badge badge-outline">
                            Tentang Perusahaan
                        </div>
                    </div>
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
                <figure>
                    <p className="font-bold w-full p-5 text-xl">
                        Deskripsi Kerja
                    </p>
                </figure>
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
                                <td className=" max-w-sm flex flex-wrap">
                                    {jobDesc}
                                </td>
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
                <figure>
                    <p className="font-bold w-full p-5 text-xl">Persyaratan</p>
                </figure>
                <hr />
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Pendidikan</td>
                                <td>
                                    D3 - Teknik Informatika, S1 Ilmu Komputer
                                </td>
                            </tr>
                            <tr>
                                <td>Pengalaman Kerja</td>
                                <td>
                                    Minimal 2 tahun dalam menjadi seorang Front
                                    End Developer
                                </td>
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
                        <PrimaryButton
                            onClick={handleApplyJob}
                            disabled={isApplied}
                        >
                            {isApplied ? "Sudah Dilamar" : "Lamar Pekerjaan"}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetailJobs;
