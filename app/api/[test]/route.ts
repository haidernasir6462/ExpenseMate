import { NextResponse, NextRequest } from "next/server";

export const GET = (
  request: NextRequest,
  { params }: { params: { test: string } }
) => {
  return NextResponse.json({
    hello: "world",
    testId: params.test,
  });
};
