
import React from 'react';

interface QRCodeProps {
  data: string;
  size?: number;
  title?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ data, size = 180, title }) => {
  // In a real application, this would use a QR code generation library
  // For now we'll create a visual representation
  return (
    <div className="flex flex-col items-center">
      <div 
        className="border-4 border-primary rounded-lg p-3 bg-white"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div className="w-full h-full bg-primary/5 rounded flex items-center justify-center">
          <div className="space-y-1">
            {/* This is a visual placeholder for a real QR code */}
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm border border-primary"></div>
              <div className="w-4 h-4 bg-white rounded-sm border border-primary"></div>
              <div className="w-4 h-4 bg-white rounded-sm border border-primary"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm border border-primary"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm border border-primary"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm border border-primary"></div>
              <div className="w-4 h-4 bg-white rounded-sm border border-primary"></div>
              <div className="w-4 h-4 bg-white rounded-sm border border-primary"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
      {title && <p className="text-sm font-medium mt-2">{title}</p>}
    </div>
  );
};

export default QRCode;
