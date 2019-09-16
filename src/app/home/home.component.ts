import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',  // template (view/html page linked to this .ts file)
  styleUrls: ['./home.component.scss']  //  styles 
})
export class HomeComponent implements OnInit {

  result:any;
  url="https://api.github.com/users/octocat/followers";    // given url to grab and store array of object to Mongodb
  serverurl="http://localhost:8080";                       //  server url , since server running on same machine 
                                                            // if server running on other machine replcae localhost by machine ip address
                                                            //  8080 port where nodejs server is running
  constructor(private http: HttpClient) { }

  ngOnInit() {    //  to grab or fetch the data from given url

  
    this.http.get(this.url).subscribe(data => {   //  get request Plugin or Api
        
     this.insertJosnToDb(data)    //  calling insertJosnToDb() to insert Array of Objects into Mongodb
                                  
        

  });


   

}

insertJosnToDb(data)  //  insertion to mongo
{
  this.http.post(this.serverurl+'/insertdb',data ).subscribe(data=>{
  
                     
   this.result=data;   // assigned response objects into result which will display them in table

                     });
}


deleteRow(user)   //  to delete user from database
{
  
  var result=confirm("Do You Want Delete Login User "+ user.login.toUpperCase())

  if(result==true)
  {

  var objid=user._id;
  
  let index = this.result.indexOf(user);  //  delete user from front end(view)  i.e locally

  if(index > -1){
    this.result.splice(index, 1);
  } 
 

  this.http.delete(this.serverurl+'/userDelete' +objid ,{}).subscribe(data=>{
                    
   if(data['n']==1)   //  if user deleted count is 1
   {
       alert("User "+user.login.toUpperCase()+ " is Succesfully Deleted from Databse");
       this.goToAggregation(user.login.toUpperCase());   //  to perform aggregation after delete user
   }
   else
   {
       alert("server down , Try Again Later")
   }
                
})
  }

  else{


  }
}

updateId(user)  // upadte userid
{


  
  let userid=user.id+","+user._id;

 
  this.http.put(this.serverurl+'/userupdate' +userid, {} ).subscribe(data=>{
           
    if(data['n']==1)  //  uuser updated succesfully
    {
        alert("Login Id "+user.id+ " is Succesfully Updated in Databse")
    }
    else
    {
        alert("server down , Try Again Later")
    }
    
  
   });
}


goToAggregation(user)  // to count numbers of users having site_admin as false after deleting user
{

  
  this.http.get(this.serverurl+'/aggregationcountuser').subscribe(data => {
        
    alert("After Deleting  "+user+"  From Database Total "+data[0].count+" Users are Having site_admin Value as "+data[0]._id);
       

 });

}


}
