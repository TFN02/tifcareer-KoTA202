<?php

use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
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


Route::get('/', function (){
    return Inertia::render('Auth/Login');
})->middleware(['auth', 'verified'])->name('login');

// ROUTE PEMISAH JUGA TAPI INI GATAU BEST PRACTICE GATAU ENGGA

// Route Pelamar
Route::middleware(['auth', 'verified', ])->group(function () {
    Route::get('/lowonganKerja', [JobController::class, 'index'])->name('lowonganKerja');
});

Route::get('/register-pelamar', function () {
    return Inertia::render('Auth/Register');
});

//Route Perusahaan
Route::get('/dashboard-perusahaan', function() {
    return Inertia::render('Perusahaan/Dashboard-perusahaan');
})->middleware(['auth', 'verified'])->name('dashboard-perusahaan');

Route::get('/edit-loker', function() {
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

    // work experience applicant
    Route::get('/profile/work-experience/new', function(){
        return Inertia::render('Profile/Partials/FormNewWorkExperience');
    })->name('profile.new');
    Route::get('/profile/work-experience/edit', [ProfileController::class, 'edit'])->name('profile.edit');

    // education applicant
    Route::get('/profile/education/new', function(){
        return Inertia::render('Profile/Partials/FormNewEdu');
    })->name('profile.edu.new');
    Route::get('/profile/education/edit', [ProfileController::class, 'editEducation'])->name('profile.edu.edit');

    // hardSkill applicant
    Route::get('/profile/skill/new', function(){
        return Inertia::render('Profile/Partials/FormNewSkill');
    })->name('profile.skill.new');
    // Route::get('/profile/skill/new', [ProfileController::class, 'createSkillCategory'])->name('profile.skill.new');
    Route::get('/profile/skill/edit', [ProfileController::class, 'editSkill'])->name('profile.skill.edit');

    // interest area applicant
    Route::get('/profile/interest-area/new', function(){
        return Inertia::render('Profile/Partials/FormNewInterest');
    })->name('profile.interest.new');
    Route::get('/profile/interest-area/edit', [ProfileController::class, 'editInterestArea'])->name('profile.interest.edit');

     // interest area applicant
    Route::get('/profile/softSkill/new', function(){
        return Inertia::render('Profile/Partials/FormNewSoftSkill');
        })->name('profile.softSkill.new');
    Route::get('/profile/softSkill/edit', [ProfileController::class, 'editSoftSkill'])->name('profile.softSkill.edit');

    // certificate applcant
    Route::get('/profile/certificate/new', function(){
        return Inertia::render('Profile/Partials/FormNewCertificate');
        })->name('profile.certificate.new');
    Route::get('/profile/certificate/edit', [ProfileController::class, 'editCertificate'])->name('profile.certificate.edit');


});

require __DIR__.'/auth.php';
