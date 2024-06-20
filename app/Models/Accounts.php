<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accounts extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'account_type',
        'company_name',
        'industry',
        'purpose',
        'other_purpose',
        'package_id'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function campaigns() {
        return $this->hasMany(Campaign::class, "account_id");
    }

    public function packages() {
        return $this->hasOne(Packages::class, "id", "package_id");
    }

    public function storedQrData() {
        return $this->hasMany(StoredQrData::class, "account_id");
    }
}
