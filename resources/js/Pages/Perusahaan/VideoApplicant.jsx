import VideoGallery from "@/Components/VideoGallery"
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan"

const VideoApplicant = (props) => {
    return (
        <LayoutPerusahaan
            auth={props.auth}
            errors={props.errors}
        >
            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><p className="text-lg text-white bg-violet-700 w-full p-5">Video Resume <strong>Tegar Faris Nurhakim</strong></p></figure>
                    <div className="card-body">
                        <VideoGallery />
                    </div>
                </div>
            </div>
        </LayoutPerusahaan>
    )
}
export default VideoApplicant