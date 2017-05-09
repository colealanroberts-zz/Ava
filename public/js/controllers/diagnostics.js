prox.controller("DiagnosticsController", function($scope, $state, Prox, Diagnostics) {
    $scope.logs = Diagnostics.getAllSpokenLogs();

    if (annyang) {
        var commands = {
            "(Ava) exit diagnostics": () => {
                Prox.speak("Returning to dashboard");
                $state.go('home');
            },
            "(Ava) refresh diagnostics": () => {
                Prox.speak("Refreshing all logs...");
                $scope.logs = Diagnostics.getAllSpokenLogs();
            },
            "(Ava) erase all logs": () => {
                Prox.speak("As you wish...");
                Diagnostics.eraseAll();
                $scope.logs = Diagnostics.getAllSpokenLogs();
            }
        }

        // Watch the values that are being saved to localStorage
        // and update accordingly
        $scope.$watch(() => {
            return Diagnostics.getAllSpokenLogs();
        }, (newVal, oldVal) => {
            $scope.logs = newVal;
        }, true);
    
        // Register dev commands
        annyang.addCommands(commands);
        annyang.start({autoRestart: true, continuous: true});
    }
});