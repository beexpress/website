
export class HttpHelper {


  static getLatLonByCep(_cep) {

  }

  static Post(url){
    let bodyString = JSON.stringify({user:user,password:pass});
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({headers: headers}); // Create a request option
    return this.http
      .post(url,bodyString,options)
      .map((response:Response)=> response.json() );
  }
}
