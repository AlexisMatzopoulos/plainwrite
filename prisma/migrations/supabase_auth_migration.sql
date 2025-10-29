-- Migration: Supabase Auth Integration
-- This migration removes NextAuth tables and simplifies the User model for Supabase Auth

-- Drop NextAuth-related tables
DROP TABLE IF EXISTS "Account" CASCADE;
DROP TABLE IF EXISTS "Session" CASCADE;
DROP TABLE IF EXISTS "VerificationToken" CASCADE;

-- Update User table to align with Supabase Auth
-- Note: Existing user IDs will need to be migrated or users will need to re-register
ALTER TABLE "User" DROP COLUMN IF EXISTS "name";
ALTER TABLE "User" DROP COLUMN IF EXISTS "emailVerified";
ALTER TABLE "User" DROP COLUMN IF EXISTS "image";
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Note: User IDs will now be UUIDs from Supabase auth.users table
-- Existing data may need manual migration
