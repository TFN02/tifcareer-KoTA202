import { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { Await } from "react-router-dom";

const DashboardPerusahaan = ({ auth }) => {
    const company_id = usePage().props.auth.user.company_id;
    const user = usePage();

    console.log(user);

    const [title, setTitle] = useState("");
    const [job_position, setJobPosition] = useState("");
    const [job_desc, setJobDescription] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [job_category, setJobCategoryId] = useState("");
    const [job_categories, setJobCategories] = useState([]);
    const [isDataSent, setIsDataSent] = useState(false);
    const [weighting_criteria, setWeightingCriteria] = useState([]);
    const [weighting_variable, setWeightingVariable] = useState([]);
    const [availableCriteriaOptions, setAvailableCriteriaOptions] = useState([
        { value: "education", label: "Education" },
        { value: "skill", label: "Skill" },
        { value: "work_experience", label: "Work Experience" },
        { value: "interest_area", label: "Interest Area" },
    ]);
    const [totalWeight, setTotalWeight] = useState(0);


    const handleAddCriteria = () => {
        const updatedCriteria = [...weighting_criteria];

        let totalWeight = 0;
        updatedCriteria.forEach((criteria) => {
            totalWeight += criteria.weight;
        });

        if (totalWeight > 1) {
            console.warn("Total bobot kriteria melebihi 100%!");
            return;
        }

        updatedCriteria.push({
            name: "",
            weight: 0,
            weighting_variable: [],
        });

        setWeightingCriteria(updatedCriteria);

        totalWeight += 0;

        setTotalWeight(totalWeight);
    };

    const handleCriteriaChange = (criteriaIndex, name, weight) => {
        const updatedCriteria = [...weighting_criteria];
        updatedCriteria[criteriaIndex].name = name;
        updatedCriteria[criteriaIndex].weight = weight;

        let totalWeight = 0;
        updatedCriteria.forEach((criteria) => {
            totalWeight += criteria.weight;
        });

        setWeightingCriteria(updatedCriteria);
        setTotalWeight(totalWeight);
    };

    const handleRemoveCriteria = (index) => {
        const updatedCriteria = [...weighting_criteria];
        updatedCriteria.splice(index, 1);

        let totalWeight = 0;
        updatedCriteria.forEach((criteria) => {
            totalWeight += criteria.weight;
        });

        setWeightingCriteria(updatedCriteria);
        setTotalWeight(totalWeight);

        setWeightingCriteria(updatedCriteria);
    };

    const handleAddVariable = (criteriaIndex) => {
        const updatedCriteria = [...weighting_criteria];
        if (updatedCriteria[criteriaIndex].name === "education") {
            const newWeightingVariable = {
                name: { level: "", major: "" },
                weight: 0,
            };

            updatedCriteria[criteriaIndex].weighting_variable.push(newWeightingVariable);

            const totalWeight = updatedCriteria[criteriaIndex].weighting_variable.reduce(
                (sum, variable) => sum + variable.weight,
                0
            );

            if (totalWeight > 1) {
                console.warn("Warning: Total weight exceeds 1");
                return;
            }
            // updatedCriteria[criteriaIndex].weighting_variable.push({
            //     name: { level: "", major: "" },
            //     weight: 0,
            // });
        } else if (updatedCriteria[criteriaIndex].name === "skill") {
            const newWeightingVariable = {
                name: { nameSkill: "" },
                weight: 0,
            };

            updatedCriteria[criteriaIndex].weighting_variable.push(newWeightingVariable);

            const totalWeight = updatedCriteria[criteriaIndex].weighting_variable.reduce(
                (sum, variable) => sum + variable.weight,
                0
            );

            if (totalWeight > 1) {
                console.warn("Warning: Total weight exceeds 1");
                return;
            }
            // updatedCriteria[criteriaIndex].weighting_variable.push({
            //     name: { nameSkill: "" },
            //     weight: 0,
            // });
        } else if (updatedCriteria[criteriaIndex].name === "work_experience") {
            const newWeightingVariable = {
                name: { position: "", year: "" },
                weight: 0,
            };

            updatedCriteria[criteriaIndex].weighting_variable.push(newWeightingVariable);

            const totalWeight = updatedCriteria[criteriaIndex].weighting_variable.reduce(
                (sum, variable) => sum + variable.weight,
                0
            );

            if (totalWeight > 1) {
                console.warn("Warning: Total weight exceeds 1");
                return;
            }
            // updatedCriteria[criteriaIndex].weighting_variable.push({
            //     name: { position: "", year: "" },
            //     weight: 0,
            // });
        } else if (updatedCriteria[criteriaIndex].name === "interest_area") {
            const newWeightingVariable = {
                name: {  nameOfInterest: "" },
                weight: 0,
            };

            updatedCriteria[criteriaIndex].weighting_variable.push(newWeightingVariable);

            const totalWeight = updatedCriteria[criteriaIndex].weighting_variable.reduce(
                (sum, variable) => sum + variable.weight,
                0
            );

            if (totalWeight > 1) {
                console.warn("Warning: Total weight exceeds 1");
                return;
            }
            // updatedCriteria[criteriaIndex].weighting_variable.push({
            //     name: { nameOfInterest: "" },
            //     weight: 0,
            // });
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
            location &&
            salary &&
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

            const totalCriteriaWeight = updatedWeightingCriteria.reduce((sum, criteria) => sum + criteria.weight, 0);

            if (totalCriteriaWeight > 1) {
              console.warn("Total weight exceeds 1 CRITERIA WEIGHT");
              return;
            } else if (totalCriteriaWeight < 1) {
              const remainingCriteriaWeight = 1 - totalCriteriaWeight;
            
              const nonZeroCriteriaCount = updatedWeightingCriteria.filter((criteria) => criteria.weight !== 0).length;
            
              const distributedCriteriaWeight = remainingCriteriaWeight / nonZeroCriteriaCount;
            
              updatedWeightingCriteria.forEach((criteria) => {
                if (criteria.weight !== 0) {
                  criteria.weight += distributedCriteriaWeight;
                }
              });
            
              console.log(distributedCriteriaWeight);
            }
            
            updatedWeightingCriteria.forEach((criteria) => {
              const totalVariableWeight = criteria.weighting_variable.reduce((sum, variable) => sum + variable.weight, 0);
            
              if (totalVariableWeight > 1) {
                console.warn("Total weight in a criteria exceeds 100");
                return;
              } else if (totalVariableWeight < 1) {
                const remainingVariableWeight = 1 - totalVariableWeight;
            
                const nonZeroVariableCount = criteria.weighting_variable.filter((variable) => variable.weight !== 0).length;
            
                const distributedVariableWeight = remainingVariableWeight / nonZeroVariableCount;
            
                criteria.weighting_variable.forEach((variable) => {
                  if (variable.weight !== 0) {
                    variable.weight += distributedVariableWeight;
                  }
                });
            
                console.log(distributedVariableWeight);
              }
            });
            
            

            const updatedWeightingVariable = [];

            updatedWeightingCriteria.forEach((criteria) => {
                updatedWeightingVariable.push(...criteria.weighting_variable);
            });

            jobData = {
                company_id: company_id,
                title: title,
                job_position: job_position,
                job_desc: job_desc,
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
                    `/api/jobs`,
                    jobData
                );

                console.log("Job berhasil dibuat:", response.data);
                setIsDataSent(true);
                setTitle("");
                setJobPosition("");
                setJobDescription("");
                setLocation("");
                setSalary("");
                setStartDate("");
                setEndDate("");
                setJobCategoryId("");
                setWeightingCriteria([]);
                setWeightingVariable([]);

                // router.replace(
                //     `/api/jobs/${response.data.job_id}`
                // );
            } catch (error) {
                console.log(error);
            }
        } else {
            const emptyFields = [];
            if (!title) emptyFields.push("Title");
            if (!job_position) emptyFields.push("Job Position");
            if (!job_desc) emptyFields.push("Job Description");
            if (!location) emptyFields.push("Location");
            if (!salary) emptyFields.push("Salary");
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
                `/api/jobCategories`
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
                    Halaman Rincian Lowongan Pekerjaan
                </h2>
            }
        >
            {/* <div className="py-5"> */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight  ml-2 p-2">
                                Formulir Unggahan Lowongan Kerja
                            </h2>
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-3 border bg-white rounded-lg">
                                <div>
                                    <label className="label" htmlFor={title}>
                                        <span className="label-text mt-3">
                                            Job Title
                                        </span>
                                    </label>
                                    <input
                                        className="input input-info w-full m-0 mb-3 text-black"
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
                                        className="input input-info w-full m-0 mb-3 text-black"
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
                                        className="m-0 input input-info w-full mb-3  text-black"
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
                                        className="m-0 input input-info w-full mb-3  text-black"
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
                                        className="m-0 input input-info w-full mb-3  text-black"
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
                                        className="m-0 input input-info w-full mb-3  text-black"
                                        type="text"
                                        id="salary"
                                        value={salary}
                                        onChange={(e) =>
                                            setSalary(e.target.value)
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
                                            className="m-0 input input-info w-full mb-3  text-black"
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
                                            className="m-0 input input-info w-full mb-5 text-black"
                                            type="date"
                                            id="end_date"
                                            value={end_date}
                                            onChange={handleEndDateChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="font-semibold text-xl text-gray-800 leading-tight ml-2">
                                Persyaratan
                            </h2>
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-3 border bg-white rounded-lg">
                                <h2 className="text-lg font-medium mb-2 mt-3">
                                    Weighting Criteria
                                </h2>
                                <div>Total Weight: {totalWeight}</div>
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
                                                        e.target.value,
                                                        criteria.weight
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
                                                        return null;
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
                                                    handleCriteriaChange(
                                                        criteriaIndex,
                                                        criteria.name,
                                                        updatedValue
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
                                                className="btn btn-active btn-xs mt-3 text-xs mr-2"
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
                                                className="btn btn-error btn-xs mt-3 text-xs"
                                            >
                                                Remove Criteria
                                            </button>
                                        </div>
                                    )
                                )}

                                <button
                                    type="button"
                                    onClick={handleAddCriteria}
                                    className="btn btn-active btn-sm mb-3 text-sm"
                                >
                                    Add Criteria
                                </button>
                            </div>

                            {/* BATAS BAWAH EDIT */}

                            <div className="flex flex-row gap-3">

                                <PrimaryButton 
                                disabled={weighting_criteria.length===0 && weighting_variable.length===0}
                                type="submit" className="btn-md w-full max-w-2lg flex justify-center">Submit</PrimaryButton>
                                {isDataSent && (
                                    <div className="alert bg-violet-500 flex justify-center items-center w-full p-2 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>Lowongan Kerja Berhasil Dibuat !</span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            {/* </div> */}
        </LayoutPerusahaan>
    );
};

export default DashboardPerusahaan;
