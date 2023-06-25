import React, { useEffect, useState } from "react";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { Head, Link, usePage } from "@inertiajs/react";
import WarningButton from "@/Components/WarningButton";
import axios from "axios";

export default function EditLoker({ myJobs, applicant }) {
    const user = usePage().props;
    const company_id = usePage().props.auth.user.company_id;

    console.log("data di carddetail", myJobs);

    const id = myJobs.id;
    // const jobId = job.id;

    const [title, setTitle] = useState("");
    const [job_position, setJobPosition] = useState("");
    const [job_desc, setJobDescription] = useState("");
    // const [qualification, setQualification] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    // const [status, setStatus] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [job_category, setJobCategoryId] = useState("");
    const [job_categories, setJobCategories] = useState([]);

    const [weighting_criteria, setWeightingCriteria] = useState([]);
    const [weighting_variable, setWeightingVariable] = useState([]);

    const [applications, setApplications] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [allApplications, setAllApplications] = useState([]);

    const [selectedApplicants, setSelectedApplicants] = useState(0);
    const [selectedApplicantsList, setSelectedApplicantsList] = useState([]);

    const [message, setMessage] = useState("");
    const [showMessageInput, setShowMessageInput] = useState(false);

    useEffect(() => {
        const getDataDetailJobs = async () => {
            const { data } = await axios.get(
                `/api/jobs/${id}`
            );
            const datas = data.data;

            console.log("cek data", datas);

            setTitle(datas.title);
            setJobPosition(datas.job_position);
            setJobDescription(datas.job_desc);
            setLocation(datas.location);
            setSalary(datas.salary);
            setStartDate(datas.start_date);
            setEndDate(datas.end_date);
            // setQualification(datas.qualification);
            // setStatus(datas.status);
            setJobDescription(datas.job_desc);
            setWeightingCriteria(datas.weighting_criteria);
            setWeightingVariable(datas.weighting_variable);

            const response = await axios.get(
                `/api/jobs/${id}/applicants`
            );
            setAllApplications(response.data.data);
        };
        getDataDetailJobs();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const data = {
                title: title,
                job_position: job_position,
                job_desc: job_desc,
                location: location,
                salary: salary,
                start_date: start_date,
                end_date: end_date
            };

            const response = await axios.put(`/api/jobs/${id}`, data);
            console.log("Response:", response.data); // Tampilkan respons dari server
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <LayoutPerusahaan
            auth={user.auth}
            errors={user.errors}
            footer={
                <h5 className="text-center">
                    Copyright KoTA 202 ©️ All Reserved
                </h5>
            }
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Lowongan Kerja
                </h2>
            }
        >
            <Head title="Edit Loker Aktif" />

            {/* Tampilkan dan atur input form sesuai dengan data job */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-3 border bg-slate-100">
                <div>
                    <label className="label" htmlFor={title}>
                        <span class="label-text mt-3">Job Title</span>
                    </label>
                    <input
                        class="input input-bordered w-full m-0 mb-3 bg-bright text-black"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={job_position}>
                        <span class="label-text">Job Position</span>
                    </label>
                    <input
                        className="input input-bordered w-full m-0 mb-3 bg-bright text-black"
                        type="text"
                        id="job_position"
                        value={job_position}
                        onChange={(e) => setJobPosition(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={job_desc}>
                        <span class="label-text">Job Description</span>
                    </label>
                    <textarea
                        className="m-0 input input-bordered w-full mb-3 bg-bright text-black"
                        type="text"
                        id="job_desc"
                        value={job_desc}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={job_category}>
                        <span class="label-text">Job Category</span>
                    </label>
                    <select
                        className="m-0 input input-bordered w-full mb-3 bg-bright text-black"
                        id="job_category"
                        value={job_category}
                        onChange={(e) => setJobCategoryId(e.target.value)}
                    >
                        <option value="">Select a Category</option>
                        {job_categories.map((job_category) => (
                            <option
                                key={job_category.id}
                                value={job_category.name}
                            >
                                {job_category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label class="label" htmlFor={location}>
                        <span class="label-text">Job Location</span>
                    </label>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-bright text-black"
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div>
                    <label class="label" htmlFor={salary}>
                        <span class="label-text">Job Salary</span>
                    </label>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-bright text-black"
                        type="text"
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>

                {/* <div>
                    <label class="label" htmlFor={qualification}>
                        <span class="label-text">Job Qualification</span>
                    </label>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-bright text-black"
                        type="text"
                        id="salary"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                    />
                </div> */}

                {/* <div>
                    <label class="label" htmlFor={status}>
                        <span class="label-text">Job Status</span>
                    </label>
                    <input
                        className="m-0 input input-bordered w-full mb-3 bg-bright text-black"
                        type="text"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div> */}
                <div class="flex space-x-4">
                    <div class="w-1/2">
                        <label class="label" htmlFor={start_date}>
                            <span class="label-text">Job Opening</span>
                        </label>
                        <input
                            className="m-0 input input-bordered w-full mb-3 bg-bright text-black"
                            type="date"
                            id="start_date"
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div class="w-1/2">
                        <label class="label" htmlFor={end_date}>
                            <span class="label-text">Job Closed</span>
                        </label>
                        <input
                            className="m-0 input input-bordered w-full mb-5 bg-bright text-black"
                            type="date"
                            id="end_date"
                            value={end_date}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="my-8">
                    <h3 className="text-xl font-semibold mb-3">
                        Weighting Criteria
                    </h3>
                    {weighting_criteria.map((criteria, criteriaIndex) => {
                        return (
                            <div className="border px-4 py-5 m-5" key={criteriaIndex}>
                                <div className="border px-4 py-2">
                                    <input
                                        type="text"
                                        value={criteria.name}
                                        onChange={(e) => {
                                            const updatedCriteria = [
                                                ...weighting_criteria,
                                            ];
                                            updatedCriteria[
                                                criteriaIndex
                                            ].name = e.target.value;
                                            setWeightingCriteria(
                                                updatedCriteria
                                            );
                                        }}
                                        readOnly
                                        placeholder="Criteria Name"
                                        className="block w-full border border-gray-300 rounded py-2 px-3 bg-slate-200"
                                    />
                                    <input
                                        type="text"
                                        value={criteria.weight}
                                        onChange={(e) => {
                                            const updatedCriteria = [
                                                ...weighting_criteria,
                                            ];
                                            updatedCriteria[
                                                criteriaIndex
                                            ].weight = e.target.value;
                                            setWeightingCriteria(
                                                updatedCriteria
                                            );
                                        }}
                                        readOnly
                                        placeholder="Criteria Weight"
                                        className="block w-full border border-gray-300 rounded py-2 px-3 mt-2 bg-slate-200"
                                    />
                                </div>
                                {weighting_variable
                                    .filter(
                                        (variable) =>
                                            variable.weighting_criteria_id ===
                                            criteria.id
                                    )
                                    .map((variable, variableIndex) => (
                                        <div
                                            key={variableIndex}
                                            className="px-8 py-2 ml-8"
                                        >
                                            <input
                                                type="text"
                                                value={variable.name}
                                                onChange={(e) => {
                                                    const updatedVariables = [
                                                        ...weighting_variable,
                                                    ];
                                                    updatedVariables
                                                        .filter(
                                                            (v) =>
                                                                v.weighting_criteria_id ===
                                                                criteria.id
                                                        )
                                                        .find(
                                                            (v) =>
                                                                v.id ===
                                                                variable.id
                                                        ).name = e.target.value;
                                                    setWeightingVariable(
                                                        updatedVariables
                                                    );
                                                }}
                                                readOnly
                                                placeholder="Variable Name"
                                                className="block w-full border border-gray-300 rounded py-2 px-3 bg-slate-200"
                                            />
                                            <input
                                                type="text"
                                                value={variable.weight}
                                                onChange={(e) => {
                                                    const updatedVariables = [
                                                        ...weighting_variable,
                                                    ];
                                                    updatedVariables.find(
                                                        (v) =>
                                                            v.id === variable.id
                                                    ).weight = e.target.value;
                                                    setWeightingVariable(
                                                        updatedVariables
                                                    );
                                                }}
                                                readOnly
                                                placeholder="Variable Weight"
                                                className="block w-full border border-gray-300 rounded py-2 px-3 mt-2 bg-slate-200"
                                            />
                                        </div>
                                    ))}
                            </div>
                        );
                    })}
                </div>

                <WarningButton
                    className="m-2 flex flex-row-reverse"
                    onClick={() => handleSubmit()}
                >
                    Update
                </WarningButton>
            </div>
        </LayoutPerusahaan>
    );
}
