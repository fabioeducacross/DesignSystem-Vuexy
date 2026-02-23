## Introduction to Shallow Rendering

Shallow Rendering is a user interface testing strategy that focuses on testing a Vue component **in isolation, without deeply rendering its child components**. Instead of mounting the complete and deep component tree, shallow rendering only renders the parent component and "simulates" the presence of its child components, replacing them with _stubs_ (simplified versions) or placeholders.

The primary benefit of this technique is **isolation**. By ensuring that a component's tests don't depend on the internal implementation or behavior of its children, we can focus exclusively on the logic, properties (props), events, and _slots_ of the component being tested. This makes tests faster, easier to debug, and more resilient to changes in nested components.

---

## Practical Example: Shallow Rendering a Parent Component with Children

Consider a Vue component called `UserProfileCard` which is responsible for displaying user data. Internally, it uses two smaller components: `AvatarImage` for the profile picture and `FollowButton` for the follow action.

### Test Scenario

**Objective:** Verify that the `UserProfileCard` renders the user's name correctly and that it includes the `AvatarImage` and `FollowButton` components as children, without caring about the internal rendering of those children.

**Components Involved:**

- **`UserProfileCard.vue` (Parent Component):** Displays user information and uses `AvatarImage` and `FollowButton`.
- **`AvatarImage.vue` (Child Component):** Displays the avatar image.
- **`FollowButton.vue` (Child Component):** Button for follow/unfollow action.

**Test Steps:**

1.  **Mount the `UserProfileCard` component in _shallow_ mode:** Use Vue Test Utils' `shallowMount` method.
2.  **Pass necessary `props`:** Provide the user data to the parent component.
3.  **Verify text rendering:** Ensure the user's name appears in the parent component's DOM.
4.  **Verify the existence of child components:** Confirm that `AvatarImage` and `FollowButton` are "seen" by the `UserProfileCard`, but as stubs.

### Pseudocode for a Component Test (with Vue Test Utils and Vitest/Jest)

```javascript
// AvatarImage.vue (Child Component) - Implementation not relevant for shallow test
<template>
  <img :src="src" alt="User Avatar" />
</template>
<script setup>
  defineProps({ src: String });
</script>

// FollowButton.vue (Child Component) - Implementation not relevant for shallow test
<template>
  <button @click="$emit('toggle-follow')">Follow</button>
</template>
<script setup>
  // Internal logic for follow/unfollow
</script>

// UserProfileCard.vue (Parent Component)
<template>
  <div class="user-profile-card">
    <AvatarImage :src="user.avatarUrl" />
    <h3 class="user-name">{{ user.name }}</h3>
    <p class="user-bio">{{ user.bio }}</p>
    <FollowButton :userId="user.id" @toggle-follow="handleToggleFollow" />
  </div>
</template>

<script setup>
import AvatarImage from './AvatarImage.vue';
import FollowButton from './FollowButton.vue';
import { defineProps } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const handleToggleFollow = () => {
  // Logic to follow/unfollow the user, maybe emit an event or call an API
  console.log(`Toggle follow for user: ${props.user.id}`);
};
</script>

// user-profile-card.test.js (Test file with shallow rendering)
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'; // Or '@jest/globals' for Jest
import UserProfileCard from './UserProfileCard.vue';
import AvatarImage from './AvatarImage.vue';
import FollowButton from './FollowButton.vue';

describe('UserProfileCard - Shallow Rendering', () => {
  it('should render user name and include child components as stubs', () => {
    // 1. Define user data for the test
    const user = {
      id: 1,
      name: 'Jane Doe',
      bio: 'Software Engineer and Vue Enthusiast',
      avatarUrl: '[https://example.com/avatar.jpg](https://example.com/avatar.jpg)'
    };

    // 2. Mount the UserProfileCard component using shallowMount
    // This ensures that AvatarImage and FollowButton will not be deeply rendered.
    const wrapper = shallowMount(UserProfileCard, {
      props: { user } // Pass the 'user' prop to the component
    });

    // 3. Verify text rendering: Check if the user's name is visible
    expect(wrapper.find('.user-name').text()).toBe('Jane Doe');
    expect(wrapper.find('.user-bio').text()).toBe('Software Engineer and Vue Enthusiast');

    // 4. Verify the existence of child components as stubs
    // shallowMount replaces children with stubs bearing their names,
    // so we can look for them directly.
    expect(wrapper.findComponent(AvatarImage).exists()).toBe(true);
    expect(wrapper.findComponent(FollowButton).exists()).toBe(true);

    // Optional: To prove that it doesn't render the child's internal content
    // If we tried to find an 'img' tag *INSIDE* AvatarImage (which is stubbed),
    // the test would fail, as the stub doesn't render internal HTML.
    // expect(wrapper.findComponent(AvatarImage).find('img').exists()).toBe(false); // This would fail the test if AvatarImage were deeply mounted
  });
});
```

# Pseudocode Explanation for Shallow Rendering Test

This document provides a detailed breakdown of the pseudocode used in the shallow rendering test example, clarifying the purpose of each command and the best practices involved.

---

## Understanding Components and Test Setup

- **`AvatarImage.vue`, `FollowButton.vue`, and `UserProfileCard.vue`**: These lines illustrate the structure of the three components involved. The **`UserProfileCard` acts as the parent component**, utilizing the other two as child components.

- **`describe('UserProfileCard - Shallow Rendering', ...)`**: This function defines the **group of tests** for the `UserProfileCard`. It specifically indicates that the focus of these tests is **shallow rendering**, helping to logically organize your test suite.

---

## Executing the Test Case and Handling Data

- **`it('should render user name and include child components as stubs', ...)`**: This function defines a **single, specific test case** within the `describe` block. It describes what this particular test aims to verify.

- **`const user = {...}`**: Here we define the **test data** that will be passed as `props` (properties) to the `UserProfileCard` component.

- **`const wrapper = shallowMount(UserProfileCard, { props: { user } });`**: This is the **core line** of the shallow rendering test.
  - **`shallowMount`**: This is the method from Vue Test Utils specifically used for **shallow rendering**. It mounts the `UserProfileCard`, but **replaces `AvatarImage` and `FollowButton` with _stubs_**. Stubs are like empty placeholders that represent the child component but do not render its internal structure or logic.
  - **`props: { user }`**: This passes the `user` object as a property to the `UserProfileCard`, allowing it to receive the test data.

---

## Assertions and Result Verification

- **`expect(wrapper.find('.user-name').text()).toBe('Jane Doe');`**: This is an **assertion**. It verifies that the user's name text (which is the `UserProfileCard`'s responsibility) has been rendered correctly. We use `wrapper.find('.user-name')` to locate the element by its CSS class selector and `.text()` to get its text content.

- **`expect(wrapper.findComponent(AvatarImage).exists()).toBe(true);`**: This is the **key assertion for shallow rendering**. It verifies that the `AvatarImage` component **exists as a _stub_** within the rendered `UserProfileCard`. It's important to note that we're not checking if the `<img>` tag _inside_ `AvatarImage` exists (because the stub doesn't render it), but rather that the `AvatarImage` _itself_ was included by the parent component. The same principle applies to `FollowButton`.

---
