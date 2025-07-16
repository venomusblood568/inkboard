"use client";
import { Zap, Palette, Download, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation"; 
export function FeaturesComponent(){
   const router = useRouter();
    return (
      <>
        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-gradient-to-br from-gray-900 to-black relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-cyan-900/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Simple Yet
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Powerful
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                Everything you need to bring your ideas to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl hover:shadow-yellow-500/20 transition-all transform hover:scale-105 border border-gray-700 hover:border-yellow-500/50">
                <div className="h-16 w-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                  <Zap className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Lightning Fast ⚡
                </h3>
                <p className="text-gray-400 font-medium">
                  Draw at the speed of thought with smooth, responsive
                  performance.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all transform hover:scale-105 border border-gray-700 hover:border-purple-500/50">
                <div className="h-16 w-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                  <Palette className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Beautiful Colors 🎨
                </h3>
                <p className="text-gray-400 font-medium">
                  Express yourself with unlimited colors and artistic brushes.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all transform hover:scale-105 border border-gray-700 hover:border-blue-500/50">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                  <Download className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Export Anywhere 📤
                </h3>
                <p className="text-gray-400 font-medium">
                  Save your creations as PNG, SVG, or PDF files.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900 via-black to-cyan-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-600 rounded-full opacity-20 animate-bounce blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-500 rounded-full opacity-30 animate-pulse blur-xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to Create Something
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Amazing?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-medium">
              Start bringing your ideas to life with Inkbaord! 🎨✨
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => router.push("/signup")}
                className="hover:cursor-pointer group bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-12 py-6 rounded-2xl text-xl font-black hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-110 shadow-2xl"
              >
                <span className="flex items-center justify-center">
                  Start Drawing Now
                  <Sparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </>
    );
}