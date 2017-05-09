prox.controller('HomeController', function($scope, $location, $state, $stateParams, $http, $interval, Prox, Dictionary, Diagnostics, Time) {
    var socket = io('http://localhost:8000');

    // Fake appliances

    const appliances = [
        {
            name: 'kitchen light',
            id: 1560,
            checked: true
        },
        {
            name: 'living room TV',
            id: 1113,
            checked: true
        },
        {
            name: 'dryer',
            id: 1090,
            checked: false
        },
    ];

    $scope.appliances = appliances;

    // Determine if a state change is happening
    $scope.stateChange = (appliance) => {
        Prox.execute_applianceStateChange(appliance);
    };

    // Socket Events
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
            "(Ava) Hello": () => {
                Prox.statement_greeting();
            },
            "(Ava) Who created you": () => {
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
            "(Ava) turn *state the *appliance_name": (state, appliance_name) => {

                console.log(appliance_name, state);

                const appliance = appliances.filter(function(e) {
                    return e.name === appliance_name;
                });

                if (!appliance || appliance === 'undefined' || appliance === null || !appliance.length) {
                    Prox.speak("Hmm.. I couldn't find an appliance with the name " + appliance_name);
                } else {


                    // Add logic for current state
                    // for example
                    // If the 'Living room TV' is already set to off then tell the user
                    // and do nothing
                    // If the states are different then make the change using Prox.execute_applianceStateChange()
                    if (appliance[0].checked === true && state === "on") {
                        Prox.speak("The " + appliance_name + " is already on.")
                    } else if (appliance[0].checked === false && state === "off") {
                        Prox.speak("The " + appliance_name + " is already off.");
                    } else if (state === "on") {
                        appliance[0].checked = true;
                        console.log('state set to on', appliance);
                        Prox.execute_StateChange(state, appliance);
                    } else {
                        appliance[0].checked = false;
                        console.log('state set to off', appliance);
                        Prox.execute_StateChange(state, appliance);
                    }
                }    
            },
            "No": () => {
                Prox.speak(Dictionary.getAcknowledgement());
            },
            "(Ava) How are you (doing)": () => {
                Prox.speak("I'm doing " + Dictionary.getCommonPositiveReply() + ", thanks for asking.");
            },
            "(Ava) Who are you": () => {
                Prox.statement_name();
            },
            "(Ava) I didn't say anything": () => {
                Prox.speak(Dictionary.getShortApology());
            },
            "(Ava) Who am I": () => {
                Prox.question_getUserName();
            },
            "(Ava) What's your name": () => {
                Prox.speak("I am Ava");
            },
            "(Ava) How old are you": () => {
                Prox.statement_age();
            },
            "(Ava) I'm :age years old": (age) => {
                Prox.statement_setUserAge(age);
            },
            "(Ava) How old am I": () => {
                Prox.question_getUserAge();
            },
            "(Ava) My name is *name": (name) => {
                Prox.statement_setUserName(name);
            },
            "(Ava)I live in :city :state": function(city, state) {
                console.log(city, state);
                Prox.statement_setUserLocation(city, state);
            },
            "(Ava) Shut up": () => {
                Prox.speak("Well, that was rude...");
            },
            "(Ava) Stop talking": () => { 
                Prox.stop();
            },
            "(Ava) Where do I live": () => {
                Prox.statement_getUserHome();
            },
            "(Ava) What's my name": () => {
                Prox.question_getUserName();
            },
            "(Ava) Erase everything (please)": () => {
                Prox.settings_clearAll();
            },
            "Yes": () => {
                Prox.execute_currentTask();
            },
            "(Ava) Thanks (Ava)": () => {
                Prox.speak(Dictionary.getAcknowledgement());
            },
            "(Ava) hank you": () => {
                Prox.speak(Dictionary.getAcknowledgement());
            },
            "(Ava) How did you know that (Ava) ": () => {
                Prox.speak("You've told me.");
            },
            "(Ava) Pick a (random) number between :n1 and :n2": (n1, n2) => {
                Prox.statement_getRandomNumber(n1, n2);
            },
            "(Ava) enter diagnostics": () => {
                Prox.speak("Entering diagnostics mode...");
                $state.go('diagnostics');
            },
            "(Ava) how much *energy_type have I used this month": (energy_type) => {
                Prox.query_energyConsumption(energy_type);
            }
        };
    
        // Logging
        annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
            const completePhrase = {
                user_said: userSaid,
                command_text: commandText,
                phrases: phrases,
                matched: true,
                date_created: Time.now()
            };

            Diagnostics.createNewLog(completePhrase);
        });

        annyang.addCallback('resultNoMatch', function(userSaid, commandText, phrases) {
            Prox.speak("Hmm, I'm not sure I understood what you meant.");
            const completePhrase = {
                user_said: userSaid,
                command_text: 'N/A',
                phrases: phrases,
                matched: false,
                date_created: Time.now()
            };

            Diagnostics.createNewLog(completePhrase);
        });

        // Register all commands with Ava
        // Start listening
        annyang.addCommands(commands);
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
