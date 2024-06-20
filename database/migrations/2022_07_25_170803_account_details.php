<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AccountDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function  (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->enum('account_type', ['company', 'individual']);
            $table->string('company_name')->nullable();
            $table->string('industry')->nullable();
            $table->enum('purpose', ['marketing','social_media','product_tracking','information','sales','network','payments','other'])->nullable();
            $table->string('other_purpose')->nullable();
            $table->integer('package_id')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
