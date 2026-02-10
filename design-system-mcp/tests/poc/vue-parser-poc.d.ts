/**
 * Proof of Concept: Vue SFC Parser
 *
 * Objetivo: Validar extração de props, events e slots de componentes Vue
 * usando @vue/compiler-sfc + TypeScript Compiler API
 */
export interface VueComponent {
    props: Array<{
        name: string;
        type: string;
        required: boolean;
        default?: unknown;
    }>;
    events: Array<{
        name: string;
        payload?: string;
    }>;
    slots: Array<{
        name: string;
    }>;
}
/**
 * Parse de componente Vue SFC
 */
export declare function parseVueComponent(code: string, filename?: string): VueComponent;
//# sourceMappingURL=vue-parser-poc.d.ts.map