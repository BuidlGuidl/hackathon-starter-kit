import { NextResponse } from "next/server";
import { getSubmissionsByBuilder } from "~~/services/database/repositories/submissions";

export async function GET(request: Request, { params }: { params: { address: string } }) {
  try {
    const { address } = params;

    if (!address) {
      return NextResponse.json({ error: "Address not provided" }, { status: 400 });
    }

    const submissions = await getSubmissionsByBuilder(address);
    return NextResponse.json(submissions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching submissions" }, { status: 500 });
  }
}
