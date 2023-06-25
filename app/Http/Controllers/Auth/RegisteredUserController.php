<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use App\Models\Applicant;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
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
                'password' => ['required', 'confirmed',Rules\Password::defaults()],
                'role' => ['required', 'in:pelamar,admin'],
            ]);

        }else if($request->role == 'perusahaan') {
            $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|string|email|max:100|unique:'.User::class,
                'pic' => 'required|string|max:50',
                'npwp' => 'required|digits:15',
                'no_kk' => 'required|digits:16',
                'no_ktp' => 'required|digits:16',
                'password' => ['required', 'confirmed',Rules\Password::defaults()],
                'role' => ['required', 'in:perusahaan'],
            ]);

        }

        

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        $applicant = null;
    
        if ($request->role == 'pelamar') {
            $existingApplicant = Applicant::where('user_id', $user->id)->first();
    
            if (!$existingApplicant) {
                $applicant = $user->applicant()->create([
                    'name' => $request->name,
                    'user_id' => $user->id,
                ]);
            } else {
                $applicant = $existingApplicant;
            }
    
            $status = true;
            $user->update([
                'applicant_id' => $applicant->id,
                'is_active' => $status,
            ]);
        } 
        
        else if ($request->role == 'perusahaan') {
            $existingCompany = Company::where('user_id', $user->id)->first();

            if (!$existingCompany) {
                $company = $user->company()->create([
                    'name' => $request->name,
                    'user_id' => $user->id,
                    'pic' => $request->pic,
                    'npwp' => $request->npwp,
                    'no_kk' => $request->no_kk,
                    'no_ktp' => $request->no_ktp,
                ]);
            } else {
                $company = $existingCompany;
            }
    
            $status = false;
            $user->update([
                'company_id' => $company->id,
                'is_active' => false,
            ]);
        }
    
        event(new Registered($user));
        
        Auth::login($user);
        $user->roles()->attach(\App\Models\Role::where('name', $request->role)->first());
    
        if ($request->role == "pelamar") {
            return redirect('/lowonganKerja');
        } else if ($request->role == "perusahaan" && $user->is_active == 0) {
            return redirect('/modalVerification');
        }else{
            return redirect('/dashboard-perusahaan');
        }
    }
}
