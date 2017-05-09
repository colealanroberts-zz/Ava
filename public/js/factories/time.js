prox.factory('Time', () => {
    const self = {
        now: () => {
            const d = new Date(),
                now = d.getTime();

            return now;
        }
    }

    return self;
});