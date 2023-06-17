<?php

namespace App\Http\Controllers\Api;

use App\Models\Job;
use App\Models\Notification;
use App\Models\Company;
use App\Models\Applicant;
use App\Models\Application;
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
        $notif = Notification::with('applicant', 'company', 'job');

        if ($request->applicant_id) {
            $this->applicant_id = $request->applicant_id;
            $notif = $notif->whereHas('applicant', function ($query) {
                $query->where('applicant_id', $this->applicant_id);
            });
        }

        if ($request->company_id) {
            $this->company_id = $request->company_id;
            $notif = $notif->whereHas('company', function($query){
                            $query->where('company_id', $this->company_id);
            });
        }

        if ($request->job_id) {
            $this->job_id = $request->job_id;
            $notif = $notif->whereHas('job', function ($query) {
                $query->where('job_id', $this->job_id);
            });
        }

        if ($request->order_by && $request->order_type) {
            $notif = $notif->orderBy($request->order_by, $request->order_type);
        } else {
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
            'job_id' => 'required|int',
            'applicant' => 'required|array',
        ]);

        $companyId = $request->company_id;
        $applicants = $request->applicant;
        $jobId = $request->job_id;

        foreach ($applicants as $applicantData) {
            $applicantId = $applicantData['applicant_id'];
            $applicationStatus = $applicantData['is_pass_selection_1'];

            if ($applicationStatus === 1) {
                // Pelamar lolos, kirim pesan sesuai input perusahaan
                $message = $request->message; // Mengambil pesan dari input perusahaan

                $notification = new Notification();
                $notification->company_id = $companyId;
                $notification->message = $message;
                $notification->job_id = $jobId;
                $notification->save();

                $notification->applicant()->attach($applicantId);
            } else {
                // Pelamar tidak lolos, kirim pesan "Tidak Lolos"
                $notification = new Notification();
                $notification->company_id = $companyId;
                $notification->job_id = $jobId;
                $notification->message = 'Maaf Anda Tidak Lolos';
                $notification->save();

                $notification->applicant()->attach($applicantId);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Notifikasi berhasil dikirim',
        ]);
    }




    public function show($id)
    {
        $notif = Notification::with('applicant', 'company')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $notif
        ]);
    }

    public function update(Request $request, $id)
    {
        $notif = Notification::findOrFail($id);

        if ($request->company_id) {
            $company = Company::find($request->company_id);
            $notif->company_id = $company->id;
        }

        if ($request->message) {
            $notif->message = $request->input('message');
        }

        $notif->save();

        return response()->json([
            'success' => true,
            'data' => $notif
        ]);
    }

    public function detailNotif(Notification $notif,Job $job,Request $request)
    {
        
        return Inertia::render('Notification/DetailNotification', [
            'idNotif' => $notif->find($request->id),
            'job' => $job,
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

        if($request->company_id && $request->job_id){
            $company = Company::findOrFail($request->company_id);
            $job = Company::findOrFail($request->job_id);
            $this->job_id = $job->id;
            $company->whereHas('job', function($query){
                $query->where('job_id', $this->job_id);
            });
            $company_id = $company->id;
        }

        if($job){
            $application = Application::with('applicant')->whereHas('job', function($query){
                                                                            $query->where('job_id', $this->job_id);
                                })->get();

            $application_pass = Application::with('applicant')->whereHas('job', function($query){
                                                            $query->where('job_id', $this->job_id);
                                })->orderBy('rank', 'asc')->limit($request->total_pass)->get();

            $notif = Notification::create([
                'company_id' => $company_id,
                'message' => $request->message,
            ]);          
            foreach($application_pass as $appl){
                $notif->applicant()->attach($appl['applicant_id']);
            }
            $application_loss =  Application::with('applicant')->whereHas('job', function($query){
                                                        $query->where('job_id', $this->job_id);
                                    })->orderBy('rank', 'desc')->limit(count($application)-$request->total_pass)->get();
            $notif = Notification::create([
                'company_id' => $company_id,
                'job_id' => $request->job_id,
                'message' => 'Maaf anda belum lolos',
            ]);
            foreach($application_loss as $appl){
                $notif->applicant()->attach($appl['applicant_id']);
            }
        }

        return response()->json([
            'message' => 'Notification  sended',
            'data' => $notif,
        ]);
        
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
