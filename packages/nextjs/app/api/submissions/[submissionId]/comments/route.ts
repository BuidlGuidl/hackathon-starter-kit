import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createComment } from "~~/services/database/repositories/comments";
import { authOptions } from "~~/utils/auth";

export async function POST(req: NextRequest, { params }: { params: { submissionId: number } }) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "admin") {
      return NextResponse.json({ error: "Only admins can add comments" }, { status: 401 });
    }
    const { submissionId } = params;

    const { comment } = (await req.json()) as { comment: string };

    if (!comment || comment.length > 255) {
      return NextResponse.json({ error: "Invalid comment submitted" }, { status: 400 });
    }

    if (!session.user.address) {
      return NextResponse.json({ error: "Invalid admin address" }, { status: 400 });
    }

    const newComment = await createComment({
      comment,
      submission: submissionId,
      builder: session.user.address,
    });

    return NextResponse.json({ newComment }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error processing form" }, { status: 500 });
  }
}
