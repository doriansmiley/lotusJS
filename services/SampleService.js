/**
 * Created by dsmiley on 11/5/13.
 * Define stub methods and signatures
 * This is a sample service implementation using Lotus's HttpServiceFactory. As you can see we abstract out the service implementation by delegating the object creation to HttpServiceFactory.
 * All concrete http service objects expose a common API consisting of the addResponder and send method. Application configuration determines which concrete instance is used.
 */
Lotus.SampleService = function( config ){
    var _config;//IContextConfigModel
    this.config = config;
    this.serviceMap =
    {
        //loading local XML for now. If a service becomes available use the service API
        'createSDSession'			: 'sdsession/action/create',
        'getInstance'				: 'instance/{0}'// {0} = instanceId
    };
}

Lotus.SampleService.prototype.getURLWithParams = function(key, args)
{
    return Lavender.StringUtil.substitute(this.getURL(key), args);
}

Lotus.SampleService.prototype.getURL = function(key)
{
    return this.config.baseUrl + this.serviceMap[key];
}

Lotus.SampleService.prototype.createSDSession = function(context, userID, password, url, responder, format, contentType, localRequest, cache) {
    var params =
    {
        'context'	: this.config.context,
        'user'		: this.config.user,
        'password'	: this.config.password
    };

    return this.sendXMLRequest(true, responder, url, params, null, format, contentType, localRequest, cache);
}

// Typical request should be sent via this method, sendRequest() is only used for custom requests
Lotus.SampleService.prototype.sendXMLRequest = function(isPostRequest, responder, url, paramObj, urlParams, format, contentType, localRequest, cache, externalApiUrl)
{
    var paramsXML = null;

    if (paramObj && isPostRequest)
    {
        paramsXML = '<request>';
        for (var key in paramObj)
        {
            if(paramObj[key] === null || paramObj[key] === undefined ){
                continue;
            }
            paramsXML += '<'+key+'>';
            paramsXML += paramObj[key];
            paramsXML += '</'+key+'>';
        }
        paramsXML += '</request>';
    }

    return this.sendRequest(isPostRequest, responder, url, paramsXML, format, contentType, cache);
}


Lotus.SampleService.prototype.sendRequest = function( isPostRequest, responder, url, params, dataType, contentType, cache )
{
    if( cache === null || cache === undefined ){
        cache = false;
    }
    if( contentType === null || contentType === undefined ){
        contentType = 'text/xml'
    }
    if( dataType === null || dataType === undefined ){
        dataType = 'xml'
    }
    var httpRequestInstance = Lotus.HttpServiceFactory.getInstance().getHttpService(this.config);
    httpRequestInstance.addResponder(responder);
    var requestType = (isPostRequest) ? 'POST' : 'GET';
    return httpRequestInstance.send(requestType, url, params, contentType, dataType, cache);

}
