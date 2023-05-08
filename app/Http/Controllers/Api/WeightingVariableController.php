<?php

namespace App\Http\Controllers\Api;

use App\Models\WeightingVariable;
use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\WeightingCriteria;

class WeightingVariableController extends Controller
{
    private int $job_id;
    private int $weighting_criteria_id;

    public function index(Request $request)
    {
        $w_variable = WeightingVariable::with('job', 'weightingCriteria');

        if($request->job_id){
            $this->job_id = $request->job_id;
            $w_variable = $w_variable->whereHas('job', function($query){
                            $query->where('job_id', $this->job_id);
            });
        }
        if($request->weighting_criteria_id){
            $this->weighting_criteria_id = $request->weighting_criteria_id;
            $w_variable = $w_variable->whereHas('weightingCriteria', function($query){
                            $query->where('weighting_criteria_id', $this->weighting_criteria_id);
            });
        }


        if($request->order_by && $request->order_type){
            $w_variable = $w_variable->orderBy($request->order_by, $request->order_type);
        }else{
            $w_variable = $w_variable->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $w_variable->paginate(20),
        ]);  
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'required|int',
            'weighting_criteria_id' => 'required|int',
            'name' => 'required|string|max:100',
            'weight' => 'required|numeric',
        ]);

        if($request->job_id){
            $job = Job::find($request->job_id);
            $job_id = $job->id;
        }
        if($request->weighting_criteria_id){
            $w_criteria = WeightingCriteria::find($request->weighting_criteria_id);
            $w_criteria_id = $w_criteria->id;
        }

        $w_variable = WeightingVariable::create([
            'job_id' => $job_id,
            'weighting_criteria_id' => $w_criteria_id,
            'name' => $request->name,
            'weight' => $request->weight,
        ]);


        return response()->json([
            'success' => true,
            'data' =>  $w_variable,
        ]);
    }

    public function show($id)
    {
        $w_variable = WeightingVariable::with('job', 'weightingCriteria')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $w_variable
        ]);
    }

    public function update(Request $request, $id)
    {
        $w_variable = WeightingVariable::findOrFail($id); 
            
        if($request->job_id){
            $job = Job::find($request->job_id);
            $w_variable->job_id = $job->id;
        }
        if($request->weighting_criteria_id){
            $w_criteria = Job::find($request->weighting_criteria_id);
            $w_variable->weighting_criteria_id = $w_criteria->id;
        }

        if($request->name){
            $w_variable->name = $request->input('name');
        }
        if($request->weight){
            $w_variable->weight = $request->input('weight');
        }
            
            $w_variable->save();
        

        return response()->json([
            'success' => true,
            'data' => $w_variable
        ]);  
    }

    public function destroy($id)
    {
        $w_variable = WeightingVariable::find($id);
        $w_variable->delete();

        return response()->json([
            'message' => 'Weighting Variable deleted',
            'data' => $w_variable,
        ]);
    }
}
