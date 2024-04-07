const { Thought, User } = require('../models');

module.exports = {
    // Create a new thought and associate it with a user
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id } },
                { new: true, runValidators: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
                .select('-__v')
                .sort({ createdAt: -1 });
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get a single thought by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID found.' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $set: req.body },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID found.' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID found.' });
            }
            await User.findByIdAndUpdate(
                thought.userId,
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID found.' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID found.' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
