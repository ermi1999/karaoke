import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="fixed inline-flex flex-row justify-between w-full top-0 p-5">
      <div className="text-3xl">Karaoke</div>
      <div>
        <Button variant="secondary">
          <Plus /> Create
        </Button>
      </div>
    </nav>
  );
}
