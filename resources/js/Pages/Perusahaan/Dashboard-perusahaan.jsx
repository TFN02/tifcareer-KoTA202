import { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";

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

    const [selectedCriteria, setSelectedCriteria] = useState("");
    const [criteriaName, setCriteriaName] = useState("");
    const [criteriaWeight, setCriteriaWeight] = useState("");
    const [showVariableInput, setShowVariableInput] = useState(false);
    const [variableName, setVariableName] = useState("");
    const [variableWeight, setVariableWeight] = useState("");

    const handleCriteriaChange = (e) => {
        setCriteriaName(e.target.value);
        setCriteriaWeight(e.target.value);
        setShowVariableInput(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mengirim data job
        const jobData = {
          company_id: auth.user.company_id,
          title: title,
          job_position: job_position,
          job_desc: job_desc,
          qualification: qualification,
          location: location,
          salary: salary,
          status: status,
          start_date: start_date,
          end_date: end_date,
          job_category: job_category,
        };
        const jobResponse = await axios.post(
          "http://localhost:8000/api/jobs",
          jobData
        );
        const jobId = jobResponse.data.id;

        // Mengecek apakah ada data weighting criteria
        if (criteriaName && criteriaWeight) {
          // Mengirim data weighting criteria
          const criteriaData = {
            job_id: jobId,
            name: criteriaName,
            weight: criteriaWeight,
          };
          const criteriaResponse = await axios.post(
            "http://localhost:8000/api/weightingCriterias",
            criteriaData
          );
          const criteriaId = criteriaResponse.data.id;

          // Mengecek apakah ada data weighting variable
          if (variableName && variableWeight) {
            // Mengirim data weighting variable
            const variableData = {
              job_id: jobId,
              weighting_criteria_id: criteriaId,
              name: variableName,
              weight: variableWeight,
            };
            await axios.post(
              "http://localhost:8000/api/weightingVariables",
              variableData
            );
          }
        }

        // Reset nilai inputan setelah submit
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
        setCriteriaName("");
        setCriteriaWeight("");
        setVariableName("");
        setVariableWeight("");
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
                                        <span class="label-text mt-3">
                                            Job Title
                                        </span>
                                    </label>
                                    <input
                                        class="input input-bordered w-full m-0 mb-3 bg-slate-200 text-black"
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label class="label" htmlFor={job_position}>
                                        <span class="label-text">
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
                                    <label class="label" htmlFor={job_desc}>
                                        <span class="label-text">
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
                                    <label class="label" htmlFor={job_category}>
                                        <span class="label-text">
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
                                    <label class="label" htmlFor={location}>
                                        <span class="label-text">
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
                                    <label class="label" htmlFor={salary}>
                                        <span class="label-text">
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
                                        class="label"
                                        htmlFor={qualification}
                                    >
                                        <span class="label-text">
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
                                    <label class="label" htmlFor={status}>
                                        <span class="label-text">
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
                                <div class="flex space-x-4">
                                    <div class="w-1/2">
                                        <label
                                            class="label"
                                            htmlFor={start_date}
                                        >
                                            <span class="label-text">
                                                Job Opening
                                            </span>
                                        </label>
                                        <input
                                            className="m-0 input input-bordered w-full mb-3 bg-slate-200 text-black"
                                            type="date"
                                            id="start_date"
                                            value={start_date}
                                            onChange={(e) =>
                                                setStartDate(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div class="w-1/2">
                                        <label class="label" htmlFor={end_date}>
                                            <span class="label-text">
                                                Job Closed
                                            </span>
                                        </label>
                                        <input
                                            className="m-0 input input-bordered w-full mb-5 bg-slate-200 text-black"
                                            type="date"
                                            id="end_date"
                                            value={end_date}
                                            onChange={(e) =>
                                                setEndDate(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Persyaratan
                            </h2>

                            {/* kolom pembobotan */}

                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-3 border bg-slate-100">
                                {/* Criteria name and weight */}
                            </div>

                            {/* CONTOH FIX */}
                            <div className="space-y-4">
                                {/* Form input weighting criteria */}
                                <div>
                                    <label
                                        htmlFor="criteriaName"
                                        className="text-lg font-semibold"
                                    >
                                        Nama Kriteria
                                    </label>
                                    <input
                                        id="criteriaName"
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-4 py-2"
                                        value={criteriaName}
                                        onChange={(e) =>
                                            setCriteriaName(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="criteriaWeight"
                                        className="text-lg font-semibold"
                                    >
                                        Bobot Kriteria
                                    </label>
                                    <input
                                        id="criteriaWeight"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="1"
                                        className="w-full border border-gray-300 rounded px-4 py-2"
                                        value={criteriaWeight}
                                        onChange={(e) =>
                                            setCriteriaWeight(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {criteriaName && (
                                <div className="mt-4">
                                    {/* Form input weighting variable */}
                                    <label
                                        htmlFor="variableName"
                                        className="text-lg font-semibold"
                                    >
                                        Nama Variable
                                    </label>
                                    <input
                                        id="variableName"
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-4 py-2"
                                        value={variableName}
                                        onChange={(e) =>
                                            setVariableName(e.target.value)
                                        }
                                    />

                                    <label
                                        htmlFor="variableWeight"
                                        className="text-lg font-semibold"
                                    >
                                        Bobot Variable
                                    </label>
                                    <input
                                        id="variableWeight"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="1"
                                        className="w-full border border-gray-300 rounded px-4 py-2"
                                        value={variableWeight}
                                        onChange={(e) =>
                                            setVariableWeight(e.target.value)
                                        }
                                    />
                                </div>
                            )}

                            <PrimaryButton
                                className="m-3 flex flex-row-reverse"
                                type="submit"
                            >
                                Create Job
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutPerusahaan>
    );
};

export default Dashboard;
