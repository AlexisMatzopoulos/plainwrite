import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Find or create user in database
    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        profile: true,
      },
    })

    // Create user if they don't exist (first time sign in)
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          role: 'USER',
        },
        include: {
          profile: true,
        },
      })
    }

    // Create profile if it doesn't exist (lazy creation for new users)
    let profile = dbUser.profile
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          user_id: dbUser.id,
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
      role: dbUser.role
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
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
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
        user_id: user.id,
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
