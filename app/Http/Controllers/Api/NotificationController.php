<?php

namespace App\Http\Controllers\Api;

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

    public function index(Request $request)
    {
        $notif = Notification::with('applicant', 'company');

        if ($request->applicant_id) {
            $this->applicant_id = $request->applicant_id;
            $notif = $notif->whereHas('applicant', function ($query) {
                $query->where('applicant_id', $this->applicant_id);
            });
        }

        if ($request->company_id) {
            $this->company_id = $request->company_id;
            $notif = $notif->whereHas('comapany', function ($query) {
                $query->where('company_id', $this->company_id);
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
            'applicant' => 'required|array',
        ]);

        $companyId = $request->company_id;
        $applicants = $request->applicant;

        foreach ($applicants as $applicantData) {
            $applicantId = $applicantData['applicant_id'];
            $applicationStatus = $applicantData['status'];

            if ($applicationStatus === 'accepted') {
                // Pelamar lolos, kirim pesan sesuai input perusahaan
                $message = $request->message; // Mengambil pesan dari input perusahaan

                $notification = new Notification();
                $notification->company_id = $companyId;
                $notification->message = $message;
                $notification->save();

                $notification->applicant()->attach($applicantId);
            } else {
                // Pelamar tidak lolos, kirim pesan "Tidak Lolos"
                $notification = new Notification();
                $notification->company_id = $companyId;
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

    public function detailNotif(Notification $notif, Request $request)
    {
        return Inertia::render('Notification/DetailNotification', [
            'idNotif' => $notif->find($request->id),
        ]);
    }

    public function sendNotifSAW(Request $request)
    {

        if ($request) {
            $request->validate([
                'company_id' => 'required|int',
                'job_id' => 'required|int',
                'message' => 'required|string',
                'total_pass' => 'required|int',
            ]);
        }

        if ($request->company_id) {
            $company = Company::findOrFail($request->company_id);
            $company_id = $company->id;
        }
        if ($request->job_id) {
            $job = Company::findOrFail($request->company_id);
            $this->job_id = $job->id;
        }

        if ($job) {
            $application = Application::with('applicant')->whereHas('job', function ($query) {
                $query->where('job_id', $this->job_id);
            })->get();

            $application_pass = $application->orderBy('rank', 'asc')->limit($request->total_pass)->get();

            foreach ($application_pass as $appl) {
                $notif = Notification::create([
                    'company_id' => $company_id,
                    'message' => $request->message,
                ]);
                $notif->applicant()->attach($appl['applicant_id']);
            }
            $application_loss =  $application->orderBy('rank', 'desc')->limit(count($application) - $request->total_pass)->get();
            foreach ($application_loss as $appl) {
                $notif = Notification::create([
                    'company_id' => $company_id,
                    'message' => 'Maaf anda belum lolos',
                ]);
                $notif->applicant()->attach($appl['applicant_id']);
            }
        }
    }


    public function sendNotification(Request $request)
    {
        $request->validate([
            'applicant_id' => 'required|exists:applicants,id',
            'company_id' => 'required',
            'job_id' => 'required',
            'message' => 'required',
        ]);

        $applicant = Applicant::find($request->input('applicant_id'));

        if (!$applicant) {
            return response()->json(['success' => false, 'message' => 'Pelamar tidak ditemukan'], 404);
        }

        $jobId = $request->input('job_id');
        $message = $request->input('message');

        if ($applicant->selectedApplicantList()->contains($jobId)) {
            // Pelamar lolos dan masuk ke selectedApplicantList hasil dari generate
            $notification = new Notification();
            $notification->applicant_id = $applicant->id;
            $notification->company_id = $request->input('company_id');
            $notification->job_id = $jobId;
            $notification->message = $message;
            $notification->save();
        } else {
            // Pelamar tidak lolos
            $notification = new Notification();
            $notification->applicant_id = $applicant->id;
            $notification->company_id = $request->input('company_id');
            $notification->job_id = $jobId;
            $notification->message = 'Tidak Lolos';
            $notification->save();
        }

        return response()->json(['success' => true, 'message' => 'Notifikasi berhasil dikirim']);
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
