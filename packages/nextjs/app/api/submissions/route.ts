import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { recoverTypedDataAddress } from "viem";
import { createBuilder, getBuilderById } from "~~/services/database/repositories/builders";
import { createSubmission, getAllSubmissions } from "~~/services/database/repositories/submissions";
import { SubmissionInsert } from "~~/services/database/repositories/submissions";
import { authOptions } from "~~/utils/auth";
import { EIP_712_DOMAIN, EIP_712_TYPES__SUBMISSION } from "~~/utils/eip712";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "admin") {
      return NextResponse.json({ error: "Only admins can get all the submissions" }, { status: 401 });
    }
    const grants = await getAllSubmissions();
    return NextResponse.json(grants);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching submissions" }, { status: 500 });
  }
}

export type CreateNewSubmissionBody = SubmissionInsert & { signature: `0x${string}` };

export async function POST(req: Request) {
  try {
    const isSubmissionClosed = true;
    if (isSubmissionClosed) {
      return NextResponse.json({ error: "Submissions are closed" }, { status: 403 });
    }

    const { title, description, telegram, linkToRepository, linkToVideo, feedback, signature, builder } =
      (await req.json()) as CreateNewSubmissionBody;

    if (
      !title ||
      !description ||
      !linkToRepository ||
      !linkToVideo ||
      !signature ||
      !builder ||
      description.length > 750 ||
      (feedback && feedback.length > 750) ||
      title.length > 75
    ) {
      return NextResponse.json({ error: "Invalid form details submitted" }, { status: 400 });
    }

    const recoveredAddress = await recoverTypedDataAddress({
      domain: EIP_712_DOMAIN,
      types: EIP_712_TYPES__SUBMISSION,
      primaryType: "Message",
      message: {
        title,
        description,
        telegram: telegram || "",
        linkToRepository,
        linkToVideo,
        feedback: feedback || "",
      },
      signature: signature,
    });

    if (recoveredAddress !== builder) {
      return NextResponse.json({ error: "Recovered address did not match builder" }, { status: 401 });
    }

    const builderData = await getBuilderById(builder);

    if (!builderData) {
      await createBuilder({ id: builder, role: "user" });
    }

    const submission = await createSubmission({
      title,
      description,
      telegram,
      linkToRepository,
      linkToVideo,
      feedback,
      builder,
    });

    return NextResponse.json({ submission }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error processing form" }, { status: 500 });
  }
}
