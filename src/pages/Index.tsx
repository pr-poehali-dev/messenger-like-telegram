import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const initialChats: Chat[] = [
  {
    id: 1,
    name: 'Анна Смирнова',
    avatar: '',
    lastMessage: 'Привет! Как дела?',
    time: '14:32',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Команда дизайна',
    avatar: '',
    lastMessage: 'Отправил макеты',
    time: '13:15',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Максим Иванов',
    avatar: '',
    lastMessage: 'Созвон в 15:00',
    time: '12:45',
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: 'Проект Apollo',
    avatar: '',
    lastMessage: 'Обновил документацию',
    time: '11:20',
    unread: 0,
    online: false,
  },
];

const initialMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '14:30' },
  { id: 2, text: 'Отлично! Работаю над новым проектом', sender: 'me', time: '14:31' },
  { id: 3, text: 'Круто! Расскажешь подробнее?', sender: 'other', time: '14:32' },
];

function Index() {
  const [selectedChat, setSelectedChat] = useState<Chat>(initialChats[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    lastSeen: true,
    readReceipts: true,
    typing: true,
    calls: true,
    groupInvites: true,
    energySaving: false,
    autoDownload: true,
    notifications: true,
    sounds: true,
    vibration: true,
    darkTheme: true,
    language: 'ru',
  });

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const filteredChats = initialChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              Messenger
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowProfile(!showProfile)}
              className="hover:bg-primary/10"
            >
              <Icon name="Menu" size={20} />
            </Button>
          </div>
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-accent/10 transition-all border-b border-border/50 ${
                selectedChat.id === chat.id ? 'bg-accent/20' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="gradient-primary text-white font-semibold">
                    {chat.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="gradient-primary text-white text-xs px-2 py-0.5 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between glass-effect">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedChat.avatar} />
              <AvatarFallback className="gradient-primary text-white font-semibold">
                {selectedChat.name.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-foreground">{selectedChat.name}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedChat.online ? 'в сети' : 'был(а) недавно'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.sender === 'me'
                      ? 'gradient-primary text-white'
                      : 'glass-effect text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border glass-effect">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Icon name="Paperclip" size={20} />
            </Button>
            <Input
              placeholder="Написать сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-card border-border"
            />
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Icon name="Smile" size={20} />
            </Button>
            <Button
              onClick={sendMessage}
              className="gradient-primary text-white hover:opacity-90 transition-opacity"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Sidebar */}
      {showProfile && (
        <div className="w-80 border-l border-border p-6 glass-effect animate-slide-in-right">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Профиль</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowProfile(false)}
              className="hover:bg-primary/10"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarFallback className="gradient-primary text-white text-2xl font-bold">
                Я
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold mb-1">Моё имя</h3>
            <p className="text-sm text-muted-foreground">@username</p>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
              <Icon name="User" size={18} className="mr-3" />
              Редактировать профиль
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start hover:bg-primary/10"
              onClick={() => {
                setShowProfile(false);
                setShowSettings(true);
              }}
            >
              <Icon name="Settings" size={18} className="mr-3" />
              Настройки
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
              <Icon name="Moon" size={18} className="mr-3" />
              Тёмная тема
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
              <Icon name="Bell" size={18} className="mr-3" />
              Уведомления
            </Button>
          </div>
        </div>
      )}

      {/* Settings Sidebar */}
      {showSettings && (
        <div className="w-96 border-l border-border glass-effect animate-slide-in-right overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Настройки</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
                className="hover:bg-primary/10"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Конфиденциальность */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <h3 className="font-semibold text-lg">Конфиденциальность</h3>
                </div>
                <div className="space-y-4 ml-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Последнее посещение</p>
                      <p className="text-xs text-muted-foreground">Видно всем</p>
                    </div>
                    <Switch 
                      checked={settings.lastSeen}
                      onCheckedChange={(checked) => setSettings({...settings, lastSeen: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Статус прочтения</p>
                      <p className="text-xs text-muted-foreground">Отправлять уведомления о прочтении</p>
                    </div>
                    <Switch 
                      checked={settings.readReceipts}
                      onCheckedChange={(checked) => setSettings({...settings, readReceipts: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Статус набора</p>
                      <p className="text-xs text-muted-foreground">Показывать когда печатаю</p>
                    </div>
                    <Switch 
                      checked={settings.typing}
                      onCheckedChange={(checked) => setSettings({...settings, typing: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Звонки</p>
                      <p className="text-xs text-muted-foreground">Кто может мне звонить</p>
                    </div>
                    <Switch 
                      checked={settings.calls}
                      onCheckedChange={(checked) => setSettings({...settings, calls: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Приглашения в группы</p>
                      <p className="text-xs text-muted-foreground">Кто может добавлять в группы</p>
                    </div>
                    <Switch 
                      checked={settings.groupInvites}
                      onCheckedChange={(checked) => setSettings({...settings, groupInvites: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Энергосбережение */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Battery" size={20} className="text-primary" />
                  <h3 className="font-semibold text-lg">Энергосбережение</h3>
                </div>
                <div className="space-y-4 ml-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Режим энергосбережения</p>
                      <p className="text-xs text-muted-foreground">Снизить потребление батареи</p>
                    </div>
                    <Switch 
                      checked={settings.energySaving}
                      onCheckedChange={(checked) => setSettings({...settings, energySaving: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Автозагрузка медиа</p>
                      <p className="text-xs text-muted-foreground">Скачивать фото и видео</p>
                    </div>
                    <Switch 
                      checked={settings.autoDownload}
                      onCheckedChange={(checked) => setSettings({...settings, autoDownload: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Язык */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Globe" size={20} className="text-primary" />
                  <h3 className="font-semibold text-lg">Язык</h3>
                </div>
                <div className="ml-7">
                  <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Оформление */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Palette" size={20} className="text-primary" />
                  <h3 className="font-semibold text-lg">Оформление</h3>
                </div>
                <div className="space-y-4 ml-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Тёмная тема</p>
                      <p className="text-xs text-muted-foreground">Включить тёмное оформление</p>
                    </div>
                    <Switch 
                      checked={settings.darkTheme}
                      onCheckedChange={(checked) => setSettings({...settings, darkTheme: checked})}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-3">Цветовая схема</p>
                    <div className="grid grid-cols-4 gap-2">
                      <button className="w-full h-12 rounded-lg gradient-primary hover:scale-105 transition-transform" />
                      <button className="w-full h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 hover:scale-105 transition-transform" />
                      <button className="w-full h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 hover:scale-105 transition-transform" />
                      <button className="w-full h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 hover:scale-105 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Уведомления и звуки */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Bell" size={20} className="text-primary" />
                  <h3 className="font-semibold text-lg">Уведомления и звуки</h3>
                </div>
                <div className="space-y-4 ml-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Уведомления</p>
                      <p className="text-xs text-muted-foreground">Показывать уведомления</p>
                    </div>
                    <Switch 
                      checked={settings.notifications}
                      onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Звуки</p>
                      <p className="text-xs text-muted-foreground">Воспроизводить звуки</p>
                    </div>
                    <Switch 
                      checked={settings.sounds}
                      onCheckedChange={(checked) => setSettings({...settings, sounds: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Вибрация</p>
                      <p className="text-xs text-muted-foreground">Вибрировать при уведомлениях</p>
                    </div>
                    <Switch 
                      checked={settings.vibration}
                      onCheckedChange={(checked) => setSettings({...settings, vibration: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Устройства */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Smartphone" size={20} className="text-primary" />
                  <h3 className="font-semibold text-lg">Устройства</h3>
                </div>
                <div className="ml-7 space-y-3">
                  <div className="p-3 rounded-lg bg-card border border-border hover:bg-accent/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <Icon name="Monitor" size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">MacBook Pro</p>
                        <p className="text-xs text-muted-foreground">Москва • Сейчас активен</p>
                      </div>
                      <Icon name="Circle" size={8} className="text-green-500 fill-green-500" />
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border hover:bg-accent/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <Icon name="Smartphone" size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">iPhone 15 Pro</p>
                        <p className="text-xs text-muted-foreground">Москва • 2 часа назад</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Премиум */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Crown" size={20} className="text-yellow-500" />
                  <h3 className="font-semibold text-lg gradient-primary bg-clip-text text-transparent">Premium</h3>
                </div>
                <div className="ml-7">
                  <div className="p-4 rounded-xl gradient-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10">
                      <h4 className="text-white font-bold text-lg mb-2">Попробуйте Premium</h4>
                      <ul className="text-white/90 text-sm space-y-1 mb-4">
                        <li>• Увеличенные файлы до 4 ГБ</li>
                        <li>• Эксклюзивные стикеры</li>
                        <li>• Без рекламы</li>
                        <li>• Приоритетная поддержка</li>
                      </ul>
                      <Button className="w-full bg-white text-primary hover:bg-white/90">
                        Подключить за 299 ₽/мес
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default Index;