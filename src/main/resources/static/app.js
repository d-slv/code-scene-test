var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#messages").html("");
}

function connect() {
    var socket = new SockJS('/telemed/api-ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({'Authorization':'Bearer '+ $("#token").val()}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        console.log('Token: ' + $("#token").val());
        console.log('Topic: ' + $("#topic").val());
        stompClient.subscribe($("#topic").val(), function (message) {
            showMessage(message.body);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/message", {'Authorization':'Bearer '+ token}, JSON.stringify({'message': $("#message").val()}));
}

function showMessage(message) {
    $("#messages").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});
