import { Request, Response, NextFunction } from 'express';
import contractNegotiationDbService from '../services/contract-negotiation-db.service';
import { ContractNegotiation } from '../classes/ContractNegotiation.class';
import { Error404 } from '../classes/Error404.class';

/**
 * Retrieves a contract negotiation using the providerPid
 *
 * @see
 * https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.binding.https#id-2.1-the-negotiations-endpoint-provider-side
 */
export const getContractNegotiation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providerPid = req.params.providerPid;
    const cn =
      await contractNegotiationDbService.getContractNegotiationFromProviderPid({
        providerPid,
      });

    if (!cn) {
      throw new Error404({ req, res });
    }

    res.status(200).json(new ContractNegotiation(cn).toJSON());
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the reception of a contract negotiation request
 * from a consumer following the IDS negotiation protocol.
 *
 * @note
 * In this mvp, we are not handling the case where this processing
 * could make the contract negotiation state transition to "TERMINATED".
 *
 * @see
 * https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.binding.https#id-2.2-the-negotiations-request-endpoint-provider-side
 */
export const handleContractNegotiationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const message = req.body;

    let cn = null;

    if (message['dspace:providerPid']) {
      cn =
        await contractNegotiationDbService.getContractNegotiationFromProviderPid(
          {
            providerPid: message['dspace:providerPid'],
          },
        );
      if (!cn) throw new Error404({ req, res });
    } else {
      cn = await contractNegotiationDbService.createContractNegotiation({
        consumerPid: message['dspace:consumerPid'],
        state: IDSA.NegotiationState['dspace:REQUESTED'],
      });
    }

    res
      .status(201)
      .json(
        await contractNegotiationDbService.getContractNegotiationMessageFromDocumentId(
          cn.id,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * Handles a consumer making an Offer by POSTing a Contract Request Message
 *
 * The specification does not define a specific response body for this
 * operation and states that clients are not required to process it, but
 * will return a 200 response if successfully processed.
 *
 * @note
 * For the context of this MVP, the processing of the offer is to
 * change the state of the CN to be REQUESTED.
 *
 * @see
 * https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.binding.https#id-2.3-the-negotiations-providerpid-request-endpoint-provider-side
 */
export const handleContractNegotiationOfferRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providerPid = req.params.providerPid;
    const cn =
      await contractNegotiationDbService.getContractNegotiationFromProviderPid({
        providerPid,
      });
    if (cn.state !== IDSA.NegotiationState['dspace:OFFERED'].toString()) {
      cn.state = IDSA.NegotiationState['dspace:REQUESTED'].toString();
      await cn.save();
    }

    res.status(200).json(new ContractNegotiation(cn).toJSON());
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the reception of a ContractNegotiationEventMessage sent
 * by a consumer to accept the Provider's Offer.
 *
 * @note
 * For the simplicity of this MVP, we suppose that the provider
 * simply transitions the state to ACCEPTED.
 *
 * @see https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.binding.https#id-2.4-the-negotiations-providerpid-events-endpoint-provider-side
 */
export const handleContractNegotiationEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providerPid = req.params.providerPid;
    const cn =
      await contractNegotiationDbService.getContractNegotiationFromProviderPid({
        providerPid,
      });

    // TODO: Implement the verification of who initiated the Offer
    // Which would respond with a 400 response with a contract negotiation error body

    cn.state = IDSA.NegotiationState['dspace:ACCEPTED'].toString();

    res.status(200).json(new ContractNegotiation(cn).toJSON());
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the reception of a ContractAgreementVerificationMessage sent
 * by a consumer to verify the acceptance of an Agreement.
 *
 * Resulting states can be VERIFIED or TERMINATED.
 *
 * @see https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.protocol#id-2.4-contract-agreement-verification-message
 */
export const handleContractAgreementVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providerPid = req.params.providerPid;
    const cn =
      await contractNegotiationDbService.getContractNegotiationFromProviderPid({
        providerPid,
      });

    cn.state = IDSA.NegotiationState['dspace:VERIFIED'].toString();
    await cn.save();

    res.status(200).json(new ContractNegotiation(cn).toJSON());
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the termination of a contract negotiation sent by the consumer.
 *
 * @see
 * https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.binding.https#id-2.6-the-negotiations-providerpid-termination-endpoint-provider-side
 */
export const handleContractNegotiationTermination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providerPid = req.params.providerPid;
    const cn =
      await contractNegotiationDbService.getContractNegotiationFromProviderPid({
        providerPid,
      });

    cn.state = IDSA.NegotiationState['dspace:TERMINATED'].toString();
    await cn.save();

    res.status(200).json(new ContractNegotiation(cn).toJSON());
  } catch (error) {
    next(error);
  }
};
