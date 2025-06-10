// ContentUploadForm.jsx import React, { useState } from 'react'; import { v4 as uuidv4 } from 'uuid'; import { Card, CardContent } from '@/components/ui/card'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Textarea } from '@/components/ui/textarea';

const ContentUploadForm = () => { const [message, setMessage] = useState(''); const [file, setFile] = useState(null); const [generatedLink, setGeneratedLink] = useState('');

const handleSubmit = async (e) => { e.preventDefault();

const contentId = uuidv4();
const formData = new FormData();
formData.append('contentId', contentId);
formData.append('message', message);
if (file) formData.append('file', file);

// API call to upload content to your backend (you will build this)
const res = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

if (res.ok) {
  setGeneratedLink(`${window.location.origin}/view/${contentId}`);
} else {
  alert('Upload failed');
}

};

return ( <Card className="max-w-md mx-auto mt-10 p-6"> <CardContent> <h2 className="text-xl font-bold mb-4">Share Secure Content</h2> <form onSubmit={handleSubmit} className="space-y-4"> <Textarea placeholder="Write a message..." value={message} onChange={(e) => setMessage(e.target.value)} /> <Input type="file" accept="image/,video/,audio/*" onChange={(e) => setFile(e.target.files[0])} /> <Button type="submit" className="w-full">Generate Link</Button> </form>

{generatedLink && (
      <div className="mt-4">
        <p className="text-green-500 font-medium">Your link:</p>
        <a href={generatedLink} className="text-blue-600 underline break-words">{generatedLink}</a>
      </div>
    )}
  </CardContent>
</Card>

); };

export default ContentUploadForm;

