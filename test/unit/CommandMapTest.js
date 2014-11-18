/**
 * Created by dsmiley on 1/23/14.
 */
'use strict';
describe('CommandMapTest', function () {

    it('check SpiRef.CommandMapper function', function () {
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        var commandMap = new Lotus.CommandMap(context);
        var success = false;
        var responder = {
            execute:function(event){
                console.log('CommandMapTest responder execute called: ' + event.type);
                success = true;
            },
            execute2:function(event){
                console.log('CommandMapTest responder execute2 called: ' + event.type);
                success = true;
            }
        };

        /*
        commandMap.addCommand( SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS, SpiRef.LoadLayoutCommand );
        commandMap.addCommand( SpiSdk.InstanceEvent.INSTANCE_READY, SpiRef.LoadLayoutCommand );

        expect( commandMap.eventFunctionMap[SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS][0].handler ).toBe(SpiRef.LoadLayoutCommand);
        expect( commandMap.eventFunctionMap[SpiSdk.InstanceEvent.INSTANCE_READY][0].handler ).toBe(SpiRef.LoadLayoutCommand);

        commandMap.removeCommand( SpiSdk.InstanceEvent.INSTANCE_READY, SpiRef.LoadLayoutCommand );

        expect( commandMap.eventFunctionMap[SpiSdk.InstanceEvent.INSTANCE_READY]).toBe(undefined);
        expect( commandMap.eventFunctionMap[SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS][0].handler ).toBe(SpiRef.LoadLayoutCommand);

        commandMap.removeCommand( SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS, SpiRef.LoadLayoutCommand );
        expect( commandMap.eventFunctionMap[SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS]).toBe(undefined);

        commandMap.addCommand( SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS, SpiRef.LoadLayoutCommand );
        commandMap.addCommand( SpiSdk.InstanceEvent.INSTANCE_READY, SpiRef.LoadLayoutCommand );
        commandMap.addCommand( SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS, SpiRef.LoadLayoutCommand );
        commandMap.addCommand( SpiSdk.InstanceEvent.INSTANCE_READY, SpiRef.LoadLayoutCommand );

        expect( commandMap.eventFunctionMap[SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS].length).toBe(1);
        expect( commandMap.eventFunctionMap[SpiSdk.InstanceEvent.INSTANCE_READY].length).toBe(1);

        commandMap.addCommand( SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS, SpiRef.StartUpCommand );
        commandMap.addCommand( SpiSdk.InstanceEvent.INSTANCE_READY, SpiRef.StartUpCommand );
        commandMap.addCommand( SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS, SpiRef.StartUpCommand );
        commandMap.addCommand( SpiSdk.InstanceEvent.INSTANCE_READY, SpiRef.StartUpCommand );

        expect( commandMap.eventFunctionMap[SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS].length).toBe(2);
        expect( commandMap.eventFunctionMap[SpiSdk.InstanceEvent.INSTANCE_READY].length).toBe(2);

        commandMap.addCommand( 'testEvent1', responder, 'execute' );
        commandMap.addCommand( 'testEvent2', responder, 'execute2' );

        SpiSdk.EventDispatcher.dispatch(new SpiSdk.AbstractEvent('testEvent1', {}));

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'CommandMapTest execute command failed', 5000);
        //runs will execute after success == true
        runs(function(){
            success = false;
            SpiSdk.EventDispatcher.dispatch(new SpiSdk.AbstractEvent('testEvent2', {}));
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'CommandMapTest execute command failed', 5000);
        //runs will execute after success == true
        runs(function(){
            success = false;
            commandMap.removeCommand( 'testEvent1', responder);
            commandMap.removeCommand( 'testEvent2', responder);
            commandMap.removeCommand( SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS, SpiRef.StartUpCommand );
            commandMap.removeCommand( SpiSdk.InstanceEvent.INSTANCE_READY, SpiRef.StartUpCommand );
            commandMap.removeCommand( SpiSdk.ImageAssetEvent.GOT_IMAGE_ASSETS, SpiRef.LoadLayoutCommand );
            commandMap.removeCommand( SpiSdk.InstanceEvent.INSTANCE_READY, SpiRef.LoadLayoutCommand );
        });
        */
    });
});