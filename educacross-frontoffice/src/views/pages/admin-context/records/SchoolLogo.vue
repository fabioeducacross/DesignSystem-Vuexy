<template>
  <Tab :tabs="tabs" :current-tab="0" tab-title-icon="school" :tab-title="title">
    <template v-slot:tab-content-0>
      <section>
        <b-card no-body class="mb-2">
          <span class="text-primary font-bold p-1">Cadastre o logotipo da sua Escola.</span>
        </b-card>

        <logo-upload
          ref="logoUpload"
          text="Arraste seu arquivo aqui ou clique para fazer upload"
          @finalImage="imageToData"
          @disable="v => (isDisable = v)"
        />
      </section>
      <div>
        <portal to="fixed-sticky-footer-destination">
          <div class="bg-white p-1 d-flex justify-content-center">
            <b-button :disabled="disabledSave" variant="primary" @click="sendLogo">
              <b-spinner v-show="busy" small variant="white" />
              Salvar alterações
            </b-button>
          </div>
        </portal>

        <hr />
        <h5><span class="font-normal">Histórico de alterações</span></h5>

        <ListTable
          ref="listTable"
          :table-columns="tableColumns"
          :data-table="dataTable"
          :total-data="totalData"
          :loading="loading"
          :show-search-query-input="false"
          @change="changeListTable"
        >
          <template #cell(createdAt)="{ item }">
            <div class="text-nowrap font-weight-bolder">
              {{ item.createdAt | formattedDate }}
            </div>
          </template>

          <template #cell(actions)="{ item }">
            <span
              class="material-symbols-outlined text-primary cursor-pointer"
              @click="openPopup(item.logoUrl)"
            >
              visibility
            </span>
          </template>
        </ListTable>

        <b-modal v-model="modalImageIsOpen" title="Logo" centered hide-footer>
          <div
            v-if="selectedLogo"
            class="image-preview"
            :style="{ 'background-image': `url(${selectedLogo})` }"
          />
        </b-modal>
      </div>
    </template>
  </Tab>
</template>

<script setup>
import Tab from '@/components/tab/Tab.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getLogos, putLogo } from '@/services/admin-context/institutions/Institutions.service'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import LogoUpload from '@components/LogoUpload'
import { ref, getCurrentInstance, computed } from 'vue'

// filters are registered globally; syntax preserved for in-template |formattedDate

const vm = getCurrentInstance().proxy

const logoUpload = ref(null)
const tabs = [{ title: 'Logotipo' }]
const title = store.getters.accessUserData.InstitutionName

const tableColumns = [
  { key: 'createdAt', label: 'DATA DA ALTERAÇÃO', sortable: false },
  { key: 'applicationUserName', label: 'RESPONSÁVEL', sortable: false },
  { key: 'actions', label: 'Ações', sortable: false, thStyle: { width: '80px' } },
]
const dataTable = ref([])
const totalData = ref(0)
const loading = ref(true)

const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
  Status: null,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
  }
  fetchData()
}

const fetchData = () => {
  loading.value = true
  getLogos(params.value)
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

const selectedLogo = ref(null)
const modalImageIsOpen = ref(false)
const busy = ref(false)

const openPopup = url => {
  selectedLogo.value = url
  modalImageIsOpen.value = true
}

const image = ref(null)
const isDisable = ref(true)

const imageToData = e => {
  image.value = e
  isDisable.value = false
}

const resetParams = () => {
  dataTable.value = []
  totalData.value = 0

  params.value = {
    Page: 1,
    pageSize: 10,
    OrderBy: 0,
    Ascending: 'true',
    Search: '',
    Status: null,
  }
}

const sendLogo = async () => {
  if (disabledSave.value) return
  busy.value = true
  const logo = new FormData()
  const base64response = await fetch(image.value.imageData)
  const blobImg = await base64response.blob()

  logo.append('Logo', blobImg, `Logo.${image.value.fileType}`)

  putLogo(logo)
    .then(() => {
      resetParams()
      logoUpload.value.clearCrop()

      isDisable.value = true
      fetchData()

      vm.$toast({
        component: Toast,
        props: {
          text: 'Logotipo alterado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })

      busy.value = false
    })
    .catch(() => {
      busy.value = false
    })
}

const disabledSave = computed(() => busy.value || !image.value || !image.value.imageData)

fetchData()
</script>

<style scoped lang="scss">
  hr {
    border-color: #b9b9c3;
  }
  .image-preview {
    display: block;
    width: 375px;
    height: 375px;
    cursor: pointer;
    background-color: #fff;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
  .title {
    font-size: 24px;
    line-height: 29px;
    color: #2c2c2c;
    margin-bottom: 32px;

    @media (max-width: 672px) {
      margin-top: 30px;
    }
  }

  .subtitle,
  .suggest-text {
    font-size: 18px;
    line-height: 22px;
    color: #2c2c2c;
    margin-bottom: 40px;
  }

  .subtitle {
    margin-bottom: 24px;
  }

  .overlay-btn {
    height: 38px;
    margin-bottom: 40px;
  }

  .historic {
    margin-bottom: 36px;

    h2 {
      font-size: 24px;
      line-height: 29px;
      color: #2c2c2c;
    }
  }

  .suggest-text {
    margin-top: 20px;
  }

  .logo-list {
    .item {
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      border: 1px solid #e2e2e3;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.04);
      border-radius: 5px;
      padding: 11px 26px;
      margin-bottom: 10px;
      height: 52px;

      @media (max-width: 672px) {
        flex-wrap: wrap;
        height: auto;
      }

      p {
        margin-top: 3px;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        color: #5e5873;

        &.title-mob {
          display: none;
          @media (max-width: 672px) {
            display: block;
          }
        }
      }

      &:first-of-type {
        background-color: transparent;
        border: none;
        box-shadow: none;

        @media (max-width: 672px) {
          display: none;
        }

        p {
          margin-top: 3px;
          font-weight: 600;
          font-size: 14px;
          line-height: 24px;
          color: #5e5873;
        }
      }

      div {
        width: 363px;
        @media (max-width: 672px) {
          display: flex;
          justify-content: space-between;
        }
      }

      .btn-preview {
        text-align: right;
        button {
          height: 29px;
          padding: 0.386rem 1.5rem;

          @media (max-width: 672px) {
            width: 100%;
          }
        }
      }
    }
  }
</style>