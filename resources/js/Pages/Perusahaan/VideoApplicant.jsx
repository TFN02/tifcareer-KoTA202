import VideoGallery from "@/Components/VideoGallery"
import LayoutPerusahaan from "@/Layouts/LayoutPerusahaan"

const VideoApplicant = ({auth, errors, getIdApplication}) => {
    const idVideo = getIdApplication.video_resume_id;
    console.log("id Video",idVideo)
    return (
        <LayoutPerusahaan
            auth={auth}
            errors={errors}
        >
            <div className="p-5">

                <div className="card bg-white shadow sm:rounded-lg">
                    <figure><p className="text-lg text-white bg-violet-700 w-full p-5">Video Resume <strong>Tegar Faris Nurhakim</strong></p></figure>
                    <div className="card-body">
                        <VideoGallery idVideo={idVideo} />
                    </div>
                </div>
            </div>
        </LayoutPerusahaan>
    )
}
export default VideoApplicant