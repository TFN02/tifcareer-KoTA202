<?php

namespace App\Http\Controllers\Api;

use App\Models\SoftSkill;
use App\Models\Applicant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SoftSkillController extends Controller
{

    private  int $applicant_id;
    public function index(Request $request)
    {
        $soft_skill = SoftSkill::with('applicant');

        if($request->applicant_id){
            $this->applicant_id = $request->applicant_id;
            $soft_skill = $soft_skill->whereHas('applicant', function($query){
                            $query->where('applicant_id', $this->applicant_id);
            });
        }

        if($request->order_by && $request->order_type){
            $soft_skill = $soft_skill->orderBy($request->order_by, $request->order_type);
        }else{
            $soft_skill = $soft_skill->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $soft_skill->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'applicant_id' => 'required|int',
            'name' => 'required|string|max:100',
        ]);

        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $applicant_id = $applicant->id;
        }

        $soft_skill = SoftSkill::create([
            'applicant_id' => $applicant_id,
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'data' =>  $soft_skill,
        ]);
    }

    public function show( $id)
    {
        $soft_skill = SoftSkill::with('applicant')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $soft_skill
        ]);
    }

    public function update(Request $request,  $id)
    {
        $soft_skill = SoftSkill::findOrFail($id); 
            
        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $soft_skill->applicant_id = $applicant->id;
        }

        if($request->name){
            $soft_skill->name = $request->input('name');
        }
            $soft_skill->save();
        

        return response()->json([
            'success' => true,
            'data' => $soft_skill
        ]);  
    }

    public function destroy( $id)
    {
        $soft_skill = SoftSkill::find($id);
        $soft_skill->delete();

        return response()->json([
            'message' => 'Soft Skill deleted',
            'data' => $soft_skill,
        ]);
    }
}
