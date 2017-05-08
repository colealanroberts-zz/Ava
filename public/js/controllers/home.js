prox.controller('HomeController', function($scope, $location, $stateParams, $http, $interval, Prox, Dictionary) {
    var socket = io('http://localhost:8000');

    // Fake appliances

    const appliances = [
        {
            name: 'lights',
            id: 1560,
            checked: true
        },
    ];

    $scope.appliances = appliances;

    // Determine if a state change is happening
    $scope.stateChange = (appliance) => {
        Prox.execute_applianceStateChange(appliance);
    };

    socket.on('trusted_user_entering', () => {
        console.log("User entering...");
        $scope.statusMessage = "Home";
    });

    socket.on('trusted_user_exiting', () => {
        $scope.statusMessage = "Away";
        Prox.speak("Would you like me to turn off all of the lights while you're away?");
    });

    if (annyang) {
        var commands = {
            "Hello": () => {
                Prox.statement_greeting();
            },
            "Who created you": () => {
                Prox.speak("Cole Roberts designed and developed me out of sheer boredom")
            },
            // "(Yes) turn the *appliance_name *state": (state, appliance_name) => {
            //     const appliance = {};

            //     if (state === "on") {
            //         appliance_name.checked = true;
            //     } else {
            //         appliance_name.checked = false;
            //     }

            //     Prox.execute_applianceStateChange(appliance);
            // },
            "(Yes) turn *state the *appliance_name": (state, appliance_name) => {

                console.log(appliance_name, state);

                const appliance = appliances.filter(function(e) {
                    return e.name === appliance_name;
                });

                if (!appliance || appliance === 'undefined' || appliance === null || !appliance.length) {
                    Prox.speak("Hmm.. I couldn't find an appliance with the name " + appliance_name);
                } else {
                    
                    if (state === "on") {
                        
                        appliance[0].checked = true;
                        console.log('state set to on', appliance);
                        Prox.execute_applianceStateChange(appliance);
                    } else {

                        appliance[0].checked = false;
                        console.log('state set to off', appliance);
                        Prox.execute_applianceStateChange(appliance);
                    }

                }    
            },
            "No": () => {
                Prox.speak(Dictionary.getAcknowledgement());
            },
            "How are you (doing)": () => {
                Prox.speak("I'm doing " + Dictionary.getCommonPositiveReply() + ", thanks for asking.");
            },
            "Who are you": () => {
                Prox.statement_name();
            },
            "I didn't say anything": () => {
                Prox.speak(Dictionary.getShortApology());
            },
            "Who am I": () => {
                Prox.question_getUserName();
            },
            "What's your name": () => {
                Prox.speak("I am Ava");
            },
            "How old are you": () => {
                Prox.statement_age();
            },
            "I'm :age years old": (age) => {
                Prox.statement_setUserAge(age);
            },
            "How old am I": () => {
                Prox.question_getUserAge();
            },
            "My name is *name": (name) => {
                Prox.statement_setUserName(name);
            },
            "I live in :city :state": function(city, state) {
                console.log(city, state);
                Prox.statement_setUserLocation(city, state);
            },
            "Shut up": () => {
                Prox.speak("Well, that was rude...");
            },
            "Stop talking": () => { 
                Prox.stop();
            },
            "Where do I live": () => {
                Prox.statement_getUserHome();
            },
            "What's my name": () => {
                Prox.question_getUserName();
            },
            "Erase everything (please)": () => {
                Prox.settings_clearAll();
            },
            "Yes": () => {
                Prox.execute_currentTask();
            },
            "Thanks": () => {
                Prox.speak(Dictionary.getAcknowledgement());
            },
            "Thank you": () => {
                Prox.speak(Dictionary.getAcknowledgement());
            },
            "How did you know that": () => {
                Prox.speak("You've told me.");
            },
            "Pick a (random) number between :n1 and :n2": (n1, n2) => {
                Prox.statement_getRandomNumber(n1, n2);
            },
        };

        annyang.addCommands(commands);
        // annyang.addCallback('resultNoMatch', () => {
        //     Prox.speak("Hmm, I'm not sure I understood what you meant.");
        // });

        annyang.start({autoRestart: true, continuous: true});
    } else {
        console.log("Something broke!");
    }

    $interval(() => {
        if (responsiveVoice.isPlaying()) {
        } else {
        
        }
    }, 250);
});
