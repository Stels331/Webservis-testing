"use client";

export default function LogoutButton() {
  const handleLogout = () => {
    // Здесь можно добавить очистку локального состояния, если нужно
    window.location.href = '/'; // Перенаправляем на главную страницу
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Выйти
    </button>
  );
}
