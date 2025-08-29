import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileText, 
  Image,
  File,
  Trash2,
  Download,
  Eye,
  Search,
  Filter,
  FolderOpen,
  CheckCircle
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: string;
  status: 'uploaded' | 'processing' | 'ready';
}

export default function DocumentUpload() {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Resume_John_Doe_2024.pdf',
      type: 'application/pdf',
      size: 245760,
      uploadDate: '2024-01-15',
      category: 'Resume',
      status: 'ready'
    },
    {
      id: '2',
      name: 'Cover_Letter_TechCorp.pdf',
      type: 'application/pdf',
      size: 187520,
      uploadDate: '2024-01-14',
      category: 'Cover Letter',
      status: 'ready'
    },
    {
      id: '3',
      name: 'Portfolio_Screenshots.zip',
      type: 'application/zip',
      size: 1048576,
      uploadDate: '2024-01-12',
      category: 'Portfolio',
      status: 'ready'
    },
    {
      id: '4',
      name: 'Certification_AWS.pdf',
      type: 'application/pdf',
      size: 524288,
      uploadDate: '2024-01-10',
      category: 'Certificate',
      status: 'ready'
    }
  ]);

  const filteredFiles = uploadedFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    setUploading(true);
    setUploadProgress(0);

    for (const file of files) {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        category: getCategoryFromFile(file),
        status: 'ready'
      };

      setUploadedFiles(prev => [newFile, ...prev]);
    }

    setUploading(false);
    setUploadProgress(0);

    toast({
      title: "Upload Complete",
      description: `${files.length} file(s) uploaded successfully`,
    });
  };

  const getCategoryFromFile = (file: File): string => {
    const name = file.name.toLowerCase();
    if (name.includes('resume') || name.includes('cv')) return 'Resume';
    if (name.includes('cover') && name.includes('letter')) return 'Cover Letter';
    if (name.includes('portfolio') || name.includes('project')) return 'Portfolio';
    if (name.includes('certificate') || name.includes('cert')) return 'Certificate';
    if (name.includes('reference') || name.includes('recommendation')) return 'Reference';
    return 'Other';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('image')) return Image;
    return File;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Resume': return 'bg-blue-100 text-blue-800';
      case 'Cover Letter': return 'bg-green-100 text-green-800';
      case 'Portfolio': return 'bg-purple-100 text-purple-800';
      case 'Certificate': return 'bg-orange-100 text-orange-800';
      case 'Reference': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: "File Deleted",
      description: "File has been removed from your library",
    });
  };

  const handleDownloadFile = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}`,
    });
  };

  const handleViewFile = (fileName: string) => {
    toast({
      title: "Opening File",
      description: `Opening ${fileName} in viewer`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Document Library</h1>
        <p className="text-muted-foreground">Upload and manage your job search documents</p>
      </div>

      {/* Upload Area */}
      <Card className={`border-2 border-dashed transition-colors ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
        <CardContent className="p-8">
          <div
            className="text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileSelect}
            data-testid="upload-dropzone"
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
            <p className="text-gray-600 mb-4">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, ZIP (Max 10MB each)
            </p>
            <Button data-testid="button-select-files">
              Select Files
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
          />
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploading && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Uploading files...</span>
              <span className="text-sm text-gray-600">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            data-testid="input-document-search"
          />
        </div>
        <Button variant="outline" data-testid="button-filter-documents">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* File Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['Resume', 'Cover Letter', 'Portfolio', 'Certificate', 'Other'].map((category) => {
          const count = uploadedFiles.filter(f => f.category === category).length;
          return (
            <Card key={category} className="text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <FolderOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <h4 className="font-medium text-sm mb-1">{category}</h4>
                <p className="text-xs text-gray-500">{count} files</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Documents ({filteredFiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFiles.length > 0 ? (
            <div className="space-y-4">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <FileIcon className="h-8 w-8 text-gray-400" />
                      <div>
                        <h4 className="font-medium text-sm">{file.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${getCategoryColor(file.category)}`}>
                            {file.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{file.uploadDate}</span>
                          {file.status === 'ready' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewFile(file.name)}
                        data-testid={`button-view-${file.id}`}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadFile(file.name)}
                        data-testid={`button-download-${file.id}`}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteFile(file.id)}
                        data-testid={`button-delete-${file.id}`}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No documents found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
              </p>
              {!searchTerm && (
                <Button onClick={handleFileSelect} data-testid="button-upload-first">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{uploadedFiles.length}</div>
            <p className="text-sm text-muted-foreground">Total Files</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatFileSize(uploadedFiles.reduce((sum, file) => sum + file.size, 0))}
            </div>
            <p className="text-sm text-muted-foreground">Storage Used</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.5 GB</div>
            <p className="text-sm text-muted-foreground">Storage Available</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}