import { Button } from "../components/ui/Button";
import type { Route } from "./+types/home";
import { FiDownload, FiArrowRight, FiHome, FiChevronDown } from "react-icons/fi";

export default function Home() {
  const _dummyRoute: Route.ComponentProps | null = null;

  const variants = [
    "solid",
    "subtle",
    "surface",
    "outline",
    "ghost",
    "plain",
  ] as const;
  const colors = ["blue", "green", "red", "pink", "yellow", "gray"] as const;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Button size="small" variant="solid" colorScheme="blue">
        Small Solid Blue
      </Button>
      <Button size="medium" variant="subtle" colorScheme="green">
        Medium Subtle Green
      </Button>
      <Button size="large" isLoading variant="outline" colorScheme="red">
        Large Outline Red
      </Button>
      <Button size="medium" variant="ghost" colorScheme="pink">
        Medium Ghost Pink
      </Button>
      <Button size="large" variant="plain" colorScheme="yellow">
        Large Plain Yellow
      </Button>
      <Button size="small" isLoading variant="surface" colorScheme="gray">
        Small Surface Gray
      </Button>
      <Button onClick={(e) => console.log("Clicked!", e)}>Test Button</Button>
      <Button
        size="medium"
        variant="solid"
        colorScheme="blue"
        loadingText="Loading..."
        isLoading={true}
      >
        Click Me
      </Button>
      <Button leftIcon={<FiDownload />}>Download</Button>
      <Button rightIcon={<FiArrowRight />}>Continue</Button>
      <Button leftIcon={<FiHome />} rightIcon={<FiChevronDown />}>
        Menu
      </Button>
    </div>
  );
}
