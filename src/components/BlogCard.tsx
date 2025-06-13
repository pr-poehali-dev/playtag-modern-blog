import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/types";
import Icon from "@/components/ui/icon";

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const totalReactions =
    Object.values(blog.reactions).reduce((sum, count) => {
      if (typeof count === "number") return sum + count;
      return sum;
    }, 0) - Object.keys(blog.reactions.userReactions).length;

  return (
    <Link to={`/blog/${blog.id}`} className="group block">
      <div className="w-full max-w-[510px] h-[490px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        {/* Cover Image */}
        <div className="relative w-full h-[380px] overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Stats Overlay */}
          <div className="absolute top-4 right-4 flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
              <Icon name="Eye" size={14} className="text-white" />
              <span className="text-white text-xs font-medium">
                {blog.views}
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
              <Icon name="Heart" size={14} className="text-white" />
              <span className="text-white text-xs font-medium">
                {totalReactions}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors font-montserrat">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {blog.shortDescription}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{new Date(blog.createdAt).toLocaleDateString("ru-RU")}</span>
            <div className="flex items-center space-x-3">
              <span>{blog.comments.length} комментариев</span>
              {blog.mediaFiles.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Icon name="Paperclip" size={12} />
                  <span>{blog.mediaFiles.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
