<?php

namespace App\Http\Controllers\Api;

use App\Models\Notification;
use App\Models\Company;
use App\Models\Job;
use App\Models\Application;
use App\Models\Applicant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class NotificationController extends Controller
{
    private int $applicant_id;
    private int $company_id;
    private int $job_id;

    public function index(Request $request)
    {
        $notif = Notification::with('applicant','company');

        if($request->applicant_id){
            $this->applicant_id = $request->applicant_id;
            $notif = $notif->whereHas('applicant', function($query){
                            $query->where('applicant_id', $this->applicant_id);
            });
        }

        if($request->company_id){
            $this->company_id = $request->company_id;
            $notif = $notif->whereHas('company', function($query){
                            $query->where('company_id', $this->company_id);
            });
        }

        if($request->order_by && $request->order_type){
            $notif = $notif->orderBy($request->order_by, $request->order_type);
        }else{
            $notif = $notif->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $notif->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'required|int',
            'message' => 'required|string',
        ]);

        if($request->company_id){
            $company = Company::find($request->company_id);
            $company_id = $company->id;
        }

        $notif = Notification::create([
            'company_id' => $company_id,
            'message' => $request->message,
        ]);

        if($request->applicant){
            $applicants = $request->applicant;
            foreach($applicants as $app){
                $notif->applicant()->attach($app['applicant_id']);
            }
        }
        return response()->json([
            'success' => true,
            'data' =>  $notif,
        ]);
    }

    public function show($id)
    {
        $notif = Notification::with('applicant','company')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $notif
        ]);
    }

    public function update(Request $request, $id)
    {
        $notif = Notification::findOrFail($id);

        if($request->company_id){
            $company = Company::find($request->company_id);
            $notif->company_id = $company->id;
        }

        if($request->message){
            $notif->message = $request->input('message');
        }

        $notif->save();

        return response()->json([
            'success' => true,
            'data' => $notif
        ]);
    }

    public function detailNotif(Notification $notif, Request $request)
    {
        return Inertia::render('Notification/DetailNotification', [
            'idNotif' => $notif->find($request->id),
        ]);
    }

    public function sendNotifSAW(Request $request)
    {
       
        if($request){
            $request->validate([
                'company_id' => 'required|int',
                'job_id' => 'required|int',
                'message' => 'required|string',
                'total_pass' => 'required|int',
            ]);
        }

        if($request->company_id){
            $company = Company::findOrFail($request->company_id);
            $company_id = $company->id;
        }
        if($request->job_id){
            $job = Company::findOrFail($request->company_id);
            $this->job_id = $job->id;
        }

        if($job){
            $application = Application::with('applicant')->whereHas('job', function($query){
                                                                            $query->where('job_id', $this->job_id);
                                })->get();

             $application_pass = $application->orderBy('rank', 'asc')->limit($request->total_pass)->get();

            foreach($application_pass as $appl){
                $notif = Notification::create([
                    'company_id' => $company_id,
                    'message' => $request->message,
                ]);
                $notif->applicant()->attach($appl['applicant_id']);
            }
            $application_loss =  $application->orderBy('rank', 'desc')->limit(count($application)-$request->total_pass)->get();
            foreach($application_loss as $appl){
                $notif = Notification::create([
                    'company_id' => $company_id,
                    'message' => 'Maaf anda belum lolos',
                ]);
                $notif->applicant()->attach($appl['applicant_id']);
            }
        }
        
    }

    public function destroy($id)
    {
        $notif = Notification::find($id);
        $notif->delete();

        return response()->json([
            'message' => 'Notification  deleted',
            'data' => $notif,
        ]);
    }



    
}
