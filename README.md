This is a task project for the inductions to SWD Nucleus Tech Team in BITS Pilani, Hyderabad.
The task is to a create a vendor/user payment system where user scans a qr code and transfers money to Vendor. User and Vendor signup/login system also needs to be implemented.

(Made using Sveltekit, Supabase)

To do-

1. setup payment functionality(add money to vendor account)
2. RLS in supabase for restricting access to tables
3. Make a separate vendorsProfiles(ones who have confirmed their mail)table and pass data from auth.Users table to it on entry
4. Protect vendor/user routes in hook.server.ts
