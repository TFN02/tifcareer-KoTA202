<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\JobsCollection;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{

    public function index(Request $request)
    {
        $keyword = $request->keyword;
        $jobs = Job::with('company', 'assignmentVideoResume', 'jobCategory')->where('job_position', 'LIKE', '%' . $keyword . '%')->OrderByDesc('updated_at')->get();

        $currentDate = date("Y-m-d");
        foreach ($jobs as $job){
            if($job->end_date >= $currentDate){
                $job->is_active = false;
                $job->save();
            }else if($job->end_date < $currentDate){
                $job->is_active = true;
                $job->save(); 
            }
        }

        $jobss = Job::with('company', 'assignmentVideoResume', 'jobCategory')->where('job_position', 'LIKE', '%' . $keyword . '%')
        ->where('is_active',0)->OrderByDesc('updated_at')->paginate(9);

        $jobss = new JobsCollection($jobss);
        

        return inertia::render('Pelamar/LowonganKerja', [
            'jobs' => $jobss,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jobs = new Job();
        $jobs->posisiPekerjaan = $request->posisiPekerjaan;
        $jobs->jenisPekerjaan = $request->jenisPekerjaan;
        $jobs->lokasi = $request->lokasi;
        $jobs->gajih = $request->gajih;
        $jobs->author = auth()->user()->company_id;
        $jobs->save();
        return redirect()->back()->with('message', 'Lowongan Kerja Berhasil di Upload');
    }

    public function show(Job $jobs)
    {
        $myJobs = $jobs::where('company_id', auth()->user()->company_id)->get();
        return inertia::render('Perusahaan/LowonganKerjaPerusahaan', [
            'myJobs' => $myJobs,
        ]);
    }

    public function detailJobs(Job $jobs , Request $request)
    {  
            return Inertia::render('Jobs/DetailJobs', [
                'getIdJobs' => $jobs->find($request->id),
            ]);
    }

    public function detailJobPerusahaan(Job $jobs , Request $request)
    {  
        $job = Job::find($request->id);
        if($job->has('application')){
            $job->is_selection_1 = 1;
            $job->save();
        }
            return Inertia::render('Perusahaan/RankApplicants', [
                'getIdJobs' => $jobs->find($request->id),
            ]);
    }

    public function listVideoResume(Job $jobs, Request $request)
    {
        return Inertia::render('Perusahaan/VideoResumeApplicants',[
            'getIdJobs' => $jobs->find($request->id),
        ]);
    }

    public function videoApplicant(Application $application, Request $request)
    {
        return Inertia::render('Perusahaan/VideoApplicant',[
            'getIdApplication' => $application->find($request->id),
        ]);
    }

    public function edit(Job $jobs, Request $request)
    {
        return Inertia::render('Perusahaan/EditLoker', [
            'myJobs' => $jobs->find($request->id)
        ]);
    }

    public function update(Request $request)
    {
        Job::where('id', $request->id)->update([
            'posisiPekerjaan' => $request->posisiPekerjaan,
            'jenisPekerjaan' => $request->jenisPekerjaan,
            'lokasi' => $request->lokasi,
            'gajih' => $request->gajih,
        ]);
        return to_route('LowonganKerjaPerusahaan');
    }

    public function destroy(Job $jobs)
    {
        //
    }
}
