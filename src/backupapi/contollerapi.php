<?php
namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Providers\SendOtp;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Models\Country;
use App\Models\Support;
use App\Models\Products;
use App\Models\WalletTransactions;
use App\Models\Transactions;
use DB;
use App\Models\Setting;
use App\Models\Deposite;
use App\Models\Notification;
use App\Models\Plan;
//use Event;
//coming data from crm models
use App\Models\Lead;
use App\Models\CustomerProductReport;
use App\Models\Customer;
use App\Models\Testimonials;
use App\Models\Event;
use App\Models\Invitation;
use App\Models\Frontend\ClientRegistration;
use App\Models\WithdrawalRequest;
use App\Providers\SendEmail;
use Carbon\Carbon;
use Mail;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Auth;

class ApiController
{


    public function deposite(Request $request)
    {
		
		
		
		
        $validator = validator($request->all(), [
            'payment_id' => 'required',
            'txid' => 'required',
            'explorer_url' => 'required',
            'type' => 'required',
            'merchant_id' => 'required',
            'coin_short_name' => 'required',
            'wallet_id' => 'required',
            'wallet_name' => 'required',
            'address' => 'required',
            'amount' => 'required',
            'confirmations' => 'required',
            'date' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }
		$txn=WalletTransactions::where('transaction_id',$request->txid)->first();	
		if($txn){
			return response()->json(['status' => 400, 'message' => 'Data alerady added.', 'balance' => '']);
		}
        $input = $request->all();
        $input['user_id'] = Auth()->user()->id;
        
        $lastdata = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')->latest()->first();
		//dd($lastdata->balance);
		
		
		Deposite::create($input);
        $data['user_id'] = Auth()->user()->id;
        $data['transaction_id'] = $request->txid;
        $data['credit'] = $request->amount;
       	$data['type'] = $request->type;
        if ($lastdata) {
            $data['balance'] = $request->amount + $lastdata->balance;
        } else {
            $data['balance'] = $request->amount;
        }
        $data['transaction_type'] = 'Deposit';
        $data['reference'] = 'user send amount';
        
        WalletTransactions::create($data);
		 $sumdeposit = WalletTransactions::where('user_id', Auth()->user()->id)->where('transaction_type','Deposit')->sum('credit');
        //dd($sumdeposit);
			$lastdata = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')->latest()->first();
		if($lastdata){
		$myshareid=Auth()->user()->my_share_id;
	
		$sql="SELECT COUNT(DISTINCT wt.user_id)  as x
FROM wallet_transactions wt
INNER JOIN users u ON wt.user_id = u.id
WHERE u.responser_id = $myshareid
  AND wt.transaction_type = 'deposit'
  AND wt.balance >= 100";

	$result=DB::select($sql);
		$count=$result ? $result[0]->x :0;
		$plancomm=Plan::select('*')->where('price','<=',$lastdata->balance)
			->where('share_limit','<=',$count)
			->whereNull('deleted_at')
			->orderBy('price','desc')->take(1)->get()->first();	
			//dd($plancomm->id);
			
				if($plancomm){
				$user = User::find(Auth()->user()->id);
       			$user->plan_id = $plancomm->id;
        		$user->save();
				}
		}
				
		if(!Auth::user()->isCompleteShareCommission && $sumdeposit >= 100){
			//dd("im in first".$sumdeposit.'='. Auth()->user()->id);
            Auth::user()->creditFirstCommission();
		}

        return response()->json(['status' => 200, 'message' => 'Data Submit successfully.', 'balance' => $data['balance']]);
    }

	
	public function getReference(){
		
		$myshareid=Auth()->user()->my_share_id;
		$sql="SELECT COUNT(DISTINCT wt.user_id)  as x
FROM wallet_transactions wt
INNER JOIN users u ON wt.user_id = u.id
WHERE u.responser_id = $myshareid
  AND wt.transaction_type = 'deposit'
  AND wt.balance >= 100";

	$result=DB::select($sql);
			
		// $count=User::whereIn(id
		return response()->json(['status' => 200, 'message' => 'Count successfully.', 'count' => $result ? $result[0]->x :0 ]);
		
	}
    public function notification($type)
    {

        /* $lead=Support::where('from_id',Auth()->user()->id)->where('notification',1)->orWhere('to_id',Auth()->user()->id)->where('notification',1)->count();
			
			 $report =WalletTransactions::select('wallet_transactions.*','u.name as username','u.my_share_id as shareid')->join('users as u', 'wallet_transactions.user_id', '=', 'u.id')->where('wallet_transactions.user_id',Auth()->user()->id)->get()->toArray();*/

        $date = date('Y-m-d');
        $alldata = 'no data found';
        $count = 0;
        if ($type == 'all') {
            $alldata = Notification::where('user_id', Auth()->user()->id)->where('status', 1)->get()->toArray();
            $count = Notification::where('user_id', Auth()->user()->id)->where('status', 1)->count();
        }

        if ($type == 'today') {
            $alldata = Notification::where('user_id', Auth()->user()->id)->whereDate('created_at', $date)->where('status', 1)->get()->toArray();
            $count = Notification::where('user_id', Auth()->user()->id)->whereDate('created_at', $date)->where('status', 1)->count();
        }

        if ($type == 'yesterday') {
            $alldata = Notification::where('user_id', Auth()->user()->id)->whereDate('created_at', $date)->where('status', 1)->get()->toArray();
            $count = Notification::where('user_id', Auth()->user()->id)->whereDate('created_at', $date)->where('status', 1)->count();
        }

        return response()->json(['status' => 200, 'message' => 'Data found.', 'data' => $alldata, 'count' => $count]);
    }

    public function removeNotification(Request $request)
    {


        DB::table('Notification')
            ->where('user_id',  Auth()->user()->id)  // find your user by their email
            ->update(array('status' => 0));

        /*DB::table('supports')
        ->where('to_id',  Auth()->user()->id)  // find your user by their email
        ->update(array('notification' =>0));*/

        return response()->json(['status' => 200, 'message' => 'data update  successfully.']);
    }

	public function getChat(request $request)
    {

        $lead = Support::where('from_id', Auth()->user()->id)->orWhere('to_id', Auth()->user()->id)->get()->toArray();
		Support::Where('to_id', Auth()->user()->id)->update(['support' => 1]);
		
		$count = Support::where('to_id', Auth()->user()->id)
				->where('support',0)->count();
		
		
        return response()->json(['status' => 200, 'message' => 'Data found.', 'data' => $lead,'notecount' => $count]);
    }
	
	 public function notiCount(request $request)
    {
        $count = Support::where('to_id', Auth()->user()->id)->where('support',0)->count();
	     return response()->json(['status' => 200, 'message' => 'Data found.', 'data' => $count]);
    }

    public function submitChat(Request $request)
    {
        $validator = validator($request->all(), [
            //'form_id'=> 'required',
            //'to_id' => 'required',
            'message' => 'required'

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }
        $lead = Support::where('from_id', Auth()->user()->id)->orWhere('to_id', Auth()->user()->id)->count();

        $input = $request->all();
        $input['from_id'] = Auth()->user()->id;
        $input['to_id'] = 1;
        $input['notification'] = 0;
		 $input['support'] = 1;
        $user = Support::create($input);

        if ($lead == 0) {
            $input['from_id'] = 1;
            $input['to_id'] = Auth()->user()->id;
            $input['message'] = 'Hi this side your executive whatsapp no. +601117211870 please whatsapp them they will help you thanks for contacting SmartTrade.';
            $input['notification'] = 1;
			 $input['support'] = 0;
			$input['type'] = 'admin';
            $user = Support::create($input);
        }

        return response()->json(['status' => 200, 'message' => 'Chat  successfully.']);
    }

    public function login(Request $request)
    {
        $validator = validator($request->all(), [
            'mobile' => 'required|numeric|digits:10|exists:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }

        if (Auth::attempt(['mobile' => $request->mobile, 'password' => $request->password])) {
            $token = Auth()->user()->createToken(Auth::user()->name)->plainTextToken;
            return response()->json(['status' => 200, 'message' => 'Successfully logged in.', 'token' => $token, 'user' => Auth::user()]);
        }
        return response()->json(['status' => 400, 'message' => 'Credential not matched our records.']);
    }

    public function register(Request $request)
    {

        $validator = validator($request->all(), [


            'responser_id' => 'required',
            // 'responser_name'=>'required',
            //'name'=>'required',
            'username' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8',             // must be at least 10 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ],
            'confirm_password' => 'required|same:password',
            
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }
		
		$exists=User::where('my_share_id',$request->responser_id)->first();
	if($exists){
        $input = $request->all();
        $input['my_share_id'] = rand(10000, 99999);
        //print_r($input);die;

        $roles = 2;
        // $input['name'] = $request->first_name.' '.$request->last_name;
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $lastId = $user->id;
        // print_r($LastInsertId);die;
        $inputs = $request->all();
        $inputs['user_id'] = $lastId;
        $inputs['phone'] = $request->mobile;

        ClientRegistration::create($inputs);

        $role = Role::find($roles);
        $user->assignRole($role);


        /* Mail::send('email',[
                'name' => $request->name,
                'email' =>$request->email,
                'responser_id' => $request->responser_id,
                'responser_name' => $request->responser_name ], function($message) use ($request){
                $message->to($request->email);
                $message->subject('Registeration successfully');
            });*/


        return response()->json(['status' => 200, 'message' => 'Registeration successfully']);
	}
	 return response()->json(['status' => 400, 'message' => 'Responser id does not exists']);	
    }



    public function userVerified()
    {
        return response()->json(['status' => Auth::user()->customers->is_verified ? 200 : 400, 'user' => Auth::user(), 'is_verified' => Auth::user()->customers->is_verified], 200);
    }

    public function clientLead(request $request)
    {

        $alldata = json_decode($request->data);
        //dd($request->data);
        $lead = $alldata->lead;
        $product = $alldata->product;
        // dd($product);
        $customer = $alldata->customer;

        $lead = $lead[0];
        $customer = $customer[0];
        //$product=$product[0];
        //dd($product);
        $leaddata['fname'] = $lead->fname;
        $leaddata['lname'] = $lead->lname;
        $leaddata['email'] = $lead->email;
        $leaddata['phone'] = $lead->phone;
        $leaddata['page_reference'] = $lead->page_reference;
        $leaddata['ip_address'] = $lead->ip_address;
        $leaddata['lat_lng'] = $lead->lat_lng;
        $leaddata['day_time_phone'] = $lead->day_time_phone;
        $leaddata['post_code'] = $lead->post_code;
        $leaddata['user_agent'] = $lead->user_agent;
        $leaddata['http_connection'] = $lead->http_connection;
        $leaddata['comment'] = $lead->comment;
        $leaddata['note'] = $lead->note;
        $leaddata['colorstatus'] = $lead->colorstatus;
        $leaddata['readed'] = $lead->readed;

        $leaddata['subscribe'] = $lead->subscribe;
        $leaddata['lead_comment_id'] = $lead->lead_comment_id;
        $leaddata['status'] = $lead->status;
        $leaddata['rawID'] = $lead->rawID;
        $leaddata['lead_attend_status'] = $lead->lead_attend_status;
        $leaddata['upload_method'] = $lead->upload_method;
        $leaddata['is_crm_updated'] = $lead->is_crm_updated;
        $leaddata['lead_created_at'] = $lead->lead_created_at;
        $leaddata['lead_updated_at'] = $lead->lead_updated_at;
        $leaddata['created_at'] = $lead->created_at;
        $leaddata['updated_at'] = $lead->updated_at;

        $leaddata['type'] = $lead->type;
        $leaddata['term_condition'] = $lead->term_condition;
        $leaddata['consent'] = $lead->consent;
        $leaddata['page_url'] = $lead->page_url;
        $leaddata['external_lead_id'] = $lead->external_lead_id;
        $leaddata['called'] = $lead->called;
        $leaddata['not_interested_on'] = $lead->not_interested_on;

        $leaddata['deal_of_day'] = $lead->deal_of_day;
        $leaddata['report'] = $lead->report;
        $leaddata['last_updated_by'] = $lead->last_updated_by;
        $leaddata['sub_status'] = $lead->sub_status;
        $leaddata['amount'] = $lead->amount;
        $leaddata['months'] = $lead->months;
        $leaddata['latest_comment'] = $lead->latest_comment;

        $leaddata['lead_status'] = $lead->lead_status;
        $leaddata['lead_type'] = $lead->lead_type;
        $leaddata['lead_source'] = $lead->lead_source;
        $leaddata['source'] = $lead->source;
        $leaddata['membership_type'] = $lead->membership_type;
        $leaddata['condition'] = $lead->condition;
        $leaddata['condition_color'] = $lead->condition_color;
        $leaddata['customer_service'] = $lead->customer_service;
        $leaddata['check_date'] = $lead->check_date;
        $leaddata['user_id'] = $customer->user_id;
        $leaddata['covertedtocustomer'] = 0;
        //$leaddata['updatedata'] = $lead->updatedata; 
        // to be used when data from API hit is in update mode (0=new, 1= update)



        Lead::create($leaddata);

        foreach ($product as $key => $products) {
            //dd($product);
            $productdata['lead_id'] = $products->lead_id;
            $productdata['customer_id'] = $products->customer_id;
            $productdata['productreport_id'] = $products->productreport_id;
            $productdata['start_date'] = $products->start_date;
            $productdata['end_date'] = $products->end_date;
            $productdata['created_at'] = $products->created_at;
            $productdata['updated_at'] = $products->updated_at;

            CustomerProductReport::create($productdata);
        }


        $customerdata['lead_id'] = $customer->lead_id;
        $customerdata['membership_id'] = $customer->membership_id;
        $customerdata['custom_plan_month'] = $customer->custom_plan_month;
        $customerdata['productreport_id'] = $customer->productreport_id;
        $customerdata['price'] = $customer->price;
        $customerdata['user_id'] = $customer->user_id;
        $customerdata['status'] = $customer->status;
        $customerdata['created_at'] = $customer->created_at;
        $customerdata['updated_at'] = $customer->updated_at;

        Customer::create($customerdata);

        return $customer->lead_id;

        //return response()->json(['status'=>Auth::user()->customers->is_verified ? 200 : 400,'user'=>Auth::user(),'is_verified'=>Auth::user()->customers->is_verified],200);
    }

    public function getLead(request $request)
    {

        $lead = Lead::where('id', 43)->get();
        $product = CustomerProductReport::where('lead_id', 43)->get();
        $customer = Customer::where('lead_id', 43)->get();
        $data = array('lead' => $lead, 'product' => $product, 'customer' => $customer);
        //dd(json_encode($data));



        return redirect('http://localhost/veye/public/api/client-lead?data=' . json_encode($data));
        //return response()->json(['status'=>Auth::user()->customers->is_verified ? 200 : 400,'user'=>Auth::user(),'is_verified'=>Auth::user()->customers->is_verified],200);
    }

    public function addlead(Request $request)
    {
        $alldata = json_decode($request->data);
        // dd($alldata);
        Lead::create([
            'fname'     => $alldata->name,
            'email'     => $alldata->email,
            'phone'     => $alldata->phone,
            'post_code'     => $alldata->post_code,
            'months'     => 0,
        ]);
        $message = 'contactus created successfully';
        return $message;
    }

    public function testimonialAdd(Request $request)
    {

        //$header = $request->header('Authorization');

        $validator = validator($request->all(), [
            'title' => 'required',
            'user_id' => 'required',
            'desciption' => 'required'

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }


        $input = $request->all();

        $user = Testimonials::create($input);
        return response()->json(['status' => 200, 'message' => 'testimonials created successfully.']);
    }

    public function testimonialEdit($id)
    {
        $users = User::whereIn('user_type', [0, 1])->get()->toArray();
        $user = Testimonials::select('testimonials.*', 'users.id as uid')->join('users', 'users.id', '=', 'testimonials.user_id')->where('testimonials.id', $id)->where('deleted_at', null)->first();
        //print_r($user); die;
        //return view('admin.testimonials.edit',compact('user','role','users'));
        if (!empty($user)) {
            return response()->json(['status' => 200, 'message' => 'testimonial get data successfully.', 'data' => $user]);
        } else {
            return response()->json(['status' => 400, 'message' => 'testimonial data not found.', 'data' => '']);
        }
    }

    public function testimonialUser()
    {
        // $users = User::whereIn('user_type',[0,1])->get()->toArray();
        $user = Testimonials::where('user_id', Auth()->user()->id)->where('deleted_at', null)->get()->toArray();
        //print_r(Auth()->user()->id); die;
        //return view('admin.testimonials.edit',compact('user','role','users'));
        if (!empty($user)) {
            return response()->json(['status' => 200, 'message' => 'testimonial get data successfully.', 'data' => $user]);
        } else {
            return response()->json(['status' => 400, 'message' => 'testimonial data not found.', 'data' => '']);
        }
    }

    public function testimonialList($id)
    {
        // $users = User::whereIn('user_type',[0,1])->get()->toArray();
        $user = Testimonials::where('user_id', $id)->where('deleted_at', null)->get()->toArray();
        //print_r(Auth()->user()->id); die;
        //return view('admin.testimonials.edit',compact('user','role','users'));
        if (!empty($user)) {
            return response()->json(['status' => 200, 'message' => 'testimonial get data successfully.', 'data' => $user]);
        } else {
            return response()->json(['status' => 400, 'message' => 'testimonial data not found.', 'data' => '']);
        }
    }



    public function ResponserData($id)
    {
        $user = User::where('my_share_id', $id)->first()->toArray();

        $data['responser_name'] = $user['name'];
        $data['responser_id'] = $user['my_share_id'];
        if (!empty($user)) {
            return response()->json(['status' => 200, 'message' => 'testimonial get data successfully.', 'data' => $data]);
        } else {
            return response()->json(['status' => 400, 'message' => 'testimonial data not found.', 'data' => '']);
        }
    }



    public function testimonialDelete($id)
    {
        $report = Testimonials::where('deleted_at', null)->find($id);
        $report->deleted_at = date('Y-m-d h:m:i');
        $report->save();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'testimonial deleted successfully.']);
        } else {
            return response()->json(['status' => 400, 'message' => 'testimonial data not found.']);
        }
    }


    public function eventAdd(Request $request)
    {

        //$header = $request->header('Authorization');

        $validator = validator($request->all(), [
            'start_date' => 'required',
            'start_time' => 'required',
            'end_date' => 'required',
            'end_time' => 'required',

            'title' => 'required',
            'description' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }


        $input = $request->all();

        $user = Event::create($input);
        return response()->json(['status' => 200, 'message' => 'Event created successfully.']);
    }

    public function eventEdit($id)
    {
        $user = Event::where('id', $id)->where('deleted_at', null)->first();
        //print_r($user); die;
        //return view('admin.testimonials.edit',compact('user','role','users'));
        if (!empty($user)) {
            return response()->json(['status' => 200, 'message' => 'Event get data successfully.', 'data' => $user]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Event data not found.', 'data' => '']);
        }
    }

    public function eventDelete($id)
    {
        // Blogs::find($id)->delete();
        $report = Event::where('deleted_at', null)->find($id);
        $report->deleted_at = date('Y-m-d h:m:i');
        $report->save();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Event deleted successfully.']);
        } else {
            return response()->json(['status' => 400, 'message' => 'Event data not found.']);
        }
    }

    public function usersAuth()
    {
        //$header = $request->header('Authorization');

        $report = Users::where('deleted_at', null)->find($id);
        $report->deleted_at = date('Y-m-d h:m:i');
        $report->save();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'testimonial deleted successfully.']);
        } else {
            return response()->json(['status' => 400, 'message' => 'testimonial data not found.']);
        }
    }



    public function country()
    {
        // print_r(Auth()->user()); die;
        $report = country::where('deleted_at', NULL)->get()->toArray();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }




    public function product()
    {
        // print_r(Auth()->user()); die;
        $report = Products::with('CustomerProductReport')->with('sellproduct')->where('deleted_at', NULL)->get()->toArray();
		//dd($report->dump());
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }

    public function buyProduct()
    {
        $report = CustomerProductReport::select('p.*', 'u.id as uid', 'u.email as uemail','customer_product_report.buy_date')
                                        ->addSelect(DB::raw("CONCAT('".url('/')."/uploads/products/',p.image) AS display_image"))
                                        ->leftJoin('products as p', 'customer_product_report.product_id', '=', 'p.id')
                                        ->leftJoin('users as u', 'customer_product_report.customer_id', '=', 'u.id')
                                        ->where('p.deleted_at', NULL)
                                        ->where('customer_product_report.customer_id', Auth()->user()->id)
                                        ->get();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }

    public function sellProduct()
    {
		$user_id=Auth()->user()->id;
		
		$base=url('/');
		$sql="SELECT 
					`p`.*, 
					`u`.`id` AS `uid`, 
					`u`.`email` AS `uemail`, 
					`customer_product_report`.`sell_date`, 
					CONCAT('$base/uploads/products/', p.image) AS display_image, 
					(SELECT SUM(credit) AS total_credit 
					 FROM `wallet_transactions` 
					 WHERE report_id = `p`.`id` 
					   AND user_id = $user_id
					   AND transaction_type = 'Product Sell' 
					   AND credit > 0) AS total_credit 
				FROM 
					`customer_product_report` 
				LEFT JOIN 
					`products` AS `p` ON `customer_product_report`.`product_id` = `p`.`id` 
				LEFT JOIN 
					`users` AS `u` ON `customer_product_report`.`customer_id` = `u`.`id` 
				WHERE 
					`customer_product_report`.`customer_id` = $user_id 
					AND `p`.`deleted_at` IS NULL";
		
		 $report=DB::select($sql);
		
		
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }


    public function eventList()
    {
        // print_r(Auth()->user()); die;

        $report = Event::with('banner')->where('deleted_at', NULL)->get()->toArray();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }

    /*       public function transaction()
    {
       // print_r(Auth()->user()); die;

        $report =Transactions::select('transactions.*','u.name as username','u.my_share_id as shareid','p.product_name','p.start_date as buydate','p.end_date as selldate','p.amount_paid as price','p.image')->join('users as u', 'transactions.user_id', '=', 'u.id')->join('products as p', 'transactions.product_id', '=', 'p.id')->where('transactions.user_id',Auth()->user()->id)->where('transactions.deleted_at',NULL)->get()->toArray();
			   
			   
        if(!empty($report)){
         return response()->json(['status' => 200, 'message' => 'Data Found.', 'data'=>$report]);
        }else{
            return response()->json(['status' => 400, 'message' => 'Data not found.']);

        }

    }*/


     public function transaction()
    {

        //$report = WalletTransactions::select('wallet_transactions.*', 'u.name as username', 'u.my_share_id as shareid')
			
			
			//->join('users as u', 'wallet_transactions.user_id', '=', 'u.id')->where('wallet_transactions.user_id', Auth()->user()->id)->get()->toArray();

		 
		 $report=DB::table('wallet_transactions')
			 ->select('credit','transaction_type','created_at')
			 ->where('user_id', Auth()->user()->id)
			 ->where('transaction_type','Deposit')
			 ->get()->toArray();
			 //->where('model_id',$user->id)->delete();
		$withd = WithdrawalRequest::join('wallet_transactions', 'wallet_transactions.reference_id', '=', 'withdrawal_requests.id')
		 		
		 	->select('withdrawal_requests.withdrawal_amount as credit','withdrawal_requests.transaction_type','withdrawal_requests.created_at')
            ->where('withdrawal_requests.user_id', Auth()->user()->id) 
			 
			 ->where('withdrawal_requests.status','Paid')
			 //dd( $withd->dump());
			 ->get()->toArray();
		 $data=array_merge($withd,$report);
        //$deposite = WalletTransactions::select(DB::raw("SUM(credit) AS deposit"), DB::raw("SUM(debit) AS withdrawal"))
           // ->where('user_id', Auth()->user()->id)->get()->toArray();
       
		  $deposite1 = WalletTransactions::select(DB::raw("SUM(credit) AS deposit"))
            ->where('user_id', Auth()->user()->id)
			 ->where('transaction_type','Deposit')
			 ->get()
			 ->first();
		 
		 $with1 = WithdrawalRequest::select(DB::raw("SUM(withdrawal_amount) AS withdrawal"))
            ->where('withdrawal_requests.user_id', Auth()->user()->id) 
			 ->where('withdrawal_requests.status','Paid')
			 ->get()
			 ->first();
		 
		 $avail = WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->orderBy('wallet_transactions.id','DESC')
				->latest()->first();

       
		 
		 
		 $available = $avail->balance;
			$depo=$deposite1->deposit;
		 $withdraw=$with1->withdrawal;

        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $data, 'available' => $available,'deposit' => $depo,'withdraw'=>$withdraw]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }

	public function dashboard(){
	
		$myshareid=Auth()->user()->my_share_id;
		$level1=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 1')->sum('wallet_transactions.credit');
		//dd($level1->dump());
				//->sum('wallet_transactions.credit');
			
		$level2=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 2')
				->sum('wallet_transactions.credit');
		$level3=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 3')
				->sum('wallet_transactions.credit');
		
		 $report1 = User::select('my_share_id')->where('users.responser_id', $myshareid)->get()->toArray();
		 $report2 = User::select('my_share_id')->whereIn('users.responser_id', $report1)->get()->toArray();
		 $report3 = User::select('my_share_id')->whereIn('users.responser_id', $report2)->get()->toArray();
		$fpc=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.transaction_type', 'FIRST_PARTY_COMMISSION')
				->sum('wallet_transactions.credit');
		
        if (!empty($report1)) {
        
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'level1' => $level1,'level2' => $level2,'level3' => $level3,'count1' => count($report1),'count2' => count($report2),'count3' => count($report3),'fpc' =>$fpc]);
  } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
	
	
	}
       public function wallet111()
    {
        // print_r(Auth()->user()); die;
		$today = Carbon::now();
        $report = WalletTransactions::select('wallet_transactions.*', 'u.name as username', 'u.my_share_id as shareid')->join('users as u', 'wallet_transactions.user_id', '=', 'u.id')->where('wallet_transactions.user_id', Auth()->user()->id)->get()->toArray();
		//dd($report->dump());
		$level1=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 1')
				->where('wallet_transactions.created_at', '>=',date('Y-m-d 00:00:00'))
				->where('wallet_transactions.created_at', '<=',date('Y-m-d 23:59:59'))->sum('wallet_transactions.credit');
			//dd($level1->dump());
			//->sum('wallet_transactions.credit');
			
				//->whereDate("wallet_transactions.created_at", date('Y-m-d'))
				//->sum('wallet_transactions.credit');
		$level2=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 2')
				->where('wallet_transactions.created_at', '>=',date('Y-m-d 00:00:00'))
				->where('wallet_transactions.created_at', '<=',date('Y-m-d 23:59:59'))
				->sum('wallet_transactions.credit');
		$level3=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 3')
				->where('wallet_transactions.created_at', '>=',date('Y-m-d 00:00:00'))
				->where('wallet_transactions.created_at', '<=',date('Y-m-d 23:59:59'))
				->sum('wallet_transactions.credit');
		$dc=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.transaction_type', 'Direct Commision')
				->where('wallet_transactions.created_at', '>=',date('Y-m-d 00:00:00'))
				->where('wallet_transactions.created_at', '<=',date('Y-m-d 23:59:59'))
				->sum('wallet_transactions.credit');
		//->get()->toArray();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report,'level1' => $level1,'level2' => $level2,'level3' => $level3,'dc' => $dc]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }
	
	     public function wallet()
    {
			 
        // print_r(Auth()->user()); die;
			 $dateweek=date('Y-m-d', strtotime('-7 day', strtotime(date('Y-m-d'))));
			// dd($dateweek);
			 if (date('H') < 16 ) {
		$datelast=date('Y-m-d H:i:s', strtotime('-1 day', strtotime(date('Y-m-d 16:00:00'))));
		$datenext=date('Y-m-d 16:00:00');
 	}else{
	$datelast=date('Y-m-d 16:00:00');
	$datenext=date('Y-m-d H:i:s', strtotime('+1 day', strtotime(date('Y-m-d 16:00:00'))));
	}
		$today = Carbon::now();
        $report = WalletTransactions::select('wallet_transactions.*', 'u.name as username', 'u.my_share_id as shareid')->join('users as u', 'wallet_transactions.user_id', '=', 'u.id')->where('wallet_transactions.user_id', Auth()->user()->id)
			->where('wallet_transactions.created_at', '>=',$dateweek)
			->get()->toArray();
		//dd($report->dump());
		$level1=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 1')
				->where('wallet_transactions.created_at', '>=',$datelast)
				->where('wallet_transactions.created_at', '<=',$datenext)->sum('wallet_transactions.credit');
			//dd($level1->dump());
			//->sum('wallet_transactions.credit');
			
				//->whereDate("wallet_transactions.created_at", date('Y-m-d'))
				//->sum('wallet_transactions.credit');
		$level2=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 2')
				->where('wallet_transactions.created_at', '>=',$datelast)
				->where('wallet_transactions.created_at', '<=',$datenext)
				->sum('wallet_transactions.credit');
		$level3=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.reference', 'Level 3')
				->where('wallet_transactions.created_at', '>=',$datelast)
				->where('wallet_transactions.created_at', '<=',$datenext)
				->sum('wallet_transactions.credit');
		$dc=WalletTransactions::where('wallet_transactions.user_id', Auth()->user()->id)
				->where('wallet_transactions.transaction_type', 'Direct Commision')
				->where('wallet_transactions.created_at', '>=',$datelast)
				->where('wallet_transactions.created_at', '<=',$datenext)
				->sum('wallet_transactions.credit');
		//->get()->toArray();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report,'level1' => $level1,'level2' => $level2,'level3' => $level3,'dc' => $dc]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }
	
	
	
public function api_add_post(){
	if (date('H') < 17) {
		$datelast=date('Y-m-d H:i:s', strtotime('-1 day', strtotime(date('Y-m-d 17:00:00'))));
		$datenext=date('Y-m-d 17:00:00');
 	}else{
	$datelast=date('Y-m-d 17:00:00');
	$datenext=date('Y-m-d H:i:s', strtotime('+1 day', strtotime(date('Y-m-d 17:00:00'))));
	}
	
dd($datelast ."=". $datenext);
}

    public function directmember()
    {
        // print_r(Auth()->user()->my_share_id); die;

        $report = User::select('users.*',
                    DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Deposit'
                                ) as Deposit")
							  ,
                    DB::raw("(SELECT SUM(debit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Withdrawal'
                                ) as Withdrawal")
							  ,
							       DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.reference_id and wallet_transactions.transaction_type='Level Commission' and reference='Level 1'
                                ) as Commission")
							  ,
							       DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Direct Commision') as DirectCommission")
							  )
			->where('users.responser_id', Auth()->user()->my_share_id)->get()->toArray();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }

	
	public function directmemberpost(Request $request)
    {
        // print_r(Auth()->user()->my_share_id); die;
		//dd($request->userid);
		$userid=$request->userid;
		$type=$request->type;
		$date = date('Y-m-d');
		$y = date("Y", strtotime($date));
		if ($userid=='0')
		{
			$userid=Auth()->user()->id;
		}
		$shareid=User::select('users.my_share_id')->where('users.id', $userid)->get()->first();
		
		
		if ($type == 'week') {
            
			
	
			  $report = User::select('users.*'							  ,
                    DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Deposit'
                                ) as Deposit")
							  ,
                    DB::raw("(SELECT SUM(debit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Withdrawal'
                                ) as Withdrawal")
							  ,
							       DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.user_id='$userid' and wallet_transactions.transaction_type='Level Commission' and wallet_transactions.created_at>=DATE(NOW() - INTERVAL 7 DAY)
								and wallet_transactions.created_at<=DATE(NOW() - INTERVAL 0 DAY)
                                ) as Commission")
					  
							  )->where('users.responser_id', $shareid->my_share_id)
				
				 ->get()->toArray();
			
			
			
         }
         if ($type == 'day') {

			  $report = User::select('users.*'							  ,
                    DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Deposit' and 'wallet_transactions.created_at'=$date
                                ) as Deposit")
							  ,
                    DB::raw("(SELECT SUM(debit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Withdrawal' and 'wallet_transactions.created_at'=$date
                                ) as Withdrawal")
							  ,
							       DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.user_id='$userid' and wallet_transactions.transaction_type='Level Commission' and 'wallet_transactions.created_at'=$date
                                ) as Commission")
							  
							  
							  
							  
							  )->where('users.responser_id', $shareid->my_share_id)
				 
				 ->get()->toArray();
			 
         }
		
		
         if ($type == 'month') {
             // $date = "2010-10-10";
             $m = date("m", strtotime($date));
           
			 
			 $report = User::select('users.*'							  ,
                    DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Deposit'
								 and MONTH(wallet_transactions.created_at)=MONTH(now()) and Year(wallet_transactions.created_at)=Year(now())
                                ) as Deposit")
							  ,
                    DB::raw("(SELECT SUM(debit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Withdrawal'
								 and MONTH(wallet_transactions.created_at)=MONTH(now()) and Year(wallet_transactions.created_at)=Year(now())
                                ) as Withdrawal")
							  ,
							       DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.user_id='$userid' and wallet_transactions.transaction_type='Level Commission'
								  and MONTH(wallet_transactions.created_at)=MONTH(now()) and Year(wallet_transactions.created_at)=Year(now())
                                ) as Commission")
							  
							  
							  
							  
							  )->where('users.responser_id', $shareid->my_share_id)->get()->toArray();
				 
				
			 
			 
			 
         }
          if ($type == 'all') {
            $report = User::select('users.*'							  ,
                    DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Deposit'
                                ) as Deposit")
							  ,
                    DB::raw("(SELECT SUM(debit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Withdrawal'
                                ) as Withdrawal")
							  ,
							       DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.reference_id and wallet_transactions.transaction_type='Level Commission'
                                and reference='Level 1') as Commission")
							  
							  
							  
							  
							  )->where('users.responser_id', $shareid->my_share_id)->get()->toArray();
			 //dd($report->dump());
			 
         }
		
		
			
		//dd($shareid->my_share_id);
	    
			   //dd($report->dump());
			   
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }
	
	
    public function userUpdate(Request $request)
    {
        $validator = validator($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . Auth()->user()->id,
            // 'responser_id'=>'required',
            'username' => 'required',
            'mobile' => 'required|numeric|digits:10'


            // 'role' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }


        $user = User::find(Auth()->user()->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $request->username;
        $user->mobile = $request->mobile;
        if ($request->password) {
            $validator = validator($request->all(), [
                'password' => [
                    'required',
                    'string',
                    'min:8',             // must be at least 10 characters in length
                    'regex:/[a-z]/',      // must contain at least one lowercase letter
                    'regex:/[A-Z]/',      // must contain at least one uppercase letter
                    'regex:/[0-9]/',      // must contain at least one digit
                    'regex:/[@$!%*#?&]/', // must contain a special character
                ],
                'password_confirmation' => 'required|same:password',
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
            }

            $user->password = bcrypt($request->password);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = $image->getClientOriginalName();
            $fileExtension = $image->getClientOriginalExtension();
            $imageName = time() . rand() . '.' . $image->getClientOriginalExtension();
            $request->file('image')->move(base_path() . '/public/uploads/Test_Management', $imageName);
            $user->image = $imageName;
        }

        // $userData=User::where('responser_id',Auth()->user()->responser_id)->first();
        //$user->responser_name = $userData->name;

        $user->save();
        // DB::table('model_has_roles')->where('model_id',$user->id)->delete();
        // $role=Role::find($request->role);
        //$user->assignRole($role);

        //if(!empty($report)){
        return response()->json(['status' => 200, 'message' => 'User profile updated successfully']);
        // }else{
        //     return response()->json(['status' => 400, 'message' => 'Data not found.']);

        // }
        // // redirect()->route('users.index')
        //->with('success','User updated successfully');
    }



    public function userBuyProduct(Request $request)
    {
		
		//$date1 = date('Y-m-d H:i:s');
		//$date2 = date(date('Y-m-d').' 05:00:00');
		//$date3 = date(date('Y-m-d').' 11:59:00');
		
		//if(!(strtotime($date1)<strtotime($date3) && strtotime($date1)>strtotime($date2))){
			
			//return response()->json(['status' => 400, 'errors' => '', 'message' => 'You can not buy. Buy time is closed.']);
			//}
			
		
		
        $validator = validator($request->all(), [
            'product_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray(), 'message' => 'The product id field is required.']);
        }

        $input = $request->all();
		$product_id=$input['product_id'];
        $submitid = [];
        $amount1 = Products::select(DB::raw("SUM(amount_paid) AS amount"))->whereIn('id', $input['product_id'])->first()->toArray();
        $lastdata1 = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();
        if ($lastdata1->balance - $amount1['amount']  >= 0) {

            for ($i = 0; $i <= count($input['product_id']) - 1; $i++) {
                $p = CustomerProductReport::where('customer_id', Auth()->user()->id)->where('product_id', $input['product_id'][$i])->Where('sell_date', null)->get()->toArray();
                if (empty($p)) {

                    $productdata['product_id'] = $input['product_id'][$i];
					//dd($input['product_id']);
                    $productdata['customer_id'] = Auth()->user()->id;
                    $productdata['buy_date'] = date('Y-m-d h:m:i');
                    $productdata['buy_sell_status'] = CustomerProductReport::BUY;

                    array_push($submitid, $input['product_id']);
                    CustomerProductReport::create($productdata);
                } else {
                    return response()->json(['status' => 400, 'message' => 'Duplicate entry not allowed']);
                }
            }

            $amount = Products::select(DB::raw("SUM(amount_paid) AS amount"))->whereIn('id', $submitid[0])->first()->toArray();
            $lastdata = WalletTransactions::where('user_id', Auth()->user()->id)
				->orderBy('id','DESC')
				->latest()->first();

            if ($lastdata->balance - $amount['amount'] >= 0) {
                $data['user_id'] = Auth()->user()->id;
                $data['transaction_id'] = rand(10000,99999).time();
                $data['debit'] = $amount['amount'];
				$data['report_id'] = implode(',', $product_id);
                if ($lastdata) {
                    $data['balance'] = $lastdata->balance - $amount['amount'];
                } else {
                    $data['balance'] = $amount['amount'];
                }
                $data['transaction_type'] = 'Product buy';
                $data['reference'] = 'user self';
                $data['type'] = 'debit';
                WalletTransactions::create($data);

                return response()->json(['status' => 200, 'message' => 'Data inserted successfully.']);
            } else {
                return response()->json(['status' => 200, 'message' => 'Your balance is very low.']);
            }
        } else {
            return response()->json(['status' => 200, 'message' => 'Your balance is very low.']);
        }
    }
	
	
	 public function userBuyProduct1(Request $request)
    {
		
		$date1 = date('Y-m-d H:i:s');
		$date2 = date(date('Y-m-d').' 05:00:00');
		$date3 = date(date('Y-m-d').' 11:59:00');
		
		if(!(strtotime($date1)<strtotime($date3) && strtotime($date1)>strtotime($date2))){
			
			return response()->json(['status' => 400, 'errors' => '', 'message' => 'You can not buy. Buy time is closed.'.$date1.'='.$date3.'='.$date2.'=']);
			}
		
			
		
		
        $validator = validator($request->all(), [
            'product_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray(), 'message' => 'The product id field is required.']);
        }
	
        $input = $request->all();
		$product_id=$input['product_id'];
        $submitid = [];
        $amount1 = Products::select(DB::raw("SUM(amount_paid) AS amount"))->whereIn('id', $input['product_id'])->first()->toArray();
        $lastdata1 = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();
        if ($lastdata1->balance - $amount1['amount']  >= 0) {

            for ($i = 0; $i <= count($input['product_id']) - 1; $i++) {
                $p = CustomerProductReport::where('customer_id', Auth()->user()->id)->where('product_id', $input['product_id'][$i])->Where('sell_date', null)->get()->toArray();
                if (empty($p)) {

                    $productdata['product_id'] = $input['product_id'][$i];
					//dd($input['product_id']);
                    $productdata['customer_id'] = Auth()->user()->id;
                    $productdata['buy_date'] = date('Y-m-d h:m:i');
                    $productdata['buy_sell_status'] = CustomerProductReport::BUY;

                    array_push($submitid, $input['product_id']);
                    CustomerProductReport::create($productdata);
                } else {
                    return response()->json(['status' => 400, 'message' => 'Duplicate entry not allowed']);
                }
            }

            $amount = Products::select(DB::raw("SUM(amount_paid) AS amount"))->whereIn('id', $submitid[0])->first()->toArray();
            $lastdata = WalletTransactions::where('user_id', Auth()->user()->id)
				->orderBy('id','DESC')
				->latest()->first();

            if ($lastdata->balance - $amount['amount'] >= 0) {
                $data['user_id'] = Auth()->user()->id;
                $data['transaction_id'] = rand(10000,99999).time();
                $data['debit'] = $amount['amount'];
				$data['report_id'] = implode(',', $product_id);
                if ($lastdata) {
                    $data['balance'] = $lastdata->balance - $amount['amount'];
                } else {
                    $data['balance'] = $amount['amount'];
                }
                $data['transaction_type'] = 'Product buy';
                $data['reference'] = 'user self';
                $data['type'] = 'debit';
                WalletTransactions::create($data);

                return response()->json(['status' => 200, 'message' => 'Data inserted successfully.']);
            } else {
                return response()->json(['status' => 200, 'message' => 'Your balance is very low.']);
            }
        } else {
            return response()->json(['status' => 200, 'message' => 'Your balance is very low.']);
        }
    }
	
	public function updateMyBalance($id,$userid,$amount){
		$lastdata=WalletTransactions::where('id','<',$id)->where('user_id',$userid)->orderBy('id','DESC')->first();
		$bal=0;
		if ($lastdata) {
            $bal = $lastdata->balance + $amount;
        } else {
            $bal = $amount;
        }
				
		WalletTransactions::where('id',$id)->where('user_id',$userid)->update(['balance' => $bal]);
	}
	
  public function userSellProduct1(Request $request)
    {
	  
	  //$last=WalletTransactions::where('id','<','265328')->where('user_id','126')->orderBy('id','DESC')->first();
		
	  //$update=WalletTransactions::where('id','265409')->where('user_id','126')->update(['balance' => '1904.916']);
					//dd($update);																	
		$date1 = date('Y-m-d H:i:s');
		$date2 = date(date('Y-m-d').' 17:00:00');
		$date3 = date(date('Y-m-d').' 23:59:30');
		//if(!(strtotime($date1)<strtotime($date3) && strtotime($date1)>strtotime($date2))){
		if(!(strtotime($date1)<strtotime($date3) && strtotime($date1)>strtotime($date2))){
			
			return response()->json(['status' => 400, 'errors' => '', 'message' => 'You can not sell. Selling time is closed.']);
			}
		
        $validator = validator($request->all(), [
            'product_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray(), 'message' => 'The product id field is required.']);
        }
	
        $input = $request->all();
        $submitid = [];

	        for ($i = 0; $i <= count($input['product_id']) - 1; $i++) {


            $p = CustomerProductReport::where('customer_id', Auth()->user()->id)->where('product_id', $input['product_id'][$i])->where('sell_date', null)->get()->toArray();

            if (!empty($p)) {

                $productdata['sell_date'] = date('Y-m-d h:m:i');
                $productdata['buy_sell_status'] = CustomerProductReport::SELL;
                CustomerProductReport::where('id', $p[0]['id'])->update($productdata);
                $productdata['product_id'] = $input['product_id'][$i];
                $productdata['customer_id'] = Auth()->user()->id;
                array_push($submitid, $input['product_id']);
				//usr wallet entry
				 $amount = Products::select(DB::raw("SUM(amount_paid) AS amount"))->where('id', $input['product_id'][$i])->first()->toArray();
        $lastdata = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();


        $data['user_id'] = Auth()->user()->id;
        $data['transaction_id'] = rand(10000,99999).time();
        $data['credit'] = $amount['amount'];
		//$data['report_id'] = $input['product_id'];
        if ($lastdata) {
            $data['balance'] = $lastdata->balance + $amount['amount'];
        } else {
            $data['balance'] = $amount['amount'];
        }
        $data['transaction_type'] = 'Product Sell';
        $data['reference'] = 'user self';
        $data['type'] = 'credit';
		$data['report_id'] =$input['product_id'][$i];
        $id =WalletTransactions::create($data);
		$this->updateMyBalance($id,Auth()->user()->id,$amount['amount']);
		
				
		//Direct Commission entry In Wallet
		$amount = Products::select("amount_paid AS amount")->where('id', $input['product_id'][$i])->first()->toArray();
        
				$uplan=User::select('plan_id')
			->where('id',Auth()->user()->id)
			->get()->first();
		  
			$lastdata1 = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();

		$myshareid=Auth()->user()->my_share_id;
			
	
		$sql="SELECT COUNT(DISTINCT wt.user_id)  as x
FROM wallet_transactions wt
INNER JOIN users u ON wt.user_id = u.id
WHERE u.responser_id = $myshareid
  AND wt.transaction_type = 'deposit'
  AND wt.balance >= 100";

	$result=DB::select($sql);
		$count=$result ? $result[0]->x :0;
		
		
			$plancomm=Plan::select('*')
			->where('price','<=',$lastdata1->balance)
			->where('share_limit','<=',$count)
			->whereNull('deleted_at')
			->orderBy('price','desc')->take(1)->get()->first();	
			//dd($plancomm);
				if($plancomm){
				$user = User::find(Auth()->user()->id);
       			 $user->plan_id = $plancomm->id;
        			$user->save();
				}
				
			$comm=0.00;	
		if($plancomm){
		
			$comm=($amount['amount'] *  $plancomm->commission) /100;
			
		}
				
			$lastdata2 = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();


        $data['user_id'] = Auth()->user()->id;
        $data['transaction_id'] = rand(10000,99999).time();
      
				
		$data['credit'] = $comm;
		//$data['report_id'] = $input['product_id'];
        if ($lastdata2) {
            $data['balance'] = $lastdata2->balance + $comm;
        } else {
            $data['balance'] = $comm;
        }
				
        $data['transaction_type'] = 'Direct Commision';
        $data['reference'] = 'user self';
        $data['type'] = 'credit';
		$data['report_id'] = $input['product_id'][$i];
        //WalletTransactions::create($data);
		$id =WalletTransactions::create($data);
				
		$this->updateMyBalance($id,Auth()->user()->id,$comm);	
		
		//Direct  commition entry finished
				//user wallet entry ends
			
		
				
				
		//user level commision entry starts
		$levelcomm=Setting::get()->first();
		$level2=null;
		$level3=null;
		$level1=User::where('my_share_id',Auth()->user()->responser_id)->get()->first();
		if ($level1) $level2=User::where('my_share_id',$level1->responser_id)->get()->first();
		if ($level2) $level3=User::where('my_share_id',$level2->responser_id)->get()->first();
		//dd($level3->name .'='.$level2->name.'='.$level1->name);	
		
		
		//level 3 commission
		if( $level1){
		$amount = Products::select(DB::raw("SUM(amount_paid) AS amount"))->where('id', $input['product_id'][$i])->first()->toArray();
			
		
			
        $lastdata3 = WalletTransactions::where('user_id', $level1->id)
			->orderBy('id','DESC')
			->latest()->first();
			
		$commission=($comm * $levelcomm->label_1)/100;
		//dd( ($commission * $comm->label_1)/100 .'='.$level1->id.'='.$comm->label_1.'='.$commission);
        $data['user_id'] = $level1->id;
        $data['transaction_id'] = rand(10000,99999).time();
        $data['credit'] = $commission;
		//$data['report_id'] = $input['product_id'];
        if ($lastdata3) {
            $data['balance'] = $lastdata3->balance +  $commission;
        } else {
            $data['balance'] =  $commission;
        }
        $data['transaction_type'] = 'Level Commission';
        $data['reference'] = 'Level 1';
		$data['reference_id'] = Auth()->user()->id;
        $data['type'] = 'credit';
		$data['report_id'] = $input['product_id'][$i];
		
			
        $id=WalletTransactions::create($data);
			$this->updateMyBalance($id,$level1->id,$commission);	
		}
		//level 3 commision ends
		//level 2 commission
		if( $level2){
		$amount = Products::select(DB::raw("SUM(commision) AS amount"))->where('id', $input['product_id'][$i])->first()->toArray();
        $lastdata4 = WalletTransactions::where('user_id', $level2->id)
			->orderBy('id','DESC')
			->latest()->first();

		$commission=($comm * $levelcomm->label_2)/100;
        $data['user_id'] = $level2->id;
        $data['transaction_id'] = rand(10000,99999).time();
        $data['credit'] = $commission;
		//$data['report_id'] = $input['product_id'];
        if ($lastdata4) {
            $data['balance'] = $lastdata4->balance +  $commission;
        } else {
            $data['balance'] =  $commission;
        }
        $data['transaction_type'] = 'Level Commission';
        $data['reference'] = 'Level 2';
		$data['reference_id'] = Auth()->user()->id;
        $data['type'] = 'credit';
		$data['report_id'] = $input['product_id'][$i];
		
        $id=WalletTransactions::create($data);
		$this->updateMyBalance($id,$level2->id,$commission);	
		}
		//level 2 commision ends
		//level 1 commision
		if( $level3){
		$amount = Products::select(DB::raw("SUM(commision) AS amount"))->where('id', $input['product_id'][$i])->first()->toArray();
        $lastdata5 = WalletTransactions::where('user_id', $level3->id)
			->orderBy('id','DESC')
			->latest()->first();

		$commission=($comm * $levelcomm->label_3)/100;
        $data['user_id'] = $level3->id;
        $data['transaction_id'] = rand(10000,99999).time();
        $data['credit'] = $commission;
		//$data['report_id'] = $input['product_id'];
        if ($lastdata5) {
            $data['balance'] = $lastdata5->balance +  $commission;
        } else {
            $data['balance'] =  $commission;
        }
        $data['transaction_type'] = 'Level Commission';
        $data['reference'] = 'Level 3';
		$data['reference_id'] = Auth()->user()->id;
        $data['type'] = 'credit';
			
		$data['report_id'] = $input['product_id'][$i];
		
        $id=WalletTransactions::create($data);
			$this->updateMyBalance($id,$level3->id,$commission);	
			//dd('user_id='.Auth()->user()->id);
		}
		//level 1 commision ends
		
		
		
		
		//user level commision ends
				
            } else {
                return response()->json(['status' => 200, 'message' => 'Please buy first product otherwise selling for product not allow.']);
            }
        }

       
		
		
        return response()->json(['status' => 200, 'message' => 'Data inserted successfully.']);
    }
	
	
	 public function userSellProduct2(Request $request)
    {
		
		$date1 = date('Y-m-d H:i:s');
		$date2 = date(date('Y-m-d').' 17:00:00');
		$date3 = date(date('Y-m-d').' 23:59:30');
		//if(!(strtotime($date1)<strtotime($date3) && strtotime($date1)>strtotime($date2))){
		if(!(strtotime($date1)<strtotime($date3) && strtotime($date1)>strtotime($date2))){
			
			return response()->json(['status' => 400, 'errors' => '', 'message' => 'You can not sell. Selling time is closed.']);
			}
		
        $validator = validator($request->all(), [
            'product_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray(), 'message' => 'The product id field is required.']);
        }

        $input = $request->all();
        $submitid = [];

	        for ($i = 0; $i <= count($input['product_id']) - 1; $i++) {


            $p = CustomerProductReport::where('customer_id', Auth()->user()->id)->where('product_id', $input['product_id'][$i])->where('sell_date', null)->get()->toArray();

            if (!empty($p)) {

                $productdata['sell_date'] = date('Y-m-d h:m:i');
                $productdata['buy_sell_status'] = CustomerProductReport::SELL;
                CustomerProductReport::where('id', $p[0]['id'])->update($productdata);
                $productdata['product_id'] = $input['product_id'][$i];
                $productdata['customer_id'] = Auth()->user()->id;
                array_push($submitid, $input['product_id']);
				//usr wallet entry
				 $amount = Products::select(DB::raw("SUM(amount_paid) AS amount"))->where('id', $input['product_id'][$i])->first()->toArray();
        $lastdata = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();


        $data['user_id'] = Auth()->user()->id;
        $data['transaction_id'] = rand(10000,99999).time();
        $data['credit'] = $amount['amount'];
		//$data['report_id'] = $input['product_id'];
        if ($lastdata) {
            $data['balance'] = $lastdata->balance + $amount['amount'];
        } else {
            $data['balance'] = $amount['amount'];
        }
        $data['transaction_type'] = 'Product Sell';
        $data['reference'] = 'user self';
        $data['type'] = 'credit';
		$data['report_id'] =$input['product_id'][$i];
        WalletTransactions::create($data);
		
		//Direct Commission entry In Wallet
		$amount = Products::select("amount_paid AS amount")->where('id', $input['product_id'][$i])->first()->toArray();
        
				$uplan=User::select('plan_id')
			->where('id',Auth()->user()->id)
			->get()->first();
		  
			$lastdata1 = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();

		$myshareid=Auth()->user()->my_share_id;
			
	
		$sql="SELECT COUNT(DISTINCT wt.user_id)  as x
FROM wallet_transactions wt
INNER JOIN users u ON wt.user_id = u.id
WHERE u.responser_id = $myshareid
  AND wt.transaction_type = 'deposit'
  AND wt.balance >= 100";

	$result=DB::select($sql);
		$count=$result ? $result[0]->x :0;
		
		
			$plancomm=Plan::select('*')
			->where('price','<=',$lastdata1->balance)
			->where('share_limit','<=',$count)
			->whereNull('deleted_at')
			->orderBy('price','desc')->take(1)->get()->first();	
			//dd($plancomm);
				if($plancomm){
				$user = User::find(Auth()->user()->id);
       			 $user->plan_id = $plancomm->id;
        			$user->save();
				}
				
			$comm=0.00;	
		if($plancomm){
		
			$comm=($amount['amount'] *  $plancomm->commission) /100;
			
		}
				
			$lastdata2 = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();


        $data['user_id'] = Auth()->user()->id;
        $data['transaction_id'] = rand(10000,99999).time();
       // $data['credit'] = $amount['amount'];
		////$data['report_id'] = $input['product_id'];
        //if ($lastdata) {
        //    $data['balance'] = $lastdata->balance + $amount['amount'];
       /// } else {
       //     $data['balance'] = $amount['amount'];
       // }
				
		$data['credit'] = $comm;
		//$data['report_id'] = $input['product_id'];
        if ($lastdata2) {
            $data['balance'] = $lastdata2->balance + $comm;
        } else {
            $data['balance'] = $comm;
        }
				
        $data['transaction_type'] = 'Direct Commision';
        $data['reference'] = 'user self';
        $data['type'] = 'credit';
		$data['report_id'] = $input['product_id'][$i];
        WalletTransactions::create($data);
		//Direct  commition entry finished
				//user wallet entry ends
				
				
				
		//user level commision entry starts
		$levelcomm=Setting::get()->first();
		$level2=null;
		$level3=null;
		$level1=User::where('my_share_id',Auth()->user()->responser_id)->get()->first();
		if ($level1) $level2=User::where('my_share_id',$level1->responser_id)->get()->first();
		if ($level2) $level3=User::where('my_share_id',$level2->responser_id)->get()->first();
		//dd($level3->name .'='.$level2->name.'='.$level1->name);	
		
		
		//level 3 commission
		if( $level1){
		$amount = Products::select(DB::raw("SUM(amount_paid) AS amount"))->where('id', $input['product_id'][$i])->first()->toArray();
			
		
			
        $lastdata3 = WalletTransactions::where('user_id', $level1->id)
			->orderBy('id','DESC')
			->latest()->first();
			
		$commission=($comm * $levelcomm->label_1)/100;
		//dd( ($commission * $comm->label_1)/100 .'='.$level1->id.'='.$comm->label_1.'='.$commission);
        $data['user_id'] = $level1->id;
        $data['transaction_id'] = rand(10000,99999).time();
        $data['credit'] = $commission;
		//$data['report_id'] = $input['product_id'];
        if ($lastdata3) {
            $data['balance'] = $lastdata3->balance +  $commission;
        } else {
            $data['balance'] =  $commission;
        }
        $data['transaction_type'] = 'Level Commission';
        $data['reference'] = 'Level 1';
		$data['reference_id'] = Auth()->user()->id;
        $data['type'] = 'credit';
		$data['report_id'] = $input['product_id'][$i];
		
			
        WalletTransactions::create($data);
		}
		//level 3 commision ends
		//level 2 commission
		if( $level2){
		$amount = Products::select(DB::raw("SUM(commision) AS amount"))->where('id', $input['product_id'][$i])->first()->toArray();
        $lastdata4 = WalletTransactions::where('user_id', $level2->id)
			->orderBy('id','DESC')
			->latest()->first();

		$commission=($comm * $levelcomm->label_2)/100;
        $data['user_id'] = $level2->id;
        $data['transaction_id'] = rand(10000,99999).time();
        $data['credit'] = $commission;
		//$data['report_id'] = $input['product_id'];
        if ($lastdata4) {
            $data['balance'] = $lastdata4->balance +  $commission;
        } else {
            $data['balance'] =  $commission;
        }
        $data['transaction_type'] = 'Level Commission';
        $data['reference'] = 'Level 2';
		$data['reference_id'] = Auth()->user()->id;
        $data['type'] = 'credit';
		$data['report_id'] = $input['product_id'][$i];
		
        WalletTransactions::create($data);
		}
		//level 2 commision ends
		//level 1 commision
		if( $level3){
		$amount = Products::select(DB::raw("SUM(commision) AS amount"))->where('id', $input['product_id'][$i])->first()->toArray();
        $lastdata5 = WalletTransactions::where('user_id', $level3->id)
			->orderBy('id','DESC')
			->latest()->first();

		$commission=($comm * $levelcomm->label_3)/100;
        $data['user_id'] = $level3->id;
        $data['transaction_id'] = rand(10000,99999).time();
        $data['credit'] = $commission;
		//$data['report_id'] = $input['product_id'];
        if ($lastdata5) {
            $data['balance'] = $lastdata5->balance +  $commission;
        } else {
            $data['balance'] =  $commission;
        }
        $data['transaction_type'] = 'Level Commission';
        $data['reference'] = 'Level 3';
		$data['reference_id'] = Auth()->user()->id;
        $data['type'] = 'credit';
			
		$data['report_id'] = $input['product_id'][$i];
		
        WalletTransactions::create($data);
			//dd('user_id='.Auth()->user()->id);
		}
		//level 1 commision ends
		
		
		
		
		//user level commision ends
				
            } else {
                return response()->json(['status' => 200, 'message' => 'Please buy first product otherwise selling for product not allow.']);
            }
        }

       
		
		
        return response()->json(['status' => 200, 'message' => 'Data inserted successfully.']);
    }

    public function levelCommition($type)
    {
        // print_r($type); die;
        $directMember = User::find(Auth()->user()->id);
        $commission = Setting::find(1);
        $date = date('Y-m-d');
//$y = date("Y", strtotime($date));
        if ($type == 'week') {

           // $report = User::Select('WL.debit as commission', 'WL.balance', 'level.*', 'users.my_share_id as ushare')->join('users as level', 'users.my_share_id', '=', 'level.responser_id')->join('wallet_transactions as WL', 'level.id', '=', 'WL.user_id')->where('WL.reference', 'level commission')->where('users.responser_id', $directMember->my_share_id)->whereBetween('WL.created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->get()->toArray();
			
		 $report = User::Select('WL.credit as commission', 'WL.created_at', 'users.name', 'WL.reference as Level')
				->join('wallet_transactions as WL', 'WL.reference_id', '=', 'users.id')
				->where('WL.transaction_type','Level Commission')
				->where('WL.user_id',Auth()->user()->id)
	 			->whereDate('WL.created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
				->get()->toArray();	
			
        }
        if ($type == 'day') {
 $report = User::Select('WL.credit as commission', 'WL.created_at', 'users.name', 'WL.reference as Level')
				->join('wallet_transactions as WL', 'WL.reference_id', '=', 'users.id')
				->where('WL.transaction_type','Level Commission')
				->where('WL.user_id',Auth()->user()->id)
	 			->whereDate('WL.created_at', $date)
				->get()->toArray();
         //  $report = User::Select('WL.debit as commission', 'WL.balance', 'level.*', 'users.my_share_id as ushare')->join('users as level', 'users.my_share_id', '=', 'level.responser_id')->join('wallet_transactions as WL', 'level.id', '=', 'WL.user_id')->where('WL.reference', 'level commission')->where('users.responser_id', $directMember->my_share_id)->whereDate('WL.created_at', $date)->get()->toArray();
        }

        if ($type == 'month') {
            // $date = "2010-10-10";
            $m = date("m", strtotime($date));
			 $y = date("Y", strtotime($date));
            $report = User::Select('WL.credit as commission', 'WL.created_at', 'users.name', 'WL.reference as Level')
				->join('wallet_transactions as WL', 'WL.reference_id', '=', 'users.id')
				->where('WL.transaction_type','Level Commission')
				->where('WL.user_id',Auth()->user()->id)
	 			->whereYear('WL.created_at', $y)
				->whereMonth('WL.created_at', $m)
				->get()->toArray();
        }

        if ($type == 'all') {
            $report = User::Select('WL.credit as Comm', 'WL.created_at', 'users.username', 'WL.reference as Level'
								  ,
                    DB::raw("(SELECT SUM(credit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Deposit'
                                ) as Deposit")
							  ,
                    DB::raw("(SELECT SUM(debit) FROM wallet_transactions 
                                WHERE users.id = wallet_transactions.user_id and wallet_transactions.transaction_type='Withdrawal'
                                ) as Withdrawal")
							  ,
							       DB::raw("(SELECT SUM(debit) FROM wallet_transactions 
                                WHERE users.responser_id = wallet_transactions.report_id and wallet_transactions.transaction_type='Level Commission'
                                ) as Commission")
								  
								  
								  )
				->join('wallet_transactions as WL', 'WL.reference_id', '=', 'users.id')
				->where('WL.transaction_type','Level Commission')
				->where('WL.user_id',Auth()->user()->id)
				->get()->toArray();
			
			//dd($report->dump());
			//SELECT wt.credit,wt.created_at,wt.reference,u.name FROM `wallet_transactions` wt join users u on u.id=wt.reference_id
//where wt.transaction_type='Level Commission'
			//->get()->toArray();
			/* $report=User::Select(DB::raw('SUM(WL.credit) as amount'),'users.name','reference')
				->join('wallet_transactions as WL', 'users.id', '=', 'WL.user_id')
				->where('transaction_type','Level Commission')
				->groupBY('reference')
				->groupBY('users.name')
				->get()->toArray();
			
			  $lastdata = WalletTransactions::join('products as p', 'wallet_transactions.report_id', '=', 'p.id')
            ->select('wallet_transactions.report_id','wallet_transactions.created_at', 'p.product_name','p.amount_paid', DB::raw('SUM(credit) as total_sum'), DB::raw('SUM(debit) as total'))
            ->where('wallet_transactions.user_id', Auth()->user()->id)
            ->where('transaction_type', 'Direct Commision')
            ->groupBy('wallet_transactions.user_id','wallet_transactions.created_at', 'p.product_name')
	  // dd($lastdata->dump());
            ->get();
			*/


        }
        // print_r($report); die;
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }


      public function directCommition($type)
     {
         // dd($type);
          $date = date('Y-m-d');
        $directMember = User::find(Auth()->user()->id);
         if ($type == 'week') {
		 
			 $lastdata = WalletTransactions::join('products as p', 'wallet_transactions.report_id', '=', 'p.id')
            ->select('wallet_transactions.report_id','wallet_transactions.created_at', 'p.product_name','p.amount_paid', DB::raw('SUM(credit) as total_sum'), DB::raw('SUM(debit) as total'))
            ->where('wallet_transactions.user_id', Auth()->user()->id)
            ->where('transaction_type', 'Direct Commision')
			->whereBetween('wallet_transactions.created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->groupBy('wallet_transactions.user_id','wallet_transactions.created_at', 'p.product_name')->get();
            //dd($lastdata->dump());
        $assetDataArray = array();
    
        foreach ($lastdata as $data) {
            $assetDataArray[] = array(
                "product_name" => $data->product_name,
                "sell" => $data->amount_paid,
                "buy" => $data->amount_paid,
                "royality" => $data->total_sum - $data->total,
                "created_at" =>date('d-M-Y h:i:sa',strtotime($data->created_at)),
            );
        }


		 if (!empty($assetDataArray)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $assetDataArray]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }



			 



			 



			 

         }
         if ($type == 'day') {
          
			 
			 
			$lastdata = WalletTransactions::join('products as p', 'wallet_transactions.report_id', '=', 'p.id')
            ->select('wallet_transactions.report_id','wallet_transactions.created_at', 'p.product_name','p.amount_paid', DB::raw('SUM(credit) as total_sum'), DB::raw('SUM(debit) as total'))
            ->where('wallet_transactions.user_id', Auth()->user()->id)
            ->where('transaction_type', 'Direct Commision')
			->whereDate('wallet_transactions.created_at', $date)
            ->groupBy('wallet_transactions.user_id','wallet_transactions.created_at', 'p.product_name')->get();
            
        $assetDataArray = array();
    
        foreach ($lastdata as $data) {
            $assetDataArray[] = array(
                "product_name" => $data->product_name,
                "sell" => $data->amount_paid,
                "buy" => $data->amount_paid,
                "royality" => $data->total_sum - $data->total,
                "created_at" =>date('d-M-Y h:i:sa',strtotime($data->created_at)),
            );
        }


		 if (!empty($assetDataArray)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $assetDataArray]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
			 
			 
         }
         if ($type == 'month') {
             // $date = "2010-10-10";
             $m = date("m", strtotime($date));
			 
			 $lastdata = WalletTransactions::join('products as p', 'wallet_transactions.report_id', '=', 'p.id')
            ->select('wallet_transactions.report_id','wallet_transactions.created_at', 'p.product_name','p.amount_paid', DB::raw('SUM(credit) as total_sum'), DB::raw('SUM(debit) as total'))
            ->where('wallet_transactions.user_id', Auth()->user()->id)
            ->where('transaction_type', 'Direct Commision')
			->whereMonth('wallet_transactions.created_at', $m)
            ->groupBy('wallet_transactions.user_id','wallet_transactions.created_at', 'p.product_name')->get();
            
        $assetDataArray = array();
    
        foreach ($lastdata as $data) {
            $assetDataArray[] = array(
                "product_name" => $data->product_name,
                "sell" => $data->amount_paid,
                "buy" => $data->amount_paid,
                "royality" => $data->total_sum - $data->total,
                "created_at" =>date('d-M-Y h:i:sa',strtotime($data->created_at)),
            );
        }


		 if (!empty($assetDataArray)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $assetDataArray]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
			 



			 



			 
            
         }
        if ($type == 'all') {
             $lastdata = WalletTransactions::join('products as p', 'wallet_transactions.report_id', '=', 'p.id')
            ->select('wallet_transactions.report_id','wallet_transactions.created_at', 'p.product_name','p.amount_paid', DB::raw('SUM(credit) as total_sum'), DB::raw('SUM(debit) as total'))
            ->where('wallet_transactions.user_id', Auth()->user()->id)
            ->where('transaction_type', 'Direct Commision')
            ->groupBy('wallet_transactions.user_id','wallet_transactions.created_at', 'p.product_name')->get();
            
        $assetDataArray = array();
    
        foreach ($lastdata as $data) {
            $assetDataArray[] = array(
                "product_name" => $data->product_name,
                "sell" => $data->amount_paid,
                "buy" => $data->amount_paid,
                "royality" => $data->total_sum - $data->total,
                "created_at" =>date('d-M-Y h:i:sa',strtotime($data->created_at)),
            );
        }
    
        if (!empty($assetDataArray)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $assetDataArray]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
		}
     }
  


    public function userUpdateImage(Request $request)
    {
        $validator = validator($request->all(), [
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }


        $user = User::find(Auth()->user()->id);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = $image->getClientOriginalName();
            $fileExtension = $image->getClientOriginalExtension();
            $imageName = time() . rand() . '.' . $image->getClientOriginalExtension();
            $request->file('image')->move(base_path() . '/public/uploads/Test_Management', $imageName);
            $user->image = $imageName;
        }


        $user->save();
        return response()->json(['status' => 200, 'message' => 'User profile updated successfully']);
    }


    public function usereData(Request $request)
    {
        $report = User::find(Auth()->user()->id);
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }

    public function Plan(Request $request)
    {
        $report = Plan::get()
			->whereNull('deleted_at')
			->toArray();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }

       public function userPlan(Request $request)
    {
        $report1 = User::where('id',Auth()->user()->id)->get()->first();
		   
		$report=Plan::where('id',$report1->plan_id)->get()->first();
		if (!empty($report)) {
            return response()->json(['status' => 200, 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'data' => '']);
        }
    }


    public function PlanBuy(Request $request)
    {

        $validator = validator($request->all(), [
            'plan_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }


        $user = User::find(Auth()->user()->id);
        $user->plan_id = $request->plan_id;
        $user->save();


        return response()->json(['status' => 200, 'message' => 'Data inserted successfully.']);
    }


    public function downline($id)
    {
        // print_r(Auth()->user()->my_share_id); die;
        $set = Setting::find(1);

        $user = User::find($id);
        $report = User::select('users.*', DB::raw("CONCAT($set->Set_commission,'%') AS level_commission"))->with('Plan')->where('users.responser_id', $user->my_share_id)->get()->toArray();
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }


    public function invite(Request $request)
    {

        //$header = $request->header('Authorization');
        $data = User::with('plan')->find(Auth()->user()->id);
        $in = Invitation::where('from_user_id', Auth()->user()->id)->count();
        //print_r($in); die;
        if ($data->plan->share_limit == $in) {
            return response()->json(['status' => 400, 'errors' => 'Your share limt exceed.']);
        } else {
            $validator = validator($request->all(), [
                'invite' => 'required',
                // 'user_id' => 'required',
                // 'desciption' => 'required'

            ]);

            if ($validator->fails()) {
                return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
            }


            $input = $request->all();
            $input['from_user_id'] = Auth()->user()->id;
            $user = Invitation::create($input);
            return response()->json(['status' => 200, 'message' => 'Invitations  successfully.']);
        }
    }


    public function shareLink()
    {
        // print_r(Auth()->user()->my_share_id); die;
        // $user= User::find($id);
        $report = 'http://' . $_SERVER["HTTP_HOST"] . '/register/' . Auth()->user()->my_share_id;
        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $report]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }


    public function walletDebbit(Request $request)
    {

        //$latestPosts = WalletTransactions::where('user_id', Auth()->user()->id)->latest()->take(1)->get()->toArray();
 $latestPosts = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();

        // print_r(Auth()->user()->my_share_id); die;
        // $user= User::find($id);
        $validator = validator($request->all(), [
            'transaction_id' => 'required',
            'debit' => 'required',
            'reference' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->toArray()]);
        }

        $input = $request->all();
        $input['balance'] = $latestPosts->balance - $request->debit;
        $input['user_id'] = Auth()->user()->id;
		$input['debit']=$request->debit;
		$input['credit']=0;
        $input['transaction_type'] = 'debit';
        $input['type'] = 'debit';
		$input['transaction_id'] = rand(10000,99999).time();



        $report = WalletTransactions::create($input);

        if (!empty($report)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.']);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
    }

    /* send otp */
public function send_otp(Request $request){
        $validator = validator($request->all(), [
            'mobile' => 'required|exists:users',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->first()]);
        }

        $otp=rand(100000, 999999);
        //$body='<h1>Dear User,</h1><br><p>Your otp is :-'.$otp.'</p>';
		//event(new SendOtp($request->mobile, $otp , ''));
	
	 $smsmessage =urlencode($otp." is your otp for your account verification valid for the next 10 minutes. Esotericit");
        $sms_url1 = "http://osd7.in/V2/http-api.php?apikey=".env('AUTHKEY')."&number=".$request->mobile."&message=".$smsmessage."&senderid=".env('SENDERID')."&format=json";
	//dd($sms_url1);
    
        file_get_contents($sms_url1);
	
	
        //event(new SendEmail('Reset password...', $request->email , $body));

        User::where('email',$request->mobile)
                    ->update(['otp' => $otp,'otp_validity' => date('Y-m-d H:i:s',strtotime('+10 minutes'))]);

        return response()->json(['status' => 200, 'message' => "OTP has been send to given Mobile.",'OTP' => $otp],200);
    }


    /* otp verify */
    public function otp_verification(Request $request){
        $validator = validator($request->all(), [
            'email' => 'required|exists:users',
            'otp'   =>'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->first()],400);
        }

        $user=User::where(['email'=>$request->email,'otp'=>$request->otp])->first();
        if(!$user)
            return response()->json(['status' => 400, 'errors' => 'Otp not matched with our records.'],400);

        if(strtotime($user->otp_validity) < strtotime(date('Y-m-d H:i:s')))
            return response()->json(['status' => 400, 'errors' => 'Otp has been expired.'],400);

        User::where(['email'=>$request->email,'otp'=>$request->otp])
                    ->update(['otp' => null , 'otp_validity' => null]);

        return response()->json(['status' => 200, 'message' => "Otp matched successfully."],200);
    }

    /* reset password */
    public function resetPassword(Request $request){
        //verify otp
        $validator = validator($request->all(), [
            'mobile'      => 'required|exists:users',
            'password' => [
                'required',
                'string',
                'min:8',             // must be at least 10 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ],
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->first()],400);
        }

        $new_pwd=Hash::make($request->password);
        User::where(['mobile'=>$request->mobile])
                    ->update(['password' => $new_pwd]);

        return response()->json(['status' => 200, 'message' => "Password has been reset successfully."],200);
    }

    /* withdrawal request */
     public function withdrawal_request(Request $request){
        $validator = validator($request->all(), [
            'withdrawal_address' => 'required',
            'withdrawal_amount'   =>'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()->first()],400);
        }
		
		$withdraw=WithdrawalRequest::where('status','Pending')->where('user_id',Auth::user()->id)->get()->first();
		if(!$withdraw){
        $withdrawal=new WithdrawalRequest();
        $withdrawal->withdrawal_address=$request->withdrawal_address;
        $withdrawal->withdrawal_amount=$request->withdrawal_amount;
        $withdrawal->user_id=Auth::user()->id;
        $withdrawal->save();

		}
		else{
		 return response()->json(['status' => 300, 'message' => "Withdrawal request already pending."],200);
		}
		//$latestPosts = WalletTransactions::where('user_id', Auth()->user()->id)->latest()->take(1)->get()->toArray();
     $latestPosts = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();
        $input = $request->all();
        $input['balance'] = $latestPosts->balance - $request->withdrawal_amount;
        $input['user_id'] = Auth()->user()->id;
		$input['debit']=$request->withdrawal_amount;
		$input['credit']=0;
		$input['reference_id']=$withdrawal->id;
        $input['transaction_type'] = 'Withdrawal';
        $input['type'] = 'debit';
		$input['transaction_id'] = rand(10000,99999).time();
        $report = WalletTransactions::create($input);
		
        return response()->json(['status' => 200, 'message' => "Withdrawal request has been sent successfully."],200);
    }
	
	public function withdrawal_data(Request $request){
		$user_id=Auth()->user()->id;
		
		$results=WithdrawalRequest::join('users','users.id','=','withdrawal_requests.user_id')
                                    ->select('withdrawal_requests.*','users.name')
			->where('withdrawal_requests.user_id', $user_id)
			->where('withdrawal_requests.status','!=','Paid')
			->get();
       
		if (!empty($results)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $results]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
	}
	
	
	
	public function withdrawal_paid(Request $request){
		$user_id=Auth()->user()->id;
		
		$results=WithdrawalRequest::join('users','users.id','=','withdrawal_requests.user_id')
                                    ->select('withdrawal_requests.*','users.name')
			->where('withdrawal_requests.user_id', $user_id)
			
			->where('withdrawal_requests.status','Paid')
			->get();
       
		if (!empty($results)) {
            return response()->json(['status' => 200, 'message' => 'Data Found.', 'data' => $results]);
        } else {
            return response()->json(['status' => 400, 'message' => 'Data not found.']);
        }
	}
	public function withdrawal_cancel(Request $request){
		$user_id=Auth()->user()->id;
		$rowid=$request->rowid;
		$Withdrawal =WithdrawalRequest::find($rowid);
       if($Withdrawal){
        $Withdrawal->status = "Cancelled";
        $Withdrawal->save();
		   
		   
       
		
        //dd($Withdrawal->status);
       if($Withdrawal->status!='Paid'){
		   $latestPosts = WalletTransactions::where('user_id', Auth()->user()->id)
			->orderBy('id','DESC')
			->latest()->first();
		   if ($latestPosts) {
           $input['balance'] = $latestPosts->balance + $Withdrawal->withdrawal_amount;
        } else {
            $input['balance'] =  $Withdrawal->withdrawal_amount;
        }
		   
        
        $input['user_id'] = Auth()->user()->id;
		$input['debit']=0;
		$input['credit']=$Withdrawal->withdrawal_amount;
        $input['transaction_type'] = 'Withdrawal Cancel';
        $input['type'] = 'credit';
		 $input['transaction_id'] = rand(10000,99999).time();
        $report = WalletTransactions::create($input); 
	   }
		   
        return response()->json(['status' => 200, 'message' => 'Updated Sucessfully.']);
	   }
		else{
		return response()->json(['status' => 400, 'message' => 'Data not found.']);
		}
	}
	public function api_address(Request $request){
		$user_id=Auth()->user()->id;
		//$results=User::where('id', $user_id)->first()->toArray();
		
		 $report=DB::table('api_address')->where('user_id',$user_id)->get()->toArray();
		return response()->json(['status' => 200, 'result' => $report]);
	}
	public function api_address_post(Request $request){
		$user_id=Auth()->user()->id;
		// $user = User::find($user_id);
		//$user->api_address = $request->api_address;
        //$user->save();
		
		DB::table('api_address')->insert(['user_id' => $user_id, 'api_address' => json_encode($request->api_address)]);
		return response()->json(['status' => 200, 'message' => 'Inserted Successfully.']);
	}
	
	public function api_version_get(Request $request){
		$user_id=Auth()->user()->id;
		// $user = User::find($user_id);
		//$user->api_address = $request->api_address;
        //$user->save();
		
		DB::table('api_address')->insert(['user_id' => $user_id, 'api_address' => json_encode($request->api_address)]);
		return response()->json(['status' => 200, 'message' => 'Inserted Successfully.']);
	}
	function api_version_app(Request $request){
		return response()->json(['status' => 200, 'version' => '7.0','path' => 'https://www.smarttrade.org.in/smarttradeapp.apk']);
	}
	function updatebalance(Request $request){
		
		$users=WalletTransactions::select('user_id')->groupBy('user_id')->get();
		foreach($users as $user){
		$trans=WalletTransactions::where('user_id',$user->user_id)->orderBy('id')->get();
			$balance=0;
			foreach($trans as $tran){
				$balance=$balance + $tran->credit -$tran->debit;
				$row = WalletTransactions::find($tran->id);
       			$row->balance = $balance;
        		$row->save();
			}
		}
		
		
		return response()->json(['status' => 200, 'version' => '7.0','path' => 'https://www.smarttrade.org.in/smarttradeapp.apk']);
	}
	
	
	function addTrackId(Request $request){
		$user_id=Auth()->user()->id;
		DB::table('payment_transaction')->insert(['user_id' => $user_id, 'trackid' => $request->trackid,'created_at'=> date('Y-m-d H:i:s')]);
		return response()->json(['status' => 200, 'message' => 'Inserted Successfully.']);
		
	}
}
