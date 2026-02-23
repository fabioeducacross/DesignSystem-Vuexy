<template>
  <div :data-fileName="certificate.studentName" class="certificate print-component">
    <b-img class="certificate-background" src="@/assets/images/pdf/bg-certificate.svg" />
    <div class="certificate-info-header">
      <h1
        v-if="can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES) && certificateType === 2"
        class="certificate-title"
      >
        Certificado de Desempenho
      </h1>
      <h1 v-else class="certificate-title">Certificado de Participação</h1>
    </div>
    <div class="certificate-info-body">
      <div class="certificate-message">
        <p>É com grande satisfação que parabenizamos:</p>
        <p class="certificate-student-name">
          {{ certificate.studentName }}
        </p>
        <p class="certificate-info">
          da turma
          <span class="certificate-class">{{ certificate.className }}</span
          >, do(a) <span class="certificate-institution">{{ certificate.institutionName }}</span
          >,
          <span v-if="can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES) && certificateType === 2">
            pela dedicação e empenho na {{ name }}. <br />Você cumpriu
            <span class="font-bold">
              {{
                $filters.formatNumber(certificate.challengesDone ? certificate.challengesDone : 0)
              }}</span
            >
            desafios em
            <span class="font-bold">{{
              certificate.activitiesPlayed ? certificate.activitiesPlayed : 0
            }}</span>
            jogos e alcançou um desempenho de
            <span class="font-bold"
              >{{
                $filters.formatNumber(certificate.performance ? certificate.performance : 0)
              }}%</span
            >.
          </span>
          <span v-else>
            pela participação na {{ name }} com diversas jogadas e várias habilidades desenvolvidas!
          </span>
        </p>
      </div>
    </div>
    <div
      :style="isEducaCross ? 'margin-top: 2rem;' : 'margin-top: 1.7rem;'"
      class="certificate-info-footer"
    >
      <div class="certificate-emmited">
        {{ name }}, Brasil, <span class="certificate-month">{{ currentMonth }}</span> de
        {{ currentYear }}
      </div>
      <div class="logo-container">
        <div v-if="isEducaCross" class="logo-fixed-width">
          <b-img v-if="isEducaCross" :src="logoCard" class="logo" />
        </div>
        <div v-if="schoolLogo" class="divisor"></div>
        <div v-if="schoolLogo" class="logo-fixed-width">
          <b-img :alt="certificate.institutionName" :src="schoolLogo" class="logo" />
        </div>
      </div>
      <div class="certificate-links">
        <div class="d-flex align-items-center mr-1">
          <feather-icon class="text-black" icon="InstagramIcon" />
          <span class="social-text align-top ml-50">{{ instagramTag }}</span>
        </div>
        <div class="web">
          <div class="d-flex align-items-center">
            <feather-icon class="text-black" icon="GlobeIcon" />
            <span class="social-text align-top ml-50">{{ domain }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import { can } from '@/@core/libs/acl/utils'
import { ACTION, PERMISSION } from '@/consts/permissions'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store'
import { computed } from 'vue'

// Props
const props = defineProps({
  certificate: {
    type: Object,
    default: () => ({}),
  },
  schoolLogo: {
    type: String,
    required: true,
  },
  certificateType: {
    type: Number,
    required: false,
  },
})

// Computed & static values
const currentYear = new Date().getFullYear()
const currentMonth = new Date().toLocaleString('pt-br', { month: 'long' })

const isEducaCross = computed(() => store.getters.isEducacross)
const logoCard = getWhitelabelConfig('LogoStudentCard')
const domain = getWhitelabelConfig('BeautifulUrl')
const instagramTag = getWhitelabelConfig('InstagramUsername')
const name = getWhitelabelConfig('Name')

// Global $filters for template usage (assume available via Vue app config)
</script>

<style lang="scss" scoped>
  $margin-top-bottom: 1.5rem;
  $width-card: 228mm;
  $height-card: 162.7mm;
  $font-style: normal;
  $font-size: 18px;
  $line-height: normal;
  $text-align: center;
  $color: #000;
  $margin: 1.25rem 0;

  @mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @mixin text-style($weight, $size, $height, $color) {
    font-style: $font-style;
    font-weight: $weight;
    font-size: $size;
    line-height: $height;
    text-align: $text-align;
    color: $color;
  }

  .certificates-container {
    @include flex-center;
    flex-direction: column;
  }

  .HTMLtoPdf .certificate-links span {
    margin-bottom: 0.95rem;
  }

  .certificate {
    @include flex-center;
    flex-direction: column;
    justify-content: flex-start;

    width: $width-card;
    height: $height-card;

    margin-bottom: $margin-top-bottom;

    page-break-after: auto;
    page-break-inside: avoid;

    .certificate-background {
      width: $width-card;
      height: $height-card;
      background-color: #fff;
      position: absolute;
      z-index: -1;
    }

    .certificate-title {
      padding-top: 85px;
      @include text-style(600, 36px, 124px, #00bdb9);
    }

    .certificate-message,
    .certificate-info {
      @include text-style(500, $font-size, $line-height, $color);
    }

    .certificate-student-name {
      margin: $margin;
      @include text-style(800, $font-size, $line-height, #00bdb9);
    }

    .certificate-info {
      padding: 0 200px;

      .certificate-institution,
      .certificate-class {
        @include text-style(bold, $font-size, $line-height, $color);
      }
    }

    .certificate-info-footer {
      @include flex-center;
      flex-direction: column;

      .certificate-emmited {
        @include text-style(600, 18px, 24px, $color);
        margin-bottom: 40px;
      }

      .logo-container {
        margin-bottom: 10px;
        width: 100%;
        height: 72px;

        display: flex;
        justify-content: center;
        align-items: center;

        .logo-fixed-width {
          width: 190px;
        }

        .logo {
          max-height: 72px;
          max-width: 190px;
          width: auto;
          height: auto;
          display: block;
        }

        .divisor {
          height: 100%;
          width: 1px;

          border-right: 1px solid #b4b7bd;
          margin: 0 25px;
        }
      }

      .certificate-links {
        display: flex;

        .social {
          margin-right: 1.5rem;
        }

        .social-text,
        .web-text,
        .social i,
        .web i {
          @include text-style(500, 12px, 18px, $color);
          padding-right: 4px;
        }

        .social i::before,
        .web i::before {
          color: #fff;
          background: $color;
          border-radius: 50px;
          border: 2px solid $color;
        }

        .certificate-icon {
          vertical-align: middle;
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }
  }

  .htmlToPdf {
    .certificate {
      margin: 0;
    }
  }

  @media print {
    .certificate {
      margin: 0;
    }
  }
</style>