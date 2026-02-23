---
name: convertToCompositionAPI
description: Convert Vue Options API component to Composition API with script setup syntax
argument-hint: Optional: specific component file path or use current file
---

Convert the Vue component to Composition API using `<script setup>` syntax (Vue 2.7+ compatible).

## Conversion Guidelines

### Template Section
- Keep `<template>` unchanged
- Maintain all directives, bindings, and event handlers

### Script Conversion

1. **Replace `<script>` with `<script setup>`**
   - Remove `export default { }` wrapper
   - All top-level bindings auto-expose to template

2. **Component Registration**
   ```vue
   // Import components - auto-registered
   import ComponentA from './ComponentA.vue'
   ```

3. **Props**
   ```vue
   const props = defineProps({
     data: { type: Object, default: () => {} },
     loading: { type: Boolean, default: false }
   })
   ```

4. **Emits**
   ```vue
   const emit = defineEmits(['event-name'])
   emit('event-name', data)
   ```

5. **Data Properties**
   ```vue
   import { ref } from 'vue'
   const count = ref(0)
   const items = ref([])
   ```

6. **Computed Properties**
   ```vue
   import { computed } from 'vue'
   const fullName = computed(() => props.first + props.last)
   ```

7. **Methods**
   ```vue
   const handleClick = () => { /* ... */ }
   // or
   function handleClick() { /* ... */ }
   ```

8. **Lifecycle Hooks**
   ```vue
   import { onMounted, onBeforeUnmount } from 'vue'
   onMounted(() => { /* ... */ })
   onBeforeUnmount(() => { /* ... */ })
   ```

9. **Watchers**
   ```vue
   import { watch } from 'vue'
   watch(() => props.value, (newVal, oldVal) => { /* ... */ })
   ```

10. **Remove `this` References**
    - Props: `this.propName` → `props.propName`
    - Data: `this.count` → `count.value`
    - Methods: `this.method()` → `method()`
    - Computed: `this.computed` → `computed.value`

11. **Vue Instance Access**
    ```vue
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { getCurrentInstance } from 'vue'
    
    const router = useRouter()
    const store = useStore()
    const instance = getCurrentInstance()
    const { $can } = instance.proxy
    ```

12. **Composables**
    ```vue
    const { classe } = useFilters()
    // Auto-exposed to template
    ```

### ECharts Integration

```vue
<script setup>
import { computed } from 'vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([GridComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

const chartOptions = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [{ type: 'pie', data: [...] }]
}))
</script>

<template>
  <e-charts 
    :option="chartOptions" 
    autoresize
  />
</template>
```

**Key Points:**
- Use `use()` from `echarts/core` with `CanvasRenderer`
- Use `:option` (singular) prop

### ACL/Permissions

```vue
import { can } from '@core/libs/acl/utils'
// Use directly: can(ACTION.READ, PERMISSION.GENERAL.TEACHER)
```

### Common Pitfalls

1. **Use `.value` for refs in `<script>`**
   ```vue
   count.value++ // ✅ Correct in script
   ```

2. **Template doesn't need `.value`**
   ```vue
   <template>{{ count }}</template> <!-- ✅ Correct -->
   ```

3. **Emit function**: `defineEmits` (with 's')

### Verification
- [ ] All imports at top
- [ ] `defineProps()` and `defineEmits()` used
- [ ] All reactive data uses `ref()` or `reactive()`
- [ ] All computed uses `computed()`
- [ ] No `this` references
- [ ] `.value` used correctly in script
- [ ] ECharts uses `use()` and `:option`
- [ ] All functionality preserved
