import { Checkbox } from "~/components/ui/Checkbox/Checkbox";
import { DateInput } from "~/components/ui/DateInput";
import { PasswordInput } from "../components/ui/PasswordInput/PasswordInput";
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
    
      <PasswordInput
        placeholder="Enter your password"
        size="small"
        variant="subtle"
        helperText="Must be at least 8 characters."
        error={false}
      />
      <PasswordInput
        placeholder="Enter your password"
        size="medium"
        variant="subtle"
        helperText="Must be at least 8 characters."
        error={false}
      />
      <PasswordInput
        placeholder="Enter your password"
        size="large"
        variant="subtle"
        helperText="Must be at least 8 characters."
        error={false}
      />
      <DateInput
        placeholder="Select a date"
        size="small"
        variant="subtle"
        helperText="Select a date from the calendar."
        error={false}
      />
      <DateInput
        placeholder="Birthdate"
        size="medium"
        variant="subtle"
        helperText="Birthdate."
        error={false}
      />
      <DateInput
        placeholder="Select a date"
        size="large"
        variant="subtle"
        helperText="Select a date from the calendar."
        error={false}
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
