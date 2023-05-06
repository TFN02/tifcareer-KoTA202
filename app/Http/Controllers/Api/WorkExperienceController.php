<?php

namespace App\Http\Controllers\Api;

use App\Models\WorkExperience;
use App\Models\Applicant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WorkExperienceController extends Controller
{

    private  int $applicant_id;
    public function index(Request $request)
    {

        $experience = WorkExperience::with('applicant');

        if($request->applicant_id){
            $this->applicant_id = $request->applicant_id;
            $experience = $experience->whereHas('applicant', function($query){
                            $query->where('applicant_id', $this->applicant_id);
            });
        }

        if($request->order_by && $request->order_type){
            $experience = $experience->orderBy($request->order_by, $request->order_type);
        }else{
            $experience = $experience->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $experience->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'applicant_id' => 'required|int',
            'work_institution' => 'required|string|max:100',
            'position' => 'required|string|max:100',
            'description' => 'required|string',
            'start_year' => 'required|int',
            'end_year' => 'required|int',
        ]);

        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $applicant_id = $applicant->id;
        }

        $experience = WorkExperience::create([
            'applicant_id' => $applicant_id,
            'work_institution' => $request->work_institution,
            'position' => $request->position,
            'description' => $request->description,
            'start_year' => $request->start_year,
            'end_year' => $request->end_year,

        ]);


        return response()->json([
            'success' => true,
            'data' =>  $experience,
        ]);
    }

    public function show( $id)
    {
        $experience = WorkExperience::with('applicant')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $experience
        ]);
    }

    public function update(Request $request,  $id)
    {
        $experience = WorkExperience::findOrFail($id); 
            
        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $experience->applicant_id = $applicant->id;
        }

        if($request->work_institution){
            $experience->work_institution = $request->input('work_institution');
        }
        if($request->position){
            $experience->position = $request->input('position');
        }
        if($request->description){
            $experience->description = $request->input('description');
        }
        if($request->start_year){
            $experience->start_year = $request->input('start_year');
        }
        if($request->end_year){
            $experience->end_year = $request->input('end_year');
        }
            
            $experience->save();
        

        return response()->json([
            'success' => true,
            'data' => $experience
        ]);  
    }

    public function destroy( $id)
    {
        $experience = WorkExperience::find($id);
        $experience->delete();

        return response()->json([
            'message' => 'Work Experience deleted',
            'data' => $experience,
        ]);
    }
}
