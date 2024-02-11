import AuthLayout from "../features/auth/components/AuthLayout";
import { RegistrationForm } from "../features/auth/components/RegistrationForm.component";

function RegisterPage() {
  return (
    // aut layout
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
}

export default RegisterPage;
