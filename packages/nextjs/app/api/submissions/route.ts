import { NextResponse } from "next/server";
import { recoverTypedDataAddress } from "viem";
import { createBuilder, getBuilderById } from "~~/services/database/repositories/builders";
import { createSubmission, getAllSubmissions } from "~~/services/database/repositories/submissions";
import { SubmissionInsert } from "~~/services/database/repositories/submissions";
import { EIP_712_DOMAIN, EIP_712_TYPES__SUBMISSION } from "~~/utils/eip712";

export async function GET() {
  try {
    const grants = await getAllSubmissions();
    return NextResponse.json(grants);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching submissions" }, { status: 500 });
  }
}

export type CreateNewSubmissionBody = SubmissionInsert & { signature: `0x${string}`; signer: string };

export async function POST(req: Request) {
  try {
    const { title, description, linkToRepository, signature, signer } = (await req.json()) as CreateNewSubmissionBody;

    if (
      !title ||
      !description ||
      !linkToRepository ||
      !signature ||
      !signer ||
      description.length > 750 ||
      title.length > 75
    ) {
      return NextResponse.json({ error: "Invalid form details submitted" }, { status: 400 });
    }

    const recoveredAddress = await recoverTypedDataAddress({
      domain: EIP_712_DOMAIN,
      types: EIP_712_TYPES__SUBMISSION,
      primaryType: "Message",
      message: { title, description, linkToRepository },
      signature: signature,
    });

    if (recoveredAddress !== signer) {
      return NextResponse.json({ error: "Recovered address did not match signer" }, { status: 401 });
    }

    const builder = await getBuilderById(signer);

    if (!builder) {
      await createBuilder({ id: signer, role: "user" });
    }

    const submission = await createSubmission({
      title: title,
      description: description,
      linkToRepository: linkToRepository,
      builder: signer,
    });

    return NextResponse.json({ submission }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error processing form" }, { status: 500 });
  }
}
