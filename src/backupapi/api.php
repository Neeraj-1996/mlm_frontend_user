<?php

use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Route;

/* version 1 */
Route::group(['prefix'=>'v1'], function(){
   
	/* auth */
	Route::group(['middleware' => 'auth:sanctum'], function(){
    
		Route::get('notification/{type}', [ApiController::class, 'notification'])->name('notification.api');
		Route::get('removeNotification', [ApiController::class, 'removeNotification'])->name('removeNotification.api');
		
		Route::get('testimonialUser', [ApiController::class, 'testimonialUser'])->name('testimonialUser.api');
		Route::get('buy-product', [ApiController::class, 'buyProduct'])->name('buyProduct.api');
		Route::get('sell-product', [ApiController::class, 'sellProduct'])->name('sellProduct.api');
		Route::get('transaction', [ApiController::class, 'transaction'])->name('transaction.api');
		Route::get('wallet', [ApiController::class, 'wallet'])->name('wallet.api');
		Route::get('wallet1', [ApiController::class, 'wallet1'])->name('wallet1.api');
		Route::get('dashboard', [ApiController::class, 'dashboard'])->name('dashboard.api');
		Route::get('direct-member', [ApiController::class, 'directmember'])->name('directmember.api');
		Route::post('direct-member', [ApiController::class, 'directmemberpost'])->name('directmemberpost.api');
		Route::post('user-update', [ApiController::class, 'userUpdate'])->name('userUpdate.api');
		Route::post('userBuyProduct', [ApiController::class, 'userBuyProduct'])->name('userBuyProduct.api');
		Route::post('userSellProduct', [ApiController::class, 'userSellProduct'])->name('userSellProduct.api');
		Route::post('userBuyProduct1', [ApiController::class, 'userBuyProduct1'])->name('userBuyProduct1.api');
		Route::post('userSellProduct1', [ApiController::class, 'userSellProduct1'])->name('userSellProduct1.api');
		 Route::post('userSellProduct2', [ApiController::class, 'userSellProduct2'])->name('userSellProduct2.api');
		Route::post('addtrackid', [ApiController::class, 'addTrackId'])->name('addTrackId.api');
		
		Route::get('levelCommission/{type}', [ApiController::class, 'levelCommition'])->name('levelCommition.api');
		Route::get('directCommission/{type}', [ApiController::class, 'directCommition'])->name('directCommition.api');
		Route::post('user-update-image', [ApiController::class, 'userUpdateImage'])->name('userUpdateImage.api');
		Route::get('get-user-data', [ApiController::class, 'usereData'])->name('usereData.api');
		Route::get('userPlan', [ApiController::class, 'userPlan'])->name('userPlan.api');
		Route::post('plan-buy', [ApiController::class, 'PlanBuy'])->name('PlanBuy.api');
		Route::post('invite', [ApiController::class, 'invite'])->name('invite.api');
		Route::get('shareLink', [ApiController::class, 'shareLink'])->name('shareLink.api');
		Route::post('walletDebit', [ApiController::class, 'walletDebbit'])->name('walletDebit.api');
		Route::get('getChat', [ApiController::class, 'getChat'])->name('chat.api');
		Route::get('get-reference', [ApiController::class, 'getReference'])->name('getReference.api');
		Route::post('submit-chat', [ApiController::class, 'submitChat'])->name('submitChat.api');
		Route::post('deposite', [ApiController::class, 'deposite'])->name('deposite.api');
		Route::get('notiCount', [ApiController::class, 'notiCount'])->name('notiCount.api');
		Route::get('product', [ApiController::class, 'product'])->name('product.api');
		Route::post('withdrawal-request', [ApiController::class, 'withdrawal_request'])->name('withdrawal.request');
		Route::get('withdrawal-data', [ApiController::class, 'withdrawal_data'])->name('withdrawal.data');
		Route::get('withdrawal-paid', [ApiController::class, 'withdrawal_paid'])->name('withdrawal.paid');
		Route::post('withdrawal-cancel', [ApiController::class, 'withdrawal_cancel'])->name('withdrawal.cancel');
		Route::get('api-address', [ApiController::class, 'api_address'])->name('api.address');
		Route::post('api-address', [ApiController::class, 'api_address_post'])->name('api.address.post');
		Route::post('api-add', [ApiController::class, 'api_add_post'])->name('api.add.post');
		Route::get('api-version', [ApiController::class, 'api_version_app'])->name('api.version.get');
		Route::get('updatebalance', [ApiController::class, 'updatebalance'])->name('api.updatebalance.get');
		
	});

	/* without auth */
	Route::get('Plan', [ApiController::class, 'Plan'])->name('Plan.api');
	Route::get('downline/{id}', [ApiController::class, 'downline'])->name('downline.api');
	Route::get('client-lead', [ApiController::class, 'clientLead'])->name('clientlead.api');
	Route::get('get-lead', [ApiController::class, 'getLead'])->name('getlead.api');
	Route::get('add-lead', [ApiController::class, 'addlead'])->name('addlead.api');
	Route::post('login', [ApiController::class, 'login'])->name('appLogin.api');
	Route::post('testimonials-add', [ApiController::class, 'testimonialAdd'])->name('testimonialsAdd.api');
	Route::get('testimonials-edit/{id}', [ApiController::class, 'testimonialEdit'])->name('testimonialEdit.api');
	Route::get('testimonials-delete/{id}', [ApiController::class, 'testimonialDelete'])->name('testimonialDelete.api');
	Route::get('testimonials-list/{id}', [ApiController::class, 'testimonialList'])->name('testimonialsList.api');
	Route::post('event-add', [ApiController::class, 'eventAdd'])->name('eventAdd.api');
	Route::get('event-edit/{id}', [ApiController::class, 'eventEdit'])->name('eventEdit.api');
	Route::get('event-delete/{id}', [ApiController::class, 'eventDelete'])->name('eventDelete.api');
	Route::get('event-list', [ApiController::class, 'eventList'])->name('eventList.api');
	Route::post('register', [ApiController::class, 'register'])->name('register.api');
	Route::get('country', [ApiController::class, 'country'])->name('country.api');
	Route::get('ResponserData/{id}', [ApiController::class, 'ResponserData'])->name('ResponserData.api');

	/* forgot password */

	Route::get('send-otp', [ApiController::class, 'send_otp'])->name('send.otp');
	Route::post('otp-verification', [ApiController::class, 'otp_verification'])->name('otp_verification');
	Route::post('reset-password', [ApiController::class, 'resetPassword'])->name('resetPassword');

	/* end forgot password*/
});

