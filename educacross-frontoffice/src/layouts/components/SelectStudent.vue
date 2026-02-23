<template>
  <div class="position-relative">
    <b-dropdown
      id="classe-dropdown"
      text="Primary"
      variant="white"
      no-caret
      size="sm"
      toggle-class="p-0"
      class="bg-white select-subject-wrapper"
      left
    >
      <!-- start selected user -->
      <template v-slot:button-content>
        <div class="d-flex align-items-center gap-2">
          <div class="d-flex align-items-center gap-2">
            <b-img-lazy
              v-bind="imgLazyConfig"
              :src="student.ImageUrl"
              style="padding: 4px"
              :style="{
                background: student.BackgroundColor,
              }"
              width="40"
              height="40"
              class="round"
            />
            <div
              class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-items-center"
            >
              <span class="font-bold text-primary"
                >{{ formatStudentName(student.StudentName) }}&nbsp;</span
              >

              <div class="center-dot mr-50 d-none d-md-block"></div>
              <div>
                <span>{{ student.ClassName }}</span>
                &nbsp;
                <b-badge pill variant="light-primary" class="d-none d-md-inline">
                  {{ student.SerieName }}
                </b-badge>
              </div>
            </div>
          </div>
          <span class="material-symbols-outlined text-primary"> keyboard_arrow_down </span>
        </div>
      </template>
      <!-- end selected user -->

      <!-- start drop items -->
      <b-dropdown-item
        v-for="c in students"
        :key="c.UserId"
        style="width: max-content"
        @click="selectProfileStudent(c)"
      >
        <div class="d-flex align-items-center gap-2">
          <b-img-lazy
            v-bind="imgLazyConfig"
            :src="c.ImageUrl"
            style="padding: 4px"
            :style="{
              background: c.BackgroundColor,
            }"
            width="40"
            height="40"
            class="round"
          />
          <div
            class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-items-center"
          >
            <span class="font-bold text-primary text-left"
              >{{ formatStudentName(c.StudentName) }}&nbsp;</span
            >

            <span style="font-size: 21px" class="font-bold text-primary d-none d-md-block"
              >&centerdot;&nbsp;</span
            >
            <div>
              <span>{{ c.ClassName }}</span>
              &nbsp;
              <b-badge pill variant="light-primary" class="d-none d-md-inline">
                {{ c.SerieName }}
              </b-badge>
            </div>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
    <!-- end drop items -->
  </div>
</template>

<script setup>
import { loginUser } from '@/auth/utils'
import router from '@/router'
import { getAccessContextsByUserId } from '@/services/auth-context/account-manager/Account.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { getCurrentInstance, ref, onMounted } from 'vue'

const { student, students } = useFilters()
const vm = getCurrentInstance().proxy

const imgLazyConfig = {
  center: false,
  fluidGrow: false,
  blank: true,
  blankColor: '#bbb',
  width: 40,
  height: 40,
}

const loginWithUserAccess = async userId => {
  const { users } = store.state.loggedAccess.loggedAccess

  const selectedUser = users[userId]

  if (selectedUser) {
    await loginUser(selectedUser.AccessToken, selectedUser.RefreshToken).catch(err => {
      const name = err.message
      if (name) {
        router.push({ name })
      }
    })

    store.state.canVerifyNPS = true
  } else {
    await getAccessContextsByUserId(userId).then(async response => {
      const { data } = response

      await loginUser(data.token, data.refreshToken).catch(err => {
        const name = err.message
        if (name) {
          router.push({ name })
        }
      })
    })
  }
}

const selectProfileStudent = async profileStudent => {
  student.value = profileStudent
  await loginWithUserAccess(profileStudent.UserId)

  const matchHome = vm.$route.matched.some(route => route.name === 'home')

  if (!matchHome) {
    router.push({ name: 'home' })
  }
}

const { UserId } = store.getters.accessUserData

onMounted(() => {
  student.value = students.value.find(u => u.UserId === UserId) || {}
})

const formatStudentName = str => {
  if (typeof str !== 'string') return

  const namePieces = str.split(' ')

  return namePieces
    .map((p, index) => {
      if (index === 0) return p

      return p.charAt(0).toUpperCase().concat('.')
    })
    .join(' ')
}
</script>

<style lang="scss">
  #classe-dropdown .dropdown-menu {
    max-height: calc(80vh - 150px);
    @media (min-width: 576px) {
      max-height: calc(80vh - 110px);
    }
    overflow-y: auto;
  }
</style>

<style lang="scss" scoped>
  .center-dot {
    border-radius: 50%;
    background: var(--primary);

    height: 4px;
    width: 4px;
  }

  .class-option-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 700px) {
    .select-subject-wrapper {
      svg {
        align-self: end;
      }
    }
  }

  @media (min-width: 606px) and (max-width: 876px) {
    #__BVID__55 {
      width: initial !important;
    }
  }

  @media (max-width: 767.98px) {
    .header-navbar div.nav.Teacher .select-subject-text .subject-title {
      white-space: nowrap;
    }
  }

  .select-class-wrapper {
    display: flex;
    flex-direction: column;
  }

  .select-subject-wrapper {
    border: 1px solid #b9b9c3;
    padding: 10px;
    background: #fff;
  }

  .select-subject-text {
    display: flex;
    flex-direction: column;

    margin: 0 8px 0 8px;
  }

  .subject-title {
    text-align: left;
    width: 100%;

    font-weight: 600;
    font-size: 14px;
    line-height: 24px;

    color: #6e6b7b;
  }

  .subject-subtitle {
    text-align: left;

    font-weight: 600;
    font-size: 12px;
    line-height: 18px;

    color: #b9b9c3;
  }

  .dropdown-icon {
    color: #6e6b7b;
  }

  .mission-type-chip {
    border-radius: 15px;
  }

  .mission-tag-style {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;

    margin: 0 0 0 8px;
    padding: 0 4px 0 4px;
  }

  .class-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .badge-disabled {
    opacity: 0.4;
  }
</style>