export class ContractNegotiation {
  '@context': 'https://w3id.org/dspace/2024/1/context.json';
  '@type': 'dspace:ContractNegotiation';
  'dspace:providerPid': string;
  'dspace:consumerPid': string;
  'dspace:state': IDSA.NegotiationState;

  constructor(contractNegotiationDocument?: any) {
    if (contractNegotiationDocument) {
      this['dspace:providerPid'] = contractNegotiationDocument.providerPid;
      this['dspace:consumerPid'] = contractNegotiationDocument.consumerPid;
      this['dspace:state'] = contractNegotiationDocument.state;
    }
  }

  toJSON() {
    return {
      '@context': this['@context'],
      '@type': this['@type'],
      'dspace:providerPid': this['dspace:providerPid'],
      'dspace:consumerPid': this['dspace:consumerPid'],
      'dspace:state': this['dspace:state'],
    };
  }
}
