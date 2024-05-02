<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['image_path', 'name', 'description', 'status', 'due_date', 'project_id', 'assigned_user_id', 'priority', 'created_by', 'updated_by'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by')->select(['id', 'name', 'email', 'created_at']);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by')->select(['id', 'name', 'email', 'created_at']);
    }

    public function getImagePathAttribute()
    {
        $path = $this->attributes['image_path'];
        if ($path) {
            if (strpos($path, "task") !== false) {
                return  Storage::url($this->attributes['image_path']);
            } else {
                return str_replace("/storage/", "", $path);
            }
        }
        return null;
    }
}
