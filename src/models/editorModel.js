import mongoose from "mongoose";

const editorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      firstName: { type: String },
      lastName: { type: String },
      bio: { type: String },
      // Other editor-specific fields
    },
    // Other editor-specific fields or associations
  creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Creator' }]
  }, { timestamps: true });

const Editor = mongoose.models.editors || mongoose.model("editors", editorSchema);

export default Editor;
