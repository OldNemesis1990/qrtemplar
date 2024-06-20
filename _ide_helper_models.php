<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Accounts
 *
 * @property int $id
 * @property int $user_id
 * @property string $account_type
 * @property string|null $company_name
 * @property string|null $industry
 * @property string|null $purpose
 * @property string|null $other_purpose
 * @property int $package_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Campaign> $campaigns
 * @property-read int|null $campaigns_count
 * @property-read \App\Models\Packages|null $packages
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StoredQrData> $storedQrData
 * @property-read int|null $stored_qr_data_count
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\AccountsFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts query()
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts whereAccountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts whereIndustry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts whereOtherPurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts wherePackageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Accounts whereUserId($value)
 */
	class Accounts extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Campaign
 *
 * @property int $id
 * @property string $campaign_name
 * @property int $account_id
 * @property string $client_name
 * @property string $client_email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Accounts|null $accounts
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StoredQrData> $storedQrData
 * @property-read int|null $stored_qr_data_count
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign query()
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereCampaignName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereClientEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereClientName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereUpdatedAt($value)
 */
	class Campaign extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Packages
 *
 * @property int $id
 * @property string $package_name
 * @property float $package_price
 * @property mixed $package_data
 * @property int $campaign_limit
 * @property int $qr_limit
 * @property-read \App\Models\Accounts|null $accounts
 * @method static \Illuminate\Database\Eloquent\Builder|Packages newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Packages newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Packages query()
 * @method static \Illuminate\Database\Eloquent\Builder|Packages whereCampaignLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Packages whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Packages wherePackageData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Packages wherePackageName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Packages wherePackagePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Packages whereQrLimit($value)
 */
	class Packages extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\StoredQrData
 *
 * @property int $id
 * @property int|null $campaign_id
 * @property int $account_id
 * @property string $type
 * @property string $name
 * @property string $path
 * @property int|null $short_url
 * @property string|null $url_key
 * @property mixed $data
 * @property-read \App\Models\Accounts|null $accounts
 * @property-read \App\Models\Campaign|null $campaign
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData query()
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData whereShortUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoredQrData whereUrlKey($value)
 */
	class StoredQrData extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property int $verified
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Accounts> $accounts
 * @property-read int|null $accounts_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User role($roles, $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereVerified($value)
 */
	class User extends \Eloquent {}
}

