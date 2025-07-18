"use client"
import React from "react";
import { Plus, Users, Trash2, LogIn, LogOut, User } from "lucide-react";

export default function CreateRoom() {
  const [roomName, setRoomName] = React.useState("");
  const [joinCode, setJoinCode] = React.useState("");
  const [userName] = React.useState("John Doe");
  const [rooms, setRooms] = React.useState([
    {
      id: 1,
      name: "Design Brainstorm",
      code: "ABC123",
      participants: 3,
    },
    {
      id: 2,
      name: "Project Planning",
      code: "XYZ789",
      participants: 5,
    },
  ]);

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      const newRoom = {
        id: rooms.length + 1,
        name: roomName,
        code: generateRoomCode(),
        participants: 1,
      };
      setRooms([newRoom, ...rooms]);
      setRoomName("");
    }
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim()) {
      const room = rooms.find(
        (r) => r.code.toLowerCase() === joinCode.toLowerCase()
      );
      if (room) {
        alert(`Joined: ${room.name}`);
        setJoinCode("");
      } else {
        alert("Room not found");
      }
    }
  };

  const deleteRoom = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with Name and Logout */}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
            Rooms
          </h1>
        </div>
        <div className="flex justify-between items-center mb-8 bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">{userName}</p>
              <p className="text-gray-400 text-sm">Welcome back!</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl transition-all border border-red-600/30">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Create & Join Forms */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Create Room */}
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-purple-400">
              Create Room
            </h3>
            <form onSubmit={createRoom} className="space-y-4">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
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

          {/* Join Room */}
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-cyan-400">
              Join Room
            </h3>
            <form onSubmit={joinRoom} className="space-y-4">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter room code"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
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
                  key={room.id}
                  className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800/70 transition-all"
                >
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {room.name}
                    </h4>
                    
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Open
                    </button>
                    <button
                      onClick={() => deleteRoom(room.id)}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-900/20 rounded-lg transition-all"
                    >
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
