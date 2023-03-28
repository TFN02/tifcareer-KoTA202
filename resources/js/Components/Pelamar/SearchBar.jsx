const SearchBar = () => {
    return (
        <div method="GET" className="form-control mx-5">
            <div className="input-group">
                <input name="keyword" type="text" placeholder="Masukan Posisi Kerja yang di inginkan .." className="input input-bordered border-black text-black bg-white w-full" />
                <button className="btn btn-square bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
            </div>
        </div>
    )
}
export default SearchBar