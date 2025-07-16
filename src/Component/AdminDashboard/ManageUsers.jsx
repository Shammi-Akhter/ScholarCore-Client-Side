import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from '../ModeratorDashboard/ConfirmModal';

const ROLES = ['user', 'moderator', 'admin'];

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteUser, setPendingDeleteUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://scholarcore.vercel.app/users');
      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (user, newRole) => {
    if (user.role === newRole) return;
    try {
      const res = await fetch(`https://scholarcore.vercel.app/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        toast.success('Role updated!');
        setUsers(users.map(u => u._id === user._id ? { ...u, role: newRole } : u));
      } else {
        toast.error('Failed to update role');
      }
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = (user) => {
    setPendingDeleteUser(user);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteUser) return;
    const res = await fetch(`https://scholarcore.vercel.app/users/${pendingDeleteUser._id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users.filter(u => u._id !== pendingDeleteUser._id));
      toast.success('User deleted!');
    } else {
      toast.error('Failed to delete user');
    }
    setConfirmOpen(false);
    setPendingDeleteUser(null);
  };

  const filteredUsers = roleFilter === 'all' ? users : users.filter(u => u.role === roleFilter);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Users</h2>
        <div>
          <label className="mr-2 font-medium">Filter by Role:</label>
          <select
            className="input input-bordered"
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option value="all">All</option>
            {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
          </select>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-amber-100">
              <th className="p-2">User Name</th>
              <th className="p-2">User Email</th>
              <th className="p-2">User Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td className="p-2">{user.displayName || '-'}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <div className="relative inline-block">
                    <button className="px-3 py-1 bg-gray-100 rounded cursor-pointer font-semibold" tabIndex={0}>
                      {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Unknown'}
                    </button>
                    <select
                      className="absolute left-0 top-full mt-1 input input-bordered w-32 z-10"
                      value={user.role || ''}
                      onChange={e => handleRoleChange(user, e.target.value)}
                    >
                      {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                    </select>
                  </div>
                </td>
                <td className="p-2">
                  <button className="btn btn-xs bg-red-100 text-red-700" onClick={() => handleDelete(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setPendingDeleteUser(null); }}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
} 