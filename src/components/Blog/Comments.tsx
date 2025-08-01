import React from "react";
import { Card, CardContent } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface BlogComment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replies: BlogComment[];
}
export default function Comments({ comments }: { comments: BlogComment[] }) {
  const [newComment, setNewComment] = React.useState("");
  return (
    <Card className="backdrop-blur-sm bg-card/80 border-border/50">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Comments ({comments.length})
        </h2>

        {/* Add Comment */}
        <div className="space-y-4 mb-8">
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-background/50"
          />
          <Button className="bg-primary hover:bg-primary/90">
            Post Comment
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {comment.author}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-foreground">{comment.content}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <Heart className="w-4 h-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-14 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.avatar} alt={reply.author} />
                        <AvatarFallback>
                          {reply.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {reply.author}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {reply.date}
                          </span>
                        </div>
                        <p className="text-foreground">{reply.content}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {reply.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
