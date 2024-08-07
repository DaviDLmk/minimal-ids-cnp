import { Router } from 'express';
import {
  getContractNegotiation,
  handleContractAgreementVerification,
  handleContractNegotiationEvent,
  handleContractNegotiationOfferRequest,
  handleContractNegotiationRequest,
  handleContractNegotiationTermination,
} from '../controllers/negotiations.controller';
import {
  validateContractAgreementVerificationFormat,
  validateContractNegotiationEventFormat,
  validateContractNegotiationRequestFormat,
  verifyProviderPid,
} from './negotiations.middleware';
const router: Router = Router();

//#region Provider Path Bindings
router.get('/:providerPid', verifyProviderPid, getContractNegotiation);

router.post(
  '/request',
  validateContractNegotiationRequestFormat,
  handleContractNegotiationRequest,
);

router.post(
  '/:providerPid/request',
  verifyProviderPid,
  handleContractNegotiationOfferRequest,
);

router.post(
  '/:providerPid/events',
  validateContractNegotiationEventFormat,
  verifyProviderPid,
  handleContractNegotiationEvent,
);

router.post(
  '/:providerPid/agreement/verification',
  validateContractAgreementVerificationFormat,
  verifyProviderPid,
  handleContractAgreementVerification,
);

router.post('/:providerPid/termination', handleContractNegotiationTermination);
//#endregion

// TODO: Consumer Callback Path Bindings

export default router;
