const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalBudget: { type: String, required: true },
  coreUsed: { type: Number, default: 0 },
  capacityUsed: { type: Number, default: 0 },
  planExpiry: { type: String, required: true },
  status: { type: String, default: 'On Track' }
}, { timestamps: true });

module.exports = mongoose.model('Participant', participantSchema);