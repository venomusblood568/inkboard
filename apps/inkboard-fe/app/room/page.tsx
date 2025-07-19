"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, LogOut, User, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

type RoomType = {
  slug: string;
};

export default function CreateRoom() {
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");
  const [joinCode, setJoinCode] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  // Get username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  // Logout handler
  const logouthandler = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  // Fetch room list
 const fetchRooms = async () => {
   const token = localStorage.getItem("token");
   if (!token) return;

   try {
     const res = await fetch("http://localhost:8181/api/roomlist", {
       headers: { Authorization: `Bearer ${token}` },
     });
     const data = await res.json();
     if (res.ok && data.rooms) setRooms(data.rooms);
   } catch (error) {
     console.error("Fetch error:", error);
   }
 };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Create room
  const createRoomHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found");
      return;
    }

    try {
      const res = await fetch("http://localhost:8181/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: roomName }),
      });

      const data = await res.json();
      if (res.ok && data.room) {
        setRooms((prev) => [...prev, data.room]);
        setRoomName("");
      } 
    } catch (error) {
      console.error("Create room error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-600/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-600/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
            Rooms
          </h1>
        </div>

        {/* User Info & Logout */}
        <div className="flex justify-between items-center mb-8 bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">
                {username ?? "Loading..."}
              </p>
              <p className="text-gray-400 text-sm">Welcome back!</p>
            </div>
          </div>
          <button
            onClick={logouthandler}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl transition-all border border-red-600/30"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Create & Join Room */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Create */}
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-purple-400">
              Create Room
            </h3>
            <form onSubmit={createRoomHandler} className="space-y-4">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Room
              </button>
            </form>
          </div>

          {/* Join */}
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-cyan-400">
              Join Room
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter room code"
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all flex items-center justify-center"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Join Room
              </button>
            </form>
          </div>
        </div>

        {/* Room List */}
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-white">Your Rooms</h3>
          {rooms.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No rooms yet. Create your first room!
            </div>
          ) : (
            <div className="space-y-3">
              {rooms.map((room) => (
                <div
                  key={room.slug}
                  className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800/70 transition-all"
                >
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {room.slug}
                    </h4>
                    <p className="text-gray-400 text-sm">Code: {room.slug}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Open
                    </button>
                    <button className="text-red-400 hover:text-red-300 p-2 hover:bg-red-900/20 rounded-lg transition-all">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
