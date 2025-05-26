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

export const DIMENSIONS = {
    canvasWidth: 280,
    canvasHeight: 280,
    canvasBorderRadius: 10,
    canvasBorderWidth: 2,
    canvasBackgroundColor: '#1a202c',
    canvasStrokeColor: '#f7fafc',
};

export const DRAWING_STYLES = {
    strokeStyle: 'white',
    lineWidth: 20,
    lineCap: 'round',
    fillStyle: 'black',
};

export const HARDCODED_PREDICTION = [
    {
        digit: '0',
        confidence: 0.95
    },
    {
        digit: '1',
        confidence: 0.02
    },
    {
        digit: '2',
        confidence: 0.01
    },
    {
        digit: '3',
        confidence: 0.01
    },
    {
        digit: '4',
        confidence: 0.01
    }
]