import React, { useState } from 'react';
import { Search, Send, MessageCircle, Calendar, MapPin } from 'lucide-react';

interface Booking {
  id: string;
  title: string;
  location: string;
  dates: string;
  status: 'active' | 'upcoming' | 'completed';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system';
}

interface MessagesPageProps {
  userRole: 'guest' | 'host';
}

const MessagesPage: React.FC<MessagesPageProps> = ({ userRole }) => {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Empty arrays - replace with actual API calls
  const bookings: Booking[] = [];
  const messages: Message[] = [];

  const filteredBookings = bookings.filter(booking =>
    booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedBooking = selectedBookingId ? bookings.find(b => b.id === selectedBookingId) : null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedBookingId) return;

    // Here you would send the message to your API
    console.log('Sending message:', newMessage, 'to booking:', selectedBookingId);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex bg-white rounded-lg shadow overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 border-b bg-white">
          <h2 className="text-lg font-semibold mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {filteredBookings.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No conversations yet</p>
              <p className="text-sm mt-1">Messages will appear here when you have bookings</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-4 border-b cursor-pointer hover:bg-white transition-colors ${
                  selectedBookingId === booking.id ? 'bg-white border-l-4 border-l-primary-500' : ''
                }`}
                onClick={() => setSelectedBookingId(booking.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm text-gray-900 line-clamp-1">
                    {booking.title}
                  </h3>
                  {booking.unreadCount! > 0 && (
                    <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {booking.unreadCount}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="line-clamp-1">{booking.location}</span>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{booking.dates}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  <span className="text-xs text-gray-400">{booking.lastMessageTime}</span>
                </div>

                {booking.lastMessage && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                    {booking.lastMessage}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedBooking ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <h3 className="font-semibold text-gray-900">{selectedBooking.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="mr-4">{selectedBooking.location}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span>{selectedBooking.dates}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No messages yet</p>
                    <p className="text-sm">Start the conversation!</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === 'system' 
                        ? 'justify-center' 
                        : message.senderName === 'You' 
                          ? 'justify-end' 
                          : 'justify-start'
                    }`}
                  >
                    {message.type === 'system' ? (
                      <div className="bg-gray-100 text-gray-600 text-sm px-3 py-2 rounded-lg">
                        {message.content}
                      </div>
                    ) : (
                      <div className={`max-w-xs lg:max-w-md ${
                        message.senderName === 'You' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-900'
                      } rounded-lg px-4 py-2`}>
                        {message.senderName !== 'You' && (
                          <p className="text-xs font-medium mb-1">{message.senderName}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderName === 'You' ? 'text-primary-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations</h3>
              <p className="text-gray-500">Your messages will appear here when you have bookings</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage; 