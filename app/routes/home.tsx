import { Checkbox } from "~/components/ui/Checkbox/Checkbox";
import type { Route } from "./+types/home";

export default function Home() {
  const _dummyRoute: Route.ComponentProps | null = null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Checkbox disabled label="Accept Terms" />
      <Checkbox label="Enable Notifications" />
      <Checkbox variant="solid" label="Solid Checkbox" />
      <Checkbox variant="subtle" label="Subtle Checkbox" />
      <Checkbox variant="outline" label="Outline Checkbox" />
      <Checkbox indeterminate label="Indeterminate Checkbox" />
      <Checkbox error label="Error Checkbox" />
      <Checkbox size="small" variant="solid" label="Solid Checkbox" />
      <Checkbox size="medium" variant="solid" label="Solid Checkbox" />
      <Checkbox size="large" variant="solid" label="Solid Checkbox" />
      <Checkbox
        label="Enable dark mode"
        description="Switches the interface to a dark theme."
        variant="outline"
        size="small"
      />
      <Checkbox
        label="Enable dark mode"
        description="Switches the interface to a dark theme."
        variant="outline"
        size="medium"
      />
      <Checkbox
        label="Enable dark mode"
        description="Switches the interface to a dark theme."
        variant="outline"
        size="large"
      />
    </div>
  );
}
