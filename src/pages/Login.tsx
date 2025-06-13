import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Заполните все поля");
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Успешный вход в систему!");
        navigate("/");
      } else {
        toast.error("Неверный email или пароль");
      }
    } catch (error) {
      toast.error("Произошла ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setEmail("toly.akuloff@yandex.ru");
    setPassword("908908Tolya--Qwe");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">PT</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 font-montserrat">
              Play Tag
            </span>
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Добро пожаловать!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Войдите в свой аккаунт, чтобы продолжить
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Введите ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Пароль
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите ваш пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      name={showPassword ? "EyeOff" : "Eye"}
                      size={16}
                      className="text-gray-500"
                    />
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-11"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Входим...
                  </div>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>

            {/* Admin Quick Login */}
            <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800 mb-2">
                Для демонстрации админ-панели:
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={fillAdminCredentials}
                className="w-full text-yellow-700 border-yellow-300 hover:bg-yellow-100"
              >
                <Icon name="Crown" size={14} className="mr-1" />
                Войти как администратор
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Нет аккаунта?{" "}
                <Link
                  to="/register"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center"
              >
                <Icon name="ArrowLeft" size={14} className="mr-1" />
                Вернуться на главную
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
