import { AppLayout } from '@/components/layout/AppLayout';

const TermsAndConditions = () => {
  return (
    <AppLayout title="Terms and Conditions">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        <p>
          Welcome to LookDine! These terms and conditions outline the rules and regulations for the use of our application.
        </p>
        <p className="mt-4">
          By accessing this app, we assume you accept these terms and conditions. Do not continue to use LookDine if you do not agree to take all of the terms and conditions stated on this page.
        </p>
        {/* Add more terms and conditions here */}
      </div>
    </AppLayout>
  );
};

export default TermsAndConditions;
