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
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ScoringVRController;
use App\Http\Controllers\Api\SegmentVideoResumeController;
use App\Http\Controllers\Api\SuperAdminController;
use App\Http\Controllers\Api\VideoResumeController;
use App\Http\Controllers\YoutubeController;
use App\Models\Application;
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
Route::apiResource('notifications', NotificationController::class);
Route::apiResource('superAdmins', SuperAdminController::class);
Route::apiResource('segmentVideoResumes', SegmentVideoResumeController::class);
Route::put('scoring', [ScoringVRController::class, 'updateScore']);
Route::put('saw',[ApplicationController::class, 'saw']);

Route::get('/jobs/{jobId}/applicants',[JobController::class, 'getApplicantsByJob']);
Route::get('/jobs/{jobId}/applicants/count',[JobController::class, 'getApplicantCount']);

Route::post('/saw/{id}', [ApplicationController::class, 'saw']);
Route::get('/application/{applicant_id}/{job_id}', [ApplicationController::class, 'getIdByApplyed']);

Route::get('/myJobs/{company_id}', [JobController::class, 'getMyJobs']);

Route::get('/applicationsAccepted', [ApplicationController::class, 'getAcceptedApplications']);
Route::get('/applicationsApply', [ApplicationController::class, 'getApplications']);




Route::post('/notifications/send', [NotificationController::class, 'sendNotification']);

Route::post('/notification/sendNotifSaw', [NotificationController::class, 'sendNotifSAW']);

// Route::get('/my-Jobs', [JobController::class, 'getMyJobs'])->middleware('auth:api');

Route::get('/auth/youtube', [YoutubeController::class, 'auth']);
Route::post('/youtube/upload', [YoutubeController::class, 'uploadVideo']);
Route::post('/youtube/session', [YoutubeController::class, 'sessionCreate']);
Route::get('/youtube/upload', [YoutubeController::class, 'uploadVideo']);

Route::post('/scoringVideoResume/{id}', [VideoResumeController::class, 'scoringVideoResume']);
Route::put('/users/updateStatus/{id}', [UserController::class, 'updateStatus']);
Route::put('/applications/passVideoResume/{id}', [ApplicationController::class, 'passSelectionVideoResume']);


// Route::post('/notification/sendNotifSaw', [NotificationController::class, 'sendNotifSAW']);
