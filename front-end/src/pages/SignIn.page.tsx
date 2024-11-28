import AuthLayout from "../features/auth/components/AuthLayout";
import { SignInFormComponent } from "../features/auth/components/SignInForm.component";

function SignInPage() {
  return (
    <AuthLayout>
      <SignInFormComponent />
    </AuthLayout>
  );
}

export default SignInPage;
