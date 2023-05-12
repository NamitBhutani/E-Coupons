This is a task project for the inductions to SWD Nucleus Tech Team in BITS Pilani, Hyderabad.
The task is to a create a vendor/user payment system where user scans a qr code and transfers money to Vendor. User and Vendor signup/login system also needs to be implemented.

(Made using Sveltekit, Supabase)

To do-

1. RLS in supabase for restricting access to tables
2. Make a separate vendorsProfiles(ones who have confirmed their mail and are Vendors) table and pass data from auth.Users table to it on entry(using functions and triggers)
3. Protect vendor/user routes in hook.server.ts
4. Redo Styles
5. Add modal for showing successfull transaction
