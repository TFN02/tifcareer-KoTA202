import Modal from "@/Components/Modal"
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link } from "@inertiajs/react";
import { useState } from "react";
// import route from "vendor/tightenco/ziggy/src/js";

const ModalVerification = () => {
    const [show, setShow] = useState(true);

    return (
        <div className="card bg-white">
            <div className="card-body">
                <Modal show={show}>
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 uppercase">
                            Data Anda Sedang Masuk Kedalam Tahap Verifikasi !
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Silahkan cek secara berkala dengan menekan tombol login again ! proses maksimal 2x24 Jam. 
                        </p>
                        <div className="mt-6 flex justify-end">
                            
                            <Link href="/login"><PrimaryButton>Login again !</PrimaryButton></Link>
                        </div>
                    </div>
                </Modal>

            </div>
        </div>
    )
}
export default ModalVerification