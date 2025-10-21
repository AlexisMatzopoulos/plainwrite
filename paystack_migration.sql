
ALTER TABLE "Profile"
ADD COLUMN IF NOT EXISTS "paystack_customer_code" TEXT,
ADD COLUMN IF NOT EXISTS "paystack_subscription_code" TEXT,
ADD COLUMN IF NOT EXISTS "paystack_authorization_code" TEXT,
ADD COLUMN IF NOT EXISTS "paystack_plan_code" TEXT,
ADD COLUMN IF NOT EXISTS "billing_period" TEXT;

-- Verify the columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'Profile'
AND (column_name LIKE 'paystack%' OR column_name = 'billing_period')
ORDER BY column_name;
