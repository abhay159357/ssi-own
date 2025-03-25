
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Verify,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: number;
  type: 'verified' | 'pending' | 'expired' | 'total' | 'uses';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, type }) => {
  
  const getIcon = () => {
    switch (type) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'expired':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'total':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'uses':
        return <ShieldCheck className="h-5 w-5 text-violet-500" />;
      default:
        return <Verify className="h-5 w-5 text-slate-500" />;
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'verified':
        return 'bg-green-50 dark:bg-green-950/30';
      case 'pending':
        return 'bg-amber-50 dark:bg-amber-950/30';
      case 'expired':
        return 'bg-red-50 dark:bg-red-950/30';
      case 'total':
        return 'bg-blue-50 dark:bg-blue-950/30';
      case 'uses':
        return 'bg-violet-50 dark:bg-violet-950/30';
      default:
        return 'bg-slate-50 dark:bg-slate-950/30';
    }
  };

  return (
    <Card className="overflow-hidden glass-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </div>
          <div className={`rounded-full p-2 ${getBgColor()}`}>
            {getIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
