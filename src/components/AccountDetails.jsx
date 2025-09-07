import { useState } from 'react';
import { IoPersonOutline, IoHeartOutline, IoBagOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';

// Import actual images
import img1 from '../assets/img.jpg';

const AccountDetails = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: img1,
    joinDate: 'January 2024'
  });

  const [favorites] = useState([
    { id: 1, name: 'Abstract Doodle Set', image: img1 },
    { id: 2, name: 'Nature Sketch Collection', image: img1 }
  ]);

  const [orders] = useState([
    { id: 'ORD-001', date: '2024-01-15', status: 'Delivered', total: 29.99 },
    { id: 'ORD-002', date: '2024-01-10', status: 'Processing', total: 49.99 }
  ]);

  const menuItems = [
    { id: 'profile', icon: IoPersonOutline, label: 'Profile' },
    { id: 'favorites', icon: IoHeartOutline, label: 'Favorites' },
    { id: 'orders', icon: IoBagOutline, label: 'Orders' },
    { id: 'settings', icon: IoSettingsOutline, label: 'Settings' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-gray-600">Orders</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-gray-600">Favorites</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-gray-900">₹349</div>
                <div className="text-gray-600">Spent</div>
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Favorites</h2>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <IoHeartOutline className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No favorites yet</p>
              </div>
            )}
          </div>
        );

      case 'orders':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order History</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-gray-600 text-sm">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{order.total}</p>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-gray-700">Order updates</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Promotional emails</span>
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Privacy</h3>
                <button className="text-red-600 hover:text-red-800 font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-orange-50 to-white">
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="text-lg" />
                      {item.label}
                    </button>
                  );
                })}
                
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-6">
                  <IoLogOutOutline className="text-lg" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;