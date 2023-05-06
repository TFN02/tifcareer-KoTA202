<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\WorkExperience;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show(WorkExperience $id, Request $request): Response
    {
        if (Auth::user()->roles()->first()->name =='pelamar') {

            // return redirect(RouteServiceProvider::HOME);
            return Inertia::render('Profile/DataAplicant', [
                'getId' => $id->find($request->no_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }else if(Auth::user()->roles()->first()->name =='perusahaan'){
            return Inertia::render('Profile/DataCompany', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }


    }
    public function edit(WorkExperience $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name =='pelamar') {

            // return redirect(RouteServiceProvider::HOME);
           
            return Inertia::render('Profile/Partials/FormUpdateWorkExperience', [
                'getId' => $id->find($request->no_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }else if(Auth::user()->roles()->first()->name =='perusahaan'){
            return Inertia::render('Profile/EditPerusahaan', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }


    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
