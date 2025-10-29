import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth-helpers";
;
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Await params (Next.js 15 requirement)
    const { id } = await params;

    // 2. Verify authentication
    const { user: authUser, dbUser, error } = await getAuthenticatedUser();
    if (error || !authUser || !dbUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 3. Get user
    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 4. Get the history entry to verify ownership
    const historyEntry = await prisma.history.findUnique({
      where: { id },
    });

    if (!historyEntry) {
      return NextResponse.json(
        { error: "History entry not found" },
        { status: 404 }
      );
    }

    // 5. Verify that the history entry belongs to the user
    if (historyEntry.user_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // 6. Delete the history entry
    await prisma.history.delete({
      where: { id },
    });

    // 7. Return success response
    return NextResponse.json({
      success: true,
      message: "History entry deleted successfully",
    });
  } catch (error) {
    console.error("Error in DELETE /api/history/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
