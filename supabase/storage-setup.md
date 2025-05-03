
# Supabase Storage Setup for ATSBoost

This document outlines how to set up the required storage buckets in Supabase for the ATSBoost application.

## Storage Buckets Overview

ATSBoost requires the following storage buckets:

1. **cvs** - For storing user CV uploads (private)
2. **templates** - For storing CV templates (public)
3. **stories** - For storing success story images (private)
4. **toolkit** - For storing job seeker toolkit resources (public)

## Setting Up Storage Buckets

### 1. CVs Bucket (Private)

This bucket stores user-uploaded CVs and should be private with RLS policies.

1. Go to the Storage section in the Supabase Dashboard
2. Click "Create Bucket"
3. Name: `cvs`
4. Set as Private
5. After creating, add the following RLS policies:

**Select Policy (Download files):**
```sql
-- Allow users to download their own CVs
(auth.uid() = (
  SELECT user_id FROM uploads
  WHERE uploads.file_id = storage.objects.name
))
```

**Insert Policy (Upload files):**
```sql
-- Allow users to upload their own CVs
(auth.uid() IS NOT NULL AND 
 storage.objects.name LIKE auth.uid() || '/%') AND
 (storage.objects.size < 5000000) -- 5MB max size
```

**Update Policy (Update files):**
```sql
-- Prevent updates (upload new versions instead)
false
```

**Delete Policy (Delete files):**
```sql
-- Allow users to delete their own files
(auth.uid() = (
  SELECT user_id FROM uploads
  WHERE uploads.file_id = storage.objects.name
))
```

### 2. Templates Bucket (Public)

This bucket stores CV templates that are accessible to all users.

1. Go to the Storage section in the Supabase Dashboard
2. Click "Create Bucket"
3. Name: `templates`
4. Set as Public
5. After creating, add the following RLS policies:

**Select Policy (Download files):**
```sql
-- Allow everyone to download free templates
-- Premium templates require a subscription
storage.objects.metadata->>'is_premium' = 'false' 
OR
(
  storage.objects.metadata->>'is_premium' = 'true'
  AND
  EXISTS (
    SELECT 1 FROM subscriptions
    WHERE user_id = auth.uid()
    AND type = 'premium'
    AND (end_date IS NULL OR end_date > now())
  )
)
```

**Insert Policy (Upload files):**
```sql
-- Only allow admins to upload templates (define in dashboard)
false
```

**Update Policy (Update files):**
```sql
-- Only allow admins to update templates
false
```

**Delete Policy (Delete files):**
```sql
-- Only allow admins to delete templates
false
```

### 3. Stories Bucket (Private)

This bucket stores success story images uploaded by users.

1. Go to the Storage section in the Supabase Dashboard
2. Click "Create Bucket"
3. Name: `stories`
4. Set as Private
5. After creating, add the following RLS policies:

**Select Policy (Download files):**
```sql
-- Allow everyone to view approved success story images
EXISTS (
  SELECT 1 FROM success_stories
  WHERE success_stories.image_url LIKE '%' || storage.objects.name
  AND (success_stories.approved = true OR success_stories.user_id = auth.uid())
)
```

**Insert Policy (Upload files):**
```sql
-- Allow authenticated users to upload story images
auth.uid() IS NOT NULL AND
storage.objects.name LIKE auth.uid() || '/%' AND
(storage.objects.size < 2000000) -- 2MB max size
```

**Delete Policy (Delete files):**
```sql
-- Allow users to delete their own story images
EXISTS (
  SELECT 1 FROM success_stories
  WHERE success_stories.user_id = auth.uid()
  AND success_stories.image_url LIKE '%' || storage.objects.name
)
```

### 4. Toolkit Bucket (Public)

This bucket stores job seeker toolkit resources that are publicly accessible.

1. Go to the Storage section in the Supabase Dashboard
2. Click "Create Bucket"
3. Name: `toolkit`
4. Set as Public
5. After creating, add the following RLS policies:

**Select Policy (Download files):**
```sql
-- Allow everyone to download toolkit resources
true
```

**Insert Policy (Upload files):**
```sql
-- Only allow admins to upload toolkit resources
false
```

**Update Policy (Update files):**
```sql
-- Only allow admins to update toolkit resources
false
```

**Delete Policy (Delete files):**
```sql
-- Only allow admins to delete toolkit resources
false
```

## Setting Bucket Metadata

For certain files, especially in the templates bucket, you may want to set metadata to control access:

```javascript
// Example of uploading a template with metadata
const { data, error } = await supabase.storage
  .from('templates')
  .upload('professional-template.pdf', file, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'application/pdf',
    metadata: {
      is_premium: 'true',
      category: 'professional',
      industry: 'finance'
    }
  });
```

## Security Best Practices

1. Always validate file types and sizes before uploading
2. Use the user's ID in file paths to ensure separation of user content
3. Apply proper RLS policies to protect private data
4. Consider implementing virus scanning for uploaded files
5. Set appropriate CORS policies in the Supabase dashboard

## Monitoring Storage Usage

Monitor your storage usage to ensure you stay within the Supabase free tier limits (1GB storage):

1. Go to the Supabase Dashboard > Project Settings > Usage
2. Check the Storage section to monitor usage
3. Consider implementing automatic cleanup of old files if approaching limits
