import CodeSection from "./components/CodeSection/CodeSection";
import DrawSection from "./components/DrawSection/DrawSection";
import ExplanationSection from "./components/ExplanationSection/ExplanationSection";

export const TABS = {
    draw: {
        tab: 'draw',
        label: 'Draw & Test',
        component: DrawSection
    },
    code: {
        tab: 'code',
        label: 'Code Playground',
        component: CodeSection
    },
    explanation: {
        tab: 'explanation',
        label: 'How it Works',
        component: ExplanationSection
    }
};