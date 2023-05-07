<?php

namespace App\Http\Controllers\Api;

use App\Models\SuperAdmin;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SuperAdminController extends Controller
{
    private int $user_id;
    public function index(Request $request)
    {
        $s_admin = SuperAdmin::with('user');

        if($request->user_id){
            $this->user_id = $request->user_id;
            $s_admin = $s_admin->whereHas('applicant', function($query){
                            $query->where('user_id', $this->user_id);
            });
        }

        if($request->order_by && $request->order_type){
            $s_admin = $s_admin->orderBy($request->order_by, $request->order_type);
        }else{
            $s_admin = $s_admin->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $s_admin->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|int',
            'name' => 'required|string|max:100',
            'phone_no' => 'required|string|max:100',
        ]);

        if($request->user_id){
            $user = User::find($request->user_id);
            $user_id = $user->id;
        }

        $s_admin = SuperAdmin::create([
            'user_id' => $user_id,
            'name' => $request->name,
            'phone_no' => $request->phone_no,
        ]);

    
        return response()->json([
            'success' => true,
            'data' =>  $s_admin,
        ]);
    }

    public function show($id)
    {
        $s_admin = SuperAdmin::with('user')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $s_admin
        ]);
    }

    public function update(Request $request, $id)
    {
        $s_admin = SuperAdmin::findOrFail($id); 
            
        if($request->user_id){ 
            $user = User::find($request->user_id);
            $s_admin->user_id = $user->id;
        }

        if($request->name){
            $s_admin->name = $request->input('name');
        }

        if($request->phone_no){
            $s_admin->phone_no = $request->input('phone_no');
        }

        $s_admin->save();

        return response()->json([
            'success' => true,
            'data' => $s_admin
        ]); 
    }

    public function destroy($id)
    {
        $s_admin = SuperAdmin::find($id);
        $s_admin->delete();

        return response()->json([
            'message' => 'Super Admin  deleted',
            'data' => $s_admin,
        ]);
    }
}
