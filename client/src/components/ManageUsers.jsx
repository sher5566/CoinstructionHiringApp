import { useState, useEffect } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/users");
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setError(data.message);
        } else {
          setUsers(data);
          setLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserDelete = async (userId) => {
    try {
      const res = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      } else {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-700">{error}</p>;

  return (
    <div className="p-3 pt-10 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Manage Users</h1>
      <div className="flex flex-col gap-4">
        {users
          .filter((user) => !user.isAdmin)
          .map((user) => (
            <div
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
              key={user._id}
            >
              <div className="flex-1">
                <div className="flex gap-2">
                  <img
                    className="rounded-full h-7 w-7 object-cover hidden sm:inline"
                    src={user.avatar}
                    alt="profile"
                  />
                  <p className="font-semibold">{user.username}</p>
                </div>

                <p className="text-slate-700">{user.email}</p>
               
              </div>
              <button
                onClick={() => handleUserDelete(user._id)}
                className="text-red-700 uppercase"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
