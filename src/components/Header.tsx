import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PT</span>
            </div>
            <span className="text-xl font-bold text-gray-900 font-montserrat">
              Play Tag
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                isActive("/") ? "text-purple-600" : "text-gray-700"
              }`}
            >
              Главная
            </Link>
            <Link
              to="/reels"
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                isActive("/reels") ? "text-purple-600" : "text-gray-700"
              }`}
            >
              Reels
            </Link>
            {user?.isAdmin && (
              <Link
                to="/add-blog"
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive("/add-blog") ? "text-purple-600" : "text-gray-700"
                }`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-600 hover:bg-purple-50"
                >
                  <Icon name="Plus" size={16} className="mr-1" />
                  Добавить блог
                </Button>
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user?.name || user?.login}
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Icon name="LogOut" size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Регистрация
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <nav className="flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center py-2 px-3 text-xs ${
              isActive("/") ? "text-purple-600" : "text-gray-600"
            }`}
          >
            <Icon name="Home" size={20} />
            <span className="mt-1">Главная</span>
          </Link>
          <Link
            to="/reels"
            className={`flex flex-col items-center py-2 px-3 text-xs ${
              isActive("/reels") ? "text-purple-600" : "text-gray-600"
            }`}
          >
            <Icon name="Play" size={20} />
            <span className="mt-1">Reels</span>
          </Link>
          {user?.isAdmin && (
            <Link
              to="/add-blog"
              className={`flex flex-col items-center py-2 px-3 text-xs ${
                isActive("/add-blog") ? "text-purple-600" : "text-gray-600"
              }`}
            >
              <Icon name="Plus" size={20} />
              <span className="mt-1">Добавить</span>
            </Link>
          )}
          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            className={`flex flex-col items-center py-2 px-3 text-xs ${
              isActive("/profile") || isActive("/login")
                ? "text-purple-600"
                : "text-gray-600"
            }`}
          >
            <Icon name="User" size={20} />
            <span className="mt-1">
              {isAuthenticated ? "Профиль" : "Войти"}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
