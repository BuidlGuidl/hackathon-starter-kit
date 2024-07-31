export const EIP_712_DOMAIN = {
  name: "Scaffold-ETH 2 Extensions Hackathon",
  version: "1",
} as const;

export const EIP_712_TYPES__SUBMISSION = {
  Message: [
    { name: "title", type: "string" },
    { name: "description", type: "string" },
    { name: "linkToRepository", type: "string" },
  ],
} as const;

export const EIP_712_TYPES__EDIT_GRANT = {
  Message: [
    ...EIP_712_TYPES__SUBMISSION.Message,

    { name: "grantId", type: "string" },
    { name: "askAmount", type: "string" },
    { name: "private_note", type: "string" },
  ],
} as const;

export const EIP_712_TYPES__REVIEW_GRANT = {
  Message: [
    { name: "grantId", type: "string" },
    { name: "action", type: "string" },
    { name: "txHash", type: "string" },
    { name: "txChainId", type: "string" },
  ],
} as const;

export const EIP_712_TYPES__REVIEW_GRANT_WITH_NOTE = {
  Message: [...EIP_712_TYPES__REVIEW_GRANT.Message, { name: "note", type: "string" }],
} as const;

export const EIP_712_TYPES__SUBMIT_GRANT = {
  Message: [
    { name: "grantId", type: "string" },
    { name: "action", type: "string" },
    { name: "link", type: "string" },
  ],
} as const;

export const EIP_712_TYPES__REVIEW_GRANT_BATCH = {
  GrantReview: EIP_712_TYPES__REVIEW_GRANT.Message,
  Message: [{ name: "reviews", type: "GrantReview[]" }],
} as const;

export const EIP_712_TYPES__ADMIN_SIGN_IN = {
  Message: [
    { name: "action", type: "string" },
    { name: "description", type: "string" },
  ],
};
