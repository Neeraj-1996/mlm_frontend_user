<?php

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ClientCredentialController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\frontend\RegisterNoController;
use App\Http\Controllers\AjaxController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SectorsController;
use App\Http\Controllers\SlidersController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\VeyeController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\ReportsCategoryController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\AsxCodeController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\SubscriptionsController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SubMenuController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\StockAdvisoryController;
use App\Http\Controllers\ExportExcelController;
use App\Http\Controllers\ExportdataMonthsaleController;
use App\Http\Controllers\AddPageController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CommissionController;
use App\Http\Controllers\WebinarController;
use App\Http\Controllers\TestimonialsController;
use App\Http\Controllers\ClientSubscriptionsController;
use App\Http\Controllers\DaytodayMailController;
use App\Http\Controllers\SendMailController;
use App\Http\Controllers\PersonalRecommendationController;
use App\Http\Controllers\AllReportsController;
use App\Http\Controllers\SubscriptionReportController;
use App\Http\Controllers\WatchListController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\FsgPolicyController;
use App\Http\Controllers\TermConditionsController;
use App\Http\Controllers\AboutUsPolicyController;
use App\Http\Controllers\MenuesController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\InvoicePrintController;
use App\Http\Controllers\ReportMonthController;
use App\Http\Controllers\EditorialController;
use App\Http\Controllers\PaymentTypeController;
use App\Http\Controllers\ClientTypeController;
use App\Http\Controllers\AddPopupController;
use App\Http\Controllers\AsxTypeController;
use App\Http\Controllers\AddMonthsController;
use App\Http\Controllers\TestManagementController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\LogoController;
use App\Http\Controllers\HomesController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\PaymentTransactionsController;
use App\Http\Controllers\EventImageController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\WithdrawalRequestController;
use Illuminate\Support\Facades\Auth;

Route::group(['prefix' => 'admin'], function () {
    Auth::routes();
});
Route::group(['prefix' => 'admin', 'middleware' => ['auth']], function () {
    Route::get('home', [HomeController::class, 'index'])->name('home');
    Route::resource('event-image', EventImageController::class)->except(['destroy']);
    Route::get('event-image/delete/{id}', [EventImageController::class, 'destroy'])->name('event-image.destroy');

    Route::resource('support', SupportController::class)->except(['destroy']);

    Route::get('weekly', [RegisterNoController::class, 'weekly'])->name('weekly');
    Route::get('daily', [RegisterNoController::class, 'daily'])->name('daily');


    Route::resource('roles', RoleController::class)->except(['destroy']);
    Route::get('roles/delete/{id}', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::resource('users', UserController::class)->except(['destroy']);
    Route::get('user/destroy/{id}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::resource('wallet', WalletController::class)->except(['destroy']);
    Route::resource('transactions', TransactionController::class)->except(['destroy']);

	Route::post('user/addmoney', [UserController::class, 'addmoney'])->name('users.addmoney');
	
    Route::get('user/shares/{id}', [UserController::class, 'shares'])->name('users.shares');
    Route::get('user/sharedata/{id}', [UserController::class, 'sharedata'])->name('users.sharedata');
    Route::get('user/label/{id}', [UserController::class, 'label'])->name('users.label');

    Route::resource('commission', CommissionController::class)->except(['destroy']);
    Route::get('commission/destroy/{id}', [CommissionController::class, 'destroy'])->name('commission.destroy');

    Route::get('commission/shares/{id}', [CommissionController::class, 'shares'])->name('commission.shares');
    Route::get('commission/sharedata/{id}', [CommissionController::class, 'sharedata'])->name('commission.sharedata');


    Route::resource('settings', SettingsController::class)->except(['destroy']);
    //Route::get('setting/destroy/{id}', [UserController::class, 'destroy'])->name('users.destroy');


    Route::resource('permission', PermissionController::class);

    Route::get('ajax/populate-state/{country}/{state?}', [AjaxController::class, 'populateState'])->name('ajax.populate-state');

    // payment-transactions //
    Route::resource('payment-transactions', PaymentTransactionsController::class)->except(['destroy']);
    Route::get('payment-transactions/destroy/{id}', [PaymentTransactionsController::class, 'destroy'])->name('payment-transactions.destroy');

    // Products //
    Route::resource('products', ProductsController::class)->except(['destroy']);
    Route::get('products/destroy/{id}', [ProductsController::class, 'destroy'])->name('products.destroy');
    // Plan //
    Route::resource('plan', PlansController::class)->except(['destroy']);
    Route::get('plan/destroy/{id}', [PlansController::class, 'destroy'])->name('plan.destroy');


    /******product-report********/
    Route::get('buy-report', [ProductsController::class, 'buyProduct'])->name('products.buy');
    Route::get('sell-report', [ProductsController::class, 'sellProduct'])->name('products.sell');

    // Event //
    Route::resource('events', EventsController::class)->except(['destroy']);
    Route::get('events/destroy/{id}', [EventsController::class, 'destroy'])->name('events.destroy');

    //Homes //
    Route::resource('homes', HomesController::class)->except(['destroy']);
    Route::get('homes/destroy/{id}', [HomesController::class, 'destroy'])->name('homes.destroy');

    //Reports // 
    Route::resource('reports', ReportsController::class)->except(['destroy']);
    Route::get('reports/destroy/{id}', [ReportsController::class, 'destroy'])->name('reports.destroy');

    //subscription_report //
    Route::resource('subscription-report', SubscriptionReportController::class)->except(['destroy']);
    Route::get('subscription-report/destroy/{id}', [SubscriptionReportController::class, 'destroy'])->name('subscription-report.destroy');

    //Reports Category //
    Route::resource('reports-category', ReportsCategoryController::class)->except(['destroy']);
    Route::get('reports-category/destroy/{id}', [ReportsCategoryController::class, 'destroy'])->name('reports-category.destroy');


    //What Clients Say About Us? ///testmanagement //
    Route::resource('testmanagement', TestManagementController::class)->except(['destroy']);
    Route::get('testmanagement/destroy/{id}', [TestManagementController::class, 'destroy'])->name('testmanagement.destroy');

    //Recommendation //
    Route::resource('recommendations', RecommendationController::class)->except(['destroy']);
    Route::get('recommendations/destroy/{id}', [RecommendationController::class, 'destroy'])->name('recommendations.destroy');

    //PersonalRecommendation //
    Route::resource('personalrecommendations', PersonalRecommendationController::class)->except(['destroy']);
    Route::get('personalrecommendations/destroy/{id}', [PersonalRecommendationController::class, 'destroy'])->name('personalrecommendations.destroy');


    //Payment Type //
    Route::resource('payment-type', PaymentTypeController::class)->except(['destroy']);
    Route::get('payment-type/destroy/{id}', [PaymentTypeController::class, 'destroy'])->name('payment-type.destroy');

    //Country//
    Route::resource('country', CountryController::class)->except(['destroy']);
    Route::get('country/destroy/{id}', [CountryController::class, 'destroy'])->name('country.destroy');

    //Contactus//
    Route::resource('contacts', ContactsController::class)->except(['destroy']);
    Route::get('contacts/destroy/{id}', [ContactsController::class, 'destroy'])->name('contacts.destroy');

    //plan//
    Route::resource('plan', PlansController::class)->except(['destroy']);
    Route::get('plan/destroy/{id}', [PlansController::class, 'destroy'])->name('plan.destroy');


    //Add Months //
    Route::resource('add-months', AddMonthsController::class)->except(['destroy']);
    Route::get('add-months/destroy/{id}', [AddMonthsController::class, 'destroy'])->name('add-months.destroy');

    //Add popup //
    Route::resource('add-popup', AddPopupController::class)->except(['destroy']);
    Route::get('add-popup/destroy/{id}', [AddPopupController::class, 'destroy'])->name('add-popup.destroy');


    //Menu //
    Route::resource('menu', MenuController::class)->except(['destroy']);
    Route::get('menu/destroy/{id}', [MenuController::class, 'destroy'])->name('menu.destroy');

    //Sub Menu //
    Route::resource('sub-menu', SubMenuController::class)->except(['destroy']);
    Route::get('sub-menu/destroy/{id}', [SubMenuController::class, 'destroy'])->name('sub-menu.destroy');

    /// Sector ///
    Route::resource('sector', SectorsController::class)->except(['destroy']);
    Route::get('sector/destroy/{id}', [SectorsController::class, 'destroy'])->name('sector.destroy');

    /// Logo ///
    Route::resource('logo', LogoController::class)->except(['destroy']);
    Route::get('logo/destroy/{id}', [LogoController::class, 'destroy'])->name('logo.destroy');

    /// banner ///
    Route::resource('banner', BannerController::class)->except(['destroy']);
    Route::get('banner/destroy/{id}', [BannerController::class, 'destroy'])->name('banner.destroy');

    /// Sliders ///
    Route::resource('sliders', SlidersController::class)->except(['destroy']);
    Route::get('sliders/destroy/{id}', [SlidersController::class, 'destroy'])->name('sliders.destroy');

    /// Subscribe Page ///
    Route::resource('subscriptions', SubscriptionsController::class)->except(['destroy']);
    Route::get('subscriptions/destroy/{id}', [SubscriptionsController::class, 'destroy'])->name('subscriptions.destroy');

    /// Client Subscibtion ///
    Route::resource('subscription', ClientSubscriptionsController::class)->except(['destroy']);
    Route::get('subscription/destroy/{id}', [ClientSubscriptionsController::class, 'destroy'])->name('subscription.destroy');

    /// Day to day Mail ///
    Route::resource('daytodaymail', DaytodayMailController::class)->except(['destroy']);
    Route::get('daytodaymail/destroy/{id}', [DaytodayMailController::class, 'destroy'])->name('daytodaymail.destroy');

    /// Send Mail ///
    Route::resource('sendmail', SendMailController::class)->except(['destroy']);
    Route::get('sendmail/destroy/{id}', [SendMailController::class, 'destroy'])->name('sendmail.destroy');

    /// Personal Recommendation ///
    Route::resource('personalrecommendation', PersonalRecommendationController::class)->except(['destroy']);
    Route::get('personalrecommendation/destroy/{id}', [PersonalRecommendationController::class, 'destroy'])->name('personalrecommendation.destroy');

    /// Articles ///
    Route::resource('article', ArticlesController::class)->except(['destroy']);
    Route::get('article/destroy/{id}', [ArticlesController::class, 'destroy'])->name('article.destroy');

    /// Veye Details ///
    Route::resource('veye', VeyeController::class)->except(['destroy']);
    Route::get('veye/destroy/{id}', [VeyeController::class, 'destroy'])->name('veye.destroy');

    /// Enquiry ///
    Route::resource('enquiry', EnquiryController::class)->except(['destroy']);
    Route::get('enquiry/destroy/{id}', [EnquiryController::class, 'destroy'])->name('enquiry.destroy');
    /// Companies ///
    Route::resource('companies', CompaniesController::class)->except(['destroy']);
    Route::get('companies/destroy/{id}', [CompaniesController::class, 'destroy'])->name('companies.destroy');

    //All Reports // 
    Route::resource('allreports', AllReportsController::class)->except(['destroy']);
    Route::get('allreports/destroy/{id}', [AllReportsController::class, 'destroy'])->name('allreports.destroy');
    Route::get('searchReports', [AllReportsController::class, 'searchReports'])->name('search.searchReports');

    //Watch List //
    Route::resource('watchlist', WatchListController::class)->except(['destroy']);
    Route::get('watchlist/destroy/{id}', [WatchListController::class, 'destroy'])->name('watchlist.destroy');

    //Email Template //
    Route::resource('emailtemplates', EmailTemplateController::class)->except(['destroy']);
    Route::get('emailtemplates/destroy/{id}', [EmailTemplateController::class, 'destroy'])->name('emailtemplates.destroy');

    //Privacy Policy //
    Route::resource('privacypolicy', PrivacyPolicyController::class)->except(['destroy']);
    Route::get('privacypolicy/destroy/{id}', [PrivacyPolicyController::class, 'destroy'])->name('privacypolicy.destroy');


    //Term Conditions //
    Route::resource('termconditions', TermConditionsController::class)->except(['destroy']);
    Route::get('termconditions/destroy/{id}', [TermConditionsController::class, 'destroy'])->name('termconditions.destroy');

    //About Us //
    Route::resource('aboutus', AboutUsPolicyController::class)->except(['destroy']);
    Route::get('aboutus/destroy/{id}', [AboutUsPolicyController::class, 'destroy'])->name('aboutus.destroy');

    //Add Page //
    Route::resource('add-page', AddPageController::class)->except(['destroy']);
    Route::get('add-page/destroy/{id}', [AddPageController::class, 'destroy'])->name('add-page.destroy');

    //Checkout //
    Route::resource('checkout', CheckoutController::class)->except(['destroy']);
    Route::get('checkout/destroy/{id}', [CheckoutController::class, 'destroy'])->name('checkout.destroy');


    /// CMS Management ///
    Route::resource('stock-advisory', StockAdvisoryController::class)->except(['destroy']);
    Route::get('stock-advisory/destroy/{id}', [StockAdvisoryController::class, 'destroy'])->name('stock-advisory.destroy');

    //export-excel//
    Route::resource('export-excel', ExportExcelController::class)->except(['destroy']);
    Route::get('export-excel/destroy/{id}', [ExportExcelController::class, 'destroy'])->name('export-excel.destroy');
    Route::get('export-excel-pdf/{id}', [ExportExcelController::class, 'generatePDF'])->name('export-excel.generatePDF');


    //exportdata-monthsale//
    Route::resource('exportdata-monthsale', ExportdataMonthsaleController::class)->except(['destroy']);
    Route::get('exportdata-monthsale/destroy/{id}', [ExportdataMonthsaleController::class, 'destroy'])->name('exportdata-monthsale.destroy');
    Route::get('export-excel-pdf/{id}', [ExportdataMonthsaleController::class, 'generatePDF'])->name('export-excel.generatePDF');


    //faq //
    Route::resource('faq', FaqController::class)->except(['destroy']);
    Route::get('faq/destroy/{id}', [FaqController::class, 'destroy'])->name('faq.destroy');

    //fsg //
    Route::resource('fsg',  FsgPolicyController::class)->except(['destroy']);
    Route::get('fsg/destroy/{id}', [FsgPolicyController::class, 'destroy'])->name('fsg.destroy');

    //Lead //
    Route::resource('lead', LeadController::class)->except(['destroy']);
    Route::get('lead/destroy/{id}', [LeadController::class, 'destroy'])->name('lead.destroy');
    Route::get('update-status/{id}/{status?}', [LeadController::class, 'statusUpdate'])->name('lead.status');

    //Invoice Order //
    Route::resource('invoiceorder', InvoicePrintController::class)->except(['destroy']);
    Route::get('invoiceorder/createinvoice/{id}', [InvoicePrintController::class, 'createinvoice'])->name('invoiceorder.createinvoice');
    Route::get('invoiceorder/destroy/{id}', [InvoicePrintController::class, 'destroy'])->name('invoiceorder.destroy');
    Route::get('generate-pdfs/{id}', [InvoicePrintController::class, 'generatePDFS'])->name('invoiceorder.generatePDFS');
    Route::post('togglepaid', [InvoicePrintController::class, 'togglepaid'])->name('invoiceorder.togglepaid');

    //Invoice Order // 
    Route::resource('report-month', ReportMonthController::class)->except(['destroy']);
    Route::get('report-month/destroy/{id}', [ReportMonthController::class, 'destroy'])->name('report-month.destroy');
    Route::get('generate-pdf/{id}', [ReportMonthController::class, 'generatePDF'])->name('report-month.generatePDF');

    Route::resource('footermenu', FooterController::class)->except(['destroy']);
    Route::get('footermenu/destroy/{id}', [FooterController::class, 'destroy'])->name('footermenu.destroy');

    Route::resource('editorial', EditorialController::class)->except(['destroy']);
    Route::get('editorial/destroy/{id}', [EditorialController::class, 'destroy'])->name('editorial.destroy');


    //Webinar List //
    Route::resource('webinar', WebinarController::class)->except(['destroy']);
    Route::get('webinar/destroy/{id}', [WebinarController::class, 'destroy'])->name('webinar.destroy');

    // Route::resource('blogs', BlogsController::class)->except(['destroy']);
    // Route::get('blogs/destroy/{id}', [BlogsController::class, 'destroy'])->name('blogs.destroy');

    Route::resource('testimonials', TestimonialsController::class)->except(['destroy']);
    Route::get('testimonials/destroy/{id}', [TestimonialsController::class, 'destroy'])->name('testimonials.destroy');

    Route::resource('clients', ClientController::class)->except(['destroy']);
    Route::get('clients/destroy/{id}', [ClientController::class, 'destroy'])->name('clients.destroy');

    Route::get('client-type-update', [ClientController::class, 'type_update'])->name('clients.type_update');
    Route::post('client-type-update', [ClientController::class, 'type_update'])->name('clients.type_update');

    Route::resource('client-credentials', ClientCredentialController::class)->except(['destroy']);
    Route::post('client-credentials-update', [ClientCredentialController::class, 'updateComment'])->name('clientsCredentials.updateComment');
    Route::post('report-access', [ClientCredentialController::class, 'reportAccess'])->name('clientsCredentials.reportAccess');
    Route::post('client-info', [ClientCredentialController::class, 'clientInfo'])->name('clientsCredentials.info');
    Route::get('client-credentials/destroy/{id}', [ClientCredentialController::class, 'destroy'])->name('client-credentials.destroy');
    Route::get('client-credentials/addMore/{id}', [ClientCredentialController::class, 'addProduct'])->name('client-credentials.addProduct');
    Route::post('client-credentials/editMore', [ClientCredentialController::class, 'editProduct'])->name('client-credentials.editProduct');
    Route::get('client-credentials/deleteMore/{id}', [ClientCredentialController::class, 'deleteProduct'])->name('client-credentials.deleteProduct');
    Route::get('AddMoreOther', [ClientCredentialController::class, 'addMoreOther'])->name('client-credentials.addMoreOther');
    Route::post('manage-add-more', [ClientCredentialController::class, 'manageAddMore'])->name('client-credentials.manageAddMore');
    Route::post('invoice-send', [ClientCredentialController::class, 'invoiceSend'])->name('invoice.sendInvoice');

    Route::resource("menues", MenuesController::class)->except(["destroy"]);
    Route::get('menues/destroy/{id}', [MenuesController::class, 'destroy'])->name('menues.destroy');

    Route::resource("withdrawal-request", WithdrawalRequestController::class)->except(['destroy']);
	 Route::get('withdrawal-request/update/{id}', [WithdrawalRequestController::class, 'update'])->name('withdrawal-request.update');
	Route::get('withdrawal-request/cancel/{id}', [WithdrawalRequestController::class, 'cancel'])->name('withdrawal-request.cancel');
});
Auth::routes();
Route::get('/admin', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
