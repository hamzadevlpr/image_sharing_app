// app/blog/[slug]/page.tsx
import BlogPost from "@/components/Blog/BlogPost";
import { Metadata } from "next";

type BlogPostType = {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  tags?: string[];
};
type Params = Promise<{ slug: string }>;
async function getBlogPostBySlug(slug: string): Promise<BlogPostType> {
  return {
    title: "Top Tips for Sharing Images Online",
    description: "Learn how to safely and creatively share images on the web.",
    slug,
    coverImage:
      "https://image-sharing-app-theta.vercel.app/blog/sample-image.jpg",
    tags: ["image sharing", "privacy", "photo tips"],
  };
}

// ✅ SEO metadata function — must use `params`
export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";
  const fullUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | ImageShareApp Blog`,
    description: post.description,
    keywords: [
      ...(post.tags || []),
      "image sharing",
      "photo tips",
      "image hosting",
      "ImageShareApp",
    ],
    openGraph: {
      title: post.title,
      description: post.description,
      url: fullUrl,
      siteName: "ImageShareApp",
      images: [
        {
          url: post.coverImage || `${baseUrl}/default-blog-og.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage || `${baseUrl}/default-blog-og.png`],
    },
  };
}

export default async function Page() {
  return <BlogPost />;
}
