<?php

namespace App\Http\Controllers;

use App\Models\Jobs;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\JobsCollection;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $keyword = $request->keyword;
        $jobs = Jobs::where('jenisPekerjaan','LIKE', '%'.$keyword.'%')->OrderByDesc('updated_at')->paginate(9);
        $jobs = new JobsCollection($jobs);
        return inertia::render('Pelamar/LowonganKerja', [
            'jobs' => $jobs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $jobs = new Jobs();
        $jobs->posisiPekerjaan = $request->posisiPekerjaan;
        $jobs->jenisPekerjaan = $request->jenisPekerjaan;
        $jobs->lokasi = $request->lokasi;
        $jobs->gajih = $request->gajih;
        $jobs->author = auth()->user()->name;
        $jobs->save();
        return redirect()->back()->with('message', 'Lowongan Kerja Berhasil di Upload');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function show(Jobs $jobs)
    {
        $myJobs = $jobs::where('author',auth()->user()->name)->get();
        return inertia::render('Perusahaan/LowonganKerjaPerusahaan', [
            'myJobs' => $myJobs,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function edit(Jobs $jobs, Request $request)
    {
        return Inertia::render('Perusahaan/EditLoker', [
            'myJobs' => $jobs->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        Jobs::where('id', $request->id)->update([
            'posisiPekerjaan' => $request->posisiPekerjaan,
            'jenisPekerjaan' => $request->jenisPekerjaan,
            'lokasi' => $request->lokasi,
            'gajih' => $request->gajih,
        ]);
        return to_route('LowonganKerjaPerusahaan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function destroy(Jobs $jobs)
    {
        //
    }
}