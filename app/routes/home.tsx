import { Button } from "../components/ui/Button";
import type { Route } from "./+types/home";

export default function Home() {
  const _dummyRoute: Route.ComponentProps | null = null;

  return (
    <>
      <Button size = "large"variant="solid">Solid</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="outline">Outline</Button>
      <Button size = "small"variant="ghost">Ghost</Button>
      <Button variant="plain">Plain</Button>
    </>
  );
}
