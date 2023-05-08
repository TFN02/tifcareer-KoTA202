<?php

namespace App\Http\Controllers\Api;

use App\Models\SkillCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SkillCategoryController extends Controller
{
    public function index(Request $request)
    {
        $skill_category = SkillCategory::with('skill');

        if($request->order_by && $request->order_type){
            $skill_category = $skill_category->orderBy($request->order_by, $request->order_type);
        }else{
            $skill_category = $skill_category->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $skill_category->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $skill_category = SkillCategory::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'data' =>  $skill_category,
        ]);
    }

    public function show( $id)
    {
        $skill_category = SkillCategory::with('skill')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $skill_category
        ]);
    }

    public function update(Request $request, $id)
    {
        $skill_category = SkillCategory::findOrFail($id); 
            
        if($request->name){
            $skill_category->name = $request->input('name');
        }
            $skill_category->save();
        

        return response()->json([
            'success' => true,
            'data' => $skill_category
        ]); 
    }

    public function destroy($id)
    {
        $skill_category = SkillCategory::find($id);
        $skill_category->delete();

        return response()->json([
            'message' => 'Skill Category deleted',
            'data' => $skill_category,
        ]);
    }
}
