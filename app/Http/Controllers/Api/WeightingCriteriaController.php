<?php

namespace App\Http\Controllers\Api;

use App\Models\WeightingCriteria;
use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WeightingCriteriaController extends Controller
{
    private int $job_id;

    public function index(Request $request)
    {
        $w_criteria = WeightingCriteria::with('job', 'weightingVariable');

        if($request->job_id){
            $this->job_id = $request->job_id;
            $w_criteria = $w_criteria->whereHas('job', function($query){
                            $query->where('job_id', $this->job_id);
            });
        }


        if($request->order_by && $request->order_type){
            $w_criteria = $w_criteria->orderBy($request->order_by, $request->order_type);
        }else{
            $w_criteria = $w_criteria->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $w_criteria->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'required|int',
            'name' => 'required|string|max:100',
            'weight' => 'required|numeric',
        ]);

        if($request->job_id){
            $job = Job::find($request->job_id);
            $job_id = $job->id;
        }

        $w_criteria = WeightingCriteria::create([
            'job_id' => $job_id,
            'name' => $request->name,
            'weight' => $request->weight,
        ]);


        return response()->json([
            'success' => true,
            'data' =>  $w_criteria,
        ]);
    }

    public function show($id)
    {
        $w_criteria = WeightingCriteria::with('job', 'weightingVariable')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $w_criteria
        ]);
    }

    public function update(Request $request, $id)
    {
        $w_criteria = WeightingCriteria::findOrFail($id); 
            
        if($request->job_id){
            $job = Job::find($request->job_id);
            $w_criteria->job_id = $job->id;
        }

        if($request->name){
            $w_criteria->name = $request->input('name');
        }
        if($request->weight){
            $w_criteria->weight = $request->input('weight');
        }
            
            $w_criteria->save();
        

        return response()->json([
            'success' => true,
            'data' => $w_criteria
        ]);  
    }

    public function destroy($id)
    {
        $w_criteria = WeightingCriteria::find($id);
        $w_criteria->delete();

        return response()->json([
            'message' => 'Weighting Criteria deleted',
            'data' => $w_criteria,
        ]);
    }
}
