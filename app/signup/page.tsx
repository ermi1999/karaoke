import { signup } from "./actions";

export default function Signup() {
  return (
    <form className="fixed top-60 text-green-500">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <label htmlFor="fullName">Full Name:</label>
      <input id="fullName" name="fullName" type="text" required />
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
