<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_name',  
        'account_id',
        'client_name',
        'client_email'
    ];

    public function accounts() {
        return $this->belongsTo(Accounts::class);
    }

    public function storedQrData() {
        return $this->hasMany(StoredQrData::class);
    }
}
