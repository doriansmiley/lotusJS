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

        commandMap.addCommand( 'testEvent1', Lotus.TestCommand );
        commandMap.addCommand( 'testEvent2', Lotus.TestCommand );

        expect( commandMap.eventFunctionMap['testEvent1'][0].handler ).toBe(Lotus.TestCommand);
        expect( commandMap.eventFunctionMap['testEvent2'][0].handler ).toBe(Lotus.TestCommand);

        commandMap.removeCommand( 'testEvent2', Lotus.TestCommand );

        expect( commandMap.eventFunctionMap['testEvent2']).toBe(undefined);
        expect( commandMap.eventFunctionMap['testEvent1'][0].handler ).toBe(Lotus.TestCommand);

        commandMap.removeCommand( 'testEvent1', Lotus.TestCommand );
        expect( commandMap.eventFunctionMap['testEvent1']).toBe(undefined);

        commandMap.addCommand( 'testEvent1', Lotus.TestCommand );
        commandMap.addCommand( 'testEvent2', Lotus.TestCommand );
        commandMap.addCommand( 'testEvent1', Lotus.TestCommand );
        commandMap.addCommand( 'testEvent2', Lotus.TestCommand );

        expect( commandMap.eventFunctionMap['testEvent1'].length).toBe(1);
        expect( commandMap.eventFunctionMap['testEvent2'].length).toBe(1);

        commandMap.addCommand( 'testEvent1', Lotus.TestCommand );
        commandMap.addCommand( 'testEvent2', Lotus.TestCommand );
        commandMap.addCommand( 'testEvent1', Lotus.TestCommand );
        commandMap.addCommand( 'testEvent2', Lotus.TestCommand );

        expect( commandMap.eventFunctionMap['testEvent1'].length).toBe(1);
        expect( commandMap.eventFunctionMap['testEvent2'].length).toBe(1);

        commandMap.removeAllCommands();

        commandMap.addCommand( 'testEvent1', responder, 'execute' );
        commandMap.addCommand( 'testEvent2', responder, 'execute2' );

        commandMap.context.eventDispatcher.dispatch(new Lavender.AbstractEvent('testEvent1', {}));

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'CommandMapTest execute command failed', 1000);
        //runs will execute after success == true
        runs(function(){
            success = false;
            commandMap.context.eventDispatcher.dispatch(new Lavender.AbstractEvent('testEvent2', {}));
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'CommandMapTest execute command failed', 1000);
        //runs will execute after success == true
        runs(function(){
            success = false;
            commandMap.removeCommand( 'testEvent1', responder);
            commandMap.removeCommand( 'testEvent2', responder);
            expect( commandMap.eventFunctionMap['testEvent1']).toBe(undefined);
            expect( commandMap.eventFunctionMap['testEvent2']).toBe(undefined);

            commandMap.addCommand( 'testEvent1', Lotus.TestCommand );
            commandMap.addCommand( 'testEvent2', Lotus.TestCommand );
            commandMap.addCommand( 'testEvent1', Lotus.TestCommand );
            commandMap.addCommand( 'testEvent2', Lotus.TestCommand );

            expect( commandMap.eventFunctionMap['testEvent1'].length).toBe(1);
            expect( commandMap.eventFunctionMap['testEvent2'].length).toBe(1);

            commandMap.removeAllCommands();
        });
    });
});