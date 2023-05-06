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

Route::get('/register-perusahaan', function () {
    return Inertia::render('Auth/RegisterPerusahaan');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/jobs', [JobController::class, 'store'])->name('jobs');
    // Route::get('/jobs', [JobController::class, 'show'])->name('jobs');
    Route::get('/lowonganKerjaPerusahaan', [JobController::class, 'show'])->name('LowonganKerjaPerusahaan');
    Route::get('/lowonganKerjaPerusahaan/edit', [JobController::class, 'edit'])->name('LowonganKerjaPerusahaan.edit');
    Route::post('/lowonganKerjaPerusahaan/update', [JobController::class, 'update'])->name('LowonganKerjaPerusahaan.update');
});    

// Route Profil
Route::middleware('auth')->group(function () {
    Route::get('/profile/new', function(){
        return Inertia::render('Profile/Partials/FormNewWorkExperience');
    })->name('profile.new');
    Route::get('/produk/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/show', [ProfileController::class, 'show'])->name('profile.show');
    // Route::patch('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
