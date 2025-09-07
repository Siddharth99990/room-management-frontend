import React from 'react';
import { useAuth } from '../context/AuthContext';
import ChangePasswordModal from '../components/ChangePassword';

const PasswordChangeHandler: React.FC = () => {
    const { hasTemporaryPassword } = useAuth();

    return (
        <ChangePasswordModal 
            isOpen={hasTemporaryPassword} 
            onClose={() => {}} // Empty function since it can't be closed when password is temporary
        />
    );
};

export default PasswordChangeHandler;