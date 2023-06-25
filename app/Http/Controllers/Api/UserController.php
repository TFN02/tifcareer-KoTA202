<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Models\SuperAdmin;
use App\Models\Company;
use App\Models\Applicant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    private int $role_id ;
     
    public function index(Request $request)
    {
        

        $user = User::with('roles','applicant','company','superAdmin');

        if($request->role){
            $role = Role::all();
            $role = $role->where('name',$request->role)->first();
            $this->role_id = $role->id;

            $user = $user->whereHas('roles', function($query){
                                    $query->where('role_id', $this->role_id);
                    });
        }
        if($request->order_by && $request->order_type){
            $user = $user->orderBy($request->order_by, $request->order_type);
        }else{
            $user = $user->orderBy('created_at', 'desc');
        }

        
        return response()->json([
            'success' => true,
            'data' => $user->get(),
        ]);

    }

    public function store(Request $request)
    {
        
        if ($request->role == 'pelamar' || $request->role == 'admin'){
            $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|string|email|max:100|unique:'.User::class,
                'password' => ['required', Rules\Password::defaults()],
                'role' => ['required', 'in:pelamar,admin'],
            ]);

        }else if($request->role == 'perusahaan') {
            $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|string|email|max:100|unique:'.User::class,
                'npwp' => 'required|digits:15',
                'password' => ['required', Rules\Password::defaults()],
                'role' => ['required', 'in:perusahaan'],
            ]);
        }

      
        $role = Role::where('name',$request->role)->first();
        
        
        if($role != null){
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            if ($request->role=="pelamar"){

                $applicant = $user->applicant()->create([
                    'user_id' => $user->id,
                    'name' => $request->name,
                ]);
                

                $status = false;
                $user->applicant_id = $applicant->id;
                $user->is_active = $status;
                
                $user->save();
            
            }else if ($request->role=="admin"){
                
                $admin = $user->superAdmin()->create([
                    'user_id' => $user->id,
                    'name' => $request->name,
                ]);

                $user->super_admin_id = $admin->id;
                $user->is_active = 1;
                $user->save();

            }else if ($request->role=="perusahaan"){
    
                $company = $user->company()->create([
                    'user_id' => $user->id,
                    'name' => $request->name,
                    'npwp' => $request->npwp,
                ]);

                $user->company_id = $company->id;
                $user->is_active = 0;
                $user->save();

            }
            
            $user->roles()->attach($role->id);
        }

        return response()->json([
            'success' => true,
            'data' => $user,
        ]); 
    }

    public function show($id)
    {
        $user = User::with('roles','applicant','company','superAdmin')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id); 
        
        if ($request->role == 'pelamar' || $request->role == 'admin'){
            $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|string|email|max:100|unique:'.User::class,
                'password' => ['required', Rules\Password::defaults()],
                'role' => ['required', 'in:pelamar,admin'],
            ]);

        }else if($request->role == 'perusahaan') {
            $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|string|email|max:100|unique:'.User::class,
                'npwp' => 'required|digits:15',
                'password' => ['required', Rules\Password::defaults()],
                'role' => ['required', 'in:perusahaan'],
            ]);
        }

        
        $role = Role::where('name',$request->role);

        if($role != null){
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = $request->password;
            
            if($user->role!=$request->role){

                if ($user->role=="pelamar"){
                    $applicant = Applicant::find($id);
                    $applicant->delete();

                    if($request->role=="admin"){
                        $user->superAdmin()->create([
                            'user_id' => $user->id,
                            'name' => $request->name,
                        ]);
                    }else if($request->role=="perusahaan"){
                        $request->validate([
                            'npwp' => 'required|digits:15',
                        ]);
                        $user->company()->create([
                            'user_id' => $user->id,
                            'name' => $request->name,
                            'npwp' => $request->npwp,
                        ]);
                    }
                    
                }else if ($user->role=="admin"){
                    $admin = SuperAdmin::find($id);
                    $admin->delete();
                    
                    if($request->role=="pelamar"){
                        $user->applicant()->create([
                            'user_id' => $user->id,
                            'name' => $request->name,
                        ]);
                    }else if($request->role=="perusahaan"){
                        $request->validate([
                            'npwp' => 'required|digits:15',
                        ]);
                        $user->company()->create([
                            'user_id' => $user->id,
                            'name' => $request->name,
                            'npwp' => $request->npwp,
                        ]);
                    }
                }else if ($user->role=="perusahaan"){
                    $company = Company::find($id);
                    $company->delete();
                    
                    if($request->role=="pelamar"){
                        $user->applicant()->create([
                            'user_id' => $user->id,
                            'name' => $request->name,
                        ]);
                    }else if($request->role=="admin"){
                        $user->superAdmin()->create([
                            'user_id' => $user->id,
                            'name' => $request->name,
                        ]);
                    }
                }

                
                $user->roles()->attach([$role->id]);
            }
            
            $user->save();
        } 
        return response()->json([
            'success' => true,
            'data' => $user
        ]); 
    }

    public function destroy( $id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted',
            'data' => $user,
        ]);
    }

    public function updateStatus($id, Request $request)
    {
        $user = User::find($id);
        if($request->is_active != null){
            $user->is_active = $request->is_active;
            $user->save();
        }

        return response()->json([
            'message' => 'User update active status',
            'data' => $user,
        ]);
    }
}
