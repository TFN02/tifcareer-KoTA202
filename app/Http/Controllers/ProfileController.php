<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\InterestArea;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\SoftSkill;
use App\Models\User;
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
    public function show(Request $request): Response
    {
        // return redirect(RouteServiceProvider::HOME);
        return Inertia::render('Profile/DataAplicant', [

            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function companyShow(Request $request): Response
    {
        return Inertia::render('Profile/DataCompany', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function editDataDiri(User $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name == 'pelamar') {

            // return redirect(RouteServiceProvider::HOME);

            return Inertia::render('Profile/Partials/FormUpdateDataDiri', [
                'getIdUser' => $id->find($request->dataDiri_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        } else if (Auth::user()->roles()->first()->name == 'perusahaan') {
            return Inertia::render('Profile/EditPerusahaan', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
       
    }
    public function edit(WorkExperience $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name == 'pelamar') {

            // return redirect(RouteServiceProvider::HOME);

            return Inertia::render('Profile/Partials/FormUpdateWorkExperience', [
                'getId' => $id->find($request->work_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        } else if (Auth::user()->roles()->first()->name == 'perusahaan') {
            return Inertia::render('Profile/EditPerusahaan', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
        return Redirect::route('profile.show');
        
    }
    public function editEducation(Education $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name == 'pelamar') {

            // return redirect(RouteServiceProvider::HOME);

            return Inertia::render('Profile/Partials/FormUpdateEdu', [
                'getIdEdu' => $id->find($request->edu_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        } else if (Auth::user()->roles()->first()->name == 'perusahaan') {
            return Inertia::render('Profile/EditPerusahaan', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
       
    }

    public function createSkillCategory(SkillCategory $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name == 'pelamar') {

            // return redirect(RouteServiceProvider::HOME);

            return Inertia::render('Profile/Partials/FormNewSkill', [
                'getIdCategory' => $id->find($request->category_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        } else if (Auth::user()->roles()->first()->name == 'perusahaan') {
            return Inertia::render('Profile/EditPerusahaan', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
      
    }
    public function editSkill(Skill $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name == 'pelamar') {

            // return redirect(RouteServiceProvider::HOME);

            return Inertia::render('Profile/Partials/FormUpdateSkill', [
                'getIdSkill' => $id->find($request->skill_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        } else if (Auth::user()->roles()->first()->name == 'perusahaan') {
            return Inertia::render('Profile/EditPerusahaan', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
     
    }

    public function editInterestArea(InterestArea $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name == 'pelamar') {

            // return redirect(RouteServiceProvider::HOME);

            return Inertia::render('Profile/Partials/FormUpdateInterest', [
                'getIdInterest' => $id->find($request->interest_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        } else if (Auth::user()->roles()->first()->name == 'perusahaan') {
            return Inertia::render('Profile/EditPerusahaan', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
       
    }

    public function editSoftSkill(SoftSkill $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name == 'pelamar') {

            // return redirect(RouteServiceProvider::HOME);

            return Inertia::render('Profile/Partials/FormUpdateSoftSkill', [
                'getIdSoftSkill' => $id->find($request->softskill_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        } else if (Auth::user()->roles()->first()->name == 'perusahaan') {
            return Inertia::render('Profile/EditPerusahaan', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);

        }
        
    }

    public function editCertificate(Certificate $id, Request $request)
    {
        if (Auth::user()->roles()->first()->name == 'pelamar') {

            // return redirect(RouteServiceProvider::HOME);

            return Inertia::render('Profile/Partials/FormUpdateCertificate', [
                'getIdCertificate' => $id->find($request->certificate_id),
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        } else if (Auth::user()->roles()->first()->name == 'perusahaan') {
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

        return Redirect::route('profile.show');
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