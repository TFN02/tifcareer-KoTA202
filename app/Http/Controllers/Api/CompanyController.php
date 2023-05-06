<?php

namespace App\Http\Controllers\Api;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
{

    public int $user_id;

    public function index(Request $request)
    {
        $company = Company::with('user');
        if($request->order_by && $request->order_type){
            $user = $company->orderBy($request->order_by, $request->order_type);
        }else{
            $user = $company->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $company->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $company = Company::class;

        if($request->npwp || $request->user_id){
            $this->user_id = $request->user_id;
            $company_a = Company::with('user')->where('npwp', $request->npwp)->get();
            $company_b = Company::with('user')->where('user_id', $request->user_id)->get();
    
            if(count($company_a)!=0 || count($company_b)!=0){

                return response()->json([
                    'success' => true,
                    'data' => "Company is already exist",
                ]);   
            }else{


                $request->validate([
                    'name' => 'required|string|max:255',
                    'user_id' => 'required|integer',
                    'description' => 'required|string',
                    'year_founded' => 'required|integer',
                    'address' => 'required|string',
                    'phone_no' => 'required|string|max:100',
                    'npwp' => 'required|string|max:255|unique:'.Company::class,
                    'siup' => 'required|string|max:255|unique:'.Company::class,
                    'nrp' => 'required|string|max:255|unique:'.Company::class,
                ]);
                
                $user = User::find($request->user_id);
                if(!$user){
                    return response()->json([
                        'success' => true,
                        'data' => "Please register before add data company",
                    ]); 
                }

                $company = Company::create([
                    'name' => $request->name,
                    'user_id' => $request->user_id,
                    'description' => $request->description,
                    'year_founded' => $request->year_founded,
                    'address' => $request->address,
                    'phone_no' => $request->phone_no,
                    'npwp' => $request->npwp,
                    'siup' => $request->siup,
                    'nrp' => $request->nrp,
                ]);
                
                $company->user_id  = $user->id;
                $user->company_id = $company->id;
                $user->save();
                $company->save();

            }
        }

        return response()->json([
            'success' => true,
            'data' => $company,
        ]); 
    }

    public function show($id)
    {
        $company = Company::with('user')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $company
        ]);
    }

    public function update(Request $request, $id)
    {
        $company = Company::find($id);

        if($company->id){
            $request->validate([
                    'name' => 'string|max:255',
                    'user_id' => 'integer',
                    'description' => 'string',
                    'year_founded' => 'integer',
                    'address' => 'string',
                    'phone_no' => 'string|max:100',
                    'npwp' => 'string|max:255|unique:'.Company::class,
                    'siup' => 'string|max:255|unique:'.Company::class,
                    'nrp' => 'string|max:255|unique:'.Company::class,
                ]);
            
            if($request->input('user_id')!=null){
                $company->user_id = $request->input('user_id');
            }
            if($request->input('name')!=null){
                $company->name = $request->input('name');
            }
            if($request->input('description')!=null){
                $company->description = $request->input('description');
            }
            if($request->input('year_founded')!=null){
                $company->year_founded = $request->input('year_founded');
            }
            if($request->input('address')!=null){
                $company->address = $request->input('address');
            }
            if($request->input('phone_no')!=null){
                $company->phone_no = $request->input('phone_no');
            }
            if($request->input('npwp')!=null){
                $company->npwp = $request->input('npwp');
            }
            if($request->input('siup')!=null){
                $company->siup = $request->input('siup');
            }
            if($request->input('nrp')!=null){
                $company->nrp = $request->input('nrp');
            }
           
            $company->save();

        }else{
            return response()->json([
                    'success' => true,
                    'data' => "Company not found",
                ]); 
        }   

        return response()->json([
            'success' => true,
            'data' => $company,
        ]); 
    }

    public function destroy($id)
    {
        $company = Company::find($id);
        $company->delete();

        return response()->json([
            'message' => 'Company deleted',
            'data' => $company,
        ]);
    }
}
