prox.factory('Dictionary', () => {

    const self = {
        getSelfReference: () => {
            var selfRefs = ["I", "I've"],
                ref = selfRefs[Math.floor(Math.random() * selfRefs.length)];

            return ref;
        },
        getAcknowledgement: () => {
            var acknowlegements = ["Okay", "Sure", "Right", "As you wish", "Of course", "No problem", "It was my pleasure", "My pleasure", "Absolutely", "Sure thing"],
                ack = acknowlegements[Math.floor(Math.random() * acknowlegements.length)];

            return ack;
        },
        getChoice: () => {
            var utterances = ["I've picked", "I've chosen", "I chose at random", "I drew", "I came up with"],
                utterance = utterances[Math.floor(Math.random() * utterances.length)];

            return utterance;
        },
        getCompliment: () => {
            var compliments = ["nice", "good", "great"],
                compliment = compliments[Math.floor(Math.random() * compliments.length)];

            return compliment;
        },
        getInquisitive: () => {
            var inquisitives = ["Hmm...", "Umm...", "Let me think..."],
                inquisitve = inquisitives[Math.floor(Math.random() * inquisitives.length)];

            return inquisitve;
        },
        getCommonPositiveReply: () => {
            var replies = ["well", "good", "great", "excellent", "fantastic"],
                reply = replies[Math.floor(Math.random() * replies.length)];

            return reply;
        },
        getShortApology: () => {
            var apologies = ["I'm sorry", "I apologize", "That's my fault", "My mistake", "My fucking bad"],
                apology = apologies[Math.floor(Math.random() * apologies.length)];

            return apology;
        },
    };

    return self;
});