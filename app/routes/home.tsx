import { Checkbox } from "~/components/ui/Checkbox/Checkbox";
import type { Route } from "./+types/home";

export default function Home() {
  const _dummyRoute: Route.ComponentProps | null = null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Checkbox label="Accept Terms" />
      <Checkbox label="Enable Notifications" />
    </div>
  );
}
