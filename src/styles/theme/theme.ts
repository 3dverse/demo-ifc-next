//------------------------------------------------------------------------------
import { extendTheme } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { breakpoints } from "@/styles/theme/breakpoints";

//------------------------------------------------------------------------------
import Alert from "@/styles/chakra/components/Alert";
import Button from "@/styles/chakra/components/Button";
import Card from "@/styles/chakra/components/Card";
import Checkbox from "@/styles/chakra/components/Checkbox";
import Drawer from "@/styles/chakra/components/Drawer";
import Input, { FormLabel, FormError } from "@/styles/chakra/components/Input";
import Kbd from "@/styles/chakra/components/Kbd";
import Link from "@/styles/chakra/components/Link";
import List from "@/styles/chakra/components/List";
import Menu from "@/styles/chakra/components/Menu";
import Modal from "@/styles/chakra/components/Modal";
import Popover from "@/styles/chakra/components/Popover";
import Progress from "@/styles/chakra/components/Progress";
import Select from "@/styles/chakra/components/Select";
import Skeleton from "@/styles/chakra/components/Skeleton";
import Slider from "@/styles/chakra/components/Slider";
import Spinner from "@/styles/chakra/components/Spinner";
import Switch from "@/styles/chakra/components/Switch";
import Table from "@/styles/chakra/components/Table";
import Tabs from "@/styles/chakra/components/Tabs";
import Text from "@/styles/chakra/components/Text";
import Textarea from "@/styles/chakra/components/Textarea";
import Tooltip from "@/styles/chakra/components/Tooltip";

//------------------------------------------------------------------------------
const theme = extendTheme({
    initialColorMode: "dark",
    useSystemColorMode: false,
    styles: {
        global: () => ({
            body: {
                fontFamily: "var(--font-family-secondary)",
                color: "var(--color-content-primary)",
                bg: "var(--color-bg-ground)",
            },
        }),
    },
    colors: {
        bg: {
            underground: "var(--color-bg-underground)",
            ground: "var(--color-bg-ground)",
            overground: "var(--color-bg-overground)",
        },
        content: {
            primary: "var(--color-content-primary)",
            secondary: "var(--color-content-secondary)",
            tertiary: "var(--color-content-tertiary)",
            quaternary: "var(--color-content-quaternary)",
            primaryLight: "var(--color-content-primary-light)",
            white: "#fff",
        },
        border: {
            primary: "var(--color-border-primary)",
            secondary: "var(--color-border-secondary)",
            tertiary: "var(--color-border-tertiary)",
            quaternary: "var(--color-border-quaternary)",
        },
        accent: {
            100: "var(--color-accent-100)",
            200: "var(--color-accent-200)",
            500: "var(--color-accent)",
            600: "var(--color-accent-600)",
            800: "var(--color-accent-800)",
        },
        informative: {
            100: "var(--color-feedback-informative-100)",
            500: "var(--color-feedback-informative-500)",
            800: "var(--color-feedback-informative-800)",
        },
        positive: {
            500: "var(--color-feedback-positive-500)",
            800: "var(--color-feedback-positive-800)",
            900: "var(--color-feedback-positive-900)",
        },
        warning: {
            500: "var(--color-feedback-warning-500)",
            800: "var(--color-feedback-warning-800)",
        },
        negative: {
            400: "var(--color-feedback-negative-400)",
            500: "var(--color-feedback-negative-500)",
            800: "var(--color-feedback-negative-800)",
        },
    },
    fonts: {
        heading: "var(--font-family-primary)",
        body: "var(--font-family-secondary)",
    },
    fontSizes: {
        "3xs": "var(--font-size-3xs)",
        "2xs": "var(--font-size-2xs)",
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",
        "7xl": "var(--font-size-7xl)",
        "8xl": "var(--font-size-8xl)",
        "9xl": "var(--font-size-9xl)",
    },
    lineHeights: {
        "2xs": ".9rem",
        xs: "1rem",
        sm: "1.2rem",
        md: "1.45rem",
        lg: "1.55rem",
        xl: "1.85rem",
        "2xl": "2.35rem",
    },
    radii: {
        none: "0",
        sm: "var(--border-radius-sm)",
        md: "var(--border-radius-md)",
        lg: "var(--border-radius-lg)",
        xl: "var(--border-radius-xl)",
        full: "9999px",
    },
    shadows: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        "3xl": "var(--shadow-3xl)",
    },
    breakpoints,
    components: {
        Alert,
        Button,
        Card,
        Checkbox,
        Drawer,
        FormError,
        FormLabel,
        Input,
        Kbd,
        Link,
        List,
        Menu,
        Modal,
        Popover,
        Progress,
        Select,
        Skeleton,
        Slider,
        Spinner,
        Switch,
        Table,
        Tabs,
        Text,
        Textarea,
        Tooltip,
    },
});

export default theme;
