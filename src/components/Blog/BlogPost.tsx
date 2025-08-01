"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Copy,
  Eye,
  Facebook,
  Heart,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { blogPost } from "./Post";

// Mock blog post data

const relatedPosts = [
  {
    id: 2,
    title: "Mastering Modern CSS Grid Layouts",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&auto=format&fit=crop&q=60",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Building Scalable React Applications",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60",
    readTime: "12 min read",
  },
  {
    id: 4,
    title: "The Rise of Edge Computing",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&auto=format&fit=crop&q=60",
    readTime: "10 min read",
  },
];

export default function BlogPost() {
  const navigate = useRouter();
  const [activeSection, setActiveSection] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = blogPost.title;

    switch (platform) {
      case "copy":
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Navigation */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="outline"
            onClick={() => navigate.push("/blogs")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <section className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-8">
              {/* Featured Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={blogPost.featuredImage}
                  alt={blogPost.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Article Header */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {blogPost.title}
                </h1>

                {/* Author and Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={blogPost.author.avatar}
                        alt={blogPost.author.name}
                      />
                      <AvatarFallback>
                        {blogPost.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {blogPost.author.name}
                      </p>
                      <p className="text-xs">{blogPost.author.bio}</p>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(blogPost.publishDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blogPost.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {blogPost.views} views
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Share and Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className={`${
                        isLiked ? "bg-red-50 border-red-200 text-red-600" : ""
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${
                          isLiked ? "fill-current" : ""
                        }`}
                      />
                      {blogPost.likes + (isLiked ? 1 : 0)}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`${
                        isBookmarked
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : ""
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 mr-2 ${
                          isBookmarked ? "fill-current" : ""
                        }`}
                      />
                      {blogPost.bookmarks + (isBookmarked ? 1 : 0)}
                    </Button>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Share:
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare("copy")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare("linkedin")}
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <article className="prose prose-lg xl:prose-xl max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                  components={{
                    h2: ({ node, ...props }) => <h2 id={props.id} {...props} />,
                    h3: ({ node, ...props }) => <h3 id={props.id} {...props} />,
                  }}
                >
                  {blogPost.content}
                </ReactMarkdown>
              </article>

              {/* Related Posts */}
              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Related Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((post) => (
                      <div key={post.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg mb-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.readTime}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* <Comments comments={comments} /> */}
            </div>
          </section>
          {/* Table of Contents Sidebar */}
          <aside className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-24">
              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {blogPost.tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm transition-colors hover:text-primary ${
                          activeSection === item.id
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                        } ${item.level === 3 ? "ml-4" : ""}`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
