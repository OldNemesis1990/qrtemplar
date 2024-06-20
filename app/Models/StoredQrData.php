<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoredQrData extends Model
{
    use HasFactory;

    protected $table = 'stored_qr_data';

    protected $fillable = [
        'campaign_id',
        'account_id',
        'type',
        'name',
        'path',
        'short_url',
        'url_key',
        'data'
    ];

    public $timestamps = false;

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }

    public function accounts() {
        return $this->belongsTo(Accounts::class);
    }
}
