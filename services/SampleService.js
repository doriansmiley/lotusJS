/**
 * Created by dsmiley on 11/5/13.
 * Define stub methods and signatures
 * This is a sample service implementation using Lotus's HttpServiceFactory. As you can see we abstract out the service implementation by delegating the object creation to HttpServiceFactory.
 * All concrete http service objects expose a common API consisting of the addResponder and send method. Application configuration determines which concrete instance is used.
 */
Lotus.SampleService = function( config ){
    var _config;//IContextConfigModel
    this.config = config;
    this.serviceMap = (config.serviceMap) ? config.serviceMap :
    {
        //loading local XML for now. If a service becomes available use the service API
        'createSDSession'			: '/sdsession/action/create',
        'getInstance'				: '/instance/{0}',// {0} = instanceId
        'echoJSON'				    : '/key/value/{0}/{1}',// {0} = instanceId
        'localRequest'				: ':3000/printondemand/1234/photos/{0}'
    };
}

Lotus.SampleService.prototype.getURLWithParams = function(key, args)
{
    return (args !== null && args !== undefined ) ? Lavender.StringUtil.substitute(this.getURL(key), args) : this.getURL(key);
}

Lotus.SampleService.prototype.getURL = function(key)
{
    return this.config.baseUrl + this.serviceMap[key];
}

//this is a sample service method to be used as an example only. You service methods will be dependent on your service API and model objects
//note the use of the key param. This is a very importnat feature and I highly recommend that whatever service you created implements a similar method
//don't hard code or otherwise tightly couple the URL creation inside this method. The use of a builder pattern ensures the end point can be changed based on environment
Lotus.SampleService.prototype.echoJSON = function(jsonKey, jsonValue, key, responder, format, contentType, localRequest, cache) {
    var url = this.getURLWithParams(key, [jsonKey, jsonValue]);
    return this.sendXMLRequest(true, responder, url, null, null, format, contentType, localRequest, cache);
}

Lotus.SampleService.prototype.testRequestUsingIncludedAPI = function(key, responder, format, contentType, localRequest, cache) {
    var url = this.getURLWithParams(key, ['54232fc2-7345-4921-8079']);//hard coded args
    return this.sendXMLRequest(false, responder, url, null, null, format, contentType, localRequest, cache);
}

//this is a sample service method to be used as an example only. You service methods will be dependent on your service API and model objects
//note the use of the key param. This is a very importnat feature and I highly recommend that whatever service you created implements a similar method
//don't hard code or otherwise tightly couple the URL creation inside this method. The use of a builder pattern ensures the end point can be changed based on environment
Lotus.SampleService.prototype.createSDSession = function(context, userID, password, key, responder, format, contentType, localRequest, cache) {
    var params =
    {
        'context'	: context,
        'user'		: userID,
        'password'	: password
    };
    var url = this.getURLWithParams(key);
    return this.sendXMLRequest(true, responder, url, params, null, format, contentType, localRequest, cache);
}

//This is a sample send reques method, you should customize to fit your services request format. This sample uses JSON
//I know the name sucks, but it's the name we chose at the time for preparing request params
Lotus.SampleService.prototype.sendXMLRequest = function(isPostRequest, responder, url, paramObj, urlParams, format, contentType, localRequest, cache, externalApiUrl)
{
    var params = JSON.stringify(paramObj);

    //allow null to pass through
    contentType = (contentType === undefined) ? 'application/json' : contentType;
    format = (format === undefined) ? 'json' : format;

    return this.sendRequest(isPostRequest, responder, url, params, format, contentType, cache);
}

//this is a generic method that you should not override
Lotus.SampleService.prototype.sendRequest = function( isPostRequest, responder, url, params, dataType, contentType, cache )
{
    if( cache === null || cache === undefined ){
        cache = false;
    }

    var httpRequestInstance = Lotus.HttpServiceFactory.getInstance().getHttpService(this.config);
    httpRequestInstance.addResponder(responder);
    var requestType = (isPostRequest) ? 'POST' : 'GET';
    return httpRequestInstance.send(requestType, url, params, contentType, dataType, cache);

}
