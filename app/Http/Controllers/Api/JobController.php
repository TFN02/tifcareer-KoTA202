<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Resources\JobsCollection;
use App\Models\JobCategory;
use App\Models\WeightingCriteria;
use App\Models\WeightingVariable;

class JobController extends Controller
{
    private string $keyword;
    private $job_category_id = [];

    public function index(Request $request)
    {
        $jobs = Job::with('company','assignmentVideoResume','jobCategory', 'weightingCriteria', 'weightingVariable');

        if($request->search!=null && $request->job_category==null){
            $this->keyword = $request->search;
            $jobs = $jobs->where('title', 'LIKE', "%" . $this->keyword . "%")
                        ->orWhere('job_position','LIKE',"%" . $this->keyword . "%")
                        ->orWhere('job_desc','LIKE',"%" . $this->keyword . "%")
                        ->orWhere('location','LIKE',"%" . $this->keyword . "%")
                        ->orWhere('salary','LIKE',"%" . $this->keyword . "%");
        }else if($request->job_category!=null && $request->search==null){
            $this->keyword = $request->job_category;
            $job_categories = JobCategory::where('name','LIKE', "%" . $this->keyword . "%")->get();
            foreach( $job_categories as $job_category){
                array_push($this->job_category_id,$job_category->id);
            }
            
            $jobs = $jobs->whereHas('jobCategory', function($query){
                                $query->whereIn('job_category_id', $this->job_category_id);
                                });
            return response()->json([
                'success' => true,
                'data' => $jobs->get(),
            ]);
        }else if($request->search!=null && $request->job_category!=null){
            return response()->json([
                'success' => true,
                'data' => "pilih salah satu [search | job_category]",
            ]);
        }

        if($request->order_by && $request->order_type){
            $jobs = $jobs->orderBy($request->order_by, $request->order_type);
        }else{
            $jobs = $jobs->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $jobs->paginate(9),
        ]);

    }

    public function store(Request $request)
    {

        $company = Company::class;

        if($request->company_id){
            
            $company = Company::find($request->company_id);
            if($company != null){
                $request->validate([
                    'company_id' => 'required|int',
                    'title' => 'required|string|max:100',
                    'job_position' => 'required|string',
                    'job_category' => 'required|string',
                    'location' => 'required|string|max:150',
                    'salary' => 'required|string|max:20',
                    'start_date' => 'required|date',
                    'end_date' => 'required|date',
                ]);
                $job_category = JobCategory::where('name', '=', $request->job_category)->get();
                foreach($job_category as $jb){
                    $job_category_id = $jb->id;
                }
                if(count($job_category)==1){
                    $jobs = Job::create([
                        'company_id' => $company->id,
                        'job_category_id' => $job_category_id,
                        'title' => $request->input('title'),
                        'job_position' => $request->input('job_position'),
                        'job_desc' => $request->input('job_desc'),
                        'location' => $request->input('location'),
                        'salary' => $request->input('salary'),
                        'status' => 'new',
                        'start_date' => $request->input('start_date'),
                        'end_date' =>  $request->input('end_date'),
                    ]);

                    $weighting_criterias = $request->weighting_criteria;
                    foreach($weighting_criterias as $criteria){
                        $criteria = $jobs->weightingCriteria()->create([
                            'name' => $criteria['name'],
                            'weight' => $criteria['weight'],
                            'job_id' => $jobs->id,
                    ]);
                    }

                    $weighting_variable = $request->weighting_variable;
                    foreach($weighting_variable as $variable){
                        $criteria_v = WeightingCriteria::where([
                            ['name', '=', $variable['criteria']],
                            ['job_id', '=', $jobs->id],
                        ])->get();
                        $criteria_id=0;
                        foreach($criteria_v as $c){
                            $criteria_id = $c->id;
                        }
                        $variable = $jobs->weightingVariable()->create([
                            'name' => $variable['name'],
                            'weight' => $variable['weight'],
                            'weighting_criteria_id' => $criteria_id,
                            'job_id' => $jobs->id,
                        ]);
                    }

                    return response()->json([
                        'success' => true,
                        'data' =>  $jobs,
                    ]);

                }else{
                    return response()->json([
                        'success' => true,
                        'data' =>  "Job Category not found",
                    ]);
                }

            }else{
                return response()->json([
                    'success' => true,
                    'data' =>  "Company not found",
                ]);
            }

        }else{
            return response()->json([
                'success' => true,
                'data' =>  "Company Id is Required",
            ]);
        }
        
    }

    public function show($id)
    {
        $jobs = Job::with('company','assignmentVideoResume', 'jobCategory', 'weightingCriteria', 'weightingVariable')
                ->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $jobs,
        ]);
    }


    public function update(Request $request, $id)
    {
        $jobs = Job::findOrFail($id); 

        $request->validate([
            'company_id' => 'int',
            'title' => 'string|max:100',
            'job_position' => 'string',
            'job_category' => 'string',
            'location' => 'string|max:150',
            'salary' => 'string|max:20',
            'start_date' => 'date',
            'end_date' => 'date',
        ]);

        if($request->job_category){
            $job_category = JobCategory::where('name', '=', $request->job_category)->get();
            foreach($job_category as $jb){
                $job_category_id = $jb->id;
            }
            $jobs->job_category_id = $job_category_id;

        }
        
        if($request->company_id){
            $company = Company::find($request->company_id);
            if($company != null){
                $jobs->company_id = $company->id;
            }else{

            }
        }

        if($request->title){
            $jobs->title = $request->input('title');
        }
        if($request->job_desc){
            $jobs->job_desc = $request->input('job_desc');
        }
        if($request->job_position){
            $jobs->job_position = $request->input('job_position');
        }
        if($request->location){
            $jobs->location = $request->input('location');
        }
        if($request->salary){
            $jobs->salary = $request->input('salary');
        }
        if($request->start_date){
            $jobs->start_date = $request->input('start_date');
        }
        if($request->end_date){
            $jobs->end_date = $request->input('end_date');
        }  
        if($request->weighting_criteria){
            foreach($request->weighting_criteria as $criteria){
                $weighting_criterias = WeightingCriteria::where('name','=', $criteria['name'] )
                                        ->where('job_id','=', $id)->get();
                foreach($weighting_criterias as $c){
                    $criteria_id = $c->id;

                    $weighting_criteria = $jobs->weightingCriteria()->find($criteria_id);
                    if($criteria['name']!=null){
                        $weighting_criteria->name = $criteria['name'];
                    }
                    if($criteria['weight']!=null){
                        $weighting_criteria->weight = $criteria['weight'];
                    }
                }
            }
        } 
        if($request->weighting_variable){
            foreach($request->weighting_variable as $variable){
                $weighting_variables = WeightingVariable::where('name','=', $variable['name'] )
                                        ->where('job_id','=', $id)->get();
                foreach($weighting_variables as $v){
                    $variable_id = $v->id;

                    $weighting_variable = $jobs->weightingVariable()->find($variable_id);
                    if($variable['name']!=null){
                        $weighting_variable->name = $criteria['name'];
                    }
                    if($variable['weight']!=null){
                        $weighting_variable->weight = $criteria['weight'];
                    }
                    if($variable['criteria']!=null){
                        $w_criteria = WeightingCriteria::where('name','=', $variable['criteria'])
                                        ->where('job_id', '=', $id)->get();
                        foreach($w_criteria as $cr){
                            $id_criteria = $cr->id;
                        }
                        $weighting_variable->criteria_id = $id_criteria;
                    }
                }
            }
        }       
               
        $jobs->save();

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);

    }

    public function destroy($id)
    {
        $jobs = Job::find($id);
        $jobs->delete();

        return response()->json([
            'message' => 'Jobs deleted',
            'data' => $jobs
        ]);
    }
}
