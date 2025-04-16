import mongoose from 'mongoose';
import { Category } from '@/lib/types';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'Food',
      'Transportation',
      'Housing',
      'Entertainment',
      'Shopping',
      'Healthcare',
      'Education',
      'Utilities',
      'Other'
    ]
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  }
}, {
  timestamps: true
});

export default mongoose.models.Budget || mongoose.model('Budget', budgetSchema);