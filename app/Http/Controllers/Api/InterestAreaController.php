<?php

namespace App\Http\Controllers\Api;

use App\Models\InterestArea;
use App\Models\Applicant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InterestAreaController extends Controller
{
    private int $applicant_id;

    public function index(Request $request)
    {
        $interest = InterestArea::with('applicant');

        if($request->applicant_id){
            $this->applicant_id = $request->applicant_id;
            $interest = $interest->whereHas('applicant', function($query){
                            $query->where('applicant_id', $this->applicant_id);
            });
        }

        if($request->order_by && $request->order_type){
            $interest = $interest->orderBy($request->order_by, $request->order_type);
        }else{
            $interest = $interest->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $interest->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'applicant_id' => 'required|int',
            'name_of_field' => 'required|string|max:100',
            'reason_of_interest' => 'required|string',
        ]);

        
        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
        }
        $interest = InterestArea::create([
            'applicant_id' => $applicant->id,
            'name_of_field' => $request->name_of_field,
            'reason_of_interest' => $request->reason_of_interest,
        ]);
        $interest->applicant()->attach($applicant->id);

        return response()->json([
            'success' => true,
            'data' =>  $interest,
        ]);
    }

    public function show( $id)
    {
        $interest = InterestArea::with('applicant')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $interest
        ]);
    }


    public function update(Request $request,  $id)
    {
        $interest = InterestArea::findOrFail($id); 
          
        if($request->applicant_id){
            $applicant = Applicant::find($request->applicant_id);
            $interest->applicant()->applicant_id = $applicant->id;
        }
        if($request->name_of_field){
            $interest->name_of_field = $request->input('name_of_field');
        }
        if($request->reason_of_interest){
            $interest->reason_of_interest = $request->input('reason_of_interest');
        }
            
            $interest->save();
        

        return response()->json([
            'success' => true,
            'data' => $interest
        ]);
    }

    public function destroy($id)
    {
        $interest = InterestArea::find($id);
        $interest->delete();

        return response()->json([
            'message' => 'Interest Area deleted',
            'data' => $interest,
        ]);
    }
}
