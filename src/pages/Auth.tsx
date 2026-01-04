import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type AuthStep = 'email' | 'code' | 'profile';

interface AuthProps {
  onAuthComplete: (user: { email: string; username: string; name: string }) => void;
}

function Auth({ onAuthComplete }: AuthProps) {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email.includes('@')) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 1000);
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('profile');
    }, 1000);
  };

  const handleCreateProfile = () => {
    if (!username || !name) return;
    onAuthComplete({ email, username, name });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
            BublikChat
          </h1>
          <p className="text-muted-foreground">Современный мессенджер</p>
        </div>

        <Card className="glass-effect border-border animate-scale-in">
          {step === 'email' && (
            <>
              <CardHeader>
                <CardTitle>Вход или регистрация</CardTitle>
                <CardDescription>Введите ваш email для входа</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendCode()}
                    className="bg-card border-border"
                  />
                </div>
                <Button
                  onClick={handleSendCode}
                  disabled={!email.includes('@') || isLoading}
                  className="w-full gradient-primary text-white hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Mail" size={18} className="mr-2" />
                      Получить код
                    </>
                  )}
                </Button>
              </CardContent>
            </>
          )}

          {step === 'code' && (
            <>
              <CardHeader>
                <CardTitle>Проверка кода</CardTitle>
                <CardDescription>
                  Мы отправили код на {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    onKeyPress={(e) => e.key === 'Enter' && handleVerifyCode()}
                    className="bg-card border-border text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={handleVerifyCode}
                  disabled={code.length !== 6 || isLoading}
                  className="w-full gradient-primary text-white hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Проверка...
                    </>
                  ) : (
                    <>
                      <Icon name="CheckCircle" size={18} className="mr-2" />
                      Подтвердить
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setStep('email')}
                  className="w-full"
                >
                  Изменить email
                </Button>
              </CardContent>
            </>
          )}

          {step === 'profile' && (
            <>
              <CardHeader>
                <CardTitle>Создайте профиль</CardTitle>
                <CardDescription>
                  Как вас будут называть в BublikChat?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя</label>
                  <Input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      @
                    </span>
                    <Input
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))
                      }
                      onKeyPress={(e) => e.key === 'Enter' && handleCreateProfile()}
                      className="bg-card border-border pl-8"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleCreateProfile}
                  disabled={!username || !name}
                  className="w-full gradient-primary text-white hover:opacity-90"
                >
                  <Icon name="Sparkles" size={18} className="mr-2" />
                  Начать общение
                </Button>
              </CardContent>
            </>
          )}
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Нажимая кнопку, вы соглашаетесь с условиями использования
        </p>
      </div>
    </div>
  );
}

export default Auth;
