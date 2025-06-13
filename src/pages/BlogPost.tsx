import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export default function BlogPost() {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <article className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50" />
                  <AvatarFallback>ЮР</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Юрий Космонавт</h3>
                  <p className="text-sm text-gray-600">
                    3 часа назад • 5 мин чтения
                  </p>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Путешествие в космос: Опыт работы на орбите
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={16} />
                  1,234 просмотра
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />5 мин
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Content */}
          <Card>
            <CardContent className="prose max-w-none pt-6">
              <img
                src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800"
                alt="Космос"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Работа в космосе — это уникальный опыт, который изменяет
                восприятие мира. Каждый день на орбите приносит новые открытия и
                вызовы.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Жизнь на орбите
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Невесомость влияет на все аспекты жизни — от простых движений до
                сложных научных экспериментов. Каждое действие требует
                переосмысления.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Вид Земли из космоса невозможно передать словами. Это меняет
                понимание того, насколько хрупка наша планета.
              </p>
            </CardContent>
          </Card>

          {/* Reactions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <Icon name="Heart" size={16} className="mr-2" />
                    {likes}
                  </Button>

                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Комментарии
                  </Button>

                  <Button variant="outline" size="sm">
                    <Icon name="Gift" size={16} className="mr-2" />
                    Подарить
                  </Button>
                </div>

                <Button variant="outline" size="sm">
                  <Icon name="Share2" size={16} className="mr-2" />
                  Поделиться
                </Button>
              </div>

              {/* Comments */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Комментарии (12)</h3>
                <div className="space-y-4">
                  {[1, 2].map((comment) => (
                    <div key={comment} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>А</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            Анна Иванова
                          </span>
                          <span className="text-xs text-gray-500">
                            2 часа назад
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Потрясающий рассказ! Спасибо за возможность увидеть
                          космос глазами космонавта.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}
