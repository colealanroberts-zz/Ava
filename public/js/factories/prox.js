prox.factory('Prox', (localStorageService, Dictionary, Electric) => {
    const self = {
        speak: (msg) => {
            responsiveVoice.speak(msg);
        },
        query_energyConsumption: (energy_type) => {
            if (energy_type === "electricity") {
                const consumption = Electric.getTotalConsumption();
                self.speak("So far you've used" + consumption + "kilowatts this month.");
            }
        },
        query_localStorageService: (val) => {
            var v = localStorageService.get(val);

            if (!v) {
                console.log("The value for" + val + ". Wasn't found.");
            }

            return v;
        },
        stop: () => {
            responsiveVoice.pause();
        },
        execute_StateChange: (state, appliance_obj) => {
            const appliance = appliance_obj[0];

            if (!appliance.checked) {
                self.speak(Dictionary.getAcknowledgement() + ". I've turned off the " + appliance.name + ".")
            } else {
                self.speak(Dictionary.getAcknowledgement() + ". I've turned the " + appliance.name + " on.");
            }
        },
        execute_currentTask: () => {
            console.log('executing...');
            self.speak(Dictionary.getAcknowledgement() + "I've done that!");
        },
        statement_welcomeUserHome: () => {
            var name = localStorageService.get('user_name');

            if (name) {
                self.speak("Welcome home, " + name);
            }
        },
        statement_greeting: () => {
            self.speak("Hello");
        },
        statement_age: () => {
            self.speak("I am eight hours old.");
        },
        statement_name: () => {
            const creator = "Cole Roberts";

            var username_active = self.query_localStorageService('user_name');

            if (!username_active || username_active !== creator) {
                self.speak("I am Ava. I was built in a weekend by Cole Roberts");
            } else {
                self.speak("I am Ava. You created me");
            }
        },
        question_getUserName: () => {
            var name = self.query_localStorageService('user_name');

            if (!name) {
                self.speak("Hmm.. I don't think you've told me. If you tell me your name, I'll remember it.");
            } else {
                self.speak("Your name is, " + name);
            }
        },
        question_getUserAge: () => {
            
            var age = self.query_localStorageService('user_age');

            if (!age) {
                self.speak(Dictionary.getInquisitive() + ". I don't think you've told me your age.");
            } else {
                self.speak("You are, " + age);
            }
        },
        statement_setUserAge: (age) => {
            self.speak("I'll remember that you're, " + age);
            var didSet = localStorageService.set('user_age', age);
            console.log(didSet);
        },
        statement_getUserHome: () => {
            var city = self.query_localStorageService('user_location');

            if (!city) {
                self.speak("I actually have no idea where you live...");
            } else {
                self.speak("You live in " + city);
            }
        },
        statement_setUserName: (name) => {
            self.speak("It's " + Dictionary.getCompliment() + " to meet you, " + name);
            var didSet = localStorageService.set('user_name', name);
        },
        statement_getRandomNumber(n1, n2) {

            // Convert the spoken arguments
            // to a number
            var min = ~~n1,
                max = ~~n2;

            function getRandomArb(min, max) {

                min = min || ~~n1;
                max = max || ~~n2;
                
                return Math.floor(Math.random() * (max - min)) + min;
            }

            var val = getRandomArb(min, max);

            self.speak(Dictionary.getAcknowledgement() + ", the number " + Dictionary.getChoice() + " is " + val);
        },
        statement_setUserLocation(city, state) {
            city = city || 'Planet',
            state = state || 'Earth';

            var location = city + state;

            var didSet = localStorageService.set('user_location', location);
            self.speak(Dictionary.getSelfReference() + " heard it's " + Dictionary.getCompliment() + " there.");
        },
        settings_clearAll: () => {
            var completed = localStorageService.clearAll();

            if (completed) {
                self.speak(Dictionary.getAcknowledgement() + ". I've deleted all of our conversations");
            }
        }
    }

    return self;
});