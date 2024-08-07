namespace IDSA {
  interface INegotiationMessageContext {
    '@context': 'https://w3id.org/dspace/2024/1/context.json';
    'dspace:providerPid': string;
    'dspace:consumerPid': string;
  }

  export enum NegotiationState {
    'dspace:REQUESTED',
    'dspace:OFFERED',
    'dspace:ACCEPTED',
    'dspace:AGREED',
    'dspace:VERIFIED',
    'dspace:FINALIZED',
    'dspace:TERMINATED',
  }

  // ref: https://github.com/International-Data-Spaces-Association/ids-specification/blob/main/negotiation/message/schema/contract-agreement-message-schema.json
  export interface IContractAgreementMessage
    extends INegotiationMessageContext {
    '@type': 'dspace:ContractAgreementMessage';
    'dspace:agreement': IDSA.IAgreement;
    'dspace:callback': string;
  }

  // ref: https://github.com/International-Data-Spaces-Association/ids-specification/blob/main/negotiation/message/schema/contract-agreement-verification-message-schema.json
  export interface IContractAgreementVerificationMessage
    extends INegotiationMessageContext {
    '@type': 'dspace:ContractAgreementVerificationMessage';
  }

  // ref: https://github.com/International-Data-Spaces-Association/ids-specification/blob/main/negotiation/message/schema/contract-negotiation-event-message-schema.json
  export interface IContractNegotiationEventMessage
    extends INegotiationMessageContext {
    '@type': 'dspace:ContractNegotiationEventMessage';
    'dspace:eventType': ('dspace:ACCEPTED' | 'dspace:FINALIZED')[];
  }

  // ref: https://github.com/International-Data-Spaces-Association/ids-specification/blob/main/negotiation/message/schema/contract-negotiation-error-schema.json
  export interface IContractNegotiationError
    extends INegotiationMessageContext {
    '@type': 'dspace:ContractNegotiationError';
    'dspace:code'?: string;
    'dspace:reason'?: any[];
    'dct:description'?: MultilanguageProperty[];
  }

  // ref: https://github.com/International-Data-Spaces-Association/ids-specification/blob/main/negotiation/message/schema/contract-negotiation-schema.json
  export interface IContractNegotiation extends INegotiationMessageContext {
    '@type': 'dspace:ContractNegotiation';
    'dspace:state': NegotiationState;
  }

  // ref: https://github.com/International-Data-Spaces-Association/ids-specification/blob/main/negotiation/message/schema/contract-negotiation-termination-message-schema.json
  export interface IContractNegotiationTerminationMessage
    extends INegotiationMessageContext {
    '@type': 'dspace:ContractNegotiationTerminationMessage';
    'dspace:code'?: string;
    'dspace:reason'?: object[];
  }

  // ref: https://github.com/International-Data-Spaces-Association/ids-specification/blob/main/negotiation/message/schema/contract-offer-message-schema.json
  export interface IContractOfferMessage
    extends Omit<INegotiationMessageContext, 'dspace:consumerPid'> {
    '@type': 'dspace:ContractOfferMessage';
    'dspace:consumerPid'?: string;
    'dspace:offer': IDSA.IMessageOffer;
    'dspace:callbackAddress': string;
  }

  // ref: https://github.com/International-Data-Spaces-Association/ids-specification/blob/main/negotiation/message/schema/contract-request-message-schema.json
  // This is the same schema as IContractOfferMessage
  export interface IContractRequestMessage extends IContractOfferMessage {}

  export interface MultilanguageProperty {
    '@language': string;
    '@value': string;
  }
}
