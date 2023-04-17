<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobsRequest;
use App\Models\Companies;
use App\Models\Jobs;
use Illuminate\Http\Request;


class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function show(Jobs $jobs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function edit(Jobs $jobs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $job = Jobs::findOrFail($id); 
        
        $company = Companies::firstWhere('name','PT Jayandra');

        if($company != null){
            $job->company_id = $company->id;
            $job->title = $request->input('title');
            $job->job_position = $request->input('job_position');
            $job->qualification = $request->input('qualification');
            $job->job_desc = $request->input('job_desc');
            $job->location = $request->input('location');
            $job->salary = $request->input('salary');
            $job->status = $request->input('status');
            $job->start_date = $request->input('start_date');
            $job->end_date =  $request->input('end_date');
            $job->save();
        } 

        return response()->json([
            'success' => true,
            'data' => $job
        ]);

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
