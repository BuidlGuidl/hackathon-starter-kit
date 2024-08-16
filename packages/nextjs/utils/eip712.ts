export const EIP_712_DOMAIN = {
  name: "Scaffold-ETH 2 Extensions Hackathon",
  version: "1",
} as const;

export const EIP_712_TYPES__SUBMISSION = {
  Message: [
    { name: "title", type: "string" },
    { name: "description", type: "string" },
    { name: "linkToRepository", type: "string" },
    { name: "telegram", type: "string" },
    { name: "linkToVideo", type: "string" },
    { name: "feedback", type: "string" },
  ],
} as const;
