export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-gray-100">
        <aside className="w-64 bg-gray-800 text-white fixed h-full p-4">
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="/admin" className="hover:text-yellow-400">Dashboard</a></li>
            <li><a href="/admin/users" className="hover:text-yellow-400">Người dùng</a></li>
          </ul>
        </aside>
        <main className="ml-64 p-6">{children}</main>
      </div>
    );
  }
  