import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { clearEligible, setEligible } from "~~/services/database/repositories/submissions";
import { authOptions } from "~~/utils/auth";

export async function POST(req: NextRequest, { params }: { params: { submissionId: number } }) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "admin") {
      return NextResponse.json({ error: "Only admins can set eligible" }, { status: 401 });
    }
    const { submissionId } = params;

    const { eligible, clear } = (await req.json()) as { eligible: boolean; clear: boolean };

    if (!session.user.address) {
      return NextResponse.json({ error: "Invalid admin address" }, { status: 400 });
    }

    const builderId = session.user.address;

    if (clear) {
      await clearEligible(submissionId);

      return NextResponse.json({ message: "Eligible deleted!" }, { status: 200 });
    } else {
      await setEligible(submissionId, eligible, builderId);

      return NextResponse.json({ message: `Eligible set to ${eligible}` }, { status: 201 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error processing form" }, { status: 500 });
  }
}
