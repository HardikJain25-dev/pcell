export default function Footer() {
  return (
    <footer className="bg-white/5  text-black pb-24 py-16 px-6 md:px-20 relative min-h-[25vh] flex flex-col justify-end overflow-hidden">

      {/* Background text - positioned absolutely behind content */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:flex-wrap md:grid md:grid-cols-3 gap-10 text-sm z-10 relative">
        {/* Logo and Copyright */}
        <div className="space-y-4 text-center sm:text-left md:col-span-1 sm:w-full md:w-auto"> {/* sm:w-full to ensure it takes full width on small screens if flex-wrap causes issues */}
          <div className="flex items-center space-x-2 justify-center sm:justify-start">
            <div className="bg-white text-black rounded p-1">
              <span className="font-bold text-sm">PCELL</span>
            </div>
            <span className="font-semibold">SLC</span>
          </div>
          <p className="text-gray-400 text-xs">
            © copyright Placement Cell SLC 2025. All rights reserved.
          </p>
        </div>

        {/* Pages */}
        <div className="text-center sm:text-left flex-1 min-w-[150px]"> {/* flex-1 and min-w to help with wrapping on smaller screens */}
          <h4 className="text-black font-semibold mb-2 ">Pages</h4>
          <ul className="flex flex-wrap justify-center sm:justify-start gap-x-4"> {/* Make UL a flex container for horizontal items */}
            <li><a href="/" className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]">Home</a></li>
            <li><a href="/about" className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]">About</a></li>
            <li><a href="/events" className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]">Events</a></li>
            <li><a href="/team" className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]">Teams</a></li>
            <li><a href="/recruiter" className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]">Recruiter</a></li>
            <li><a href="/drive" className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]">Drive</a></li>
            
          </ul>
        </div>

        {/* Socials */}
        <div className="text-center sm:text-left flex-1 min-w-[150px]"> {/* flex-1 and min-w to help with wrapping on smaller screens */}
          <h4 className="text-black font-semibold mb-2">Socials</h4>
          <ul className="flex flex-wrap justify-center sm:justify-start gap-x-4"> {/* Make UL a flex container for horizontal items */}
            <li>
              <a
                href="https://www.linkedin.com/company/training-and-placement-cell-shyam-lal-college/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/placementcellslc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="mailto:traningandplacementcell@shaymlal.du.ac.in"
                className="inline-flex items-center hover:scale-105 transition-transform duration-200 ease-out hover:text-[#37322F]"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
        <div className="font-libre font-light relative text-transparent bg-clip-text bg-radial-[at_5%_5%] from-white to-zinc-900 to-75% top-1 pb-1 inset-0 flex justify-center items-center text-[7vw] md:text-[7vw]  select-none pointer-events-none z-0">
        Traning and Placement Cell
      </div>
      
    </footer>
  );
}


// a tag is itself in line block css of scale transition dosent apply to it 