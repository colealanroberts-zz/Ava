prox.factory('Diagnostics', (localStorageService) => {
    const self = {
        getAllSpokenLogs: () => {
            return localStorageService.get('user_spoken_logs');
        },
        createNewLog: (log) => {

            // Check to see if any spoken log exists
            // If it does create a new temporary array 
            // and then push the new log object to it
            var tmpLogsArr = self.getAllSpokenLogs();

            // This will only run once
            if (tmpLogsArr) {
                var logsArr = tmpLogsArr.slice();
                logsArr.push(log);
                localStorageService.set('user_spoken_logs', logsArr);
            } else {
                var logs = [];
                logs.push(log);
                localStorageService.set('user_spoken_logs', logs);
            }
        },
        eraseAll: () => {
            return localStorageService.remove('user_spoken_logs');
        }
    };

    return self;
});