import { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { Await } from "react-router-dom";

const Dashboard = ({ auth }) => {
    const company_id = usePage().props.auth.user.company_id;
    const user = usePage();

    console.log(user);

    const [title, setTitle] = useState("");
    const [job_position, setJobPosition] = useState("");
    const [job_desc, setJobDescription] = useState("");
    const [qualification, setQualification] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [job_category, setJobCategoryId] = useState("");
    const [job_categories, setJobCategories] = useState([]);

    const [weighting_criteria, setWeightingCriteria] = useState([]);
    const [weighting_variable, setWeightingVariable] = useState([]);
    const [availableCriteriaOptions, setAvailableCriteriaOptions] = useState([
        { value: "education", label: "Education" },
        { value: "skill", label: "Skill" },
        { value: "work_experience", label: "Work Experience" },
        { value: "interest_area", label: "Interest Area" },
    ]);

    const handleAddCriteria = () => {
        setWeightingCriteria([
            ...weighting_criteria,
            { name: "", weight: 0, weighting_variable: [] },
        ]);
    };

    const handleRemoveCriteria = (index) => {
        const updatedCriteria = [...weighting_criteria];
        updatedCriteria.splice(index, 1);
        setWeightingCriteria(updatedCriteria);
    };



    const handleAddVariable = (criteriaIndex) => {
        const updatedCriteria = [...weighting_criteria];
        if (updatedCriteria[criteriaIndex].name === "education") {
            updatedCriteria[criteriaIndex].weighting_variable.push({
                name: { level: "", major: "" },
                weight: 0,
            });
        } else if (updatedCriteria[criteriaIndex].name === "skill") {
            updatedCriteria[criteriaIndex].weighting_variable.push({
                name: { nameSkill: "" },
                weight: 0,
            });
        } else if (updatedCriteria[criteriaIndex].name === "work_experience") {
            updatedCriteria[criteriaIndex].weighting_variable.push({
                name: { position: "", year: "" },
                weight: 0,
            });
        } else if (updatedCriteria[criteriaIndex].name === "interest_area") {
            updatedCriteria[criteriaIndex].weighting_variable.push({
                name: { nameOfInterest: "" },
                weight: 0,
            });
        }
        setWeightingCriteria(updatedCriteria);
    };

    const handleRemoveVariable = (criteriaIndex, variableIndex) => {
        const updatedCriteria = [...weighting_criteria];
        updatedCriteria[criteriaIndex].weighting_variable.splice(
            variableIndex,
            1
        );
        setWeightingCriteria(updatedCriteria);
    };

    const handleCriteriaChange = (criteriaIndex, selectedValue) => {
        const updatedCriteria = [...weighting_criteria];
        updatedCriteria[criteriaIndex].name = selectedValue;

        // Remove the selected option from the available options
        const updatedAvailableOptions = availableCriteriaOptions.filter(
            (option) => option.value !== selectedValue
        );

        setWeightingCriteria(updatedCriteria);
        setAvailableCriteriaOptions(updatedAvailableOptions);
    };

    const handleStartDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        // Mengubah waktu pada tanggal hari ini ke 00:00:00
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate >= currentDate) {
            setStartDate(e.target.value);
        } else {
            console.log(
                "Mohon pilih tanggal yang valid (hari ini atau seterusnya)."
            );
        }
    };

    const handleEndDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const startDate = new Date(start_date);

        if (selectedDate >= startDate) {
            setEndDate(e.target.value);
        } else {
            console.log(
                "Mohon pilih tanggal yang valid (setelah Job Opening)."
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let jobData = {};

        if (
            title &&
            job_position &&
            job_desc &&
            qualification &&
            location &&
            salary &&
            status &&
            start_date &&
            end_date &&
            job_category &&
            weighting_criteria &&
            weighting_variable
        ) {
            const updatedWeightingCriteria = weighting_criteria.map(
                (criteria) => ({
                    name: criteria.name,
                    weight: criteria.weight,
                    weighting_variable: criteria.weighting_variable.map(
                        (variable) => ({
                            criteria: criteria.name,
                            name: variable.name,
                            weight: variable.weight,
                        })
                    ),
                })
            );

            const updatedWeightingVariable = [];

            updatedWeightingCriteria.forEach((criteria) => {
                updatedWeightingVariable.push(...criteria.weighting_variable);
            });

            jobData = {
                company_id: company_id,
                title: title,
                job_position: job_position,
                job_desc: job_desc,
                qualification: qualification,
                location: location,
                salary: salary,
                start_date: start_date,
                end_date: end_date,
                job_category: job_category,
                weighting_criteria: updatedWeightingCriteria,
                weighting_variable: updatedWeightingVariable,
            };

            try {
                const response = await axios.post(
                    `http://localhost:8000/api/jobs`,
                    jobData
                );

                console.log("Job berhasil dibuat:", response.data);

                setTitle("");
                setJobPosition("");
                setJobDescription("");
                setQualification("");
                setLocation("");
                setSalary("");
                setStatus("");
                setStartDate("");
                setEndDate("");
                setJobCategoryId("");
                setWeightingCriteria([]);
                setWeightingVariable([]);

                // router.replace(
                //     `http://localhost:8000/api/jobs/${response.data.job_id}`
                // );
            } catch (error) {
                console.log(error);
            }
        } else {
            const emptyFields = [];
            if (!title) emptyFields.push("Title");
            if (!job_position) emptyFields.push("Job Position");
            if (!job_desc) emptyFields.push("Job Description");
            if (!qualification) emptyFields.push("Qualification");
            if (!location) emptyFields.push("Location");
            if (!salary) emptyFields.push("Salary");
            if (!status) emptyFields.push("Status");
            if (!start_date) emptyFields.push("Start Date");
            if (!end_date) emptyFields.push("End Date");
            if (!job_category) emptyFields.push("Job Category");
            if (weighting_criteria) emptyFields.push("Weighting Criteria");
            if (weighting_criteria.length === 0)
                emptyFields.push("Weighting Criteria");

            console.log(
                `Mohon isi semua field dan kriteria penilaian. Field yang masih kosong: ${emptyFields.join(
                    ", "
                )}`
            );
        }
    };

    useEffect(() => {
        const getJobCategory = async () => {
            const { data } = await axios.get(
                `http://localhost:8000/api/jobCategories`
            );
            const datas = data.data.data;
            setJobCategories(datas);
        };

        getJobCategory();
    }, []);

    console.log("cek kategori", job_categories);

    return (
        <LayoutPerusahaan
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Formulir Unggahan Lowongan Pekerjaan
                </h2>
            }
        >
            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Rincian Lowongan Pekerjaan
                            </h2>
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-3 border bg-slate-100">
                                <div>
                                    <label className="label" htmlFor={title}>
                                        <span className="label-text mt-3">
                                            Job Title
                                        </span>
                                    </label>
                                    <input
                                        className="input input-bordered w-full m-0 mb-3 bg-slate-200 text-black"
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className="label"
                                        htmlFor={job_position}
                                    >
                                        <span className="label-text">
                                            Job Position
                                        </span>
                                    </label>
                                    <input
                                        className="input input-bordered w-full m-0 mb-3 bg-slate-200 text-black"
                                        type="text"
                                        id="job_position"
                                        value={job_position}
                                        onChange={(e) =>
                                            setJobPosition(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label" htmlFor={job_desc}>
                                        <span className="label-text">
                                            Job Description
                                        </span>
                                    </label>
                                    <textarea
                                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                        type="text"
                                        id="job_desc"
                                        value={job_desc}
                                        onChange={(e) =>
                                            setJobDescription(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className="label"
                                        htmlFor={job_category}
                                    >
                                        <span className="label-text">
                                            Job Category
                                        </span>
                                    </label>
                                    <select
                                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                        id="job_category"
                                        value={job_category}
                                        onChange={(e) =>
                                            setJobCategoryId(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select a Category
                                        </option>
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
                                    <label className="label" htmlFor={location}>
                                        <span className="label-text">
                                            Job Location
                                        </span>
                                    </label>
                                    <input
                                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                        type="text"
                                        id="location"
                                        value={location}
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label" htmlFor={salary}>
                                        <span className="label-text">
                                            Job Salary
                                        </span>
                                    </label>
                                    <input
                                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                        type="text"
                                        id="salary"
                                        value={salary}
                                        onChange={(e) =>
                                            setSalary(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className="label"
                                        htmlFor={qualification}
                                    >
                                        <span className="label-text">
                                            Job Qualification
                                        </span>
                                    </label>
                                    <input
                                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                        type="text"
                                        id="salary"
                                        value={qualification}
                                        onChange={(e) =>
                                            setQualification(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label" htmlFor={status}>
                                        <span className="label-text">
                                            Job Status
                                        </span>
                                    </label>
                                    <input
                                        className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                        type="text"
                                        id="status"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label
                                            className="label"
                                            htmlFor={start_date}
                                        >
                                            <span className="label-text">
                                                Job Opening
                                            </span>
                                        </label>
                                        <input
                                            className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                            type="date"
                                            id="start_date"
                                            value={start_date}
                                            onChange={handleStartDateChange}
                                        />
                                    </div>

                                    <div className="w-1/2">
                                        <label
                                            className="label"
                                            htmlFor={end_date}
                                        >
                                            <span className="label-text">
                                                Job Closed
                                            </span>
                                        </label>
                                        <input
                                            className="m-0 input input-bordered w-full mb-5 bg-slate-200 text-black"
                                            type="date"
                                            id="end_date"
                                            value={end_date}
                                            onChange={handleEndDateChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Persyaratan
                            </h2>
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-3 border bg-slate-100">
                                <h2 className="text-lg font-medium mb-2 mt-3">
                                    Weighting Criteria
                                </h2>
                                {weighting_criteria.map(
                                    (criteria, criteriaIndex) => (
                                        <div
                                            key={criteriaIndex}
                                            className="mb-4"
                                        >
                                            <select
                                                value={criteria.name}
                                                onChange={(e) =>
                                                    handleCriteriaChange(
                                                        criteriaIndex,
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full border border-gray-300 rounded py-2 px-3 mb-2"
                                            >
                                                {criteria.name ? (
                                                    <option
                                                        value={criteria.name}
                                                    >
                                                        {criteria.name}
                                                    </option>
                                                ) : (
                                                    <option value="">
                                                        Pilih Kriteria
                                                    </option>
                                                )}
                                                {availableCriteriaOptions.map(
                                                    (option) => {
                                                        if (
                                                            option.value !==
                                                            criteria.name
                                                        ) {
                                                            return (
                                                                <option
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                        return null; // Hide the selected option from the dropdown
                                                    }
                                                )}
                                            </select>
                                            <input
                                                type="number"
                                                value={criteria.weight * 100}
                                                onChange={(e) => {
                                                    const updatedValue =
                                                        parseFloat(
                                                            e.target.value
                                                        ) / 100;
                                                    const updatedCriteria = [
                                                        ...weighting_criteria,
                                                    ];
                                                    updatedCriteria[
                                                        criteriaIndex
                                                    ].weight = updatedValue;
                                                    setWeightingCriteria(
                                                        updatedCriteria
                                                    );
                                                }}
                                                placeholder="Criteria Weight"
                                                className="block w-full border border-gray-300 rounded py-2 px-3"
                                                min={0}
                                                max={100}
                                                step={1}
                                            />

                                            {criteria.weighting_variable.map(
                                                (variable, variableIndex) => (
                                                    <div
                                                        key={variableIndex}
                                                        className="flex items-center mt-2"
                                                    >
                                                        {criteria.name ===
                                                            "education" && (
                                                            <div className="flex">
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        variable
                                                                            .name
                                                                            .level
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const updatedCriteria =
                                                                            [
                                                                                ...weighting_criteria,
                                                                            ];
                                                                        updatedCriteria[
                                                                            criteriaIndex
                                                                        ].weighting_variable[
                                                                            variableIndex
                                                                        ].name.level =
                                                                            e.target.value;
                                                                        setWeightingCriteria(
                                                                            updatedCriteria
                                                                        );
                                                                    }}
                                                                    placeholder="Level"
                                                                    className="block w-1/2 border border-gray-300 rounded py-2 px-3"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        variable
                                                                            .name
                                                                            .major
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const updatedCriteria =
                                                                            [
                                                                                ...weighting_criteria,
                                                                            ];
                                                                        updatedCriteria[
                                                                            criteriaIndex
                                                                        ].weighting_variable[
                                                                            variableIndex
                                                                        ].name.major =
                                                                            e.target.value;
                                                                        setWeightingCriteria(
                                                                            updatedCriteria
                                                                        );
                                                                    }}
                                                                    placeholder="Major"
                                                                    className="block w-1/2 border border-gray-300 rounded py-2 px-3 ml-2"
                                                                />
                                                            </div>
                                                        )}

                                                        {criteria.name ===
                                                            "skill" && (
                                                            <input
                                                                type="text"
                                                                value={
                                                                    variable
                                                                        .name
                                                                        .nameSkill
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const updatedCriteria =
                                                                        [
                                                                            ...weighting_criteria,
                                                                        ];
                                                                    updatedCriteria[
                                                                        criteriaIndex
                                                                    ].weighting_variable[
                                                                        variableIndex
                                                                    ].name.nameSkill =
                                                                        e.target.value;
                                                                    setWeightingCriteria(
                                                                        updatedCriteria
                                                                    );
                                                                }}
                                                                placeholder="Skill Name"
                                                                className="block w-1/2 border border-gray-300 rounded py-2 px-3"
                                                            />
                                                        )}

                                                        {criteria.name ===
                                                            "work_experience" && (
                                                            <div className="flex">
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        variable
                                                                            .name
                                                                            .position
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const updatedCriteria =
                                                                            [
                                                                                ...weighting_criteria,
                                                                            ];
                                                                        updatedCriteria[
                                                                            criteriaIndex
                                                                        ].weighting_variable[
                                                                            variableIndex
                                                                        ].name.position =
                                                                            e.target.value;
                                                                        setWeightingCriteria(
                                                                            updatedCriteria
                                                                        );
                                                                    }}
                                                                    placeholder="Position"
                                                                    className="block w-1/2 border border-gray-300 rounded py-2 px-3"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        variable
                                                                            .name
                                                                            .year
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const updatedCriteria =
                                                                            [
                                                                                ...weighting_criteria,
                                                                            ];
                                                                        updatedCriteria[
                                                                            criteriaIndex
                                                                        ].weighting_variable[
                                                                            variableIndex
                                                                        ].name.year =
                                                                            e.target.value;
                                                                        setWeightingCriteria(
                                                                            updatedCriteria
                                                                        );
                                                                    }}
                                                                    placeholder="Year"
                                                                    className="block w-1/2 border border-gray-300 rounded py-2 px-3 ml-2"
                                                                />
                                                            </div>
                                                        )}

                                                        {criteria.name ===
                                                            "interest_area" && (
                                                            <input
                                                                type="text"
                                                                value={
                                                                    variable
                                                                        .name
                                                                        .nameOfInterest
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const updatedCriteria =
                                                                        [
                                                                            ...weighting_criteria,
                                                                        ];
                                                                    updatedCriteria[
                                                                        criteriaIndex
                                                                    ].weighting_variable[
                                                                        variableIndex
                                                                    ].name.nameOfInterest =
                                                                        e.target.value;
                                                                    setWeightingCriteria(
                                                                        updatedCriteria
                                                                    );
                                                                }}
                                                                placeholder="Interest Area Name"
                                                                className="block w-1/2 border border-gray-300 rounded py-2 px-3"
                                                            />
                                                        )}

                                                        <input
                                                            type="number"
                                                            value={
                                                                variable.weight *
                                                                100
                                                            }
                                                            onChange={(e) => {
                                                                const updatedValue =
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) / 100;
                                                                const updatedCriteria =
                                                                    [
                                                                        ...weighting_criteria,
                                                                    ];
                                                                updatedCriteria[
                                                                    criteriaIndex
                                                                ].weighting_variable[
                                                                    variableIndex
                                                                ].weight = updatedValue;
                                                                setWeightingCriteria(
                                                                    updatedCriteria
                                                                );
                                                            }}
                                                            placeholder="Variable Weight"
                                                            className="block w-1/2 border border-gray-300 rounded py-2 px-3 ml-2"
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveVariable(
                                                                    criteriaIndex,
                                                                    variableIndex
                                                                )
                                                            }
                                                            className="ml-2 text-red-600 hover:text-red-800"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                )
                                            )}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleAddVariable(
                                                        criteriaIndex
                                                    )
                                                }
                                                className="btn btn-active btn-xs mt-3"
                                            >
                                                Add Variable
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveCriteria(
                                                        criteriaIndex
                                                    )
                                                }
                                                className="btn btn-error btn-xs mt-3"
                                            >
                                                Remove Criteria
                                            </button>
                                        </div>
                                    )
                                )}

                                <button
                                    type="button"
                                    onClick={handleAddCriteria}
                                    className="btn btn-active btn-sm mb-3"
                                >
                                    Add Criteria
                                </button>
                            </div>

                            {/* BATAS BAWAH EDIT */}

                            <PrimaryButton type="submit">Submit</PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutPerusahaan>
    );
};

export default Dashboard;
