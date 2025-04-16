import mongoose from 'mongoose';
import { Category } from '@/lib/types';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
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
  }
}, {
  timestamps: true
});

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);