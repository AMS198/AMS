// src/lib/revalidate.ts
// Targeted On-Demand ISR Revalidation:
// Only called when backend/admin modifies data.
// Revalidates ONLY the specific page changed, avoiding wide purges of '/' or all pages.

import { revalidatePath } from 'next/cache';

/** Purge ONLY the specific blog post + blog index page */
export function revalidateBlog(slug: string) {
  try {
    if (slug) {
      revalidatePath(`/blog/${slug}`, 'page');
    }
    revalidatePath('/blog', 'page');
  } catch (error) {
    console.error(`[Revalidate] Error revalidating blog ${slug}:`, error);
  }
}

/** Purge ONLY the blog listing page when a new post is added or removed */
export function revalidateAllBlogs() {
  try {
    revalidatePath('/blog', 'page');
  } catch (error) {
    console.error('[Revalidate] Error revalidating /blog:', error);
  }
}

/** Purge ONLY the projects page when a project is added, updated or deleted */
export function revalidateProjects() {
  try {
    revalidatePath('/projects', 'page');
  } catch (error) {
    console.error('[Revalidate] Error revalidating /projects:', error);
  }
}

/** Purge ONLY the gallery page when an image is added or deleted */
export function revalidateGallery() {
  try {
    revalidatePath('/gallery', 'page');
  } catch (error) {
    console.error('[Revalidate] Error revalidating /gallery:', error);
  }
}
