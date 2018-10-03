
var config = {
    apiKey: "AIzaSyAljeEssPjfpYWefrsAcZp9OlzV_K-caYQ",
    authDomain: "hello-world1018.firebaseapp.com",
    databaseURL: "https://hello-world1018.firebaseio.com",
    projectId: "hello-world1018",
    storageBucket: "hello-world1018.appspot.com",
    messagingSenderId: "717646869643"
};

firebase.initializeApp(config);

var database = firebase.database();
var train = "";
var destination = "";
var initialTime = "";
var frequency = "";

$("#add-train").on("click", function (event) {
    event.preventDefault();

    train = $("#train-name").val().trim();
    destination = $("#dest").val().trim();
    initialTime = $("#initial-time").val().trim();
    frequency = $("#frequency").val().trim();

    var initialTimeConverted = moment(initialTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(initialTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextArrival = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");

    database.ref().push({
        train: train,
        destination: destination,
        initialTime: initialTime,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: tMinutesTillTrain,
        currentTime: currentTime,
    });

    $("#train-name").val("");
    $("#dest").val("");
    $("#initial-time").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    train = childSnapshot.val().train;
    destination = childSnapshot.val().destination;
    initialTime = childSnapshot.val().initialTime;
    frequency = childSnapshot.val().frequency;
    nextArrival = childSnapshot.val().nextArrival;
    minutesAway = childSnapshot.val().minutesAway;
    currentTime = childSnapshot.val().currentTime;

    var initialTimeConverted = moment(initialTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(initialTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextArrival = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");

    var tRow = $("<tr>");
    var trainTd = $("<td>").text(train);
    var destTd = $("<td>").text(destination);
    var frequencyTd = $("<td>").text(frequency);
    var nextArrivalTd = $("<td>").text(nextArrival);
    var minutesAwayTd = $("<td>").text(tMinutesTillTrain);
    console.log(train);
    console.log(destination);


    tRow.append(trainTd, destTd, frequencyTd, nextArrivalTd, minutesAwayTd)
    $(".train-table tr:last").after(tRow);
    console.log(tRow)

},
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }
);
