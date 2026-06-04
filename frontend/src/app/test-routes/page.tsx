'use client';

import Link from 'next/link';

export default function TestRoutesPage() {
  const routes = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Leads', path: '/dashboard/leads' },
    { name: 'Customers', path: '/dashboard/customers' },
    { name: 'Projects', path: '/dashboard/projects' },
    { name: 'Inventory', path: '/dashboard/inventory' },
    { name: 'Finance', path: '/dashboard/finance' },
    { name: 'Documents', path: '/dashboard/documents' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Route Testing Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Available Routes</h2>
          
          <div className="grid gap-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <span className="font-medium">{route.name}</span>
                <code className="text-sm text-gray-600">{route.path}</code>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Note:</h3>
          <p className="text-sm text-yellow-800">
            Some routes may show 404 if the page hasn't been created yet. 
            This is normal. The middleware will protect these routes once you're logged in.
          </p>
        </div>
      </div>
    </div>
  );
}
