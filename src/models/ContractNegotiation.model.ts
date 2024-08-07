import { model, Schema } from 'mongoose';

const ContractNegotiationSchema = new Schema(
  {
    providerPid: {
      type: String,
    },
    consumerPid: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true },
);

export const ContractNegotiationModel = model(
  'ContractNegotiation',
  ContractNegotiationSchema,
);
