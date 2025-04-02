
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Shield,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

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
        return <Shield className="h-5 w-5 text-slate-500" />;
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

  const getGradientBorder = () => {
    switch (type) {
      case 'verified':
        return 'before:bg-gradient-to-r before:from-green-300 before:to-green-500';
      case 'pending':
        return 'before:bg-gradient-to-r before:from-amber-300 before:to-amber-500';
      case 'expired':
        return 'before:bg-gradient-to-r before:from-red-300 before:to-red-500';
      case 'total':
        return 'before:bg-gradient-to-r before:from-blue-300 before:to-blue-500';
      case 'uses':
        return 'before:bg-gradient-to-r before:from-violet-300 before:to-violet-500';
      default:
        return 'before:bg-gradient-to-r before:from-slate-300 before:to-slate-500';
    }
  };

  const getHoverDescription = () => {
    switch (type) {
      case 'verified':
        return 'Credentials that have been fully verified by trusted issuers';
      case 'pending':
        return 'Credentials awaiting verification from issuers';
      case 'expired':
        return 'Credentials that are no longer valid due to expiration';
      case 'total':
        return 'Total number of credentials in your identity wallet';
      case 'uses':
        return 'Number of times your credentials have been used for verification';
      default:
        return 'Credential statistics';
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className={`overflow-hidden glass-card relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:opacity-0 hover:before:opacity-100 before:transition-opacity ${getGradientBorder()} hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}>
          <CardContent className="p-6 z-10 relative bg-card rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="mt-2 text-3xl font-semibold">{value}</p>
              </div>
              <div className={`rounded-full p-2 ${getBgColor()} transition-all duration-300 hover:scale-110`}>
                {getIcon()}
              </div>
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">
              {getHoverDescription()}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default StatsCard;
