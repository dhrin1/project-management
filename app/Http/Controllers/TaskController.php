<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query  = Task::query(); // Project::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");


        if(request('name')){
            $query->where("name", "like", "%".request("name")."%");
        }
        if(request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Task/Index", [
            "tasks" =>  TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Task/Create", [
            "projects" => fn () => Project::all(),
            "users" => fn () => User::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $user = auth()->user();
        $data['created_by'] =  $user->id; 
        $data['updated_by'] = $user->id; 
        if ($image) {
            $data['image_path'] = $image->store('task/' .Str::random(), 'public');
        }
        Task::create($data);

        return to_route('task.index')->with('success', 'Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia("Task/Show", [
            "task" => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
    
        return inertia("Task/Edit", [
            "task" =>  fn () => new TaskResource($task),
            "projects" => fn ()=> ProjectResource::collection(Project::query()->orderBy('name', 'desc')->get()),
            "users" => fn ()=>  UserResource::collection( User::query()->orderBy('name', 'asc')->get()),
            'success' => session('success'),
            'remember' => true,
        ]);
      
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->user()->id;
 
        if($image) {
             if($task->image_path) {
                 Storage::disk('public')->deleteDirectory(dirname($task->image_path));
             }
             $data['image_path'] = $image->store('task/'.Str::random(), 'public');
        }
 
        $task->update($data);
        return redirect()->back()->with('success',"Project ".$task->name." was updated!");
        // return to_route('task.edit', $task->id)->with('success', "Project ".$task->name." was updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        if($task->image_path){
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return redirect()->back()->with('success', "Project ".$task->name." was deleted");
        // return to_route('task.index')->with('success', "Project ".$task->name." was deleted");
    }
}
