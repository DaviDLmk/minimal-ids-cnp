import { ContractNegotiation } from '../classes/ContractNegotiation.class';
import { ContractNegotiationModel } from '../models/ContractNegotiation.model';
import { v4 as uuid } from 'uuid';

/**
 * Service that handles the database operations for ContractNegotiation
 */
class ContractNegotiationDBService {
  private static instance: ContractNegotiationDBService;

  constructor() {}

  public static getInstance(): ContractNegotiationDBService {
    if (!ContractNegotiationDBService.instance) {
      ContractNegotiationDBService.instance =
        new ContractNegotiationDBService();
    }

    return ContractNegotiationDBService.instance;
  }

  /**
   * Get the mapped property name in the database
   */
  public getMappedIDSToDBProperty(
    idsProperty:
      | 'dspace:providerPid'
      | 'dspace:consumerPid'
      | 'dspace:negotiationState',
  ) {
    switch (idsProperty) {
      case 'dspace:providerPid':
        return 'providerPid';
      case 'dspace:consumerPid':
        return 'consumerPid';
      case 'dspace:negotiationState':
        return 'state';
      default:
        throw new Error('Property not found');
    }
  }

  public async getContractNegotiationFromProviderPid({
    providerPid,
  }: {
    providerPid: string;
  }) {
    const cn = await ContractNegotiationModel.findOne({
      providerPid,
    });

    return cn;
  }

  public async getContractNegotiationFromConsumerPid({
    consumerPid,
  }: {
    consumerPid: string;
  }) {
    const cn = await ContractNegotiationModel.findOne({
      consumerPid,
    });

    return cn;
  }

  public async createContractNegotiation({
    consumerPid,
    state,
  }: {
    consumerPid: string;
    state: IDSA.NegotiationState;
  }) {
    const cn = new ContractNegotiationModel({
      providerPid: this.generateContractNegotiationPid(),
      consumerPid,
      state,
    });

    await cn.save();
    return cn;
  }

  public async getContractNegotiationMessageFromDocumentId(documentId: string) {
    const cn = await ContractNegotiationModel.findOne({ documentId });
    return new ContractNegotiation(cn).toJSON();
  }

  private generateContractNegotiationPid() {
    return 'urn:uuid:' + uuid();
  }
}

export default ContractNegotiationDBService.getInstance();
