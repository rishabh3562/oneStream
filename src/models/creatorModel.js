import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        firstName: String,
        lastName: String,
        bio: String,
    },
    editors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editor'
    }]
}, { timestamps: true });

const Creator = mongoose.models.creators || mongoose.model("creators", creatorSchema);

export default Creator;
