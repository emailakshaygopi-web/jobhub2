import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone,
  Building,
  Calendar,
  Edit,
  Trash2,
  MessageSquare,
  Filter
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: string;
  lastContact: string;
  notes: string;
}

export default function ContactManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    notes: ''
  });
  const { toast } = useToast();

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'Senior Hiring Manager',
      status: 'Active',
      lastContact: '2024-01-15',
      notes: 'Initial contact made. Interested in full-stack position.'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mchen@startupxyz.com',
      phone: '+1 (555) 987-6543',
      company: 'StartupXYZ',
      position: 'CTO',
      status: 'Follow-up needed',
      lastContact: '2024-01-10',
      notes: 'Discussed React expertise. Schedule technical interview next week.'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'e.rodriguez@innovacorp.com',
      phone: '+1 (555) 456-7890',
      company: 'InnovaCorp',
      position: 'Talent Acquisition Specialist',
      status: 'Contacted',
      lastContact: '2024-01-12',
      notes: 'Sent resume. Waiting for feedback on frontend developer role.'
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) {
      toast({
        title: "Missing Information",
        description: "Name and email are required fields",
        variant: "destructive",
      });
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact,
      status: 'New',
      lastContact: new Date().toISOString().split('T')[0]
    };

    setContacts([contact, ...contacts]);
    setNewContact({ name: '', email: '', phone: '', company: '', position: '', notes: '' });
    setShowAddForm(false);

    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to your contacts`,
    });
  };

  const handleSendEmail = (contact: Contact) => {
    toast({
      title: "Email Sent",
      description: `Follow-up email sent to ${contact.name}`,
    });
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(c => c.id !== contactId));
    toast({
      title: "Contact Deleted",
      description: "Contact has been removed from your list",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Follow-up needed': return 'bg-orange-100 text-orange-800';
      case 'Contacted': return 'bg-blue-100 text-blue-800';
      case 'New': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Management</h1>
          <p className="text-muted-foreground">Manage your professional network and relationships</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-contact">
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts, companies, or emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-contact-search"
          />
        </div>
        <Button variant="outline" data-testid="button-filter-contacts">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Add Contact Form */}
      {showAddForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name *"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                data-testid="input-contact-name"
              />
              <Input
                placeholder="Email Address *"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                data-testid="input-contact-email"
              />
              <Input
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                data-testid="input-contact-phone"
              />
              <Input
                placeholder="Company"
                value={newContact.company}
                onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                data-testid="input-contact-company"
              />
              <Input
                placeholder="Position/Title"
                value={newContact.position}
                onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                data-testid="input-contact-position"
              />
            </div>
            <Textarea
              placeholder="Notes (optional)"
              value={newContact.notes}
              onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
              rows={3}
              data-testid="input-contact-notes"
            />
            <div className="flex gap-3">
              <Button onClick={handleAddContact} data-testid="button-save-contact">
                Save Contact
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} data-testid="button-cancel-add">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contacts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{contact.position}</p>
                  <p className="text-sm text-muted-foreground font-medium">{contact.company}</p>
                </div>
                <Badge className={`text-xs ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{contact.email}</span>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{contact.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last contact: {contact.lastContact}</span>
                </div>
              </div>
              
              {contact.notes && (
                <div className="bg-gray-50 p-2 rounded text-sm">
                  <p className="text-muted-foreground">{contact.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleSendEmail(contact)}
                  data-testid={`button-email-${contact.id}`}
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  data-testid={`button-edit-${contact.id}`}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleDeleteContact(contact.id)}
                  data-testid={`button-delete-${contact.id}`}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No contacts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Start building your professional network'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowAddForm(true)} data-testid="button-add-first-contact">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Contact
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{contacts.length}</div>
            <p className="text-sm text-muted-foreground">Total Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {contacts.filter(c => c.status === 'Active').length}
            </div>
            <p className="text-sm text-muted-foreground">Active Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {contacts.filter(c => c.status === 'Follow-up needed').length}
            </div>
            <p className="text-sm text-muted-foreground">Need Follow-up</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(contacts.map(c => c.company)).size}
            </div>
            <p className="text-sm text-muted-foreground">Companies</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}