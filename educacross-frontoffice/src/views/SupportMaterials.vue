<template>
  <section>
    <SimpleTab v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" />

    <b-overlay :show="loading" no-wrap />

    <app-collapse accordion :type="collapseType">
      <app-collapse-item
        v-for="(material, indexMaterial) in supportMaterials2"
        :key="indexMaterial"
        :title="material.description"
      >
        <template #header>
          <div>
            <p class="title-support-material">
              {{ material.description }}
            </p>
          </div>
        </template>
        <div class="px-0">
          <b-row>
            <b-col
              v-for="(videoContent, index) in supportMaterialContentSepareted(material.content, 2)"
              :key="index + 'video'"
              cols="12"
              sm="6"
              lg="4"
              xl="4"
              class="mb-2"
            >
              <div class="d-flex flex-column justify-content-center align-items-center">
                <iframe
                  :src="videoContent.contentUrl + '?color=655CD6'"
                  allowfullscreen
                  allow="autoplay; fullscreen"
                  :title="videoContent.name"
                  class="mw-100"
                />
                <p class="text-support-materials-bold mt-1">
                  {{ videoContent.name }}
                </p>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col
              v-for="(fileContent, index) in supportMaterialContentSepareted(material.content, 3)"
              :key="index + 'file'"
              cols="12"
              sm="6"
              lg="3"
              xl="3"
              class="mb-2"
            >
              <div class="d-flex flex-column justify-content-center align-items-center h-full">
                <img :src="getFileIcon(fileContent)" class="icon-file" alt="file-icon" />
                <p class="text-support-materials-bold mt-1 flex-grow-1">
                  {{ fileContent.name }}
                </p>

                <b-button variant="primary" size="sm" @click="downloadLink(fileContent)">
                  <div class="d-flex justify-content-center align-items-center">
                    <span class="material-symbols-outlined"> download </span>
                    Download
                  </div>
                </b-button>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col
              v-for="(imgContent, index) in supportMaterialContentSepareted(material.content, 1)"
              :key="index + 'img'"
              cols="12"
              sm="6"
              lg="3"
              xl="3"
              class="mb-2"
            >
              <div
                class="d-flex flex-column justify-content-center align-items-center align-self-center h-full"
              >
                <div class="flex-grow-1 d-flex flex-column justify-content-end align-items-center">
                  <img :src="imgContent.contentUrl" class="img-file" :alt="imgContent.name" />
                </div>

                <p class="text-support-materials-bold mt-1">
                  {{ imgContent.name }}
                </p>

                <b-button variant="outline-primary" size="sm" @click="downloadLink(imgContent)">
                  <div class="d-flex justify-content-center align-items-center align-self-center">
                    <span class="material-symbols-outlined"> download </span>
                    Download
                  </div>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </app-collapse-item>
    </app-collapse>
    <div class="text-center mt-2">
      <h3 class="text-support-doubts">Ainda está com dúvidas?</h3>

      <b-button :href="helpLink" target="_blank" variant="primary" type="button">
        Acessar Perguntas Frequentes
      </b-button>
    </div>
  </section>
</template>

<script setup>
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import AppCollapse from '@/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@/components/app-collapse/AppCollapseItem.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { getSupportmaterials } from '@/services/shared/supportAndMaterial/SupportMaterials.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { getExtension } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { ref } from 'vue'

const fileIcons = import.meta.glob('@/assets/images/images-educa/icons/*-icon.svg', {
  eager: true,
})

const loading = ref(true)
const supportMaterials = ref([])
const supportMaterials2 = ref([])
const helpLink = getWhitelabelConfig('helpLink')
const collapseType = ref('margin')
const clickedMaterialId = ref(0)

getSupportmaterials()
  .then(response => {
    supportMaterials2.value = response.data
  })
  .catch(() => {
    supportMaterials2.value = []
  })
  .finally(() => {
    loading.value = false
  })

const downloadLink = item => {
  saveAs(item.contentUrl, `${item.name}.${getExtension(item.contentUrl)}`)
}

const getFileIcon = value => {
  const fileExtension = getExtension(value.contentUrl)
  const iconPath = `@/assets/images/images-educa/icons/${fileExtension}-icon.svg`
  return (
    fileIcons[iconPath]?.default ||
    fileIcons[iconPath] ||
    fileIcons['@/assets/images/images-educa/icons/pdf-icon.svg']?.default ||
    ''
  )
}

const supportMaterialContentSepareted = (array, type) => {
  const arrayReturn = []
  array.forEach(element => {
    if (element.type === type) arrayReturn.push(element)
  })
  return arrayReturn
}
</script>

<style lang="scss" scoped>
  .title-support-material {
    padding-left: 0.75rem;
    padding-top: 0.75rem;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #202223;
  }

  .text-support-materials-bold {
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #6e6b7b;
  }

  .icon-file {
    width: 45px;
    height: 45px;
    border-radius: 5px;
  }

  .img-file {
    width: 9rem;
    height: auto;
    max-width: 100%;
  }
</style>