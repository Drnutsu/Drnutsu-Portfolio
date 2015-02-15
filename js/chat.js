
$(document).ready(function () {
        alert('call');
        // var fake_use _id = Math.floor((Math.random()*1000)+1);
        var fake_user_id = {{ Auth::user()->id }};
        //make sure to update the port number if your ws server is running on a different one.
        window.app = {};
 
        app.BrainSocket = new BrainSocket(
                new WebSocket('ws://localhost:8080'),
                new BrainSocketPubSub()
        );
 
        app.BrainSocket.Event.listen('generic.event',function(msg){
            console.log(msg);
            if(msg.client.data.user_id == fake_user_id){
                $('#chat-log').append('<li><img src="{{ Auth::user()->portrait_small }}" class="img-circle" width="26"><div class="message">'+msg.client.data.message+'</div></li>');
            }else{
                var str_test='<li class="right"><img src="'+msg.client.data.user_portrait+'" class="img-circle" width="26"><div class="message">'+msg.client.data.message+'</div></li>';
                $('#chat-log').append(str_test);
            }
        });
 
        app.BrainSocket.Event.listen('app.success',function(data){
            console.log('An app success message was sent from the ws server!');
            console.log(data);
        });
 
        app.BrainSocket.Event.listen('app.error',function(data){
            console.log('An app error message was sent from the ws server!');
            console.log(data);
        });
 
        $('#chat-message').keypress(function(event) {
 
            if(event.keyCode == 13){
 
                app.BrainSocket.message('generic.event',
                        {
                            'message':$(this).val(),
                            'user_id':fake_user_id,
                            'user_portrait':'{{ Auth::user()->portrait_small}}'
                        }
                );
                $(this).val('');
 
            }
 
            return event.keyCode != 13; }
        );
});
