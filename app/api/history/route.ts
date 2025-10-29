import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth-helpers";
;
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // 1. Verify authentication
    const { user: authUser, dbUser, error } = await getAuthenticatedUser();
    if (error || !authUser || !dbUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Get user
    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 3. Parse query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search") || "";

    // Validate parameters
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Limit must be between 1 and 100" },
        { status: 400 }
      );
    }

    if (offset < 0) {
      return NextResponse.json(
        { error: "Offset must be non-negative" },
        { status: 400 }
      );
    }

    // 4. Build where clause with optional search
    const whereClause: any = { user_id: user.id };

    if (search) {
      whereClause.OR = [
        { original_text: { contains: search, mode: "insensitive" } },
        { humanized_text: { contains: search, mode: "insensitive" } },
      ];
    }

    // 5. Fetch history with pagination and search
    const [history, total] = await Promise.all([
      prisma.history.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
        select: {
          id: true,
          createdAt: true,
          original_text: true,
          humanized_text: true,
          words_count: true,
          style_used: true,
        },
      }),
      prisma.history.count({
        where: whereClause,
      }),
    ]);

    // 6. Return response
    return NextResponse.json({
      history,
      total,
      limit,
      offset,
      search,
    });
  } catch (error) {
    console.error("Error in /api/history:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
