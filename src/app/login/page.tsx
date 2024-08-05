import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <>
        <div className="container mx-auto px-6 py-72  flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 rounded-lg shadow-lg">
            <LoginForm />
          </div>
        </div>
    </>
  );
}