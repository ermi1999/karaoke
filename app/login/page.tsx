import { login } from "./actions";

export default function Login() {
  return (
    <form className="fixed top-60">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>login</button>
    </form>
  );
}
