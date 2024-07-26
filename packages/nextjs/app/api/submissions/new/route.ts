import { NextResponse } from "next/server";
import { createSubmission } from "~~/services/database/repositories/submissions";

// TODO This should be a POST request
export async function GET() {
  const newSubmission = {
    title: `Submission Title ${Math.random().toString(36).substring(7)}`,
    description: "Description of the new submission",
    builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  };

  try {
    const result = await createSubmission(newSubmission);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating submission" }, { status: 500 });
  }
}
