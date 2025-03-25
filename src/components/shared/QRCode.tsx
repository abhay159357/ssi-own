
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface QRCodeProps {
  data: string;
  size?: number;
  title?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ data, size = 200, title }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    // In a real app, we would use a QR code library directly.
    // For this demo, we'll use an external API
    const encodedData = encodeURIComponent(data);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`);
  }, [data, size]);

  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center">
        {title && <p className="text-sm font-medium mb-4">{title}</p>}
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <img 
            src={qrCodeUrl} 
            alt="QR Code" 
            width={size} 
            height={size} 
            className="object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCode;
