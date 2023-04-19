<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;


class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jobs = Job::paginate(10);
        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);

    }

    public function store(Request $request)
    {
        $company = Company::firstWhere('name',$request->input('company_name'));

        if($company != null){
            $jobs = Job::create([
                'company_id' => $company->id,
                'title' => $request->input('title'),
                'job_position' => $request->input('job_position'),
                'qualification' => $request->input('qualification'),
                'job_desc' => $request->input('job_desc'),
                'location' => $request->input('location'),
                'salary' => $request->input('salary'),
                'status' => $request->input('status'),
                'start_date' => $request->input('start_date'),
                'end_date' =>  $request->input('end_date'),
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }

    public function show(Job $jobs)
    {
        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }


    public function update(Request $request, $id)
    {
        $jobs = Job::findOrFail($id); 
        
        $company = Company::firstWhere('name',$request->input('company_name'));

        if($company != null){
            $jobs->company_id = $company->id;
            $jobs->title = $request->input('title');
            $jobs->job_position = $request->input('job_position');
            $jobs->qualification = $request->input('qualification');
            $jobs->job_desc = $request->input('job_desc');
            $jobs->location = $request->input('location');
            $jobs->salary = $request->input('salary');
            $jobs->status = $request->input('status');
            $jobs->start_date = $request->input('start_date');
            $jobs->end_date =  $request->input('end_date');
            $jobs->save();
        } 

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);

    }

    public function destroy(Job $jobs, $id)
    {
        $jobs = Job::find($id);
        $jobs->delete();

        return response()->json([
            'message' => 'Jobs deleted',
            'data' => $jobs
        ]);
    }
}
