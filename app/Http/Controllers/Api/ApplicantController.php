<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Applicant_InterestAreaController;
use App\Models\Applicant;
use App\Models\User;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Http\Controllers\Controller;
use App\Models\Applicant_InterestArea;
use App\Models\Education;
use App\Models\SoftSkill;
use App\Models\WorkExperience;
use App\Models\Certificate;
use App\Models\InterestArea;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    private int $applicant_id;

    public function detailApplicant(Applicant $applicant , Request $request)
    {  
            return Inertia::render('Perusahaan/DetailApplicant', [
                'getApplicantId' => $applicant->find($request->id),
            ]);
    }

    public function index(Request $request)
    {
        $applicant = Applicant::with('user','education','workExperience', 'skill', 'interestArea', 
                                        'notification', 'application', 'softSkill', 'certificate');

        if($request->order_by && $request->order_type){
            $applicant = $applicant->orderBy($request->order_by, $request->order_type);
        }else{
            $applicant = $applicant->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $applicant->paginate(20),
        ]);

    }

    public function store(Request $request)
    {
        $applicant = Applicant::class;

        if($request->user_id){
            $user = User::find($request->user_id);
            if($user != null){
                
                $request->validate([
                    'user_id' => 'required|int',
                    'name' => 'required|string',
                    'gender' => 'required|string',
                    'phone_no' => 'required|string',
                    'birth_of_date' => 'required|date',
                    'domicile' => 'required|string',
                    'description' => 'required|string',
                ]);


                $applicant = Applicant::create([
                    'user_id' => $user->id,
                    'name' => $request->input('name'),
                    'gender' => $request->input('gender'),
                    'phone_no' => $request->input('phone_no'),
                    'birth_of_date' => $request->input('birth_of_date'),
                    'domicile' => $request->input('domicile'),
                    'description' => $request->input('description'),
                ]);     
                
                $user->applicant_id = $applicant->id;
                $user->save();

                if($request->education){
                    $educations = $request->education;
                    foreach($educations as $edu){
                        $educati = $applicant->education()->create([
                            'level' => $edu['level'],
                            'major' => $edu['major'],
                            'educational_institution' => $edu['educational_institution'],
                            'graduation_year' => $edu['graduation_year'],
                        ]);
                        
                        $educati->applicant()->attach($applicant->id);
                    }
                }
                    
                if($request->work_experience){
                    $work_experiences = $request->work_experience;
                    foreach($work_experiences as $we){
                        $we = $applicant->workExperience()->create([
                            'work_institution' => $we['work_institution'],
                            'position' => $we['position'],
                            'start_year' => $we['start_year'],
                            'end_year' => $we['end_year'],
                            'description' => $we['description'],
                            'application_id' => $applicant->id,
                        ]);
                    }
                } 

                if($request->skill){
                    $skills = $request->skill;
                    
                    foreach($skills as $skill){
                        $skill_c = SkillCategory::where('name', $skill['skill_category'])->get();
                        foreach($skill_c as $sc){
                            $skill_category_id = $sc->id;
                        }
                        if(count($skill_c)==1){
                            $skill = $applicant->skill()->create([
                                'name' => $skill['name'],
                                'skill_category_id' => $skill_category_id,
                            ]);
                            $skill->applicant()->attach($applicant->id);
                        }
                    }
                    
                } 

                if($request->interest_area){
                    $interest_areas = $request->interest_area;

                    foreach($interest_areas as $interest){
                            $inter = $applicant->interestArea()->create([
                                'name_of_field' => $interest['name_of_field'],
                            ]);
                            
                            $applicant_interest = Applicant_InterestArea::where('applicant_id', $applicant->id)
                                                  ->where('interest_area_id', $inter->id)->first();
    
                            $app_int = Applicant_InterestArea::find($applicant_interest->id);
                            $app_int->reason_of_interest = $interest['reason_of_interest'];
                            $app_int->save();
                        }
                } 

                if($request->soft_skill){
                    $soft_skills = $request->soft_skill;
                    foreach($soft_skills as $ss){
                            $ss = $applicant->softSkill()->create([
                                'name' => $ss['name'],
                                'applicant_id' => $applicant->id,
                            ]);
                    }
                }

                if($request->certificate){
                    $certificates = $request->certificate;
                    foreach($certificates as $certif){
                            $certif = $applicant->certificate()->create([
                                'title' => $certif['title'],
                                'description' => $certif['description'],
                                'no_certificate' => $certif['no_certificate'],
                                'applicant_id' => $applicant->id,
                            ]);
                    }
                }
            }else{
                return response()->json([
                    'success' => false,
                    'data' =>  "User not found!",
                ]);
            }
        }else{
            return response()->json([
                'success' => false,
                'data' =>  "Please Register!",
            ]);
        }
                    

                    
        return response()->json([
            'success' => true,
            'data' =>  $applicant,
        ]);
        
    }

    public function show($id)
    {
        $applicant = Applicant::with('user','education','workExperience', 'skill', 'interestArea', 
        'notification', 'application', 'softSkill', 'certificate')
                ->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $applicant,
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->applicant_id = $id;
        $applicant = Applicant::findOrFail($id); 
        if($applicant->id){
            $request->validate([
                'name' => 'string|max:100',
                'gander' => 'string|max:100',
                'phone_no' => 'string|max:100',
                'domicile' => 'string',
                'description' => 'string',
            ]);
            
        }else{
            return response()->json([
                'success' => true,
                'data' => "Applicant not found"
            ]);
        }

        
        

        if($request->name){
            $applicant->name = $request->input('name');
        }
        if($request->phone_no){
            $applicant->phone_no = $request->input('phone_no');
        }
        if($request->birth_of_date){
            $applicant->birth_of_date = $request->input('birth_of_date');
        }
        if($request->domicile){
            $applicant->domicile = $request->input('domicile');
        }
        if($request->description){
            $applicant->description = $request->input('description');
        }
        if($request->gender){
            $applicant->gender = $request->input('gender');
        }

        if($request->education){
            foreach($request->education as $edu){
                if($edu['is_add'] == false){
                $education = Education::whereHas('applicant', function($query){
                                        $query->where('applicant_id','=', $this->applicant_id);
                })->get();
                foreach($education as $e){
                        $education_id = $e->id;
                    
                        $education_e = $applicant->education()->find($education_id);
                        if($edu['level']!=null){
                            $education_e->level = $edu['level'];
                        }
                        if($edu['major']!=null){
                            $education_e->major = $edu['major'];
                        }
                        if($edu['educational_institution']!=null){
                            $education_e->educational_institution = $edu['educational_institution'];
                        }
                        if($edu['graduation_year']!=null){
                            $education_e->graduation_year = $edu['graduation_year'];
                        }
                }
            }else{
                foreach($request->education as $edu){
                        $educati = $applicant->education()->create([
                            'level' => $edu['level'],
                            'major' => $edu['major'],
                            'educational_institution' => $edu['educational_institution'],
                            'graduation_year' => $edu['graduation_year'],
                        ]);
                        
                        $educati->applicant()->attach($applicant->id);
                    }
                }   
            }
        }       
        
        // if($request->work_experience['is_add'] === true){
        //     WorkExperience::where('id', $request->id)->update([
        //         'position' => $request->position,
        //         'work_institution' => $request->work_institution,
        //         'start_year' => $request->start_year,
        //         'end_year' => $request->end_year,
        //         'description' => $request->description,
        //     ]);
        // }

        if($request->work_experience!=null){
            foreach($request->work_experience as $wexp){
                if($wexp['is_add']==true){

                // $work_exp = WorkExperience::where('applicant_id','=', $id)->get();
                // foreach($work_exp as $we){
                    $work_id = $wexp['id'];

                    $work_e = $applicant->workExperience()->find($work_id);
                    if($work_e->id){
                        if($wexp['work_institution']!=null){
                            $work_e->work_institution = $wexp['work_institution'];
                        }
                        if($wexp['position']!=null){
                            $work_e->position = $wexp['position'];
                        }
                        if($wexp['start_year']!=null){
                            $work_e->start_year = $wexp['start_year'];
                        }
                        if($wexp['end_year']!=null){
                            $work_e->end_year = $wexp['end_year'];
                        }
                        if($wexp['description']!=null){
                            $work_e->description = $wexp['description'];
                        }
                    }
                    $work_e->update();
                // }
                
                }else{
                        foreach($request->work_experience as $we){
                            $we = $applicant->workExperience()->create([
                                'work_institution' => $we['work_institution'],
                                'position' => $we['position'],
                                'start_year' => $we['start_year'],
                                'end_year' => $we['end_year'],
                                'description' => $we['description'],
                                'applicant_id' => $applicant->id,
                            ]);
                        }
                    }
                    
                }
        }

        if($request->skill){
            foreach($request->skill as $skill){
                if($skill['is_add']==false){
                    $skill_s = Skill::whereHas('applicant', function($query){
                        $query->where('applicant_id','=', $this->applicant_id);
                    })->get();
                    
                        foreach($skill_s as $sk){
                            $skill_id = $sk->id;
    
                            $skill_sk = $applicant->skill()->find($skill_id);
    
                            if($skill_sk->id){
                                if($skill['name']!=null){
                                    $skill_sk->name = $skill['name'];
                                }
                                if($skill['skill_category']!=null){
                                    $sk_c = SkillCategory::where('name', $skill['skill_category'])->get();
                                    foreach($sk_c as $sc){
                                        $skill_c_id = $sc->id;
                                    }
                                    if(count($sk_c) == 1){
                                        $skill_cat = $skill_sk->skillCategory->find($skill_c_id);
                                        $skill_cat->name = $skill['skill_category'];
                                    }
                                }
                            }
                        }

                }else{
                    foreach($request->skill as $skill){
                        $skill_c = SkillCategory::where('name', $skill['skill_category'])->get();
                        foreach($skill_c as $sc){
                            $skill_category_id = $sc->id;
                        }
                        if(count($skill_c)==1){
                            $skill = $applicant->skill()->create([
                                'name' => $skill['name'],
                                'skill_category_id' => $skill_category_id,
                            ]);
                            $skill->applicant()->attach($applicant->id);
                        }
                    }
                }

            }
        } 

        if($request->interest_area){
            foreach($request->interest_area as $interest){
                if($interest['is_add']==false){
                    $inter = InterestArea::whereHas('applicant', function($query){
                        $query->where('applicant_id','=', $this->applicant_id);
                    })->get();
                    foreach($inter as $in){
                        $interest_id = $in->id;
    
                        $interest_in = $applicant->interestArea()->find($interest_id);
                        if($interest_in->id){
                            if($interest['name_of_field']!=null){
                                $interest_in->name = $interest['name_of_field'];
                            }
                            if($interest['reason_of_interest']!=null){
                                $interest_in->name = $interest['reason_of_interest'];
                            }
                        }else{
                            foreach($request->interest_area as $interest){
                                $interest = $applicant->interestArea()->create([
                                    'name_of_field' => $interest['name_of_field'],
                                    'reason_of_interest' => $interest['reason_of_interest'],
                                ]);
                                $interest->applicant()->attach($applicant->id);
                            } 
                        }
                    }       
                }else{
                    foreach($request->interest_area as $interest){
                        $interest = $applicant->interestArea()->create([
                            'name_of_field' => $interest['name_of_field'],
                            'reason_of_interest' => $interest['reason_of_interest'],
                        ]);
                        $interest->applicant()->attach($applicant->id);
                    }
                }

            }
        } 
             
        if($request->soft_skill){
            foreach($request->soft_skill as $soft_skill){
                if($soft_skill['is_add']==false){
                    $soft_sk = SoftSkill::where('applicant_id','=', $id)->get();
                if(count($soft_sk)!=0){
                    foreach($soft_sk as $ss){
                        $soft_sk_id = $ss->id;
    
                        $soft_s = $applicant->softSkill()->find($soft_sk_id);
                        if($soft_s->id){
                            if($soft_skill['name']!=null){
                                $soft_s->name = $soft_skill['name'];
                            }
                        }else{
                            foreach($request->soft_skill as $ss){
                                $ss = $applicant->softSkill()->create([
                                    'name' => $ss['name'],
                                    'applicant_id' => $applicant->id,
                                ]);
                            }
                        }
                    }
                }else{
                    foreach($request->soft_skill as $ss){
                        $ss = $applicant->softSkill()->create([
                            'name' => $ss['name'],
                            'applicant_id' => $applicant->id,
                        ]);
                }
                }

            }
        } 
        }

        if($request->certificate){
            foreach($request->certificate as $certif){
                if($certif['is_add']==false){
                    $cert = Certificate::where('applicant_id','=', $id)->get();
                    foreach($cert as $ct){
                        $certif_id = $ct->id;
                        $certif_c = $applicant->certificate()->find($certif_id);

                        if($certif_c->id){
                            if($certif['title']!=null){
                                $certif_c->name = $certif['title'];
                            }
                            if($certif['description']!=null){
                                $certif_c->name = $certif['description'];
                            }
                            if($certif['no_certificate']!=null){
                                $certif_c->name = $certif['no_certificate'];
                            }
                        }else{
                            foreach($request->certificate as $certif){
                                $certif = $applicant->certificate()->create([
                                    'title' => $certif['title'],
                                    'description' => $certif['description'],
                                    'no_certificate' => $certif['no_certificate'],
                                    'applicant_id' => $applicant->id,
                                ]);
                            }
                        }
                    }

                }else{
                    foreach($request->certificate as $certif){
                        $certif = $applicant->certificate()->create([
                            'title' => $certif['title'],
                            'description' => $certif['description'],
                            'no_certificate' => $certif['no_certificate'],
                            'applicant_id' => $applicant->id,
                        ]);
                    }
                }
            }
        } 

        $applicant->save();

        return response()->json([
            'success' => true,
            'data' => $applicant
            
        ]);
    }

    public function destroy( $id)
    {
        $applicant = Applicant::find($id);
        $applicant->delete();

        return response()->json([
            'message' => 'Applicant deleted',
            'data' => $applicant
        ]);
    }
}
