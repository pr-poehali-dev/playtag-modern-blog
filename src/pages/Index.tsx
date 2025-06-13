import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/types";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

// Mock data for demonstration
const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Создание современного веб-дизайна в 2024",
    shortDescription:
      "Изучаем последние тренды и методы создания привлекательных интерфейсов",
    content: "Полный контент блога о веб-дизайне...",
    coverImage:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=590&h=490&fit=crop",
    mediaFiles: [],
    authorId: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    views: 1247,
    reactions: {
      likes: 45,
      joy: 12,
      love: 23,
      sadness: 2,
      anger: 1,
      thinking: 8,
      userReactions: {},
    },
    comments: [],
  },
  {
    id: "2",
    title: "TypeScript: продвинутые техники программирования",
    shortDescription:
      "Глубокое погружение в возможности TypeScript для создания надежных приложений",
    content: "Подробный разбор TypeScript...",
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=590&h=490&fit=crop",
    mediaFiles: [],
    authorId: "admin",
    createdAt: "2024-01-12T14:30:00Z",
    views: 892,
    reactions: {
      likes: 67,
      joy: 15,
      love: 31,
      sadness: 0,
      anger: 0,
      thinking: 22,
      userReactions: {},
    },
    comments: [],
  },
  {
    id: "3",
    title: "Искусственный интеллект в повседневной жизни",
    shortDescription:
      "Как AI технологии меняют наш мир и что нас ждет в будущем",
    content: "Обзор AI технологий...",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=590&h=490&fit=crop",
    mediaFiles: [],
    authorId: "admin",
    createdAt: "2024-01-10T09:15:00Z",
    views: 2156,
    reactions: {
      likes: 89,
      joy: 45,
      love: 67,
      sadness: 3,
      anger: 5,
      thinking: 34,
      userReactions: {},
    },
    comments: [],
  },
];

const Index = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Infinite scroll simulation
  const loadMoreBlogs = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      // Simulate loading more blogs
      const newBlogs = mockBlogs.map((blog) => ({
        ...blog,
        id: `${blog.id}-${Date.now()}`,
        views: Math.floor(Math.random() * 3000) + 100,
      }));

      setBlogs((prev) => [...prev, ...newBlogs]);
      setLoading(false);

      // Stop loading after 3 iterations for demo
      if (blogs.length >= 15) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      loadMoreBlogs();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, blogs.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-montserrat">
            Добро пожаловать в
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Play Tag
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            Современная платформа для чтения интересных блогов, просмотра Reels
            и общения с единомышленниками
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
            >
              <Icon name="BookOpen" size={20} className="mr-2" />
              Читать блоги
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть Reels
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
            Последние публикации
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Исследуйте мир знаний через качественные статьи от наших авторов
          </p>
        </div>

        {/* Section Content */}
        <div className="text-center py-8">
          <Icon
            name="BookOpen"
            size={64}
            className="mx-auto text-gray-300 mb-4"
          />
          <p className="text-gray-500">
            Скоро здесь появятся интересные статьи
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PT</span>
              </div>
              <span className="text-xl font-bold font-montserrat">
                Play Tag
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Современная блог-платформа для обмена идеями и знаниями
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="Mail" size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="MessageCircle" size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="Users" size={20} />
              </a>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 Play Tag. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
