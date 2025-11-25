

import './page.css';
export default function Page() {
    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <aside className="sidebar  bg-gray-100 border-r border-gray-300 p-6">
                <div className="avatar mb-4">
                    <img src="/Images/pic0.jpg" alt="avatar" />
                </div>
                <h1 className="text-xl font-semibold mb-4 text-black">Profile</h1>
                <h1 className='text-black mb-4'>-------------------------</h1>
                <ul className='text-black'>
                    <li><button>Personal Detail</button></li>
                    <li><button>Profile Summary</button></li>
                    <li><button>Skills</button></li>
                    <li><button>Saved jobs</button></li>
                    <li><button>Github connect </button></li>


                </ul>
            </aside>


            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Empty for now */}
            </main>
        </div>
    );
}
