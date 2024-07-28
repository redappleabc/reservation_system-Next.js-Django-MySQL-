import Loader from "@/components/Loader";

const Loading = () => {
    return (
        <div className="d-flex align-items-center justify-content-center"
            style={{ width: "100vw", height: "100vh" }}>
            <Loader />
        </div>
    )
}

export default Loading;