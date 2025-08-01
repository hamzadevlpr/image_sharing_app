"use client";

import React, { useState } from "react";
import { Search, Calendar, Clock, Tag, ArrowRight, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    description:
      "Exploring how artificial intelligence is revolutionizing the way we build and design websites in 2025.",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["AI", "Web Dev", "Future Tech"],
    featured: true,
  },
  {
    id: 2,
    title: "Mastering Modern CSS Grid Layouts",
    description:
      "Advanced techniques for creating responsive, beautiful layouts with CSS Grid and Flexbox.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
    date: "2025-01-12",
    readTime: "6 min read",
    tags: ["CSS", "Layout", "Design"],
  },
  {
    id: 3,
    title: "Building Scalable React Applications",
    description:
      "Best practices for structuring large React applications with TypeScript and modern tooling.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    date: "2025-01-10",
    readTime: "12 min read",
    tags: ["React", "TypeScript", "Architecture"],
  },
  {
    id: 4,
    title: "The Rise of Edge Computing",
    description:
      "How edge computing is changing the landscape of web applications and user experiences.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60",
    date: "2025-01-08",
    readTime: "10 min read",
    tags: ["Edge Computing", "Performance", "Infrastructure"],
  },
  {
    id: 5,
    title: "Design Systems for 2025",
    description:
      "Creating cohesive, scalable design systems that adapt to the evolving digital landscape.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    date: "2025-01-05",
    readTime: "7 min read",
    tags: ["Design", "UI/UX", "Systems"],
  },
  {
    id: 6,
    title: "WebAssembly: The Future is Now",
    description:
      "Exploring the power of WebAssembly and how it's enabling new possibilities for web applications.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    date: "2025-01-03",
    readTime: "9 min read",
    tags: ["WebAssembly", "Performance", "Future Tech"],
  },
];

const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

export default function Blog() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => post.tags.includes(tag));
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Tag className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">
                Tech Insights & Tutorials
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Explore Our Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover the latest trends, tutorials, and insights in web
              development, design, and technology.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-cus">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>

              {/* Tag Filters */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Filter className="w-4 h-4" />
                  Filter by tags:
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className={`transition-all duration-300 ${
                        selectedTags.includes(tag)
                          ? "bg-primary text-primary-foreground shadow-cus scale-105"
                          : "hover:border-primary/50 hover:bg-primary/10"
                      }`}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`group cursor-pointer overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-cus hover:shadow-cus ${
                post.featured ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    post.featured ? "h-64" : "h-48"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4">
                  {post.featured && (
                    <Badge className="bg-primary/90 text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-secondary/50 hover:bg-primary/20 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTag(tag);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Button
                    variant="link"
                    size="sm"
                    className="group/btn h-auto font-medium text-primary"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {currentPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No articles found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search query or selected tags.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Card className="backdrop-blur-sm bg-card/80 border-border/50">
              <CardContent className="p-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer hover:bg-primary/10"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer hover:bg-primary/10 data-[active]:bg-primary data-[active]:text-primary-foreground"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer hover:bg-primary/10"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
