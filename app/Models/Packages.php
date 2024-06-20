<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Packages extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_name',
        'campaign_limit',
        'qr_limit'
    ];

    public function accounts() {
        return $this->belongsTo(Accounts::class);
    }
}
