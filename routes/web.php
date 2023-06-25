<?php

use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\YoutubeController;
use App\Http\Controllers\Api\ApplicantController;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->middleware(['auth', 'verified'])->name('login');

Route::get('/modalVerification', function () {
    return Inertia::render('Perusahaan/ModalVerification');
})->middleware(['auth'])->name('modalVerification');


// Rooute Admin
Route::get('/dashboardAdmin', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth'])->name('dashboardAdmin');

Route::get('/companyPermission', function () {
    return Inertia::render('Admin/CompanyPermission');
})->middleware(['auth'])->name('companyPermission');

Route::get('/applicantPermission', function () {
    return Inertia::render('Admin/ApplicantPermission');
})->middleware(['auth'])->name('applicantPermission');




// Route Pelamar
Route::middleware(['auth', 'verified',])->group(function () {
    Route::get('/lowonganKerja', [JobController::class, 'index'])->name('lowonganKerja');
});

Route::get('/register-pelamar', function () {
    return Inertia::render('Auth/Register');
});

// Youtube API
Route::get('/youtube/upload', [YoutubeController::class, 'uploadVideo'])->name('uploadVideo');
// routes/web.php
Route::post('/auth/youtube', [YoutubeController::class, 'auth'])->name('youtube.auth');
Route::get('/auth/youtube/callback', [YoutubeController::class, 'authCallback'])->name('youtube.callback');
// Route::get('/youtube-auth', [YoutubeController::class, 'youtubeAuth'])->name('auth.google');

//Route Perusahaan

Route::get('/dashboard-perusahaan', function () {
    return Inertia::render('Perusahaan/DashboardPerusahaan');
})->middleware(['auth', 'verified'])->name('dashboard-perusahaan');

Route::get('/edit-loker', function () {
    return Inertia::render('Perusahaan/EditLoker');
})->middleware(['auth', 'verified'])->name('edit-loker');

Route::get('/register-perusahaan', function () {
    return Inertia::render('Auth/RegisterPerusahaan');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/jobs', [JobController::class, 'store'])->name('jobs');
    // Route::get('/jobs', [JobController::class, 'show'])->name('jobs');
    Route::get('/lowonganKerjaPerusahaan', [JobController::class, 'show'])->name('LowonganKerjaPerusahaan');
    Route::get('/lowonganKerjaPerusahaan/edit', [JobController::class, 'edit'])->name('LowonganKerjaPerusahaan.edit');
    Route::post('/lowonganKerjaPerusahaan/update', [JobController::class, 'update'])->name('LowonganKerjaPerusahaan.update');

    // jobs detail
    Route::get('/jobs/detail', [JobController::class, 'detailJobs'])->name('job.detail');
});

// Route Profil
Route::middleware('auth')->group(function () {
    // Data aplicant
    Route::get('/profile/show', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'editDataDiri'])->name('profile.dataDiri.edit');
    Route::patch('/profile/edit', [ProfileController::class, 'update'])->name('profile.dataDiri.update');

    //profil perusahaan
    Route::get('/profile/company/show', [ProfileController::class, 'companyShow'])->name('profile.company.show');

    // work experience applicant
    Route::get('/profile/work-experience/new', function () {
        return Inertia::render('Profile/Partials/FormNewWorkExperience');
    })->name('profile.new');
    Route::get('/profile/work-experience/edit', [ProfileController::class, 'edit'])->name('profile.edit');

    // education applicant
    Route::get('/profile/education/new', function () {
        return Inertia::render('Profile/Partials/FormNewEdu');
    })->name('profile.edu.new');
    Route::get('/profile/education/edit', [ProfileController::class, 'editEducation'])->name('profile.edu.edit');

    // hardSkill applicant
    Route::get('/profile/skill/new', function () {
        return Inertia::render('Profile/Partials/FormNewSkill');
    })->name('profile.skill.new');
    // Route::get('/profile/skill/new', [ProfileController::class, 'createSkillCategory'])->name('profile.skill.new');
    Route::get('/profile/skill/edit', [ProfileController::class, 'editSkill'])->name('profile.skill.edit');

    // interest area applicant
    Route::get('/profile/interest-area/new', function () {
        return Inertia::render('Profile/Partials/FormNewInterest');
    })->name('profile.interest.new');
    Route::get('/profile/interest-area/edit', [ProfileController::class, 'editInterestArea'])->name('profile.interest.edit');

    // interest area applicant
    Route::get('/profile/softSkill/new', function () {
        return Inertia::render('Profile/Partials/FormNewSoftSkill');
    })->name('profile.softSkill.new');
    Route::get('/profile/softSkill/edit', [ProfileController::class, 'editSoftSkill'])->name('profile.softSkill.edit');

    // certificate applcant
    Route::get('/profile/certificate/new', function () {
        return Inertia::render('Profile/Partials/FormNewCertificate');
    })->name('profile.certificate.new');
    Route::get('/profile/certificate/edit', [ProfileController::class, 'editCertificate'])->name('profile.certificate.edit');

    //Notification
    Route::get('/notification/detail', [NotificationController::class, 'detailNotif'])->name('notification.detail');


    // applcant detail
    Route::get('/applicant/detail', [ApplicantController::class, 'detailApplicant'])->name('applicant.detail');
    
    //Applicant Rank
    // Route::get('/applicant-rank', function () {
    //     return Inertia::render('Perusahaan/RankApplicants');
    // })->name('applicants.rank');

    Route::get('/applicant-rank', [JobController::class, 'detailJobPerusahaan'])->name('applicants.rank');

    //Video Resume
    Route::get('/video-resume', [JobController::class, 'listVideoResume'])->name('videoResume');
    Route::get('/video-resume-applicants', [JobController::class, 'videoApplicant'])->name('videoResume.applicant');

    // Route::get('/video-applicant', function () {
    //     return Inertia::render('Perusahaan/VideoApplicant');
    // })->name('videoResume.applicant');

});

require __DIR__ . '/auth.php';
