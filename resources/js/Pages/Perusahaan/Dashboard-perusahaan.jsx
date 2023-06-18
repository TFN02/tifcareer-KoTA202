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
    const [totalWeight, setTotalWeight] = useState(0);
    const [educationOptions, setEducationOptions] = useState([]);


  
    // Convert educationOptions to an array
    const educationOptionsArray = Object.keys(educationOptions).map((key) => ({
      value: key,
      label: educationOptions[key],
    }));

    const handleAddCriteria = () => {
        const updatedCriteria = [...weighting_criteria];

        let totalWeight = 0;
        updatedCriteria.forEach((criteria) => {
            totalWeight += criteria.weight;
        });

        if (totalWeight >= 1) {
            console.warn("Total bobot kriteria melebihi 100%!");
            return;
        }

        updatedCriteria.push({
            name: "",
            weight: 0,
            weighting_variable: [],
        });

        setWeightingCriteria(updatedCriteria);

        totalWeight += 0; // Tambahkan bobot kriteria baru ke totalWeight

        setTotalWeight(totalWeight);
    };

    const calculateTotalWeight = () => {
        let totalWeight = 0;
        weighting_criteria.forEach((criteria) => {
            totalWeight += criteria.weight;
        });
        return totalWeight;
    };

    const isTotalWeightValid = calculateTotalWeight() === 1;

    const handleRemoveCriteria = (index) => {
        const updatedCriteria = [...weighting_criteria];
        updatedCriteria.splice(index, 1);
        setWeightingCriteria(updatedCriteria);
    };

    const getEducationOptions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/educations"
            );
            const educationOptions = response.data;
            return educationOptions;
        } catch (error) {
            console.error("Error fetching education options:", error);
            return [];
        }
    };

    const getSkillOptions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/skills"
            ); // Ubah URL menjadi endpoint yang sesuai dengan API Anda
            const skillOptions = response.data; // Ubah bagian ini sesuai dengan format responsenya
            return skillOptions;
        } catch (error) {
            console.error("Error fetching skill options:", error);
            return [];
        }
    };

    const getInterestAreaOptions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/interestAreas"
            ); // Ubah URL menjadi endpoint yang sesuai dengan API Anda
            const interestAreaOptions = response.data; // Ubah bagian ini sesuai dengan format responsenya
            return interestAreaOptions;
        } catch (error) {
            console.error("Error fetching interest area options:", error);
            return [];
        }
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

    const handleVariableWeight = (criteriaIndex, variableIndex, weight) => {
        const updatedCriteria = [...weighting_criteria];
        const selectedCriteria = updatedCriteria[criteriaIndex];

        // Set bobot variable yang baru
        selectedCriteria.weighting_variable[variableIndex].weight = weight;

        // Hitung total bobot variable pada kriteria tertentu
        let variableWeightSum = 0;
        selectedCriteria.weighting_variable.forEach((variable) => {
            variableWeightSum += variable.weight;
        });

        // Periksa apakah total bobot variable melebihi 100
        if (variableWeightSum > 1) {
            // Tampilkan peringatan kepada pengguna
            console.warn("Total bobot variable melebihi 100!");

            // Set bobot variable kembali ke 0 jika melebihi 100
            selectedCriteria.weighting_variable[variableIndex].weight = 0;

            // Kembalikan state tanpa melakukan perubahan
            setWeightingCriteria(updatedCriteria);
            return;
        }

        // Hitung total bobot kriteria yang ada
        let totalWeight = 0;
        updatedCriteria.forEach((criteria) => {
            criteria.weighting_variable.forEach((variable) => {
                totalWeight += variable.weight;
            });
        });

        // Periksa apakah total bobot kriteria melebihi 100
        if (totalWeight > 1) {
            // Tampilkan peringatan kepada pengguna
            console.warn("Total bobot kriteria melebihi 100!");

            // Kembalikan state tanpa melakukan perubahan
            setWeightingCriteria(updatedCriteria);
            return;
        }

        // Update state dengan bobot variable yang telah diubah
        setWeightingCriteria(updatedCriteria);
    };

    const handleRemoveVariable = (criteriaIndex, variableIndex) => {
        const updatedCriteria = [...weighting_criteria];
        updatedCriteria[criteriaIndex].weighting_variable.splice(
            variableIndex,
            1
        );

        // Hitung total bobot kriteria yang ada
        let totalWeight = 0;
        updatedCriteria.forEach((criteria) => {
            totalWeight += criteria.weight;
        });

        // Periksa apakah total bobot melebihi 100
        if (totalWeight > 1) {
            // Tampilkan peringatan kepada pengguna
            console.warn("Total bobot kriteria melebihi 100!");
            // Anda juga dapat menggunakan notifikasi atau metode lain untuk menampilkan peringatan

            // Kembalikan state tanpa menghapus variabel
            return;
        }

        setWeightingCriteria(updatedCriteria);
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

    // Pengaturan Start Date Job
    const handleStartDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate >= currentDate) {
            setStartDate(e.target.value);
        } else {
            console.log(
                "Mohon pilih tanggal yang valid (hari ini atau seterusnya)."
            );
        }
    };

    // Pengaturan End Date Job
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

    // Submit Jum
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

            const updatedWeightingVariable = [];

            updatedWeightingCriteria.forEach((criteria) => {
                updatedWeightingVariable.push(...criteria.weighting_variable);
            });

            // Periksa apakah totalWeight melebihi 100%
            if (totalWeight > 1) {
                console.warn("Total bobot kriteria melebihi 100%!");
                return;
            } else if (totalWeight < 1) {
                // Bagikan sisa nilai ke kriteria yang diinputkan
                const remainingWeight = 1 - totalWeight;
                const nonZeroCriteriaCount = updatedWeightingCriteria.filter(
                    (criteria) => criteria.weight !== 0
                ).length;

                // Bagikan sisa nilai secara merata ke kriteria yang diinputkan
                const distributedWeight =
                    remainingWeight / nonZeroCriteriaCount;
                updatedWeightingCriteria.forEach((criteria) => {
                    if (criteria.weight !== 0) {
                        criteria.weight += distributedWeight;
                    }
                });

                console.log(distributedWeight);
            }

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
                    `http://localhost:8000/api/jobs`,
                    jobData
                );

                console.log("Job berhasil dibuat:", response.data);

                // setTitle("");
                // setJobPosition("");
                // setJobDescription("");
                // setLocation("");
                // setSalary("");
                // setStartDate("");
                // setEndDate("");
                // setQualification("");
                // setJobCategoryId("");
                // setWeightingCriteria([]);
                // setWeightingVariable([]);

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

    // Job Category
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

    useEffect(() => {
        const fetchEducationOptions = async () => {
          try {
            const response = await axios.get("http://localhost:8000/api/educations");
            const data = response.data.data.data;
            const educationOptions = data.map(option => ({
              label: option.level
            }));
            setEducationOptions(educationOptions);
          } catch (error) {
            console.error("Error fetching education options:", error);
            setEducationOptions([]);
          }
        };
      
        fetchEducationOptions();
      }, []);
      

    console.log("cek kategori", job_categories);
    // const educationOptions = getEducationOptions();
    console.log("Education Options:", educationOptionsArray);
    console.log("Education Options - Level:", educationOptionsArray.filter(option => option.label === "level"));


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
                                                                {criteria.weighting_variable.map(
                                                                    (
                                                                        variable,
                                                                        variableIndex
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                variableIndex
                                                                            }
                                                                            className="flex items-center mt-2"
                                                                        >
                                                                            <select
                value={variable.name.level}
                onChange={(e) => {
                  const updatedCriteria = [...weighting_criteria];
                  updatedCriteria[criteriaIndex].weighting_variable[
                    variableIndex
                  ].name.level = e.target.value;
                  setWeightingCriteria(updatedCriteria);
                }}
                className="block w-1/2 border border-gray-300 rounded py-2 px-3"
              >
                <option value="">Pilih Level</option>
                {educationOptions
                  .filter((option) => option.column === "level")
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
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
                                                                            <input
                                                                                type="number"
                                                                                value={
                                                                                    variable.weight *
                                                                                    100
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    const weight =
                                                                                        parseFloat(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        ) /
                                                                                        100;
                                                                                    const updatedCriteria =
                                                                                        [
                                                                                            ...weighting_criteria,
                                                                                        ];
                                                                                    const updatedCriteriaWithWeight =
                                                                                        handleVariableWeight(
                                                                                            updatedCriteria,
                                                                                            criteriaIndex,
                                                                                            variableIndex,
                                                                                            weight
                                                                                        );

                                                                                    if (
                                                                                        updatedCriteriaWithWeight
                                                                                    ) {
                                                                                        setWeightingCriteria(
                                                                                            updatedCriteriaWithWeight
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                placeholder="Variable Weight"
                                                                                className="block w-1/2 border border-gray-300 rounded py-2 px-3 ml-2"
                                                                                min={
                                                                                    0
                                                                                }
                                                                                max={
                                                                                    100
                                                                                }
                                                                                step={
                                                                                    1
                                                                                }
                                                                            />
                                                                        </div>
                                                                    )
                                                                )}
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
                                                                const weight =
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) / 100; // Mengonversi nilai bobot menjadi tipe float dan membaginya dengan 100
                                                                const updatedCriteria =
                                                                    [
                                                                        ...weighting_criteria,
                                                                    ];
                                                                const updatedCriteriaWithWeight =
                                                                    handleVariableWeight(
                                                                        updatedCriteria,
                                                                        criteriaIndex,
                                                                        variableIndex,
                                                                        weight
                                                                    );

                                                                if (
                                                                    updatedCriteriaWithWeight
                                                                ) {
                                                                    setWeightingCriteria(
                                                                        updatedCriteriaWithWeight
                                                                    );
                                                                }
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
