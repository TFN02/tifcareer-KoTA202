<?php

namespace App\Http\Controllers\Api;

use App\Models\Notification;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class NotificationController extends Controller
{
    private int $applicant_id;
    private int $company_id;

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
            $notif = $notif->whereHas('comapany', function($query){
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
            'company_id' => 'required|int', // ID perusahaan
            'message' => 'required|string', // Pesan
        ]);

        $company_id = $request->company_id;
        $message = $request->message;

        $notif = Notification::create([
            'company_id' => $company_id,
            'message' => $message,
        ]);

        if ($request->applicant) {
            $applicants = $request->applicant;
            foreach ($applicants as $app) {
                $notif->applicant()->attach($app['applicant_id']); // Menghubungkan pelamar ke notifikasi
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

    public function destroy($id)
    {
        $notif = Notification::find($id);
        $notif->delete();

        return response()->json([
            'message' => 'Notification  deleted',
            'data' => $notif,
        ]);
    }

    public function sendNotification(Request $request)
    {
        try {
            $companyId = $request->input('company_id');
            $message = $request->input('message');

            // Lakukan proses pengiriman notifikasi ke pelamar di sini
            // Misalnya, Anda dapat menyimpan notifikasi ke database
            $notification = Notification::create([
                'company_id' => $companyId,
                'message' => $message,
            ]);

            // Mendapatkan data pelamar dari $request
            $applicantId = $request->input('applicant_id');

            // Menyimpan data applicant_id dan notification_id ke dalam tabel applicant_notification
            $notification->applicant()->attach($applicantId, ['company_id' => $companyId]);

            // Mengirim respon berhasil dengan data notifikasi yang telah dibuat
            return response()->json([
                'success' => true,
                'message' => 'Notifikasi berhasil dikirim',
                'data' => $notification,
            ], 200);
        } catch (\Exception $e) {
            // Mengirim respon gagal jika terjadi error
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan dalam pengiriman notifikasi',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
