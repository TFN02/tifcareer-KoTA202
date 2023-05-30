import DynamicTextInput from "@/Components/DynamicTextInput";
import LayoutPelamar from "@/Layouts/LayoutPelamar";
import { Link } from "@inertiajs/react";
import { useState } from "react";

const DetailNotification = (props) => {

    // const user = auth.user.name;
    console.log(props);
    const id = props.idNotif;
    console.log("ambil detail", id);

    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'video/mp4') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert('Mohon pilih file dengan format .mp4');
    }
  };

    return (
        <LayoutPelamar
            auth={props.auth}
            errors={props.errors}
            footer={<h5 className="text-center">Copyright KoTA 202 ©️ All Reserved</h5>}
        >
            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><h1 className='text-lg text-white bg-violet-700 w-full p-5'>Informasi Seleksi Video Resume</h1></figure>
                    <div className="card-body">
                        <p>Selamat Adhitia, karena telah lolos tahapan seleksi data pelamar!
                            Berikut merupakan beberapa pertanyaan yang harus Anda jawab dalam bentuk resume sebagai bahan penilaian dan pertimbangan perusahaan. Harap dilakukan dengan memenuhi persyaratan-persayaratan yang tertulis dibawah ini dengan tidak melupakan batas waktu upload video resume itu sendiri.
                            Semoga berhasil! </p>
                        <div className="card mb-3 bg-white shadow sm:rounded-lg">
                            <figure>
                                <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                    Persyaratan Video Resume
                                </h1>
                            </figure>
                            <div className="card-body flex flex-row gap-10">
                                <p>1. Latar belakang video menggunakan greenscreen <br />
                                    2. Pelamar kerja menggunakan kemeja putih dan celana hitam <br />
                                    3. Video memperlihatkan full body pada pelamar <br />
                                    4. Durasi menjawab pertanyaan maksimal 2 menit per pertanyaan <br />
                                    5. Pelamar wajib menginputkan rentang waktu jawaban per pertanyaan pada deskripsi video (Melakukan timestamp untuk jawaban)</p>
                            </div>
                        </div>
                        <div className="card mb-3 bg-white shadow sm:rounded-lg">
                            <figure>
                                <h1 className='text-md text-white bg-violet-700 w-full p-3 flex justify-between'>
                                    Pertanyaan Interview
                                </h1>
                            </figure>
                            <div className="card-body flex flex-row gap-10">
                                <p>1. Sebutkan softskill yang kamu miliki <br />
                                    2. Bagaimana kamu mendeskripsikan diri kamu? <br />
                                    3. Bagaimana cara kamu menyelesaikan masalah? <br />
                                    4. Bagaimana cara kamu menghadapi overwhelming dan lingkungan kerja yang toxic? <br />
                                    5. Sejauh mana pengalaman kerja kamu dibidang yang sesuai dengan yang kamu lamar? <br />
                                    6. Seberapa percaya diri kamu untuk bergabung di PT Padepokan Tujuh Sembilan? <br />
                                    7. Apa kelebihan dan kekurangan kamu?<br />
                                    8. Mengapa kita harus memilih kamu?</p>
                            </div>
                        </div>
                        <p className="font-bold">Batas waktu pengumpulan video resume: 13 Desember 2023</p>

                        <input type="file" accept=".mp4" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-7xl" />
                        {selectedFile && <p>File yang dipilih: {selectedFile.name}</p>}
                        <div className="card bg-white shadow sm:rounded-lg">
                            <figure>
                            <p className="font-bold text-md text-white bg-violet-700 w-full p-3 flex justify-between">Informasi Waktu Jawaban Video Resume</p>
                            </figure>

                            <div className="card-body">
                            <p className="">Inputkan waktu (dalam satuan menit) anda memulai menjawab pertanyaan. <br />
                            Misal: <br />
                            Pertanyaan 1: 1 (yang berarti dimulai pada menit ke-1) <br />
                            Pertanyaan 2: 3 (yang berarti dimulai pada menit ke-3) <br />
                            Pertanyaan 3: 5 (yang berarti dimulai pada menit ke-5) <br />
                            Dst ...</p>
                            <strong>Wajib memberikan informasi waktu untuk seluruh pertanyaan !</strong>
                            <hr />
                            <DynamicTextInput />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div> */}

            </div>
        </LayoutPelamar>
    )
}
export default DetailNotification