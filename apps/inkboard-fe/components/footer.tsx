import { Heart, Github, Linkedin, Mail, Globe } from "lucide-react";

export function FooterComponent(){
    return (
      <>
        <footer className="bg-black text-white py-10 border-t border-gray-800 text-center">
          <p className="text-gray-500 font-medium">
            © 2025 Inkboard. Made with{" "}
            <Heart className="inline h-4 w-4 text-red-500 mx-1" /> and
            creativity.
          </p>

          <div className="mt-4 flex justify-center items-center space-x-4">
            <a
              href="https://github.com/venomusblood568"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors cursor-pointer"
            >
              <Github className="h-5 w-5 text-white" />
            </a>

            <a
              href="https://www.linkedin.com/in/gourav-anand-jha/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
            <a
              href="mailto:gouravanand0354@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors cursor-pointer"
            >
              <Mail className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://gourav-duck.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-orange-600 rounded-full hover:bg-orange-700 transition-colors cursor-pointer"
            >
              <Globe className="h-5 w-5 text-white" />
            </a>
          </div>
        </footer>
      </>
    );
}