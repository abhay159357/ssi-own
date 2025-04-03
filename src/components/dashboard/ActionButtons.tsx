
import React from 'react';
import { 
  PlusCircle, 
  QrCode, 
  Shield, 
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ActionButtons: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Add Credential',
      icon: PlusCircle,
      onClick: () => navigate('/add-credential'),
<<<<<<< HEAD
      color: 'bg-primary hover:bg-primary/90'
=======
      color: 'bg-yellow-300 hover:bg-primary/70'
>>>>>>> d4ad020 (add credentials button color change and verify section removed)
    },
    {
      label: 'Verify Identity',
      icon: Shield,
      onClick: () => navigate('/verification'),
      color: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
    },
    {
      label: 'Scan QR Code',
      icon: QrCode,
      onClick: () => navigate('/verification'),
      color: 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
    },
    {
      label: 'View Profile',
      icon: User,
      onClick: () => navigate('/profile'),
      color: 'bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={action.onClick}
          className={`${action.color} text-white h-auto py-4 flex-col gap-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 sm:text-sm items-center justify-center hover:translate-y-[-2px]`}
          variant="default"
        >
          <action.icon className="h-6 w-6 mb-1" />
          <span>{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
