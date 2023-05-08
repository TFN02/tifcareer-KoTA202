<?php

namespace App\Http\Controllers\Api;

use App\Models\Certificate;
use App\Models\Applicant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CertificateController extends Controller
{

    private  int $applicant_id;
    public function index(Request $request)
    {
        $certificate = Certificate::with('applicant');

        if($request->applicant_id){
            $this->applicant_id = $request->applicant_id;
            $certificate = $certificate->whereHas('applicant', function($query){
                            $query->where('applicant_id', $this->applicant_id);
            });
        }

        if($request->order_by && $request->order_type){
            $certificate = $certificate->orderBy($request->order_by, $request->order_type);
        }else{
            $certificate = $certificate->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $certificate->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'applicant_id' => 'required|int',
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'no_certificate' => 'required|string|max:100',
        ]);

        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $applicant_id = $applicant->id;
        }

        $certificate = Certificate::create([
            'applicant_id' => $applicant_id,
            'title' => $request->title,
            'description' => $request->description,
            'no_certificate' => $request->no_certificate,
        ]);

        return response()->json([
            'success' => true,
            'data' =>  $certificate,
        ]);
    }

    public function show( $id)
    {
        $certificate = Certificate::with('applicant')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $certificate
        ]);
    }

    public function update(Request $request,  $id)
    {
        $certificate = Certificate::findOrFail($id); 
            
        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $certificate->applicant_id = $applicant->id;
        }

        if($request->title){
            $certificate->title = $request->input('title');
        }
        if($request->description){
            $certificate->description = $request->input('description');
        }
        if($request->no_certificate){
            $certificate->no_certificate = $request->input('no_certificate');
        }
            $certificate->save();
        

        return response()->json([
            'success' => true,
            'data' => $certificate
        ]);  
    }

    public function destroy( $id)
    {
        $certificate = Certificate::find($id);
        $certificate->delete();

        return response()->json([
            'message' => 'Certificate deleted',
            'data' => $certificate,
        ]);
    }
}
