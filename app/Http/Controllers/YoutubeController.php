<?php

namespace App\Http\Controllers;


use App\Models\VideoResume;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use Inertia\Inertia;
use App\Http\Resources\JobsCollection;
use App\Models\Applicant;
use App\Models\Sessions;
use Illuminate\Support\Facades\Auth;

use GuzzleHttp\Client as Clt;
use GuzzleHttp\Psr7\Request as Req;
use GuzzleHttp\Psr7\Utils;

use Google\Client;
use Google\Service\YouTube;
use Google\Service\YouTube\Video;
use Google\Service\YouTube\VideoSnippet;
use Google\Service\YouTube\VideoStatus;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

use Psr\Http\Message\RequestInterface;

class YoutubeController extends Controller
{

    public int $application_id;
    public string $title;
    public string $tags;
    public string $description;
    public string $video_path;
    public  $segment_video = [];
    public  $access_token = [];

    public function sessionCreate(Request $request)
    {
        if($request->application_id ){
            $this->application_id = $request->application_id;
            $this->title = $request->title;
            $this->tags = $request->tags;
            $this->description = $request->description;
            $this->segment_video = $request->segment_video;

            if($request->hasFile('file')){
                $filename = $request->file('file')->getClientOriginalName();
                $destinationPath = public_path().'\vid' ;
                $this->video_path = $request->file('file')->move($destinationPath, $filename);
            }

            $sessions = Sessions::create(
                [
                    'application_id' => $this->application_id,
                    'title' => $this->title,
                    'description' => $this->description,
                    'tags' => $this->tags,
                    'video_path' => $this->video_path,
                    'segment_video' => $this->segment_video,
                ]
            );

        }   
        return response()->json([
            'session' => $sessions,
            'segment' => $request->segment_video,
        ]);

    }
    public function auth(Request $request)
    {

        $client = new Client();
        $client->setClientId("356925278435-8131j8sa1rob96r9nupg4upd7oolomsj.apps.googleusercontent.com");
        $client->setClientSecret("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");
        $client->setRedirectUri("http://localhost:8000/auth/youtube/callback");
        $client->setScopes(YouTube::YOUTUBE_UPLOAD);
        $client->setAccessType('offline');
        $client->setPrompt('consent');

        $authUrl = $client->createAuthUrl();  
       
        // if ($request->hasFile('file')) {
        //     $file = $request->file('file');
            
        //     // Get the file path
        //     $file_path = $file->path();
        //     session(['video_path' => $file_path]);
        // }
        

        return response()->json([
            'authUrl' => $authUrl,
        ]);
    }

    public function authCallback(Request $request)
    {
        $client = new Client();
        $client->setClientId("356925278435-8131j8sa1rob96r9nupg4upd7oolomsj.apps.googleusercontent.com");
        $client->setClientSecret("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");
        $client->setRedirectUri("http://localhost:8000/auth/youtube/callback");
        $client->setScopes(YouTube::YOUTUBE_UPLOAD);
        $client->setAccessType('offline');
        $client->setPrompt('consent');

        $client->fetchAccessTokenWithAuthCode($request->code);

        $this->access_token = $client->getAccessToken();
        Session::forget('access_token');
        Session::put('access_token' , $this->access_token);
        // session(['access_token' => $this->access_token]);

        if (Session::get('access_token')){ 
            $client->setAccessToken($this->access_token);
        }

        

        return redirect('youtube/upload');
    }

    public function uploadVideo(Client $client,Request $request)
    {
      
        
        if(Session::get('access_token')){

            $access_token = Session::get('access_token');
            $sessions=Sessions::first(); 

            $application_id = $sessions->application_id;
            // dd($application_id);

            $title = $sessions->title;
            $tags = $sessions->tags;
            $description = $sessions->description;
            $video_path = $sessions->video_path;
            $segment_video = json_decode($sessions->segment_video, true);
           
            

            $client = new Client();
            $client->setClientId("356925278435-8131j8sa1rob96r9nupg4upd7oolomsj.apps.googleusercontent.com");
            $client->setClientSecret("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");
            $client->setRedirectUri("http://localhost:8000/auth/youtube/callback");
            $client->setScopes(YouTube::YOUTUBE_UPLOAD);
            $client->setAccessType('offline');
            $client->setPrompt('consent');

            $client->setAccessToken($access_token);

            $video = new Video();
            // Membuat objek layanan YouTube
            $youtube = new YouTube($client);

            // Membuat objek video yang akan diunggah
            $video = new Video();
            // Membuat objek video snippet
            $videoSnippet = new VideoSnippet();
            $videoSnippet->setTitle($title);
            $videoSnippet->setDescription($description);
            $videoSnippet->setTags($tags);
            $videoSnippet->setCategoryId("27");
            $video->setSnippet($videoSnippet);
            // Membuat objek video status
            $videoStatus = new VideoStatus();
            $videoStatus->setPrivacyStatus('public');
            $video->setStatus($videoStatus); 
        
            //$chunkSizeBytes = 10 * 10240 * 10240;

            $response_yt = $youtube->videos->insert(
                'snippet,status',
                $video,
                array(
                    'data' => file_get_contents($video_path),
                    'mimeType' => 'application/octet-stream',
                    'uploadType' => 'multipart'
                )
            );

            
            
            $application = Application::find($application_id);
            if($application->id){
                $video_resume = VideoResume::create([
                    'application_id' => $application->id,
                    'title' => $title,
                    'description' => $description,
                    'tags' => $tags,
                    'category_id' => "27",
                    'youtube_video_id' => $response_yt->getId(),
                ]); 
                $application->video_resume_id = $video_resume->id;
                $application->is_selection_1 = 0;
                $application->is_selection_2 = 1;
                $application->save();

                if($segment_video){
                    foreach($segment_video as $seg){
                        $seg = $video_resume->segmentVideoResume()->create([
                            'segment_title' => $seg['segment_title'],
                            'time_to_jump' => $seg['time_to_jump'],
                            'video_resume_id' => $video_resume->id,
                        ]);
                    }
                }
            }  
            if(file_exists($sessions->video_path)){
                unlink($sessions->video_path);
                Sessions::destroy($sessions->all());
            } 
            
            return redirect('lowonganKerja');

        }else{

            return redirect('api/auth/youtube');
        }
        
    }      
}
