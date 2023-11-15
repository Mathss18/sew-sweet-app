import api from "./api.service";

export type CreateEsimateProductVariation = {
  variationId: number;
  variationOptionId: number;
};

export type CreateEtimateParams = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompanyName: string;
  clientSegment?: string | null;
  clientFile?: string | null;
  clientMessage?: string | null;
  productId: number;
  quantity: number;
  estimateProductVariations?: CreateEsimateProductVariation[];
};

export type AcceptEstimateParams = {
  nonce: string;
  price: number;
};

export type DeclineEstimateParams = {
  nonce: string;
  reason: string;
};

const estimateService = {
  create: (data: CreateEtimateParams) => api.post("estimates/create", data),
  getOneByNonce: (nonce: string) => api.get(`estimates/nonce/${nonce}`),
  ack: (nonce: string) => api.get(`estimates/ack/${nonce}`),
  accept: ({ nonce, price }: AcceptEstimateParams) => api.post(`estimates/accept`, { nonce, price }),
  decline: ({ nonce, reason }: DeclineEstimateParams) => api.post(`estimates/decline`, { nonce, reason }),
};

export default estimateService;
