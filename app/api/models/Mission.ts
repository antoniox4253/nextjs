import { Schema, model, models } from "mongoose";

const MissionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dailyMissions: [{
    missionId: String,
    progress: Number,
    completed: Boolean,
    claimed: Boolean,
    completedAt: Date
  }],
  lastReset: { type: Date, default: Date.now },
});

export default models.Mission || model("Mission", MissionSchema); 