import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Crown, Hand, MessageCircle } from 'lucide-react';
import io from 'socket.io-client';
import PDFViewer from './components/PDFViewer';

const UserRole = {
  ADMIN: 'ADMIN',
  VIEWER: 'VIEWER'
};

const socket = io('https://pdf-coviewer-1.onrender.com');

const PDFCoViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Initialize with 0
  const [userRole, setUserRole] = useState(UserRole.VIEWER);
  const [activeUsers] = useState(5);
  const [raisedHands, setRaisedHands] = useState(new Set());
  const [handRaised, setHandRaised] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [userId, setUserId] = useState(null);

  const isAdmin = userRole === UserRole.ADMIN;

  useEffect(() => {
    socket.on('connect', () => {
      // Set the unique user ID received from the server
      socket.on('userId', (id) => {
        setUserId(id);
      });
    });

    socket.on('pageChanged', (page) => {
      setCurrentPage(page);
    });

    socket.on('raisedHandsChanged', (hands) => {
      setRaisedHands(new Set(hands));
    });

    return () => {
      socket.off('connect');
      socket.off('userId');
      socket.off('pageChanged');
      socket.off('raisedHandsChanged');
    };
  }, []);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages || (!isAdmin)) return;
    socket.emit('changePage', newPage);
    setCurrentPage(newPage);
    addNotification(`Page changed to ${newPage}`);
  };

  const toggleRole = () => {
    setUserRole(current => 
      current === UserRole.ADMIN ? UserRole.VIEWER : UserRole.ADMIN
    );
    addNotification(`Switched to ${userRole === UserRole.ADMIN ? 'viewer' : 'admin'} mode`);
  };

  const toggleHandRaise = () => {
    if (isAdmin) return;
    setHandRaised(current => !current);
    socket.emit('toggleHandRaise', userId); // Use the unique user ID
  };

  const addNotification = (message) => {
    setNotifications(current => [...current, message]);
    setTimeout(() => {
      setNotifications(current => current.slice(1));
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">PDF Co-viewer</h1>
            <button 
              onClick={toggleRole}
              className="flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isAdmin ? (
                <>
                  <Crown className="w-4 h-4 mr-1 text-yellow-600" />
                  <span className="text-sm">Admin Mode</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-1 text-blue-600" />
                  <span className="text-sm">Viewer Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span>{activeUsers} viewers</span>
            </div>
            {isAdmin && (
              <div className="flex items-center space-x-2">
                <Hand className="w-5 h-5 text-yellow-600" />
                <span>{raisedHands.size} raised</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">
          <PDFViewer 
            pageNum={currentPage} 
            scale={0.8} 
            url="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" 
            setTotalPages={setTotalPages} // Pass the setTotalPages function
          /> 

          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={!isAdmin || currentPage === 1}
                className={`p-2 rounded-full ${
                  isAdmin && currentPage !== 1
                    ? 'hover:bg-gray-100 text-gray-700'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={!isAdmin || currentPage === totalPages}
                className={`p-2 rounded-full ${
                  isAdmin && currentPage !== totalPages
                    ? 'hover:bg-gray-100 text-gray-700'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {!isAdmin && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleHandRaise}
                  className={`p-2 rounded-full transition-colors ${
                    handRaised
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Hand className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 space-y-2">
        {!isAdmin && (
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            Following presenter's screen
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFCoViewer;