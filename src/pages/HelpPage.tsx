import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Home, Users, CreditCard, Shield, Settings, MessageCircle, Mail, Calendar } from 'lucide-react';

const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Home className="w-5 h-5" />,
      questions: [
        {
          question: 'What is ShareNest?',
          answer: 'ShareNest is an online rental platform that connects homeseekers with verified landlords. We help both tenants and hosts achieve their renting goals — quick, online, and 100% safe.',
          links: [{ text: 'Sign Up Now', path: '/signup' }]
        },
        {
          question: 'Is ShareNest a real estate agency?',
          answer: 'No, ShareNest is a digital platform that facilitates connections between tenants and landlords. We provide the technology and safety measures, but we\'re not a traditional real estate agency.',
          links: []
        },
        {
          question: 'How do I create an account?',
          answer: 'Click "SignUp" in the navigation bar and fill out the registration form. Choose whether you\'re looking for a room or listing a space.',
          links: [{ text: 'Sign Up Now', path: '/signup' }]
        },
        {
          question: 'How do I verify my account?',
          answer: 'After signing up, check your email for a verification link. Click the link to verify your account and access all features.',
          links: []
        }
      ]
    },
    {
      id: 'renting-process',
      title: 'How to Rent',
      icon: <Search className="w-5 h-5" />,
      questions: [
        {
          question: 'How do I rent a place on ShareNest?',
          answer: 'Search for properties using our filters, contact the landlord through our messaging system, schedule a viewing if needed, and complete the booking process with secure payment.',
          links: [{ text: 'Start Searching', path: '/' }]
        },
        {
          question: 'How do I search for properties?',
          answer: 'Use the search form on the homepage to enter your desired location, move-in/move-out dates, and number of occupants. Browse the results and use filters to narrow down your options.',
          links: [{ text: 'Search Properties', path: '/' }]
        },
        {
          question: 'Can I filter search results?',
          answer: 'Yes! Use our advanced filters to narrow down results by price range, property type, amenities, location, and more to find exactly what you\'re looking for.',
          links: [{ text: 'Search Properties', path: '/' }]
        },
        {
          question: 'How do I contact a landlord?',
          answer: 'Once you find a property you like, click "Contact Host" to send a message. You can ask questions about the property, availability, or arrange a viewing.',
          links: []
        }
      ]
    },
    {
      id: 'payments-billing',
      title: 'Payments & Billing',
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          question: 'How is rent calculated for the first and last months?',
          answer: 'Rent is calculated based on your actual move-in and move-out dates. If you move in mid-month, you\'ll pay a prorated amount for that month. Last month\'s rent follows the same principle.',
          links: []
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept major credit cards, debit cards, and bank transfers. All payments are processed securely through our encrypted payment system with industry-standard protection.',
          links: []
        },
        {
          question: 'When do I pay rent and fees?',
          answer: 'Initial payment (first month + deposit) is due when booking is confirmed. Monthly rent is typically due on the 1st of each month, but specific terms are set by each landlord.',
          links: []
        },
        {
          question: 'Are there any additional fees?',
          answer: 'ShareNest charges a small service fee for each booking. Additional costs may include security deposits, cleaning fees, or utility setup fees as specified by the landlord.',
          links: []
        }
      ]
    },
    {
      id: 'tenant-protection',
      title: 'Tenant Protection & Safety',
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: 'What is Tenant Protection, and when do I pay for it?',
          answer: 'Tenant Protection is our comprehensive coverage that protects your deposit and ensures safe transactions. The protection fee is included in your booking and covers dispute resolution and deposit guarantee.',
          links: []
        },
        {
          question: 'How are landlords verified?',
          answer: 'All landlords undergo identity verification and property ownership confirmation. We encourage reviews from previous tenants and display verification badges on profiles.',
          links: []
        },
        {
          question: 'Is my personal information safe?',
          answer: 'Yes, we use industry-standard encryption to protect your data. We never share your personal information without your consent and comply with all data protection regulations.',
          links: [{ text: 'Privacy Policy', path: '/privacy-policy' }]
        },
        {
          question: 'What should I do if I have safety concerns?',
          answer: 'Contact our support team immediately if you have any safety concerns. We take all reports seriously and will investigate promptly. Use our in-app messaging for all communications.',
          links: []
        }
      ]
    },
    {
      id: 'bookings-cancellations',
      title: 'Bookings & Cancellations',
      icon: <Calendar className="w-4 h-4" />,
      questions: [
        {
          question: 'How do I make a booking?',
          answer: 'After finding a suitable property, select your dates, review the total cost, and click "Book Now". Complete payment to secure your reservation and wait for landlord confirmation.',
          links: [{ text: 'View My Bookings', path: '/guest/bookings' }]
        },
        {
          question: 'Cancellation policies for tenants',
          answer: 'Cancellation policies vary by property and are clearly displayed before booking. Most bookings allow free cancellation up to 48 hours before move-in, but check specific terms for each property.',
          links: [{ text: 'Manage Bookings', path: '/guest/bookings' }]
        },
        {
          question: 'Can I modify my booking dates?',
          answer: 'Date modifications depend on availability and the landlord\'s approval. Contact the landlord through our messaging system to discuss changes. Additional fees may apply.',
          links: [{ text: 'My Messages', path: '/guest/messages' }]
        },
        {
          question: 'What happens if my booking is rejected?',
          answer: 'If a landlord rejects your booking, you\'ll receive a full refund within 3-5 business days. We\'ll also help you find alternative accommodations that match your criteria.',
          links: []
        }
      ]
    },
    {
      id: 'account-notifications',
      title: 'Account & Notifications',
      icon: <Settings className="w-5 h-5" />,
      questions: [
        {
          question: 'How can I enable or disable SMS notifications?',
          answer: 'Go to your profile settings and navigate to "Notification Preferences". You can customize email and SMS notifications for booking updates, messages, and promotional content.',
          links: [{ text: 'Edit Profile', path: '/guest/profile' }]
        },
        {
          question: 'How do I update my profile?',
          answer: 'Go to your profile page from the user menu in the navigation bar. You can update your personal information, profile photo, contact details, and notification preferences.',
          links: [{ text: 'Edit Profile', path: '/guest/profile' }]
        },
        {
          question: 'How do I change my password?',
          answer: 'Visit your profile settings and click "Change Password". Enter your current password and choose a new secure password. You\'ll receive a confirmation email.',
          links: []
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can delete your account from the profile settings. Note that this action is permanent and cannot be undone. Any active bookings must be resolved first.',
          links: []
        }
      ]
    }
  ];

  const filteredSections = helpSections.map(section => ({
    ...section,
    questions: section.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help you?</h1>
            <p className="text-xl text-purple-100 mb-8">Find answers to common questions about ShareNest</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search for help topics..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-purple-300 text-neutral-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No help topics found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredSections.map((section) => (
                <div key={section.id} className="bg-white rounded-xl shadow-sm border border-neutral-200">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-600">{section.icon}</div>
                      <h2 className="text-xl font-semibold text-neutral-900">{section.title}</h2>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                  </button>
                  
                  {expandedSections.includes(section.id) && (
                    <div className="px-6 pb-6">
                      <div className="space-y-4">
                        {section.questions.map((qa, index) => (
                          <div key={index} className="border-l-4 border-purple-200 pl-4">
                            <h3 className="font-medium text-neutral-900 mb-2">{qa.question}</h3>
                            <p className="text-neutral-700 mb-3">{qa.answer}</p>
                            {qa.links.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {qa.links.map((link, linkIndex) => (
                                  <Link
                                    key={linkIndex}
                                    to={link.path}
                                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
                                  >
                                    {link.text}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white border-t border-neutral-200">
        <div className="container-custom py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Still need help?</h2>
            <p className="text-neutral-600 mb-8">Our support team is here to help you with any questions</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="p-6 border border-neutral-200 rounded-xl">
                <MessageCircle className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
                <h3 className="font-semibold text-neutral-900 mb-2">Live Chat</h3>
                <p className="text-neutral-600 text-sm mb-4">Chat with our support team in real-time</p>
                <div className="bg-neutral-100 text-neutral-600 px-4 py-2 rounded-lg">
                  Coming Soon
                </div>
              </div>
              
              <div className="p-6 border border-neutral-200 rounded-xl">
                <Mail className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-neutral-900 mb-2">Email Support</h3>
                <p className="text-neutral-600 text-sm mb-4">Get detailed help via email</p>
                <a 
                  href="mailto:support@sharenest.com"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 