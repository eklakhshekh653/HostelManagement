import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-semibold">StudentManagement</h2>
                        <p className="mt-1 text-sm text-gray-400">Empowering Students, Enabling Success</p>
                        <p className="mt-1 text-sm text-gray-400">&copy; {new Date().getFullYear()} StudentManagement. All rights reserved.</p>
                    </div>

                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                        <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">
                            Developed and Maintained by 
                            <a 
                                href="https://www.example.com"
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-400 hover:underline ml-1"
                            >
                                Sheikh Eklakh
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
