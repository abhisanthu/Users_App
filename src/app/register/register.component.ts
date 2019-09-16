import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name=[];

  showRegisterPassword: boolean;
  showVerifyPassword: boolean;
  passwordVerificaion:boolean;
  display='none';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  registerForm = this.formBuilder.group({ 
    register_email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    register_password: ['', Validators.required],
    verify_password: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    country: ['', Validators.required],
    area_code: ['', Validators.required],
    phone_number: ['', Validators.required],
  });


  constructor( private router: Router,
               private formBuilder:FormBuilder,private http: HttpClient ) { 
    this.showRegisterPassword = false;
    this.showVerifyPassword = false;

    alert("constructor123")
  }

  ngOnInit() {

    alert("ji1234567")
    this.getNames()
  }

  onClickSubmit(data) {
    if(data.register_email && data.register_password && data.verify_password 
      && data.first_name && data.last_name && data.country && data.area_code
      && data.phone_number) {
        if(data.register_email.match(this.emailPattern)){
          if(data.register_password == data.verify_password)
            this.router.navigateByUrl('/home');
          else {
            this.passwordVerificaion = true;
            this.display='block';
          }
        }
    } else {
        this.passwordVerificaion = false;
    }
  }

  registerPassword() {
    this.showRegisterPassword = !this.showRegisterPassword;
  }
  verifyPassword() {
    this.showVerifyPassword = !this.showVerifyPassword;
  }
  closeModalDialog(){
    this.display='none';
  }


  register(reg_email,reg_password,ver_password,first_Name,last_Name,country_s,area_Code,phone_Number)
  {
    console.log(reg_email,reg_password,ver_password,first_Name,last_Name,country_s,area_Code,phone_Number);

    let c= [reg_email,reg_password,ver_password,first_Name,last_Name,country_s,area_Code,phone_Number];

    this.http.post('http://localhost:8080/customerDetail' +c,{} )
  .subscribe(result=>{console.log(result)
                     
   
                     });

  }

  getNames()
  {
   
    this.http.get("http://localhost:8080/customerDetail")
    .subscribe(data => {
        
        console.log(typeof data)
        console.log(data);

        

        // for(var cust=0;cust<data.length;cust++)
        // {
        //    console.log(data[cust].name);

        //    this.name=data;
        // }

        console.log(this.name)

        
    })
  }
  delete(f)
  {


    alert(f)

    var customerid=f._id;
    alert(customerid);

   
  
    this.http.delete('http://localhost:8080/customerDelete' +customerid ,{})
   .subscribe(result=>{console.log(result)
                      
   
         
                  
  })

}

update(f)
{
  
  let cu=f._id;
 
  this.http.put('http://localhost:8080/customerupdate' +cu, {} )
  .subscribe(result=>{console.log(result)
                     
  
   });
}

}