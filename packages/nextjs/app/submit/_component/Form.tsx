"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import useSWRMutation from "swr/mutation";
import { useAccount, useSignTypedData } from "wagmi";
import { EIP_712_DOMAIN, EIP_712_TYPES__SUBMISSION } from "~~/utils/eip712";
import { notification } from "~~/utils/scaffold-eth";
import { postMutationFetcher } from "~~/utils/swr";

// TODO: move to a shared location
type ReqBody = {
  title?: string;
  description?: string;
  linkToRepository?: string;
  signature?: `0x${string}`;
  signer?: string;
};

const MAX_DESCRIPTION_LENGTH = 750;

const Form = () => {
  const { address: connectedAddress } = useAccount();
  const [descriptionLength, setDescriptionLength] = useState(0);
  const { signTypedDataAsync } = useSignTypedData();
  const router = useRouter();
  const { trigger: postNewGrant } = useSWRMutation("/api/submissions", postMutationFetcher<ReqBody>);

  const clientFormAction = async (formData: FormData) => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    try {
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const linkToRepository = formData.get("linkToRepository") as string;
      if (!title || !description || !linkToRepository) {
        notification.error("Please fill all the fields");
        return;
      }

      const signature = await signTypedDataAsync({
        domain: EIP_712_DOMAIN,
        types: EIP_712_TYPES__SUBMISSION,
        primaryType: "Message",
        message: {
          title: title,
          description: description,
          linkToRepository: linkToRepository,
        },
      });

      await postNewGrant({ title, description, linkToRepository, signature, signer: connectedAddress });

      notification.success("Proposal submitted successfully!");
      router.push("/");
    } catch (error: any) {
      if (error instanceof Error) {
        notification.error(error.message);
        return;
      }
      notification.error("Something went wrong");
    }
  };

  return (
    <div className="card card-compact rounded-xl max-w-[95%] w-[500px] bg-secondary shadow-lg mb-12">
      <form action={clientFormAction} className="card-body space-y-3">
        <h2 className="card-title self-center text-3xl !mb-0">Submit Proposal</h2>
        <div className="space-y-2">
          <p className="m-0 text-xl ml-2">Title</p>
          <div className="flex border-2 border-base-300 bg-base-200 rounded-xl text-accent">
            <input
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
              placeholder="Proposal title"
              name="title"
              autoComplete="off"
              type="text"
              maxLength={75}
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="m-0 text-xl ml-2">Description</p>
          <div className="flex flex-col border-2 border-base-300 bg-base-200 rounded-xl text-accent">
            <textarea
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 px-4 pt-2 border w-full font-medium placeholder:text-accent/50 text-gray-400 h-28 md:h-52 rounded-none"
              placeholder="Proposal description"
              name="description"
              autoComplete="off"
              maxLength={MAX_DESCRIPTION_LENGTH}
              onChange={e => setDescriptionLength(e.target.value.length)}
            />
            <p className="my-1">
              {descriptionLength} / {MAX_DESCRIPTION_LENGTH}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="m-0 text-xl ml-2">Repository URL</p>
          <div className="flex border-2 border-base-300 bg-base-200 rounded-xl text-accent">
            <input
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
              placeholder="https://"
              name="linkToRepository"
              autoComplete="off"
              type="text"
              maxLength={75}
            />
          </div>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default Form;
