import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

export default function AddBlog() {
  const [aiCover, setAiCover] = useState(false);
  const [mediaType, setMediaType] = useState<"photo" | "video" | "audio">(
    "photo",
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    aiPrompt: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Заполните заголовок и содержание поста");
      return;
    }

    setIsPublishing(true);

    try {
      // Симуляция публикации
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("🚀 Пост успешно опубликован!");

      // Очистка формы
      setFormData({ title: "", description: "", content: "", aiPrompt: "" });
      setAiCover(false);
    } catch (error) {
      toast.error("Ошибка при публикации поста");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="PlusCircle" size={24} className="text-purple-600" />
              Создать новый пост
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                placeholder="Введите заголовок поста..."
                className="text-lg"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Краткое описание</Label>
              <Input
                id="description"
                placeholder="Краткое описание для превью..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Содержание</Label>
              <Textarea
                id="content"
                placeholder="Напишите содержание поста..."
                rows={8}
                className="min-h-[200px] resize-none"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
              />
            </div>

            {/* Media Upload */}
            <div className="space-y-4">
              <Label>Медиа-контент</Label>

              <div className="flex gap-2 mb-4">
                {(["photo", "video", "audio"] as const).map((type) => (
                  <Button
                    key={type}
                    variant={mediaType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMediaType(type)}
                  >
                    <Icon
                      name={
                        type === "photo"
                          ? "Image"
                          : type === "video"
                            ? "Video"
                            : "Music"
                      }
                      size={16}
                      className="mr-2"
                    />
                    {type === "photo"
                      ? "Фото"
                      : type === "video"
                        ? "Видео"
                        : "Аудио"}
                  </Button>
                ))}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Icon
                  name="Upload"
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <p className="text-gray-600 mb-2">Перетащите файлы сюда или</p>
                <Button variant="outline">Выбрать файлы</Button>
              </div>
            </div>

            {/* AI Cover Generation */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <Label htmlFor="ai-cover" className="text-base font-medium">
                  Генерация обложки ИИ
                </Label>
                <p className="text-sm text-gray-600">
                  Автоматически создать обложку на основе содержания
                </p>
              </div>
              <Switch
                id="ai-cover"
                checked={aiCover}
                onCheckedChange={setAiCover}
              />
            </div>

            {aiCover && (
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Описание для обложки</Label>
                <Input
                  id="ai-prompt"
                  placeholder="Космос, звезды, планеты..."
                  value={formData.aiPrompt}
                  onChange={(e) =>
                    handleInputChange("aiPrompt", e.target.value)
                  }
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                <Icon
                  name={isPublishing ? "Loader2" : "Send"}
                  size={16}
                  className={`mr-2 ${isPublishing ? "animate-spin" : ""}`}
                />
                {isPublishing ? "Публикую..." : "Опубликовать"}
              </Button>
              <Button variant="outline">
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить черновик
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
