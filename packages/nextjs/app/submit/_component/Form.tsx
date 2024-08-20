"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useSignTypedData } from "wagmi";
import { CreateNewSubmissionBody } from "~~/app/api/submissions/route";
import { EIP_712_DOMAIN, EIP_712_TYPES__SUBMISSION } from "~~/utils/eip712";
import { postMutationFetcher } from "~~/utils/react-query";
import { notification } from "~~/utils/scaffold-eth";

const MAX_DESCRIPTION_LENGTH = 750;
const MAX_FEEDBACK_LENGTH = 750;

const Form = () => {
  const { address: connectedAddress } = useAccount();
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [feedbackLength, setFeedbackLength] = useState(0);
  const { signTypedDataAsync } = useSignTypedData();
  const router = useRouter();
  const { mutateAsync: postNewSubmission } = useMutation({
    mutationFn: (newSubmission: CreateNewSubmissionBody) =>
      postMutationFetcher("/api/submissions", { body: newSubmission }),
  });

  const clientFormAction = async (formData: FormData) => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    try {
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const linkToRepository = formData.get("linkToRepository") as string;
      const linkToVideo = formData.get("linkToVideo") as string;
      if (!title || !description || !linkToRepository || !linkToVideo) {
        notification.error("Please fill all the required fields");
        return;
      }

      const telegram = formData.get("telegram") as string;
      const feedback = formData.get("feedback") as string;

      const signature = await signTypedDataAsync({
        domain: EIP_712_DOMAIN,
        types: EIP_712_TYPES__SUBMISSION,
        primaryType: "Message",
        message: {
          title,
          description,
          telegram,
          linkToRepository,
          linkToVideo,
          feedback,
        },
      });

      await postNewSubmission({
        title,
        description,
        telegram,
        linkToRepository,
        linkToVideo,
        feedback,
        signature,
        builder: connectedAddress,
      });

      notification.success("Extension submitted successfully!");
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
    <div className="card w-[95%]">
      <form action={clientFormAction} className="card-body space-y-2 p-0 md:p-2">
        <div className="space-y-1">
          <p className="m-0 text-lg">Title *</p>
          <div className="flex border-2 border-base-300 bg-base-200 text-accent">
            <input
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-gray-300 text-gray-700"
              placeholder="Extension title"
              name="title"
              autoComplete="off"
              type="text"
              maxLength={75}
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="m-0 text-lg">Description *</p>
          <div className="flex flex-col border-2 border-base-300 bg-base-200 text-accent">
            <textarea
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 px-4 pt-2 border w-full font-medium placeholder:text-gray-300 text-gray-700 h-28 md:h-52 rounded-none"
              placeholder="Extension description"
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
        <div className="space-y-1">
          <p className="m-0 text-lg">Your Telegram handle</p>
          <div className="flex border-2 border-base-300 bg-base-200 text-accent">
            <input
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-gray-300 text-gray-700"
              placeholder="@username"
              name="telegram"
              autoComplete="off"
              type="text"
              maxLength={75}
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="m-0 text-lg">Repository URL *</p>
          <div className="flex border-2 border-base-300 bg-base-200 text-accent">
            <input
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-gray-300 text-gray-700"
              placeholder="https://"
              name="linkToRepository"
              autoComplete="off"
              type="text"
              maxLength={75}
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="m-0 text-lg">Project video link *</p>
          <div className="flex border-2 border-base-300 bg-base-200 text-accent">
            <input
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-gray-300 text-gray-700"
              placeholder="https://"
              name="linkToVideo"
              autoComplete="off"
              type="text"
              maxLength={75}
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="m-0 text-lg">What would you improve about the SE-2 extension system?</p>
          <div className="flex flex-col border-2 border-base-300 bg-base-200 text-accent">
            <textarea
              className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 px-4 pt-2 border w-full font-medium placeholder:text-gray-300 text-gray-700 h-28 md:h-52 rounded-none"
              name="feedback"
              autoComplete="off"
              maxLength={MAX_FEEDBACK_LENGTH}
              onChange={e => setFeedbackLength(e.target.value.length)}
            />
            <p className="my-1">
              {feedbackLength} / {MAX_FEEDBACK_LENGTH}
            </p>
          </div>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default Form;
