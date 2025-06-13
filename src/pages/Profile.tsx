import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import EditProfileDialog from "@/components/EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Мой профиль</h2>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Icon name="Home" size={16} />
            На главную
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="relative overflow-hidden">
          <div
            className={`h-32 ${user.coverImage ? "" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}
            style={
              user.coverImage
                ? {
                    backgroundImage: `url(${user.coverImage})`,
                    backgroundSize: "cover",
                  }
                : {}
            }
          ></div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">
                  {user.name?.[0] || "Ю"}
                  {user.surname?.[0] || "К"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name || "Юрий"} {user.surname || "Космонавт"}
                </h1>
                <p className="text-gray-600">@{user.login}</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    <Icon name="Rocket" size={14} className="mr-1" />
                    Космонавт
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-800"
                  >
                    <Icon name="Code" size={14} className="mr-1" />
                    Разработчик
                  </Badge>
                </div>
              </div>
              <EditProfileDialog>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать
                </Button>
              </EditProfileDialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Star" size={20} className="text-yellow-500" />
                Очки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">12,450</div>
              <p className="text-sm text-gray-600">+150 за неделю</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Gift" size={20} className="text-pink-500" />
                Подарки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-600">47</div>
              <p className="text-sm text-gray-600">Получено</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={20} className="text-blue-500" />
                Подписчики
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">1,234</div>
              <p className="text-sm text-gray-600">+23 за неделю</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Недавняя активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <Icon
                    name="MessageCircle"
                    size={20}
                    className="text-gray-500"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Комментарий к посту</p>
                    <p className="text-sm text-gray-600">2 часа назад</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
