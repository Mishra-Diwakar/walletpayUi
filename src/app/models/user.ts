export class User {
    // id:number
     fullName: string;
     userName: string;
     dob :  Date;
     mobile: string;
     email: string;
     companyName: string;
     aadhar:string;
     pancard:string;
     password:string;
     address:string;
     state:string;
     pincode:string;
     city: string;
     parentId:string;
     userType:string;
     apiStatus:string;
     transactionService:number;
     vpa:any;
     bcagentid:any;
     lienAmount:number;
     rollingReserve:number;
     payinCallbackUrl:string;
     payoutCallbackUrl:string;
     userIp:string
   constructor(
     //id: number, 
     fullName: string,
     userName: string,
     dob:Date,
     mobile: string,
     email: string,
     companyName: string,
     aadhar:string,
     pancard:string,
     password:string,
     address:string,
     state:string,
     pincode:string,
     city: string,
     parentId:string,
     userType:string,
     apiStatus:string,
     transactionService:number,
     vpa:any,
     bcagentid:any,
     lienAmount:number,
     rollingReserve:number,
     payinCallbackUrl:string,
     payoutCallbackUrl:string,
     userIp:string
   ) {
     //this.id = id
     this.fullName = fullName
     this.userName = userName
     this.dob = dob;
     this.mobile = mobile
     this.email = email
     this.companyName = companyName
     this.aadhar = aadhar
     this.pancard = pancard
     this.password = password
     this.address = address
     this.state = state
     this.pincode = pincode
     this.city = city
     this.parentId = parentId
     this.userType = userType
     this.apiStatus = apiStatus
     this.transactionService = transactionService
     this.vpa = vpa
     this.bcagentid = bcagentid
     this.lienAmount = lienAmount
     this.rollingReserve = rollingReserve
     this.payinCallbackUrl = payinCallbackUrl
     this.payoutCallbackUrl = payoutCallbackUrl
     this.userIp = userIp
   }  
   
   
   }
   