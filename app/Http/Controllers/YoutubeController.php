<?php

namespace App\Http\Controllers;


use App\Models\VideoResume;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\JobsCollection;
use App\Models\Applicant;
use Illuminate\Support\Facades\Auth;

use GuzzleHttp\Client as Clt;
use GuzzleHttp\Psr7\Request as Req;
use GuzzleHttp\Psr7\Utils;

use Google\Client;
use Google\Service\YouTube;
use Google\Service\YouTube\Video;
use Google\Service\YouTube\VideoSnippet;
use Google\Service\YouTube\VideoStatus;
use Google\Http\MediaFileUpload;
use Psr\Http\Message\RequestInterface;

class YoutubeController extends Controller
{


    public function uploadVideo(Request $request)
    {

        if($request){
            $request->validate([
                'application_id' => 'required|int',
                'title' => 'required|string|max:100',
                'tags' => 'required|string|max:100',
                'description' => 'required|string',
                'video_path' => 'required|string',
            ]);
        }


        $client = new Client();
        $client->setClientId("356925278435-8131j8sa1rob96r9nupg4upd7oolomsj.apps.googleusercontent.com");
        $client->setClientSecret("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");
        $client->setScopes(YouTube::YOUTUBE_UPLOAD);
        $client->setRedirectUri("http://localhost:8000/youtube-api");
        $client->setAccessType('offline');
        $client->setIncludeGrantedScopes(true);
        $url =  $client->createAuthUrl();
        

        if (isset($_GET['code'])) { 
            $tokenSessionKey = 'token-'.$client->prepareScopes();
            $client->authenticate($_GET['code']); 
            $_SESSION[$tokenSessionKey] = $client->getAccessToken(); 

            if (isset($_SESSION[$tokenSessionKey])) { 
                $client->setAccessToken($_SESSION[$tokenSessionKey]);
            }
        }else{
            return redirect($url);
        }

            
        if($client->getAccessToken()){
            
            $video = new Video();
            // Membuat objek layanan YouTube
            $youtube = new YouTube($client);
    
            // Membuat objek video yang akan diunggah
            $video = new Video();
            // Membuat objek video snippet
            $videoSnippet = new VideoSnippet();
            $videoSnippet->setTitle($request->title);
            $videoSnippet->setDescription($request->description);
            $videoSnippet->setTags($request->tags);
            $videoSnippet->setCategoryId("27");
            $video->setSnippet($videoSnippet);
            // Membuat objek video status
            $videoStatus = new VideoStatus();
            $videoStatus->setPrivacyStatus('private');
            $video->setStatus($videoStatus); 
    
            $chunkSizeBytes = 10 * 10240 * 10240;
            $video_path = $request->video_path;
     
    
            $response_yt = $youtube->videos->insert(
                'snippet,status',
                $video,
                array(
                    'data' => file_get_contents($video_path),
                    'mimeType' => 'application/octet-stream',
                    'uploadType' => 'multipart'
                )
            );

            $application = Application::find($request->application_id);
            if($application->id){
                $video_resume = VideoResume::create([
                    'application_id' => $application->id,
                    'title' => $request->input('title'),
                    'description' => $request->input('description'),
                    'tags' => $request->input('tags'),
                    'category_id' => "27",
                    'youtube_video_id' => $response_yt->getId(),
                ]); 
                $application->video_resume_id = $video_resume->id;
                $application->save();

                if($request->segment){
                    foreach($request->segment as $seg){
                        $seg = $video_resume->segmentVideoResume()->create([
                            'segment_title' => $seg['segment_title'],
                            'time_to_jump' => $seg['time_to_jump'],
                            'video_resume_id' => $video_resume->id,
                        ]);
                    }
                }
            }
                    

            return response()->json([
                'applicantion' => $application,
                'video_id'   => $response_yt->getId(),
            ]);


        }



        return response()->json([
            'result' => null,
        ]);
    }      
}
