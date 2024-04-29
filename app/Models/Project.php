<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;


    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by')->select(['id', 'name', 'email', 'created_at']);
    }

    public function updateddBy()
    {
        return $this->belongsTo(User::class, 'updated_by')->select(['id', 'name', 'email', 'created_at']);
    }
}
