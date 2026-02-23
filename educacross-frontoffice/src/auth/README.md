# Authentication & Permission System Documentation

This document provides comprehensive documentation for the authentication and permission system, with special focus on the teacher login flow and context-aware permissions.

## 📚 Overview

The authentication system handles multiple user roles with different permission structures:
- **Account**: Uses account-specific permissions
- **Teacher**: Uses class-based (ClassId) context-aware permissions with education systems
- **Other roles**: Coordinator, Manager, NetworkManager, Secretariat, Student - use standard permissions

## 🎯 Quick Start Guide

### Understanding the Current Flow
1. Review this README for overall architecture
2. Check actual implementation in `src/auth/utils.js`
3. Examine store logic in `src/store/access/index.js` and `src/store/filters/index.js`
4. Review permission resolution in `src/libs/acl/ability.js`

### Debugging Permission Issues
1. Check that `store.getters.getAbilities` returns expected permissions
2. Verify selected class is stored in `store.getters['filters/class']`
3. Confirm CASL abilities are updated via `updateAbility()` and `updateInstitutionAbility()`
4. For teachers, ensure `ClassId` exists in `abilities.modulePermissions`
5. Check browser console for errors during login flow

---

## 🔑 Key Concepts

### Permission Paradigm by Role

**Account Role**:
```
Login → Fetch account permissions → Process → Store → Done
All permissions available globally
```

**Teacher Role (Context-Aware)**:
```
Login → Fetch teacher permissions → Process → Store by ClassId
Permissions filtered dynamically based on selected class
```

**Other Roles (Coordinator, Manager, etc.)**:
```
Login → Fetch permissions → Process with education systems → Merge & Store
All permissions available globally (SerieId-based education systems added)
```

### Why ClassId-Based Permissions for Teachers?

Teachers teach multiple classes, and each class may have different permissions based on the specific class configuration:

**Example Scenario**:
- **Class A (ClassId: 101)**: Grade 1, can READ missions only
- **Class B (ClassId: 102)**: Grade 2, can READ and CREATE missions
- **Class C (ClassId: 103)**: Grade 1, can READ missions only

**How It Works**:
1. Teacher logs in → System fetches all permissions indexed by ClassId
2. Teacher selects Class A → Only permissions for ClassId 101 are active
3. Teacher switches to Class B → Permissions update to ClassId 102 (gains CREATE ability)
4. Teacher switches to Class C → Permissions update to ClassId 103 (back to READ only)

This provides **class-specific permissions** that dynamically change as the teacher switches between classes.

### Important: ClassId vs SerieId

- **ClassId**: Unique identifier for a specific class instance (e.g., "Mrs. Smith's 2nd Grade Class A")
- **SerieId**: Grade level identifier (1 = 1st grade, 2 = 2nd grade, etc.)

**For Teachers**: Permissions are indexed by `ClassId` because different classes at the same grade level can have different permissions.

**For Other Roles**: Education system permissions use `SerieId` because they apply broadly to grade levels.

---

## 📂 File Structure

```
src/
├── auth/
│   ├── utils.js                    ← Main login logic & permission processing
│   └── README.md                   ← This documentation file
├── store/
│   ├── access/
│   │   └── index.js                ← Permission state management
│   └── filters/
│       ├── index.js                ← Context state (class selection)
│       └── useFilters.js           ← Context composable
├── libs/
│   └── acl/
│       └── ability.js              ← CASL ACL integration & getAbilities helper
└── consts/
    ├── accessRoleEnum.js           ← Role constants
    └── permissions.js              ← Permission constants
```

---

## 🔄 Data Flow Overview

```
┌──────────────┐
│ User Enters  │
│ Credentials  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│ JWT Token Generated (Backend)                        │
│ Contains: Role, UserId, InstitutionId, etc.          │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│ loginUser(token, refreshToken)                       │
│ - Decodes token to get userData                      │
│ - Routes by role (Account vs Others)                 │
└──────┬───────────────────────────────────────────────┘
       │
       ├─────────────────┬─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
  ┌─────────┐      ┌──────────┐      ┌─────────┐
  │ Account │      │ Teacher  │      │ Others  │
  └────┬────┘      └────┬─────┘      └────┬────┘
       │                │                  │
       ▼                ▼                  ▼
  Get Account     Get Teacher         Get General
  Permissions     Permissions         Permissions
  (account/       (teacher/           (v2/.../
   permissions)    permissions)        permissions)
       │                │                  │
       │                ├─→ Get Education  │
       │                │   Systems V2     │
       │                │   (v2/education  │
       │                │    systems/      │
       │                │    modules)      │
       │                │                  │
       ▼                ▼                  ▼
  Process &       Process &           Process &
  Store           Store by ClassId    Store (SerieId)
       │           + Add Ed. Systems       │
       │                │                  │
       └────────────────┴──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ Update CASL ACL  │
              │ Emit 'accessLogged' event
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ App Ready        │
              │ User Authenticated
              └──────────────────┘
```

---

## 🎓 Teacher-Specific Flow

```
Teacher Login
     │
     ├─→ Fetch Classes
     │   └─→ v1/classes/access
     │       Returns: [{ ClassId, Name, SerieId, Students, ... }]
     │
     ├─→ Fetch Teacher Permissions
     │   └─→ v1/applicationusers/teacher/permissions
     │       Returns: { 
     │         generalPermissions: [...],
     │         modulePermissions: {
     │           "101": [...],  // ClassId-indexed
     │           "102": [...]
     │         }
     │       }
     │
     ├─→ Fetch Education Systems (V2)
     │   └─→ v2/educationsystems/modules
     │       Returns: [{ id, name, classesIds: [...], subjects: [...] }]
     │
     ├─→ Process Teacher Abilities
     │   └─→ processTeacherAbilities(data)
     │       ├─→ Map general permissions to CASL format
     │       ├─→ Process module permissions by ClassId
     │       └─→ addEducationSystemPermissionsForTeacher()
     │           └─→ For each education system:
     │               └─→ Add READ permission to matching ClassIds
     │
     ├─→ Auto-select First Class
     │   └─→ store.commit('filters/class', classes[0])
     │
     └─→ Store Permissions
         └─→ store.commit('setAbilities', {
                 generalPermissions: [...],
                 modulePermissions: {
                   "101": [...],  // Includes education systems
                   "102": [...]
                 }
             })

Later (User Navigates / Switches Class):
     │
     └─→ Class Selection Changes
         └─→ store.getters.getAbilities recalculates
             │
             ├─→ Gets selected ClassId from store.getters['filters/class']
             │
             └─→ Calls getAbilities(abilities, classId)
                 │
                 ├─→ Returns: generalPermissions + modulePermissions[ClassId]
                 │
                 └─→ CASL checks permissions against this subset
                     │
                     └─→ UI updates (features show/hide dynamically)
```

### Key Implementation Functions

#### 1. `fetchTeacherAbilities(classes)`
- Fetches teacher permissions from API
- Fetches education systems V2 data
- Processes permissions and adds education system permissions
- Stores final abilities in Vuex store

#### 2. `processTeacherAbilities(abilities)`
- Maps general permissions to CASL format
- Processes module permissions keeping ClassId structure
- Stores raw permissions in `serieModulePermissions` state

#### 3. `addEducationSystemPermissionsForTeacher(abilities, classes, educationSystems)`
- Creates efficient class lookup map
- Iterates through education systems
- For each classId in educationSystem.classesIds:
  - Validates class exists and has permissions initialized
  - Checks for duplicate permissions
  - Adds READ permission for education system subject

#### 4. `store.getters.getAbilities`
- Checks if user is a teacher
- Gets selected ClassId from filters store
- Calls `getAbilities(abilities, classId)` from `libs/acl/ability.js`
- Returns filtered permissions for current class

---

## 📡 API Endpoints & Data Structures

### Teacher Endpoints

#### 1. Get Teacher Permissions
```
GET /v1/applicationusers/teacher/permissions
```

**Response Structure**:
```javascript
{
  generalPermissions: [
    {
      subject: "Mission",
      actions: ["read", "create"],
      name: "Missions"
    }
  ],
  modulePermissions: {
    "101": [  // ClassId
      {
        subject: "Module-Quiz",
        actions: ["read"],
        name: "Quiz Module"
      }
    ],
    "102": [
      {
        subject: "Module-Quiz",
        actions: ["read", "create"],
        name: "Quiz Module"
      }
    ]
  }
}
```

#### 2. Get Teacher Classes
```
GET /v1/classes/access
```

**Response Structure**:
```javascript
[
  {
    ClassId: 101,
    Name: "2nd Grade - Class A",
    SerieId: 2,
    Level: 2,
    Students: [...]
  }
]
```

#### 3. Get Education Systems V2
```
GET /v2/educationsystems/modules
```

**Response Structure**:
```javascript
[
  {
    id: 1,
    name: "BNCC",
    classesIds: [101, 102, 103],
    subjects: [
      {
        subjectId: 1,
        serieIds: [1, 2, 3]
      }
    ]
  }
]
```

### Other Roles Endpoints

#### Get General Permissions
```
GET /v2/applicationusers/permissions
```

**Response Structure**:
```javascript
{
  generalPermissions: [...],
  modulePermissions: {
    "1": [...],  // SerieId for non-teachers
    "2": [...]
  }
}
```

#### Get Education Systems V1
```
GET /v1/educationsystems/{institutionId}/modules
```

### Processed Abilities Structure (Vuex Store)

After processing, abilities stored in Vuex have this structure:

**For Teachers**:
```javascript
{
  generalPermissions: [
    { action: "read", subject: "Mission", name: "Missions" },
    { action: "create", subject: "Mission", name: "Missions" }
  ],
  modulePermissions: {
    "101": [  // ClassId
      { action: "read", subject: "Module-Quiz", name: "Quiz Module" },
      { action: "read", subject: "EducationSystems-1", name: "BNCC" }
    ],
    "102": [
      { action: "read", subject: "Module-Quiz", name: "Quiz Module" },
      { action: "create", subject: "Module-Quiz", name: "Quiz Module" },
      { action: "read", subject: "EducationSystems-1", name: "BNCC" }
    ]
  }
}
```

**For Other Roles**:
```javascript
{
  generalPermissions: [...],
  modulePermissions: [  // Flattened array
    { action: "read", subject: "Module-Quiz", name: "Quiz Module" },
    { action: "read", subject: "EducationSystems-1", name: "BNCC" }
  ]
}
```

---

## 🧪 Testing Strategy

### Unit Tests

#### Test `processTeacherAbilities()`
- [ ] Correctly maps generalPermissions to CASL format
- [ ] Preserves ClassId keys in modulePermissions
- [ ] Maps each ClassId's permissions to CASL format
- [ ] Handles empty permissions gracefully

#### Test `addEducationSystemPermissionsForTeacher()`
- [ ] Adds education system permissions to correct ClassIds
- [ ] Does not duplicate existing permissions
- [ ] Handles classes without permissions initialized
- [ ] Correctly formats education system subject (`EducationSystems-{id}`)

#### Test `mapAbilities()`
- [ ] Correctly flattens actions array
- [ ] Filters out invalid permissions (no action or subject)
- [ ] Maintains permission metadata (name, subject, action)

#### Test `getAbilities()` from `libs/acl/ability.js`
- [ ] Returns generalPermissions + specific ClassId permissions for teachers
- [ ] Returns all merged permissions when no ClassId provided
- [ ] Deduplicates permissions using action_subject key
- [ ] Handles empty abilities object

### Integration Tests

#### Teacher Login Flow
- [ ] Successfully fetches teacher permissions
- [ ] Successfully fetches classes
- [ ] Successfully fetches education systems V2
- [ ] Processes and stores abilities with ClassId keys
- [ ] Auto-selects first class
- [ ] Updates CASL ability instance
- [ ] Emits 'accessLogged' event

#### Class Selection Change
- [ ] Permissions update when class changes
- [ ] CASL ability instance updates
- [ ] UI components respond to permission changes
- [ ] Selected class persists in localStorage

#### Education System Permissions
- [ ] Education systems appear in correct ClassIds
- [ ] READ permission is added for each education system
- [ ] Multiple education systems in same class don't duplicate
- [ ] Classes without education systems don't break

### Manual Testing Checklist

#### Teacher Account
- [ ] Login succeeds with valid credentials
- [ ] Classes are fetched and displayed
- [ ] First class is auto-selected
- [ ] Permissions are loaded for selected class
- [ ] Switching classes updates permissions
- [ ] Features show/hide based on class permissions
- [ ] Education systems appear when class has access
- [ ] Logout clears permissions and class selection
- [ ] Refresh maintains class selection and permissions

#### Other Roles (Coordinator, Manager, etc.)
- [ ] Login succeeds with valid credentials
- [ ] Permissions are fetched and merged
- [ ] Education systems added based on SerieId
- [ ] No class selection required
- [ ] All features accessible based on permissions
- [ ] Logout works correctly

#### Error Handling
- [ ] Teacher with no classes shows appropriate error
- [ ] API failures show error messages
- [ ] Invalid tokens redirect to login
- [ ] Missing permissions handled gracefully

---


## 🚨 Important Notes & Best Practices

### Don't Break Other Roles!
Teacher-specific logic should NOT affect other roles:
- Account login (uses account permissions API)
- Coordinator, Manager, NetworkManager, Secretariat, Student (use general permissions API)

**Critical Check**: Always verify `Role === 'Teacher'` before using teacher-specific logic.

**Teacher-Specific Code Locations**:
- `fetchTeacherAbilities()` - Only called for teachers
- `processTeacherAbilities()` - Only used for teacher permissions
- `addEducationSystemPermissionsForTeacher()` - Only for teachers
- `store.getters.getAbilities` - Has teacher-specific logic that checks role

### Store State Persistence

The Vuex store is persisted to localStorage:
```javascript
modules: [
  'app', 'teacherContext', 'adminContext', 'account', 
  'access', 'loggedAccess', 'events', 'filters'
]
```

**Implications**:
- Permissions survive page refresh
- Selected class survives page refresh
- Need to handle stale data on login (done via store reset)
- Testing in dev requires clearing localStorage sometimes

**Clear localStorage**: `localStorage.clear()` in browser console

### CASL Ability Instances

Two separate CASL ability instances:

1. **`ability`** - User-specific (filtered by ClassId for teachers)
   - Updated via `updateAbility(store.getters.getAbilities)`
   - Used in components via `$can()` directive/helper
   - Changes when teacher switches classes

2. **`abilityInstitution`** - Institution-wide (not filtered)
   - Updated via `updateInstitutionAbility(store.getters.getInstituionAbilities)`
   - Used for institution-level permission checks
   - Does NOT change when teacher switches classes

### Using Permissions in Components

**Recommended (Reactive)**:
```javascript
// In component
import { ability } from '@/libs/acl/ability'

// In template
<div v-if="$can('read', 'Mission')">
  <!-- Content -->
</div>

// In script
if (ability.can('read', 'Mission')) {
  // Do something
}
```

**Not Recommended (Non-Reactive)**:
```javascript
// DON'T access store state directly
const permissions = this.$store.state.access.abilities

// DON'T cache permissions in data()
data() {
  return {
    myPermissions: this.$store.getters.getAbilities // ❌ Won't update
  }
}
```

**Correct (Reactive)**:
```javascript
// DO use getters in computed
computed: {
  myPermissions() {
    return this.$store.getters.getAbilities // ✅ Updates reactively
  }
}
```

### Common Pitfalls

#### 1. Wrong Permission Key for Teachers
```javascript
// ❌ WRONG - Using SerieId for teachers
const serieId = selectedClass.SerieId
const permissions = abilities.modulePermissions[serieId]

// ✅ CORRECT - Using ClassId for teachers
const classId = selectedClass.ClassId
const permissions = abilities.modulePermissions[classId]
```

#### 2. Not Checking Role Before Using Teacher Logic
```javascript
// ❌ WRONG
const classId = store.getters['filters/class'].ClassId
const permissions = abilities.modulePermissions[classId]

// ✅ CORRECT
const isTeacher = store.getters.accessRole === 'Teacher'
if (isTeacher) {
  const classId = store.getters['filters/class']?.ClassId
  const permissions = abilities.modulePermissions[classId]
}
```

#### 3. Forgetting to Update CASL After Permission Changes
```javascript
// ❌ WRONG
store.commit('setAbilities', newAbilities)
// CASL still has old permissions!

// ✅ CORRECT
store.commit('setAbilities', newAbilities)
updateAbility(store.getters.getAbilities)
updateInstitutionAbility(store.getters.getInstituionAbilities)
```

#### 4. Race Condition on Class Selection
```javascript
// ❌ WRONG - Permissions might not be ready
async function selectClass(newClass) {
  store.commit('filters/class', newClass)
  checkPermissions() // Might use old permissions
}

// ✅ CORRECT - Wait for next tick
async function selectClass(newClass) {
  store.commit('filters/class', newClass)
  await nextTick()
  updateAbility(store.getters.getAbilities)
  checkPermissions() // Now uses new permissions
}
```

### Debugging Tips

#### Check Current Permissions
```javascript
// In browser console
console.log('All abilities:', $store.state.access.abilities)
console.log('Current permissions:', $store.getters.getAbilities)
console.log('Institution permissions:', $store.getters.getInstituionAbilities)
console.log('Selected class:', $store.getters['filters/class'])
console.log('User role:', $store.getters.accessRole)
```

#### Check CASL Ability
```javascript
// In browser console
import { ability } from '@/libs/acl/ability'

console.log('Can read Mission?', ability.can('read', 'Mission'))
console.log('All rules:', ability.rules)
```

#### Check API Responses
Open Network tab in DevTools and filter by:
- `teacher/permissions` - Teacher permissions response
- `classes/access` - Teacher classes response
- `educationsystems/modules` - Education systems response

#### Common Error: "Teacher has no classes"
- Check API response from `/v1/classes/access`
- Verify teacher is assigned to at least one class in database
- Check if `userData.HasAccount` is set correctly

---

## 🎯 Working with the System Checklist

### For New Developers
- [ ] Read this README completely
- [ ] Understand the difference between ClassId and SerieId
- [ ] Review `src/auth/utils.js` main functions
- [ ] Examine store structure in `src/store/access/index.js`
- [ ] Check permission resolution in `src/libs/acl/ability.js`
- [ ] Test login with different roles in dev environment
- [ ] Practice switching classes as a teacher
- [ ] Use browser console to inspect permissions

### For Adding New Permissions
- [ ] Determine if permission is general or module-specific
- [ ] Add permission constants to `src/consts/permissions.js`
- [ ] Backend: Add permission to appropriate endpoint response
- [ ] For teachers: Ensure permission is in correct ClassId
- [ ] Test permission appears in `store.getters.getAbilities`
- [ ] Use `$can()` or `ability.can()` to check permission
- [ ] Test with multiple classes (for teachers)
- [ ] Verify CASL updates correctly

### For Debugging Permission Issues
- [ ] Check user role: `store.getters.accessRole`
- [ ] Check selected class (teachers): `store.getters['filters/class']`
- [ ] Check raw abilities: `store.state.access.abilities`
- [ ] Check filtered abilities: `store.getters.getAbilities`
- [ ] Check CASL rules: `ability.rules`
- [ ] Check API responses in Network tab
- [ ] Clear localStorage if behavior is inconsistent
- [ ] Verify component uses reactive permission checks

### For Modifying Teacher Logic
- [ ] Review current teacher flow in this README
- [ ] Understand ClassId-based permission indexing
- [ ] Test changes with multiple classes
- [ ] Verify class switching updates permissions
- [ ] Ensure education systems still work
- [ ] Don't break other roles (check with role guards)
- [ ] Update tests
- [ ] Update this README if logic changes significantly

---

## 📜 Version History

- **v2.0** (Current - November 2025): ClassId-based teacher permissions with education systems
  - Teacher permissions indexed by ClassId instead of SerieId
  - Dynamic permission filtering based on selected class
  - Education systems V2 integration
  - Automatic education system permission injection
  - Improved permission resolution with getAbilities helper
  
- **v1.0** (Legacy): Initial implementation
  - Basic permission system
  - SerieId-based permissions for all roles
  - Static permission allocation

---

## 📚 Related Files & Code Locations

### Core Authentication Files
- **`src/auth/utils.js`** - Main login and permission processing logic
  - `loginUser()` - Entry point for all login flows
  - `loginAccess()` - Access login for non-account users
  - `loginAccount()` - Account-specific login
  - `fetchTeacherAbilities()` - Teacher permission fetching
  - `processTeacherAbilities()` - Teacher permission processing
  - `addEducationSystemPermissionsForTeacher()` - Education system injection
  - `processAbilities()` - General permission processing
  - `mapAbilities()` - Convert API format to CASL format
  - `processModulePermissions()` - Module permission processing

### Store Files
- **`src/store/access/index.js`** - Permission and user state
  - State: `abilities`, `serieModulePermissions`, `classes`, `userData`
  - Mutations: `setAbilities()`, `setClasses()`, `loginAccess()`
  - Getters: `getAbilities`, `getInstituionAbilities`, `accessRole`
  - Actions: `fetchClasses()`, `logoutAccess()`

- **`src/store/filters/index.js`** - Context state (class selection)
  - State: `class`, `serie`, `subject`, `institution`
  - Mutations: `class()`, `serie()`, `subject()`
  - Getters: `class`, `serie`, `subject`
  - Actions: `reset()`

### Permission Resolution
- **`src/libs/acl/ability.js`** - CASL integration
  - `ability` - Main CASL instance (user-specific)
  - `abilityInstitution` - Institution CASL instance
  - `getAbilities()` - Filter permissions by ClassId for teachers
  - `updateAbility()` - Update main CASL instance
  - `updateInstitutionAbility()` - Update institution CASL instance

### Constants
- **`src/consts/permissions.js`** - Permission subject constants
  - `PERMISSION.MODULE.*` - Module-specific permissions
  - `PERMISSION.*` - General permissions
  - `ACTION.*` - Permission actions (READ, CREATE, UPDATE, DELETE)

- **`src/consts/accessRoleEnum.js`** - Role definitions
  - `ACCESS_ROLE_ENUM.TEACHER`
  - `ACCESS_ROLE_ENUM.ACCOUNT`
  - `ACCESS_ROLE_ENUM.STUDENT`
  - etc.

### Services
- **`src/services/shared/educationSystem/EducationSystem.Service.js`**
  - `getEducationSystemModule()` - V1 API for education systems
  - `getEducationSystemModuleV2()` - V2 API for education systems

### Router
- **`src/router/index.js`** - Route guards using permissions
  - Uses `ability.can()` for route access control
  - Redirects based on user permissions

---

## 📖 Glossary

### Permission Structure

**GeneralPermissions**
- Permissions available across all contexts
- Not filtered by class or grade level
- Always included in permission checks
- Example: `{ action: 'read', subject: 'Dashboard' }`

**ModulePermissions**
- Permissions specific to modules or contexts
- **For Teachers**: Indexed by `ClassId`
- **For Others**: Indexed by `SerieId` or flattened array
- Example: `{ "101": [{ action: 'read', subject: 'Module-Quiz' }] }`

---

### Issue: Impersonation Breaks Permissions

**Symptoms**: After impersonating a user, permissions are incorrect

**Possible Causes**:
1. Original user's permissions still cached
2. Store not properly reset during impersonation
3. CASL ability not updated for impersonated user

**Solutions**:
1. Ensure store is reset on impersonation:
```javascript
// In loginImpersonatedAdmin
await loginUser(accessToken, refreshToken, true)  // resetStore = true
```

2. Clear localStorage before impersonation:
```javascript
store.dispatch('logoutAccess')  // Clears state
```

3. Verify abilities are fetched for impersonated user:
```javascript
// Check in Network tab
// Should see new API calls for:
// - /permissions
// - /classes/access (for teachers)
```

**Code Location**: `src/auth/utils.js` - `loginImpersonatedAdmin()`, `logoutImpersonatedAdmin()`

---

### Known Limitations

1. **Permission Updates Require Re-login**: If admin changes a teacher's permissions, teacher must log out and log back in to see changes (no real-time updates)

2. **ClassId Must Be Numeric or String**: Permission system assumes ClassId is numeric or string, not object

3. **Education Systems Limited to READ**: Education system permissions are always READ only, other actions not supported

4. **No Permission History**: System doesn't track when/how permissions changed

5. **localStorage Size Limits**: Large numbers of classes/permissions may hit localStorage limits (5-10MB typically)

---

**Last Updated**: November 2025
**Maintained By**: Development Team
**Related Systems**: Authentication, Authorization, Education Systems, Class Management

