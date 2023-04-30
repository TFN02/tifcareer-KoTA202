<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


class RegisteredUserController extends Controller
{

    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
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
                

                $user->applicant_id = $applicant->id;
                $user->save();
            
            }else if ($request->role=="admin"){
                
                $admin = $user->superAdmin()->create([
                    'user_id' => $user->id,
                    'name' => $request->name,
                ]);

                $user->super_admin_id = $admin->id;
                $user->save();

            }else if ($request->role=="perusahaan"){
    
                $company = $user->company()->create([
                    'user_id' => $user->id,
                    'name' => $request->name,
                    'npwp' => $request->npwp,
                ]);

                $user->company_id = $company->id;
                $user->save();

            }
            
            $user->roles()->sync($role->id);
        }

        if ($request->role=="pelamar"){

            return redirect('/lowonganKerja');

        }else if ($request->role=="perusahaan"){

            return redirect('/dashboard-perusahaan');
        }
    }
}
