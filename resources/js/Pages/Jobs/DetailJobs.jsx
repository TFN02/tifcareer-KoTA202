import CardDetailJobs from "@/Components/Perusahaan/CardDetailJobs";
import LayoutPelamar from "@/Layouts/LayoutPelamar"
import { usePage } from "@inertiajs/react"
import { useState } from "react"

const DetailJobs = ({ getIdJobs, auth }) => {
    const user = usePage().props;

    // const [job_position, setJobPosition] = useState('');
    // const [companyName, setCompanyName] = useState('');
    // const [location, setLocation] = useState('');
    // const [descriptionJob, setDescriptionJob] = useState('');
    // const [typeJob, setTypeJob] = useState('');
    // const [education, setEducation] = useState('');
    // const []

    console.log("dapet ga id nya", getIdJobs)
    return (
        <>
            <LayoutPelamar
                auth={user.auth}
                errors={user.errors}
                header={<p className="text-xl font-bold">Detail Information Jobs</p>}
                footer={<h5 className="text-center">Copyright KoTA 202 ©️ All Reserved</h5>}
            >
                <div className="p-5">
                    <CardDetailJobs getIdJobs={getIdJobs} auth={auth}/>
                </div>

            </LayoutPelamar>
        </>
    )
}
export default DetailJobs
