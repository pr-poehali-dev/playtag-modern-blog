
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface EditProfileDialogProps {
  children: React.ReactNode;
}

export default function EditProfileDialog({ children }: EditProfileDialogProps) {
  const [firstName, setFirstName] = useState('Юрий');
  const [lastName, setLastName] = useState('Космонавт');
  const [day, setDay] = useState('15');
  const [month, setMonth] = useState('04');
  const [year, setYear] = useState('1990');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150');
  const [coverUrl, setCoverUrl] = useState('');

  const handleSave = () => {
    // Здесь будет логика сохранения
    console.log('Сохранение профиля:', {
      firstName,
      lastName,
      day,
      month,
      year,
      avatarUrl,
      coverUrl
    });
  };

  // Генерация дней месяца
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  
  // Месяцы
  const months = [
    { value: '01', label: 'Январь' },
    { value: '02', label: 'Февраль' },
    { value: '03', label: 'Март' },
    { value: '04', label: 'Апрель' },
    { value: '05', label: 'Май' },
    { value: '06', label: 'Июнь' },
    { value: '07', label: 'Июль' },
    { value: '08', label: 'Август' },
    { value: '09', label: 'Сентябрь' },
    { value: '10', label: 'Октябрь' },
    { value: '11', label: 'Ноябрь' },
    { value: '12', label: 'Декабрь' }
  ];

  // Годы (от 1950 до текущего года)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => (currentYear - i).toString());

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Редактировать профиль</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Обложка */}
          <div className="space-y-2">
            <Label>Обложка профиля</Label>
            <div className="relative">
              <div 
                className="h-32 w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center"
                style={coverUrl ? { backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover' } : {}}
              >
                <Button variant="secondary" size="sm">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить обложку
                </Button>
              </div>
              <Input
                placeholder="Или вставьте ссылку на изображение"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          {/* Аватар */}
          <div className="space-y-2">
            <Label>Фото профиля</Label>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-lg">
                  {firstName[0]}{lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="Ссылка на изображение"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Имя и фамилия */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Имя</Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Введите имя"
              />
            </div>
            <div className="space-y-2">
              <Label>Фамилия</Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Введите фамилию"
              />
            </div>
          </div>

          {/* Дата рождения */}
          <div className="space-y-2">
            <Label>Дата рождения</Label>
            <div className="grid grid-cols-3 gap-4">
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger>
                  <SelectValue placeholder="День" />
                </SelectTrigger>
                <SelectContent>
                  {days.map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Месяц" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(m => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Год" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(y => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 flex-1">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить изменения
            </Button>
            <Button variant="outline" className="px-6">
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
</SelectContent>
