const users = [
    {
        username: "JaneDoe",
        email: "janedoe@example.com",
    },
    {
        username: "JohnSmith",
        email: "johnsmith@example.com",
    },
    {
        username: "AlexRiley",
        email: "alexriley@example.com",
    },
];

const thoughts = [
    {
        thoughtText: "What a beautiful day to code!",
        username: "JaneDoe",
        reactions: [
            {
                reactionBody: "Absolutely! Love coding days!",
                username: "JohnSmith",
            },
            {
                reactionBody: "Couldn't agree more!",
                username: "AlexRiley",
            },
        ],
    },
    {
        thoughtText: "MongoDB is pretty cool for NoSQL!",
        username: "JohnSmith",
        reactions: [
            {
                reactionBody: "Yes, it's very flexible!",
                username: "JaneDoe",
            },
        ],
    },
    {
        thoughtText: "Express makes server setup so easy.",
        username: "AlexRiley",
        reactions: [
            {
                reactionBody: "True, it's very intuitive.",
                username: "JaneDoe",
            },
            {
                reactionBody: "Yeah, really speeds up development.",
                username: "JohnSmith",
            },
        ],
    },
];

// Simulate reactionId generation as MongoDB would do
const simulateReactionIds = (thoughts) => {
    const { Types } = require('mongoose');
    thoughts.forEach(thought => {
        thought.reactions = thought.reactions.map(reaction => ({
            ...reaction,
            reactionId: new Types.ObjectId(),
        }));
    });
    return thoughts;
};

module.exports = {
    users,
    thoughts: simulateReactionIds(thoughts)
};
