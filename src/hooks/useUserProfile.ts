import { useUser } from '@/contexts';

export const useUserProfile = () => {
  const { userProfile, loading, error, fetchUserProfile, updateUserProfile, clearUserProfile } = useUser();

  return {
    userProfile,
    loading,
    error,
    fetchUserProfile,
    updateUserProfile,
    clearUserProfile,
    isAuthenticated: !!userProfile,
    fullName: userProfile ? `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() : '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    jobTitle: userProfile?.jobtitle?.title || '',
    nationality: userProfile?.nationality?.ar_title || '',
    image: userProfile?.image || '',
  };
};

export default useUserProfile; 