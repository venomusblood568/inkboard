"use client";

import { useRouter } from "next/navigation"; 
import { Pen, Sparkles } from "lucide-react";

export function HeaderComponent() {
 const router = useRouter();

  return (
    <>
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="relative">
                  <Pen className="h-8 w-8 text-purple-400 transform rotate-12" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <span className="ml-3 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Inkbaord
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-600 rounded-full opacity-20 animate-bounce blur-xl"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-500 rounded-full opacity-30 animate-pulse blur-xl"></div>
          <div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-500 rounded-full opacity-25 animate-bounce blur-xl"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Draw Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 animate-pulse">
                {" "}
                Ideas{" "}
              </span>
              Freely
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-medium">
              A simple, beautiful drawing tool for creating diagrams,
              wireframes, and illustrations. Express your creativity in the
              dark! 🎨
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => router.push("/signup")}
                className="hover:cursor-pointer group bg-gradient-to-r from-purple-600 via-cyan-600 to-pink-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-purple-700 hover:via-cyan-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="flex items-center justify-center">
                  Start Drawing
                  <Sparkles className="ml-2 h-6 w-6 group-hover:animate-spin" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
