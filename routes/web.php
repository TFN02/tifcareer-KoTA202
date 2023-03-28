<?php

use App\Http\Controllers\JobsController;
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
})->middleware(['auth', 'verified']);

// ROUTE PEMISAH JUGA TAPI INI GATAU BEST PRACTICE GATAU ENGGA

// Route Pelamar
Route::middleware(['auth', 'verified', ])->group(function () {
    Route::get('/lowonganKerja', [JobsController::class, 'index'])->name('dashboard');
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

// Route Profil
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
