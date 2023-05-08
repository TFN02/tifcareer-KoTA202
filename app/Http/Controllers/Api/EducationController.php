<?php

namespace App\Http\Controllers\Api;

use App\Models\Education;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Applicant;

class EducationController extends Controller
{
    private int $applicant_id;

    public function index(Request $request)
    {
        $education = Education::with('applicant');

        if($request->applicant_id){
            $this->applicant_id = $request->applicant_id;
            $education = $education->whereHas('applicant', function($query){
                            $query->where('applicant_id', $this->applicant_id);
            });
        }

        if($request->order_by && $request->order_type){
            $education = $education->orderBy($request->order_by, $request->order_type);
        }else{
            $education = $education->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $education->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'applicant_id' => 'required|int',
            'level' => 'required|string|max:100',
            'major' => 'required|string|max:100',
            'educational_institution' => 'required|string|max:100',
            'graduation_year' => 'required|int',
        ]);

        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            if($applicant){  
                $education = Education::create([
                    'applicant_id' => $applicant->id,
                    'level' => $request->level,
                    'major' => $request->major,
                    'educational_institution' => $request->educational_institution,
                    'graduation_year' => $request->graduation_year,
                ]);
                $education->applicant()->attach($applicant->id);
            }else{
                return response()->json([
                    'success' => false,
                    'data' =>  "Applicant Not Found",
                ]);
            }
        }else{
            return response()->json([
                'success' => false,
                'data' =>  "Applicant Id is required",
            ]);
        }
        

        return response()->json([
            'success' => true,
            'data' =>  $education,
        ]);
    }

    public function show($id)
    {
        $education = Education::with('applicant')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $education
        ]);
    }

    public function update(Request $request, $id)
    {
        $education = Education::findOrFail($id); 
           
        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $education->applicant()->applicant_id = $applicant->id;
        }

        if($request->level){
            $education->level = $request->input('level');
        }
        if($request->major){
            $education->major = $request->input('major');
        }
        if($request->educational_institution){
            $education->educational_institution = $request->input('educational_institution');
        }
        if($request->graduation_year){
            $education->graduation_year = $request->input('graduation_year');
        }
            
            $education->save();
        

        return response()->json([
            'success' => true,
            'data' => $education
        ]);    
    }

    public function destroy($id)
    {
        $education = Education::find($id);
        $education->delete();

        return response()->json([
            'message' => 'Education deleted',
            'data' => $education,
        ]);
    }
}
