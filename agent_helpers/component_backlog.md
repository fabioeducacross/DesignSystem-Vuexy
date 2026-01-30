# Component Backlog - Catalogação Vuexy em Atomic Design

> **Objetivo**: Catalogar ~60 componentes do Vuexy usando metodologia Atomic Design  
> **Fonte**: [vuexy_pages_index.md](./vuexy_pages_index.md)  
> **Status**: 3/60 componentes catalogados (5%)

---

## 🎯 Heurística de Priorização

- **P0 (Crítico)**: Button, Input, Select, Checkbox, Radio, Switch, Card, Modal, Table, Tabs, Navbar, Sidebar, Alert/Toast, Badge, Avatar, Breadcrumb, Pagination
- **P1 (Importante)**: Dropdown, Tooltip, Accordion, Stepper, Datepicker, Carousel, Progress, Spinners, Form Validation
- **P2 (Nice-to-have)**: Charts, Maps, WYSIWYG Editor, Color Picker, Advanced extensions, demo pages

---

## 📦 ATOMS (Elementos Indivisíveis)

### **Actions** (Ações do usuário)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| **Button** ✅ | core.css `.btn` | P0 | ✅ DONE | `atoms/actions/Button.stories.js` |
| Icon Button | core.css `.btn-icon` | P0 | TODO | `atoms/actions/IconButton.stories.js` |
| Close Button | core.css `.btn-close` | P1 | ✅ DONE | `atoms/actions/CloseButton.stories.js` |

### **Forms** (Elementos de formulário)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Input | core.css `.form-control` | P0 | TODO | `atoms/forms/Input.stories.js` |
| Textarea | core.css `.form-control` | P0 | TODO | `atoms/forms/Textarea.stories.js` |
| Checkbox | core.css `.form-check-input` | P0 | TODO | `atoms/forms/Checkbox.stories.js` |
| Radio | core.css `.form-check-input` | P0 | TODO | `atoms/forms/Radio.stories.js` |
| Switch | core.css `.form-switch` | P0 | TODO | `atoms/forms/Switch.stories.js` |
| Select | core.css `.form-select` | P0 | TODO | `atoms/forms/Select.stories.js` |
| Label | core.css `.form-label` | P0 | TODO | `atoms/forms/Label.stories.js` |
| Help Text | core.css `.form-text` | P1 | ✅ DONE | `atoms/forms/HelpText.stories.js` |
| Range | core.css `.form-range` | P1 | ✅ DONE | `atoms/forms/Range.stories.js` |

### **Feedback** (Indicadores visuais)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Badge | core.css `.badge` | P0 | TODO | `atoms/feedback/Badge.stories.js` |
| Spinner | core.css `.spinner-border` | P1 | TODO | `atoms/feedback/Spinner.stories.js` |
| Progress Bar | core.css `.progress-bar` | P1 | TODO | `atoms/feedback/ProgressBar.stories.js` |

### **Data Display** (Exibição de dados)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Avatar | core.css `.avatar` | P0 | TODO | `atoms/data-display/Avatar.stories.js` |
| Divider | core.css `<hr>` | P1 | TODO | `atoms/data-display/Divider.stories.js` |
| Icon | fonts/ Boxicons | P1 | TODO | `atoms/data-display/Icon.stories.js` |

### **Navigation** (Elementos de navegação)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Link | core.css `<a>` | P0 | TODO | `atoms/navigation/Link.stories.js` |

---

## 🧬 MOLECULES (Composições Simples de Atoms)

### **Forms** (Grupos de formulário)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| **SearchField** ✅ | core.css `.input-group` | P0 | ✅ DONE | `molecules/forms/SearchField.stories.js` |
| Form Group | core.css label + input + help | P0 | TODO | `molecules/forms/FormGroup.stories.js` |
| Input Group | core.css `.input-group` | P0 | TODO | `molecules/forms/InputGroup.stories.js` |
| Select Group | vendors/bootstrap-select | P1 | TODO | `molecules/forms/SelectGroup.stories.js` |
| Datepicker | vendors/flatpickr | P1 | ✅ DONE | `molecules/forms/Datepicker.stories.js` |
| Tags Input | vendors/ tagify? | P1 | ✅ DONE | `molecules/forms/TagInput.stories.js` |
| File Upload | core.css `.form-control` | P1 | ✅ DONE | `atoms/forms/FileUpload.stories.js` |

### **Surfaces** (Superfícies/containers)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Card | core.css `.card` | P0 | TODO | `molecules/surfaces/Card.stories.js` |
| Alert | core.css `.alert` | P0 | TODO | `molecules/surfaces/Alert.stories.js` |
| Toast | core.css `.toast` | P0 | TODO | `molecules/surfaces/Toast.stories.js` |
| List Item | core.css `.list-group-item` | P1 | TODO | `molecules/surfaces/ListItem.stories.js` |

### **Actions** (Ações compostas)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Button Group | core.css `.btn-group` | P1 | ✅ DONE | `molecules/actions/ButtonGroup.stories.js` |

### **Content** (Conteúdo)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| List Group | core.css `.list-group` | P1 | ✅ DONE | `molecules/content/ListGroup.stories.js` |

### **Feedback** (Feedback visual)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Progress Bar | core.css `.progress` | P1 | ✅ DONE | `molecules/feedback/ProgressBar.stories.js` |

### **Navigation** (Navegação composta)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Breadcrumb | core.css `.breadcrumb` | P0 | TODO | `molecules/navigation/Breadcrumb.stories.js` |
| Pagination Item | core.css `.page-item` | P0 | TODO | `molecules/navigation/PaginationItem.stories.js` |
| Tab Item | core.css `.nav-item` | P0 | TODO | `molecules/navigation/TabItem.stories.js` |
| Dropdown | core.css `.dropdown` | P1 | ✅ DONE | `molecules/navigation/Dropdown.stories.js` |
| Stepper | vendors/bs-stepper | P1 | ✅ DONE | `molecules/navigation/Stepper.stories.js` |

### **Feedback** (Feedback composto)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Tooltip | core.css `.tooltip` | P1 | ✅ DONE | `molecules/overlays/Tooltip.stories.js` |
| Popover | core.css `.popover` | P1 | ✅ DONE | `molecules/overlays/Popover.stories.js` |
| Notification | core.css `.toast` + positioning | P1 | ✅ DONE | `molecules/feedback/Notification.stories.js` |

---

## 🏗️ ORGANISMS (Estruturas Complexas)

### **Data Display** (Exibição de dados complexa)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| **DataTable** ✅ | vendors/datatables | P0 | ✅ DONE | `organisms/data-display/DataTable.stories.js` |
| Timeline | core.css `.list-group-timeline` | P1 | ✅ DONE | `organisms/content/Timeline.stories.js` |
| Tree View | vendors/jstree? | P2 | TODO | `organisms/data-display/TreeView.stories.js` |
| Accordion | core.css `.accordion` | P1 | ✅ DONE | `organisms/content/Accordion.stories.js` |
| Carousel | core.css `.carousel` | P1 | ✅ DONE | `organisms/content/Carousel.stories.js` |

### **Navigation** (Navegação complexa)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| **Navbar** ✅ | core.css `.navbar` | P0 | ✅ DONE | `organisms/navigation/Navbar.stories.js` |
| **Sidebar** ✅ | core.css `.menu` | P0 | ✅ DONE | `organisms/navigation/Sidebar.stories.js` |
| **Tabs** ✅ | core.css `.nav-tabs` | P0 | ✅ DONE | `organisms/navigation/Tabs.stories.js` |
| Mega Menu | js/mega-dropdown.js | P1 | TODO | `organisms/navigation/MegaMenu.stories.js` |

### **Data Display** (Exibição de dados)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| **Pagination** ✅ | core.css `.pagination` | P0 | ✅ DONE | `organisms/data-display/Pagination.stories.js` |

### **Feedback** (Feedback complexo)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| **Modal** ✅ | core.css `.modal` | P0 | ✅ DONE | `organisms/feedback/Modal.stories.js` |
| Offcanvas | core.css `.offcanvas` | P1 | ✅ DONE | `organisms/navigation/Offcanvas.stories.js` |

### **Forms** (Formulários complexos)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Wizard/Stepper | wizard-ex-checkout.css | P1 | ✅ DONE | `organisms/forms/Wizard.stories.js` |
| **Form Validation** ✅ | vendors/@form-validation | P0 | ✅ DONE | `organisms/forms/FormValidation.stories.js` |
| WYSIWYG Editor | vendors/quill | P2 | ✅ DONE | `organisms/forms/WysiwygEditor.stories.js` |

### **Productivity** (Produtividade)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Calendar | app-calendar.css | P1 | ✅ DONE | `organisms/productivity/Calendar.stories.js` |

### **Commerce** (E-commerce)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Pricing Table | page-pricing.css | P1 | ✅ DONE | `organisms/commerce/PricingTable.stories.js` |

### **Apps** (Componentes de aplicativos)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Chat Interface | app-chat.css | P1 | ✅ DONE | `organisms/apps/ChatInterface.stories.js` |
| Email List | app-email.css | P2 | ✅ DONE | `organisms/apps/EmailList.stories.js` |
| Kanban Board | app-kanban.css | P2 | ✅ DONE | `organisms/apps/KanbanBoard.stories.js` |
| Invoice | app-invoice.css | P2 | ✅ DONE | `organisms/apps/Invoice.stories.js` |

### **Charts** (Gráficos)
| Componente | Fonte HTML/CSS | Prioridade | Status | Pasta Stories |
|------------|----------------|------------|--------|---------------|
| Line Chart | vendors/apex-charts | P2 | ✅ DONE | `organisms/charts/LineChart.stories.js` |
| Bar Chart | vendors/apex-charts | P2 | ✅ DONE | `organisms/charts/BarChart.stories.js` |
| Pie Chart | vendors/apex-charts | P2 | ✅ DONE | `organisms/charts/PieChart.stories.js` |

---

## 🎨 TEMPLATES (Layouts Completos)

### **Authentication** (Autenticação)
| Template | Fonte CSS | Prioridade | Status | Pasta Stories |
|----------|-----------|------------|--------|---------------|
| Login Page | page-auth.css | P1 | ✅ DONE | `templates/auth/Login.stories.js` |
| Register Page | page-auth.css | P1 | ✅ DONE | `templates/auth/Register.stories.js` |
| Forgot Password | page-auth.css | P1 | ✅ DONE | `templates/auth/ForgotPassword.stories.js` |

### **User** (Páginas de usuário)
| Template | Fonte CSS | Prioridade | Status | Pasta Stories |
|----------|-----------|------------|--------|---------------|
| Profile Page | page-profile.css | P1 | ✅ DONE | `templates/user/Profile.stories.js` |
| User View | page-user-view.css | P1 | ✅ DONE | `templates/user/UserView.stories.js` |
| User View | page-user-view.css | P1 | TODO | `templates/user/UserView.stories.js` |

### **Misc** (Outros)
| Template | Fonte CSS | Prioridade | Status | Pasta Stories |
|----------|-----------|------------|--------|---------------|
| Error 404 | page-misc.css | P2 | ✅ DONE | `templates/misc/Error404.stories.js` |
| FAQ Page | page-faq.css | P1 | ✅ DONE | `templates/misc/FAQ.stories.js` |
| Dashboard Layout | app-logistics-dashboard.css | P0 | TODO | `templates/layout/DashboardLayout.stories.js` |

---

## 📊 Estatísticas do Backlog

| Nível | Total | P0 | P1 | P2 | Concluído | TODO |
|-------|-------|----|----|----|-----------| -----|
| **Atoms** | 18 | 11 | 6 | 1 | 1 (6%) | 17 |
| **Molecules** | 17 | 8 | 8 | 1 | 1 (6%) | 16 |
| **Organisms** | 22 | 7 | 8 | 7 | 1 (5%) | 21 |
| **Templates** | 9 | 1 | 6 | 2 | 0 (0%) | 9 |
| **TOTAL** | **66** | **27** | **28** | **11** | **3 (5%)** | **63** |

### Próximos 20 Componentes P0 (Para Skeleton Stories)

1. ✅ Button (Atom - Actions) - **DONE**
2. Input (Atom - Forms)
3. Textarea (Atom - Forms)
4. Checkbox (Atom - Forms)
5. Radio (Atom - Forms)
6. Switch (Atom - Forms)
7. Select (Atom - Forms)
8. Label (Atom - Forms)
9. Badge (Atom - Feedback)
10. Avatar (Atom - Data Display)
11. Link (Atom - Navigation)
12. Icon Button (Atom - Actions)
13. ✅ SearchField (Molecule - Forms) - **DONE**
14. Form Group (Molecule - Forms)
15. Input Group (Molecule - Forms)
16. Card (Molecule - Surfaces)
17. Alert (Molecule - Surfaces)
18. Toast (Molecule - Surfaces)
19. Breadcrumb (Molecule - Navigation)
20. Pagination Item (Molecule - Navigation)

**Componentes P0 ainda sem skeleton**: 17  
**Meta**: Criar 20 skeletons (3 já feitos + 17 novos)

---

## 📝 Observações

1. **Button, SearchField, DataTable** já implementados com markup completo
2. **Próximo batch**: Focar em Atoms P0 de Forms (Input, Checkbox, Radio, Switch, Select)
3. **Critério de classificação**:
   - **Atom**: Não pode ser decomposto em partes menores funcionais
   - **Molecule**: Composição de 2-3 atoms com função específica
   - **Organism**: Estrutura complexa que pode conter molecules e atoms
   - **Template**: Layout completo de página com múltiplos organisms

---

**Última atualização**: 30/01/2026
