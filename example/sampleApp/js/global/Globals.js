/**
 * Created by dsmiley on 6/26/15.
 */
//global namespace for app
SampleApp = function(){

}

SampleApp.init = function(){
    SampleApp.resources = new SampleApp.Context(Lavender.ModelLocator.getInstance().config);
}