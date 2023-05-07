<?php

use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ApplicantController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\InterestAreaController;
use App\Http\Controllers\Api\JobCategoryController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\SoftSkillController;
use App\Http\Controllers\Api\WorkExperienceController;
use App\Http\Controllers\Api\SkillCategoryController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\WeightingCriteriaController;
use App\Http\Controllers\Api\WeightingVariableController;
use App\Http\Controllers\Api\AssignmentVideoResumeController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ScoringVRController;
use App\Http\Controllers\Api\VideoResumeController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('users', UserController::class, );
Route::apiResource('companies', CompanyController::class);
Route::apiResource('jobs', JobController::class);
Route::apiResource('applicants', ApplicantController::class);
Route::apiResource('educations', EducationController::class);
Route::apiResource('workExperiences', WorkExperienceController::class);
Route::apiResource('interestAreas', InterestAreaController::class);
Route::apiResource('skills', SkillController::class);
Route::apiResource('softSkills', SoftSkillController::class);
Route::apiResource('certificates', CertificateController::class);
Route::apiResource('jobCategories', JobCategoryController::class);
Route::apiResource('skillCategories', SkillCategoryController::class);
Route::apiResource('applications', ApplicationController::class);
Route::apiResource('weightingCriterias', WeightingCriteriaController::class);
Route::apiResource('weightingVariables', WeightingVariableController::class);
Route::apiResource('assignmentVideoResumes', AssignmentVideoResumeController::class);
Route::apiResource('questions', QuestionController::class);
Route::apiResource('videoResumes', VideoResumeController::class);
Route::put('scoring', [ScoringVRController::class, 'updateScore']);
