import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        profile: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Create profile if it doesn't exist (lazy creation for new users)
    let profile = user.profile
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          user_id: user.id,
          words_balance: 500,
          extra_words_balance: 0,
          words_limit: 500,
          words_per_request: 500,
          subscription_canceled: false,
          subscription_paused: false,
        },
      })
    }

    return NextResponse.json({
      profile: profile,
      role: user.role
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Only allow updating specific fields
    const allowedFields = [
      'userStyle',
      'undetectable_style_id',
    ]

    const updateData: any = {}
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field]
      }
    }

    const profile = await prisma.profile.update({
      where: {
        user_id: session.user.id,
      },
      data: updateData,
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
