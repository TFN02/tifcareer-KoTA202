<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use App\Models\Applicant;
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
    
            $user->update([
                'applicant_id' => $applicant->id,
                
            ]);
        } 
        // BELOM DIUBAH KEK APLICANT 
        else if ($request->role == 'perusahaan') {
            $company = $user->company()->create([
                'name' => $request->name,
                'npwp' => $request->npwp,
            ]);
        }
    
        event(new Registered($user));
        
        Auth::login($user);
        $user->roles()->attach(\App\Models\Role::where('name', $request->role)->first());
    
        if ($request->role == "pelamar") {
            return redirect('/lowonganKerja');
        } else if ($request->role == "perusahaan") {
            return redirect('/dashboard-perusahaan');
        }
    }
}
