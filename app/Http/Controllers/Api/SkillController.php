<?php

namespace App\Http\Controllers\Api;

use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\Applicant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SkillController extends Controller
{

    private int $applicant_id;
    private int $skill_category_id;
    public function index(Request $request)
    {
        $skill = Skill::with('applicant', 'skillCategory');

        if($request->applicant_id){
            $this->applicant_id = $request->applicant_id;
            $skill = $skill->whereHas('applicant', function($query){
                            $query->where('applicant_id', $this->applicant_id);
            });
        }

        if($request->skill_category_id){
            $this->skill_category_id = $request->skill_category_id;
            $skill = $skill->whereHas('skillCategory', function($query){
                            $query->where('skill_category_id', $this->skill_category_id);
            });
        }

        if($request->order_by && $request->order_type){
            $skill = $skill->orderBy($request->order_by, $request->order_type);
        }else{
            $skill = $skill->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $skill->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'applicant_id' => 'required|int',
            'skill_category_id' => 'required|int',
            'name' => 'required|string|max:100',
        ]);

        if($request->skill_category_id){
            $skill_category = SkillCategory::find($request->skill_category_id);
            $skill_category_id = $skill_category->id;
        }
        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $applicant_id = $applicant->id;
        }

        $skill = Skill::create([
            'applicant_id' => $applicant_id,
            'skill_category_id' => $skill_category_id,
            'name' => $request->name,
        ]);
        $skill->applicant()->attach($applicant->id);

        return response()->json([
            'success' => true,
            'data' =>  $skill,
        ]);
    }

    public function show( $id)
    {
        $skill = Skill::with('applicant', 'skillCategory')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $skill
        ]);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id); 
          
        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $skill->applicant()->applicant_id = $applicant->id;
        }
        if($request->skill_category_id){
            $skill_category = SkillCategory::find($request->skill_category_id);
            $skill_category_id = $skill_category->id;
            $skill->skill_category_id = $skill_category_id;
        }
        if($request->name){
            $skill->name = $request->input('name');
        }
            
            $skill->save();
        

        return response()->json([
            'success' => true,
            'data' => $skill
        ]);  
    }

    public function destroy($id)
    {
        $skill = Skill::find($id);
        $skill->delete();

        return response()->json([
            'message' => 'Skill deleted',
            'data' => $skill,
        ]);
    }
}
