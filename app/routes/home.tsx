import { Button } from "../components/ui/Button";
import type { Route } from "./+types/home";

export default function Home() {
  const _dummyRoute: Route.ComponentProps | null = null;

  return (
    <>
      <Button size="small" disabled>Click Me</Button>
      <Button size="medium">Click Me</Button>
      <Button size="large">Click Me</Button>
    </>
  );
}
