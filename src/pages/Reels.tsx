import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

export default function Reels() {
  const [currentReel, setCurrentReel] = useState(0);
  const [likes, setLikes] = useState([156, 89, 234]);
  const [isLiked, setIsLiked] = useState([false, false, false]);

  const reels = [
    {
      id: 1,
      author: "Юрий Космонавт",
      username: "@yura_cosmo",
      title: "Запуск ракеты в прямом эфире",
      video:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=700",
      views: "12.5К",
    },
    {
      id: 2,
      author: "Анна Астроном",
      username: "@anna_stars",
      title: "Северное сияние из космоса",
      video:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=700",
      views: "8.3К",
    },
    {
      id: 3,
      author: "Макс Исследователь",
      username: "@max_explorer",
      title: "Жизнь на Марсе: симуляция",
      video:
        "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=700",
      views: "20.1К",
    },
  ];

  const handleLike = (index: number) => {
    const newIsLiked = [...isLiked];
    const newLikes = [...likes];

    newIsLiked[index] = !newIsLiked[index];
    newLikes[index] = newIsLiked[index]
      ? newLikes[index] + 1
      : newLikes[index] - 1;

    setIsLiked(newIsLiked);
    setLikes(newLikes);
  };

  const nextReel = () => {
    setCurrentReel((prev) => (prev + 1) % reels.length);
  };

  const prevReel = () => {
    setCurrentReel((prev) => (prev - 1 + reels.length) % reels.length);
  };

  return (
    <div className="h-screen bg-black overflow-hidden relative flex items-center justify-center">
      {/* Home Button */}
      <Link to="/" className="absolute top-4 left-4 z-20">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/20 backdrop-blur border-white/30 hover:bg-white/30"
        >
          <Icon name="Home" size={20} className="text-white" />
        </Button>
      </Link>

      {/* Mobile: Swipe Container */}
      <div className="w-full max-w-sm mx-auto h-full relative">
        <div
          className="h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateY(-${currentReel * 100}vh)` }}
        >
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="h-screen relative flex-shrink-0 flex items-center justify-center"
            >
              {/* Video Container with 9:16 aspect ratio */}
              <div
                className="relative w-full max-w-sm mx-auto"
                style={{ aspectRatio: "9/16" }}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <img
                    src={reel.video}
                    alt={reel.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex">
                  {/* Left: Info */}
                  <div className="flex-1 flex flex-col justify-end p-4 pb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-white">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50" />
                          <AvatarFallback>ЮР</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">
                            {reel.author}
                          </p>
                          <p className="text-gray-300 text-xs truncate">
                            {reel.username}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1"
                        >
                          Подписаться
                        </Button>
                      </div>

                      <h3 className="text-white text-sm font-medium line-clamp-2">
                        {reel.title}
                      </h3>

                      <p className="text-gray-300 text-xs">
                        {reel.views} просмотров
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="w-12 flex flex-col justify-end items-center pb-6 space-y-4">
                    <button
                      onClick={() => handleLike(index)}
                      className="flex flex-col items-center space-y-1"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isLiked[index]
                            ? "bg-red-500"
                            : "bg-white/20 backdrop-blur"
                        }`}
                      >
                        <Icon
                          name="Heart"
                          size={18}
                          className={
                            isLiked[index] ? "text-white" : "text-white"
                          }
                        />
                      </div>
                      <span className="text-white text-xs">{likes[index]}</span>
                    </button>

                    <button className="flex flex-col items-center space-y-1">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon
                          name="MessageCircle"
                          size={18}
                          className="text-white"
                        />
                      </div>
                      <span className="text-white text-xs">42</span>
                    </button>

                    <button className="flex flex-col items-center space-y-1">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon name="Gift" size={18} className="text-white" />
                      </div>
                      <span className="text-white text-xs">🎁</span>
                    </button>

                    <button className="flex flex-col items-center space-y-1">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon name="Share2" size={18} className="text-white" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur border-white/30"
          onClick={prevReel}
        >
          <Icon name="ChevronUp" size={20} className="text-white" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur border-white/30"
          onClick={nextReel}
        >
          <Icon name="ChevronDown" size={20} className="text-white" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
        {reels.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-all ${
              index === currentReel ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
