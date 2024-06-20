<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StoredQrData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stored_qr_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->nullable()->constrained('campaigns')->onDelete('cascade');
            $table->bigInteger('account_id');
            $table->enum('type', ['static','dynamic']);
            $table->string('name');
            $table->string('path');
            $table->bigInteger('short_url')->nullable();
            $table->string('url_key')->nullable();
            $table->json('data');
            $table->unique('name', 'campaign_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stored_qr_data');
    }
}
