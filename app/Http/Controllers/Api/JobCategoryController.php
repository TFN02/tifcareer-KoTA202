<?php

namespace App\Http\Controllers\Api;

use App\Models\JobCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class JobCategoryController extends Controller
{

    public function index(Request $request)
    {
        $job_category = JobCategory::with('job');

        if($request->order_by && $request->order_type){
            $job_category = $job_category->orderBy($request->order_by, $request->order_type);
        }else{
            $job_category = $job_category->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $job_category->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $job_category = JobCategory::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'data' =>  $job_category,
        ]);
    }
    
    public function show( $id)
    {
        $job_category = JobCategory::with('job')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $job_category
        ]);
    }

    public function update(Request $request, $id)
    {
        $job_category = JobCategory::findOrFail($id); 
            
        if($request->name){
            $job_category->name = $request->input('name');
        }
            $job_category->save();
        

        return response()->json([
            'success' => true,
            'data' => $job_category
        ]);  
    }

    public function destroy( $id)
    {
        $job_category = JobCategory::find($id);
        $job_category->delete();

        return response()->json([
            'message' => 'Job Category deleted',
            'data' => $job_category,
        ]);
    }
}
